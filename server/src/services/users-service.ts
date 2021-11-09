/* eslint-disable consistent-return */
import nodemailer from 'nodemailer';

import Users from '@models/users';
import RefreshTokens from '@models/refresh-token';
import jwt from '@utils/jwt-util';

interface ISignupUserInfo {
  loginType: string,
  userId: string,
  password: string,
  userName: string,
  userEmail: string,
  interesting: string[]
}

export default {
  signup: (info: ISignupUserInfo) => {
    const newResult = new Users(info);
    return newResult.save();
  },

  signIn: async (email: string, password: string) => {
    const user = await Users.findOne({ userEmail: email });

    if (!user) {
      return { token: null, result: false, msg: 'there is no user' };
    }

    const isMatch = user.checkPassword(password);

    if (isMatch) {
      const accessToken = await jwt.sign(user.userId, user.userEmail);
      return { token: accessToken, result: true, msg: 'ok' };
    }
    return { token: null, result: false, msg: 'wrong password' };
  },

  verifyAccessToken: (token: string) => {
    return jwt.verify(token);
  },

  getRefreshTokens: async (userID: string) => {
    const refreshToken = await RefreshTokens.findOne({ userID });
    if (!refreshToken) {
      return null;
    }
    return refreshToken.token;
  },

  sendVerificationMail: async (email: string) => {
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

    const send = await transporter.sendMail({
      from: 'hyunee169@gmail.com',
      to: email,
      subject: '인증번호입니다.',
      text: VerificationNumber,
    });

    return VerificationNumber;
  },
};
