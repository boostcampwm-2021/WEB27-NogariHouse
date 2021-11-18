/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Users, { IUserTypesModel } from '@models/users';
import RefreshTokens from '@models/refresh-token';
import jwtUtils from '@utils/jwt-util';

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

      // tokenService를 따로 만들어줘야하는가?
      const existingRefreshToken = await RefreshTokens.findOneAndUpdate(
        { user_id: user._id },
        { token: refreshToken },
      );

      if (!existingRefreshToken) {
        const usersRefreshTokens = new RefreshTokens({
          user_id: user._id,
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

  async getRefreshTokens(userId: string) {
    const refreshToken = await RefreshTokens.findOne({ userId });
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

  async searchUsers(keyword: string, count: number) {
    try {
      const query = new RegExp(keyword, 'i');
      const res = await Users.find({
        $or: [{ userId: query }, { userName: query }, { description: query }],
      }, ['userName', 'description', 'profileUrl']).sort({ date: 1 }).skip(count).limit(10);
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

  async findUsersById(documentIdList: Array<string>) {
    try {
      const participantsInfo = Users.find({ _id: { $in: documentIdList } }, ['userId', 'userName', 'profileUrl', 'description']);
      return participantsInfo;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserService();
