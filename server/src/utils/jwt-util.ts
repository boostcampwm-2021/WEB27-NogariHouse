import jwt from 'jsonwebtoken';

const secret = process.env.SECRET as string;

export default {
  sign: (user_id : string, userEmail : string) => { // access token 발급
    const payload = { // access token에 들어갈 payload
      id: user_id,
      email: userEmail,
    };

    return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
      algorithm: 'HS256', // 암호화 알고리즘
      expiresIn: '2h', // 유효기간
    });
  },
  verify: (token : any) => { // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      return {
        ok: true,
        accessToken: token,
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
  refreshVerify: async (token : string) => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (err) {
      return false;
    }
  },
};
