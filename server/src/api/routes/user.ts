import {
  Router, Request, Response,
} from 'express';

import usersService from '@services/users-service';

const userRouter = Router();

export default (app: Router) => {
  app.use('/user', userRouter);
  
  userRouter.get('/', (req: Request, res: Response) => {
    const { jwt } = req.cookies;
    res.json(usersService.verifyAccessToken(jwt));
  })

  userRouter.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await usersService.signIn(email, password);
    console.log(result);
    if (result?.token) {
      res.status(200).json({ jwt: result.token, result: result.result, msg: result.msg });
    } else
      res.status(400).json({ result: result?.result, msg: result?.msg });
  });

  userRouter.post('/signup/mail', async (req: Request, res: Response) => {
    const { email } = req.body;

    const verificationNumber = await usersService.sendVerificationMail(email);
    
    res.json({ verificationNumber });
  });

  userRouter.post('/signup/userInfo', async (req: Request, res: Response) => {
    const info = req.body;
    const result = await usersService.signup(info);
    console.log(result)
    res.json({ ok: true });
  })
};
