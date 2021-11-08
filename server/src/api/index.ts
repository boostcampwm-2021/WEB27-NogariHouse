import { Router } from 'express';
import room from '@routes/room';
import event from '@routes/event';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  room(app);
  event(app);
  return app;
};
