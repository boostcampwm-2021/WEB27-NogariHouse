/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Users from '@models/users';
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

let instance:any = null;
class UserService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async signIn(email: string, password:string) {
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
        { user_id: user._id }, { token: refreshToken },
      );

      if (!existingRefreshToken) {
        const usersRefreshTokens = new RefreshTokens({
          user_id: user._id,
          token: refreshToken,
        });
        await usersRefreshTokens.save();
      }

      return {
        accessToken, ok: true, msg: 'ok',
      };
    }
    return { ok: false, msg: 'wrong password' };
  }

  async findUser(userDocumentId: string) {
    const result = await Users.findOne({ _id: userDocumentId });
    return result;
  }

  async signup(info: ISignupUserInfo) {
    try {
      const result = await Users.insertMany([info]);
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
      return ({
        ok: false,
        msg: 'No authorized!',
      });
    }

    const refreshToken = await this.getRefreshTokens(decoded.id) as string;
    const refreshResult = await jwtUtils.refreshVerify(refreshToken);

    if (accessResult.ok === false && accessResult.message === 'jwt expired') {
      if (refreshResult === false) {
        return ({
          ok: false,
          msg: 'No authorized!',
        });
      }
      const newAccessToken = jwtUtils.sign(decoded.id, decoded.email);

      return ({
        ok: true,
        accessToken: newAccessToken,
      });
    }
    return ({
      ok: true,
      msg: 'Acess token is not expired!',
    });
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

    const VerificationNumber = String(Math.floor(Math.random() * 999999)).padStart(6, '0');

    await transporter.sendMail({
      from: 'hyunee169@gmail.com',
      to: email,
      subject: '인증번호입니다.',
      text: VerificationNumber,
    });

    return VerificationNumber;
  }
}

export default new UserService();
