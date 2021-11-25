import { Router } from 'express';
import room from '@routes/room';
import event from '@routes/event';
import user from '@routes/user';
import search from '@routes/search';
import chats from '@routes/chats';
import activity from '@routes/activity';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  room(app);
  event(app);
  user(app);
  search(app);
  chats(app);
  activity(app);

  return app;
};
