import { Router, Request, Response } from 'express';

import eventsService from '@services/events-service';

const eventRouter = Router();

const get10EventItemsMiddleware = async (req:Request, res:Response) => {
  const { count } = req.query;
  const items = (await eventsService.get10EventItems(Number(count)))?.
    map(eventsService.makeItemToEventInterface);
  res.json({ items });
};

export default (app: Router) => {
  app.use('/event', eventRouter);

  eventRouter.get('/', get10EventItemsMiddleware);
  eventRouter.post('/', (req: Request, res: Response) => {
    try {
      const {
        title, participants, date, description,
      } = req.body;

      res.status(200).send('success!');
    } catch (error) {
      console.error(error);
    }
  });
};
