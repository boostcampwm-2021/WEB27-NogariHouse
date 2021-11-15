import { Router } from 'express';
import room from '@routes/room';
import event from '@routes/event';
import user from '@routes/user';
import search from '@routes/search';
import chats from '@routes/chats';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  room(app);
  event(app);
  user(app);
  search(app);
  chats(app);

  return app;
};
