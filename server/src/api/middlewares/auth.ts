import { Request, Response, NextFunction } from 'express';

import jwtUtils from '@utils/jwt-util';
import usersService from '@services/users-service';

const authJWT = async (req:Request, res:Response, next:NextFunction) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    const result = jwtUtils.verify(accessToken); // token을 검증합니다.
    if (result.ok) {
      req.body.accessToken = accessToken;
      req.body.userDocumentId = result.id;
      next();
    } else {
      const refreshResult = await usersService.tokenRefresh(accessToken);
      if (!refreshResult.ok) {
        res.status(401).json({
          ok: false,
          msg: refreshResult.msg,
        });
      } else {
        req.body.accessToken = refreshResult.accessToken;
        req.body.userDocumentId = refreshResult.userDocumentId;
        next();
      }
    }
  }
  else {
    res.json({ ok: false })
  }
};

export default authJWT;
