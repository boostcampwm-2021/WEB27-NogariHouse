import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../api';
import config from '../config';
import errorHandler from '../api/middlewares/error-handler';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use(errorHandler);

  /// error handlers
};
