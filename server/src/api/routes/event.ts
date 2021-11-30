import { Router, Request, Response } from 'express';

import eventsService from '@services/events-service';
import activityService from '@services/user/activity-service';
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
        title, participants, date, description, userDocumentId,
      } = req.body;

      const eventDocumentId = await eventsService.setEvent(title, participants, date, description);
      const activityAddResult = await activityService.addActivityTypeEvent(userDocumentId, eventDocumentId);

      if (!activityAddResult) res.status(400).json({ ok: false });
      else res.status(200).send('success!');
    } catch (error) {
      console.error(error);
    }
  });
};
