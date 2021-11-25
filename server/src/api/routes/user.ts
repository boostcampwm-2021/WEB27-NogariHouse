import {
  Router, Request, Response,
} from 'express';

import usersService from '@services/users-service';
import authJWT from '@middlewares/auth';
import imageUpload from '@middlewares/image-upload';

const userRouter = Router();

export default (app: Router) => {
  app.use('/user', userRouter);

  userRouter.get('/', authJWT, async (req: Request, res: Response) => {
    const { accessToken, userDocumentId } = req.body;
    const user = await usersService.findUserByDocumentId(userDocumentId);
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

  userRouter.get('/:id', async (req: Request, res: Response) => {
    const { type } = req.query;
    const { id } = req.params;

    if (type === 'documentId') {
      const userInfo = await usersService.findUserByDocumentId(id);
      res.status(200).json({ ok: true, userInfo });
    } else if (type === 'userId') {
      const userInfo = await usersService.findUserByUserId(id);
      const userDetailInfo = userInfo
        ? usersService.makeUserDetailInterface(userInfo) : res.json({ ok: false });
      res.json({ ok: true, userDetailInfo });
    } else {
      res.json({ ok: false });
    }
  });

  userRouter.post('/follow', authJWT, async (req: Request, res: Response) => {
    const { type, userDocumentId, targetUserDocumentId } = req.body;
    let result: boolean;

    if (type === 'follow') {
      [result] = await Promise.all(
        [usersService.followUser(userDocumentId, targetUserDocumentId), usersService.addActivityTypeFollow(userDocumentId, targetUserDocumentId)],
      );
      res.json({ ok: result });
    } else if (type === 'unfollow') {
      result = await usersService.unfollowUser(userDocumentId, targetUserDocumentId);
      res.json({ ok: result });
    } else {
      res.status(400).json({ ok: false, msg: '유효하지 않은 요청입니다.' });
    }
  });

  userRouter.get('/my-followings/:userDocumentId', async (req: Request, res: Response) => {
    try {
      const { userDocumentId } = req.params;
      const followingList = (await usersService.getMyFollowingsList(userDocumentId))?.followings;
      res.status(200).json(followingList);
    } catch (error) {
      console.error(error);
    }
  });

  userRouter.get('/followings/:userId', async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { count } = req.query;
      const documentIdOffollowingList = await usersService.getFollowingsList(userId, Number(count));
      const followingList = await usersService.findUsersByIdList(documentIdOffollowingList!.followings);
      res.status(200).json({
        result: true,
        items: followingList,
      });
    } catch (error) {
      console.error(error);
    }
  });

  userRouter.get('/followers/:userId', async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { count } = req.query;
      const documentIdOfFollowerList = await usersService.getFollowersList(userId, Number(count));
      const followerList = await usersService.findUsersByIdList(documentIdOfFollowerList!.followers);
      res.status(200).json({
        result: true,
        items: followerList,
      });
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

    const isUnique: boolean = await usersService.isUniqueEmail(email);

    if (isUnique) {
      const verificationNumber = await usersService.sendVerificationMail(email);
      res.json({ isUnique, verificationNumber });
    } else {
      res.json({ isUnique, verificationNumber: '-1' });
    }
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

  userRouter.post('/info', async (req: Request, res: Response) => {
    const userDocumentIdList = req.body;
    try {
      const userList = (await usersService.findUsersByIdList(userDocumentIdList.userList))
        ?.map(usersService.makeItemToUserInterface);
      res.json({ ok: true, userList });
    } catch (e) {
      res.json({ ok: false });
    }
  });

  userRouter.post('/profile-image', imageUpload.single('profileImage'), async (req: Request, res: Response) => {
    const { userDocumentId } = req.body;
    const { location } = req.file as any;
    try {
      const result = await usersService.updateUserProfileUrl(userDocumentId, location);
      res.json({ ok: result, newProfileUrl: location });
    } catch (e) {
      res.json({ ok: false });
    }
  });
};
