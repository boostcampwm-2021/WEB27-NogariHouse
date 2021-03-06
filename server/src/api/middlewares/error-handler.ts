import { Request, Response, NextFunction } from 'express';
import HttpException from '../../utils/http-exception';

const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const status = error.statusCode || error.status || 500;
  response.status(status).send(error);
};

export default errorHandler;
