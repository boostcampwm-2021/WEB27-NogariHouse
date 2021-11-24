import {
  Router, Request, Response,
} from 'express';

import authJWT from '@middlewares/auth';
import usersService from '@services/users-service';

const activityRouter = Router();

export default (app: Router) => {
  app.use('/activity', activityRouter);
  activityRouter.use(authJWT);

  activityRouter.get('/', async (req: Request, res: Response) => {
    const { userDocumentId } = req.body;
    try {
      const { activity } = await usersService.findUserByDocumentId(userDocumentId);
      const items = await usersService.makeItemToActivityInterface(activity);
      res.json({ ok: true, items });
    } catch (e) {
      console.error(e);
      res.json({ ok: false });
    }
  });
};
