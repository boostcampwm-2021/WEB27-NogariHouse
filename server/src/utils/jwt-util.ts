import { IRefreshTokenTypesModel } from '@models/refresh-token';
import usersService from '@src/services/users-service';

// jwt-util.js
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET as string;

export default {
  sign: (userId : string, userEmail : string) => { // access token 발급
    const payload = { // access token에 들어갈 payload
      id: userId,
      email: userEmail,
    };

    return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
      algorithm: 'HS256', // 암호화 알고리즘
      expiresIn: '1h', // 유효기간
    });
  },
  verify: (token : any) => { // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      return {
        ok: true,
        id: decoded.id,
      };
    } catch (err : any) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: () => jwt.sign({}, secret, { // refresh token은 payload 없이 발급
    algorithm: 'HS256',
    expiresIn: '14d',
  }),
  refreshVerify: async (token : string, userId:string) => { // refresh token 검증
    try {
      const data = await usersService.getRefreshTokens(userId); // refresh token 가져오기
      if (token === data) {
        try {
          jwt.verify(token, secret);
          return true;
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
};
