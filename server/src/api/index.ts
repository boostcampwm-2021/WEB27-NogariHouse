import { Router } from 'express';
import main from '@routes/main';
import room from '@routes/room';
import event from '@routes/event';
import user from '@routes/user';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  main(app);
  room(app);
  event(app);
  user(app);
  return app;
};
