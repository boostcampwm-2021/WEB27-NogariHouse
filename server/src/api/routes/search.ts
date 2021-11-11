import { Router, Request, Response } from 'express';

import eventsService from '@src/services/events-service';

const searchRouter = Router();

export default (app: Router) => {
  app.use('/search', searchRouter);

  searchRouter.get('/events/:keyword', async (req: Request, res: Response) => {
    const { keyword } = req.params;
    const { count } = req.query;
    if (typeof keyword !== 'string' || typeof count !== 'string') {
        res.json({ ok: false });
    } else {
        const items = (await eventsService.searchEvent(keyword, Number(count)))?.map(eventsService.makeItemToEventInterface);
        res.json({ ok: true, items, keyword })
    }
  });
};