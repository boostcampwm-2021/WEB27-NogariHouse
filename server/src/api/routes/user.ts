import {
    Router, Request, Response
  } from 'express';

import Users from '@models/users'
  
const userRouter = Router();

const checkLoginInfo = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await Users.findOne({userEmail: email});
    if(!user) {
        res.json({result: false, msg: 'there is no user'});
    }
    else {
        user.checkPassword(password, (err, isMatch) => {
            if(isMatch) res.json({result: true, msg: 'ok'});
            else res.json({result: false, msg: 'wrong password'});
        })
    }
}
  
export default (app: Router) => {
    app.use('/user', userRouter);
  
    userRouter.post('/signin', checkLoginInfo);
  };
  