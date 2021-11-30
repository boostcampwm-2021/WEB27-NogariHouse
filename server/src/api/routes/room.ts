import {
  Router, Request, Response,
} from 'express';

import RoomService from '@services/rooms-service';
import authJWT from '@middlewares/auth';
import activityService from '@services/user/activity-service';

const roomRouter = Router();

export default (app: Router) => {
  app.use('/room', roomRouter);
  roomRouter.use(authJWT);

  roomRouter.post('/', async (req: Request, res: Response) => {
    try {
      const {
        title, type, isAnonymous, userDocumentId,
      } = req.body;

      const roomId = await RoomService.setRoom(title, type, isAnonymous);
      const activityAddResult = await activityService.addActivityTypeRoom(userDocumentId, roomId);

      if (!activityAddResult) res.status(400).json({ ok: false });
      else res.status(200).json(roomId);
    } catch (error) {
      console.error(error);
    }
  });

  roomRouter.get('/', async (req:Request, res:Response) => {
    const { count } = req.query;
    const items = await RoomService.get10Rooms(Number(count));
    res.json({ items });
  });

  roomRouter.get('/:roomDocumentId', async (req: Request, res: Response) => {
    try {
      const { roomDocumentId } = req.params;

      const roomInfo = await RoomService.findRoom(roomDocumentId);
      res.status(200).json(roomInfo);
    } catch (error) {
      console.error(error);
    }
  });

  roomRouter.get('/public/random', async (req: Request, res: Response) => {
    try {
      const roomInfo = await RoomService.getRandomRoomDocumentId();
      res.status(200).json(roomInfo);
    } catch (error) {
      console.error(error);
    }
  });

  roomRouter.delete('/:roomDocumentId', async (req: Request, res: Response) => {
    try {
      const { roomDocumentId } = req.params;

      await RoomService.deleteRoom(roomDocumentId);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      res.json({ ok: false });
    }
  });
};
