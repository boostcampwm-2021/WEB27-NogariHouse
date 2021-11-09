/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Users from '@models/users';
import RefreshTokens from '@models/refresh-token';
import jwtUtils from '@utils/jwt-util';

let instance:any = null;

interface ISignupUserInfo {
  loginType: string,
  userId: string,
  password: string,
  userName: string,
  userEmail: string,
  interesting: string[]
}

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
      const accessToken = jwtUtils.sign(user.userId, user.userEmail);
      const refreshToken = jwtUtils.refresh();

      // 로그인 로직에서 토큰을 디비에 저장하는게 맞는지?
      // tokenService를 따로 만들어줘야하는가?
      const existingRefreshToken = await RefreshTokens.findOneAndUpdate(
        { userId: 'navi' }, { token: refreshToken },
      );

      if (!existingRefreshToken) {
        const usersRefreshTokens = new RefreshTokens({
          userId: user.userId,
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

  signup(info: ISignupUserInfo) {
    const newResult = new Users(info);
    return newResult.save();
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
      // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야함
      if (refreshResult === false) {
        return ({
          ok: false,
          msg: 'No authorized!',
        });
      }
      // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
      const newAccessToken = jwtUtils.sign(decoded.id, decoded.email);

      return ({
        ok: true,
        accessToken: newAccessToken,
      });
    }
    // 3. access token이 만료되지 않은경우 => 문제 없음(여기서 쓰일 일은 없긴 함)
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

export = new UserService();
