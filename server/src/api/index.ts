import { Router } from 'express';
import main from './routes/main';
import room from './routes/room';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  main(app);
  room(app);
  return app;
};
