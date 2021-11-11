import { Request, Response, NextFunction } from 'express';

import jwtUtils from '@utils/jwt-util';
import usersService from '@services/users-service';

const authJWT = async (req:Request, res:Response, next:NextFunction) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    const result = jwtUtils.verify(accessToken); // token을 검증합니다.
    if (result.ok) { // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
      next();
    } else { // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
      const refreshResult = await usersService.tokenRefresh(accessToken);

      if (refreshResult.ok) {
        res.status(401).json({
          result: false,
          msg: refreshResult.msg, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
        });
      } else {
        res.status(200).json({
          accessToken: refreshResult.accessToken,
          result: refreshResult.ok,
          msg: refreshResult.msg,
        });

        next();
      }
    }
  }
};

module.exports = authJWT;
