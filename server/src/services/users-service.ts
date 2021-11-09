/* eslint-disable consistent-return */
import Users from '@models/users';
import RefreshTokens from '@models/refresh-token';
import jwt from '@utils/jwt-util';

export default {
  signIn: async (email: string, password:string) => {
    const user = await Users.findOne({ userEmail: email });

    if (!user) {
      return { token: null, result: false, msg: 'there is no user' };
    }

    const isMatch = user.checkPassword(password);

    if (isMatch) {
      const accessToken = await jwt.sign(user.userId, user.userEmail);
      console.log(accessToken);
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
};
