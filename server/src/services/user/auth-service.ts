/* eslint-disable no-underscore-dangle */
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
}

let instance: any = null;
class AuthService {
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
}

export default new AuthService();
