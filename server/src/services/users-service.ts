/* eslint-disable no-underscore-dangle */
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Users, { IUserTypesModel, IActivity } from '@models/users';
import Events from '@models/events';
import RefreshTokens from '@models/refresh-token';
import jwtUtils from '@utils/jwt-util';
import { activeUser } from '@src/sockets/user';
import { userNamespace } from '@src/sockets';

interface ISignupUserInfo {
  loginType: string,
  userId: string,
  password: string,
  userName: string,
  userEmail: string,
  interesting: string[]
}

let instance: any = null;
class UserService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async signIn(email: string, password: string) {
    const user = await Users.findOne({ userEmail: email });

    if (!user) {
      return { ok: false, msg: 'there is no user' };
    }

    const isMatch = user.checkPassword(password);

    if (isMatch) {
      const accessToken = jwtUtils.sign(user._id, user.userEmail);
      const refreshToken = jwtUtils.refresh();

      const existingRefreshToken = await RefreshTokens.findOneAndUpdate(
        { userDocumentId: user._id },
        { token: refreshToken },
      );

      if (!existingRefreshToken) {
        const usersRefreshTokens = new RefreshTokens({
          userDocumentId: user._id,
          token: refreshToken,
        });
        await usersRefreshTokens.save();
      }

      return {
        accessToken,
        ok: true,
        msg: 'ok',
      };
    }
    return { ok: false, msg: 'wrong password' };
  }

  async findUserByDocumentId(userDocumentId: string) {
    const result = await Users.findOne({ _id: userDocumentId });
    return result;
  }

  async findUserByUserId(userId: string) {
    const result = await Users.findOne({ userId });
    return result;
  }

  async signup(info: ISignupUserInfo) {
    try {
      await Users.insertMany([info]);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyAccessToken(token: string) {
    const result = jwtUtils.verify(token);
    if (!result.ok) {
      const newToken = await this.tokenRefresh(token);
      return newToken;
    }
    return result;
  }

  async getRefreshTokens(userDocumentId: string) {
    const refreshToken = await RefreshTokens.findOne({ userDocumentId });
    if (!refreshToken) {
      return null;
    }
    return refreshToken.token;
  }

  async tokenRefresh(accessToken: string) {
    const accessResult = jwtUtils.verify(accessToken);
    const decoded = jwt.decode(accessToken) as jwt.JwtPayload;

    if (decoded === null) {
      return {
        ok: false,
        msg: 'No authorized!',
      };
    }

    const refreshToken = (await this.getRefreshTokens(decoded.id)) as string;
    const refreshResult = await jwtUtils.refreshVerify(refreshToken);

    if (accessResult.ok === false && accessResult.message === 'jwt expired') {
      if (refreshResult === false) {
        return {
          ok: false,
          msg: 'No authorized!',
        };
      }
      const newAccessToken = jwtUtils.sign(decoded.id, decoded.email);

      return {
        ok: true,
        accessToken: newAccessToken,
        userDocumentId: decoded.id,
      };
    }

    return {
      ok: true,
      msg: 'Acess token is not expired!',
    };
  }

  async isUniqueEmail(email: string) {
    const user = await Users.findOne({ userEmail: email });
    return !user;
  }

  async sendVerificationMail(email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: 'hyunee169@gmail.com',
        pass: process.env.GMAIL_PASS,
      },
    });

    const VerificationNumber = String(
      Math.floor(Math.random() * 999999),
    ).padStart(6, '0');

    await transporter.sendMail({
      from: 'hyunee169@gmail.com',
      to: email,
      subject: '인증번호입니다.',
      text: VerificationNumber,
    });

    return VerificationNumber;
  }

  makeItemToUserInterface(
    item: { _id: string, userName: string, description: string, profileUrl: string, userId: string },
  ) {
    const {
      _id, userName, description, profileUrl, userId,
    } = item;
    return ({
      _id,
      userName,
      description,
      profileUrl,
      userId,
      type: 'user',
    });
  }

  makeUserDetailInterface(user: IUserTypesModel & {
    _id: any;
  }) {
    const {
      _id, userName, userId, userEmail, description, followings, followers, joinDate, profileUrl,
    } = user;
    return {
      _id,
      userName,
      userId,
      userEmail,
      description,
      followings,
      followers,
      joinDate,
      profileUrl,
    };
  }

  async getActivityList(userDocumentId: string, count: number) {
    const user = await Users.findById(userDocumentId, ['activity']);
    const newActivityList = await Promise.all(user!.activity.slice(count, count + 10).map(async (activity: IActivity) => {
      const detailFrom = await this.findUserByDocumentId(activity.from);
      const newFrom = { userId: detailFrom!.userId, userName: detailFrom!.userName, profileUrl: detailFrom!.profileUrl };
      return { ...activity, from: newFrom };
    }));
    await Users.findByIdAndUpdate(userDocumentId, { activity: user!.activity.map((el) => ({ ...el, isChecked: true })) });
    return newActivityList;
  }

  async searchUsers(keyword: string, count: number) {
    try {
      const query = new RegExp(keyword, 'i');
      const res = await Users.find({
        $or: [{ userId: query }, { userName: query }, { description: query }],
      }).sort({ date: 1 }).skip(count).limit(10);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  async getMyFollowingsList(userDocumentId: string) {
    try {
      const result = await Users.findOne({ _id: userDocumentId }, ['followings']);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async getFollowingsList(userId: string, count: number) {
    try {
      const result = await Users.findOne({ userId }, ['followings']).sort({ date: 1 }).skip(count).limit(10);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async getFollowersList(userId: string, count: number) {
    try {
      const result = await Users.findOne({ userId }, ['followers']).sort({ date: 1 }).skip(count).limit(10);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async findUsersByIdList(documentIdList: Array<string>) {
    try {
      const participantsInfo = Users.find({ _id: { $in: documentIdList } });
      return participantsInfo;
    } catch (e) {
      console.log(e);
    }
  }

  async followUser(userDocumentId: string, targetUserDocumentId: string) {
    try {
      await Users.findByIdAndUpdate(userDocumentId, { $addToSet: { followings: [targetUserDocumentId] } });
      await Users.findByIdAndUpdate(targetUserDocumentId, { $addToSet: { followers: [userDocumentId] } });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async unfollowUser(userDocumentId: string, targetUserDocumentId: string) {
    try {
      await Users.findByIdAndUpdate(userDocumentId, { $pullAll: { followings: [targetUserDocumentId] } });
      await Users.findByIdAndUpdate(targetUserDocumentId, { $pullAll: { followers: [userDocumentId] } });

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateUserProfileUrl(userDocumentId: string, profileUrl: string) {
    try {
      await Users.updateOne({ _id: userDocumentId }, { profileUrl });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isActivityChecked(userDocumentId: string) {
    try {
      const { activity } : any = await Users.findOne({ _id: userDocumentId }, ['activity']);
      if (!activity) return false;
      return activity.some((item: IActivity) => !item.isChecked);
    } catch (e) {
      return false;
    }
  }

  async addActivityTypeFollow(userDocumentId: string, targetUserDocumentId: string) {
    try {
      const newActivity = {
        type: 'follow',
        clickDocumentId: userDocumentId,
        from: userDocumentId,
        date: new Date(),
        isChecked: false,
      };
      await Users.findByIdAndUpdate(targetUserDocumentId, { $push: { activity: { $each: [newActivity], $position: 0 } } });
      this.emitToUserGetActivity(targetUserDocumentId);
      return true;
    } catch (e) {
      return false;
    }
  }

  async addActivityTypeRoom(userDocumentId: string, roomDocumentId: string) {
    try {
      const user = await Users.findById(userDocumentId, ['followers']);
      const newActivity = {
        type: 'room',
        clickDocumentId: String(roomDocumentId),
        from: userDocumentId,
        date: new Date(),
        isChecked: false,
      };
      await Promise.all(user!.followers.map(async (userDocId: string) => {
        await Users.findByIdAndUpdate(userDocId, { $push: { activity: { $each: [newActivity], $position: 0 } } });
        this.emitToUserGetActivity(userDocId);
        return true;
      }));
      return true;
    } catch (e) {
      return false;
    }
  }

  async addActivityTypeEvent(userDocumentId: string, eventDocumentId: string) {
    try {
      const event = await Events.findById(eventDocumentId, ['participants']);
      const newActivity = {
        type: 'event',
        clickDocumentId: String(eventDocumentId),
        from: userDocumentId,
        date: new Date(),
        isChecked: false,
      };
      await Promise.all(event!.participants.map(async (userId: string) => {
        const user = await Users.findOneAndUpdate({ userId }, { $push: { activity: { $each: [newActivity], $position: 0 } } });
        const userDocId = user!._id;
        this.emitToUserGetActivity(String(userDocId));
        return true;
      }));
      return true;
    } catch (e) {
      return false;
    }
  }

  emitToUserGetActivity(userDocumentId: string) {
    const socketUser = activeUser.get(userDocumentId);
    if (socketUser) userNamespace.to(socketUser.socketId).emit('user:getActivity');
  }
}

export default new UserService();
