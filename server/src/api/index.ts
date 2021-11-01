import { Router } from 'express';
import main from './routes/main';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  main(app);
  return app;
};
