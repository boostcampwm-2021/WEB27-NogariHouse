import { Router, Request, Response } from 'express';

import eventsService from '@services/events-service';
import authJWT from '@middlewares/auth';

const eventRouter = Router();

export default (app: Router) => {
  app.use('/event', eventRouter);
  eventRouter.use(authJWT);

  eventRouter.get('/', async (req:Request, res:Response) => {
    const { count } = req.query;
    const rawItems = await eventsService.get10EventItems(Number(count));
    if (!rawItems) {
      res.json({ ok: false });
    } else {
      const items = await Promise.all(rawItems.map(eventsService.makeItemToEventInterface));
      res.json({ ok: true, items });
    }
  });

  eventRouter.post('/', async (req: Request, res: Response) => {
    try {
      const {
        title, participants, date, description,
      } = req.body;

      eventsService.setEvent(title, participants, date, description);

      res.status(200).send('success!');
    } catch (error) {
      console.error(error);
    }
  });
};
