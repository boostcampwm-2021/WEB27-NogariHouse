import {
  Router, Request, Response,
} from 'express';

import usersService from '@services/users-service';
import authJWT from '@middlewares/auth';

const userRouter = Router();

export default (app: Router) => {
  app.use('/user', userRouter);

  userRouter.get('/', authJWT, async (req: Request, res: Response) => {
    const { accessToken, userDocumentId } = req.body;
    const user = await usersService.findUser(userDocumentId);
    if (user) {
      const {
        _id, profileUrl, userName, userId,
      } = user;
      res.json({
        ok: true, accessToken, userDocumentId: _id, profileUrl, userName, userId,
      });
    } else {
      res.json({ ok: false });
    }
  });

  userRouter.get('/:userDocumentId', async (req: Request, res: Response) => {
    try {
      const { userDocumentId } = req.params;

      const userInfo = await usersService.findUser(userDocumentId);
      res.status(200).json(userInfo);
    } catch (error) {
      console.error(error);
    }
  });

  userRouter.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await usersService.signIn(email, password);
    if (result?.ok) {
      res.status(200).json({
        accessToken: result.accessToken,
        result: result.ok,
        msg: result.msg,
      });
    } else {
      res.status(400).json({
        result: result.ok,
        msg: result.msg,
      });
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
