import jwt from 'jsonwebtoken';

export default {
  sign: (userDocumentId : string, userEmail : string) => {
    const payload = {
      id: userDocumentId,
      email: userEmail,
    };

    return jwt.sign(payload, process.env.SECRET as string, {
      algorithm: 'HS256',
      expiresIn: '2h',
    });
  },
  verify: (token : any) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.SECRET as string) as jwt.JwtPayload;
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
  refresh: () => jwt.sign({}, process.env.SECRET as string, {
    algorithm: 'HS256',
    expiresIn: '14d',
  }),
  refreshVerify: async (token : string) => {
    try {
      jwt.verify(token, process.env.SECRET as string);
      return true;
    } catch (err) {
      return false;
    }
  },
};
