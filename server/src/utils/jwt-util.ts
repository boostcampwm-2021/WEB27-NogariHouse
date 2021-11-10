import jwt from 'jsonwebtoken';

const secret = process.env.SECRET as string;

export default {
  sign: (user_id : string, userEmail : string) => {
    const payload = {
      id: user_id,
      email: userEmail,
    };

    return jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: '2h',
    });
  },
  verify: (token : any) => {
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
  refresh: () => jwt.sign({}, secret, {
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
