import {
  Router, Request, Response,
} from 'express';
import RoomService from '@services/rooms-service';

const route = Router();

interface Query {
  title: string,
  type: string,
  userId: string,
  isAnonymous: boolean
}

export default (app: Router) => {
  app.use('/room', route);

  route.get('/', async (req: Request, res: Response) => {
    try {
      const {
        title, type, isAnonymous,
      } = req.query as unknown as Query;

      const roomId = await RoomService.setRoom(title, type, isAnonymous);
      res.status(200).json(roomId);
    } catch (error) {
      console.error(error);
    }
  });

  route.get('/:roomDocumentId', async (req: Request, res: Response) => {
    try {
      const { roomDocumentId } = req.params;

      const roomInfo = await RoomService.findRoom(roomDocumentId);
      res.status(200).json(roomInfo);
    } catch (error) {
      console.error(error);
    }
  });
};
