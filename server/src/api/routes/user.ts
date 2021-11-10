import {
  Router, Request, Response,
} from 'express';

import usersService from '@services/users-service';

const userRouter = Router();

export default (app: Router) => {
  app.use('/user', userRouter);

  userRouter.get('/:userDocumentId', async (req: Request, res: Response) => {
    try {
      const { userDocumentId } = req.params;

      const userInfo = await usersService.findUser(userDocumentId);
      res.status(200).json(userInfo);
    } catch (error) {
      console.error(error);
    }
  });
};
