import {
  Router, Request, Response,
} from 'express';

import usersService from '@services/users-service';

const userRouter = Router();

export default (app: Router) => {
  app.use('/user', userRouter);

  userRouter.get('/', (req: Request, res: Response) => {
    const { accessToken } = req.cookies;
    res.json(usersService.verifyAccessToken(accessToken));
  });

  userRouter.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await usersService.signIn(email, password);
    console.log(result);
    if (result?.accessToken) {
      res.status(200).json({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        result: result.result,
        msg: result.msg,
      });
    } else {
      res.status(400);
    }
  });

  userRouter.post('/signup/mail', async (req: Request, res: Response) => {
    const { email } = req.body;

    const verificationNumber = await usersService.sendVerificationMail(email);

    res.json({ verificationNumber });
  });

  userRouter.post('/signup/userInfo', async (req: Request, res: Response) => {
    const info = req.body;
    try {
      await usersService.signup(info);
      res.json({ ok: true, msg: 'signup success' });
    } catch (e) {
      res.json({ ok: false, msg: 'signup error' });
    }
  });
};
