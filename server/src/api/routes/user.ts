import {
  Router, Request, Response,
} from 'express';

import usersService from '@services/users-service';

const userRouter = Router();

export default (app: Router) => {
  app.use('/user', userRouter);

  userRouter.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await usersService.signIn(email, password);
    console.log(result);
    if (result?.token) {
      res.status(200).json({ jwt: result.token, result: result.result, msg: result.msg });
    }
    res.status(400).json({ result: result?.result, msg: result?.msg });
  });
};
