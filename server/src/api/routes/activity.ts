import {
  Router, Request, Response,
} from 'express';

import authJWT from '@middlewares/auth';
import usersService from '@services/users-service';

const activityRouter = Router();

export default (app: Router) => {
  app.use('/activity', activityRouter);
  activityRouter.use(authJWT);

  activityRouter.get('/isActivityChecked', async (req: Request, res: Response) => {
    const { userDocumentId } = req.body;
    try {
      const isActivityChecked = await usersService.isActivityChecked(userDocumentId);
      res.json({ ok: true, isActivityChecked });
    } catch (e) {
      console.log(e);
      res.json({ ok: false });
    }
  });

  activityRouter.get('/', async (req: Request, res: Response) => {
    const { userDocumentId } = req.body;
    const { count } = req.query;
    try {
      const user = await usersService.findUserByDocumentId(userDocumentId);
      const activityList = user!.activity;
      const items = await usersService.makeItemToActivityInterface(activityList, Number(count));
      res.json({ ok: true, items });
    } catch (e) {
      console.error(e);
      res.json({ ok: false });
    }
  });
};
