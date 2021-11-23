import { Router, Request, Response } from 'express';

import eventsService from '@services/events-service';

const eventRouter = Router();

export default (app: Router) => {
  app.use('/event', eventRouter);

  eventRouter.get('/', async (req:Request, res:Response) => {
    const { count } = req.query;
    const items = (await eventsService.get10EventItems(Number(count)))
      ?.map(eventsService.makeItemToEventInterface);
    res.json({ items });
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
