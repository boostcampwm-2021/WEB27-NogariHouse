import { Router } from 'express';

import room from '@routes/room';
import main from '@routes/main';
import event from '@routes/event';

export default () => {
  const app = Router();
  main(app);
  room(app);
  event(app);
  return app;
};
