import {
  Router, Request, Response,
} from 'express';
import roomService from '@services/rooms-service';

const route = Router();

export default (app: Router) => {
  app.use('/room', route);

  route.post('/', (req: Request, res: Response) => {
    try {
      const {
        title, type, userId, isAnonymous,
      } = req.body;

      roomService.setRoom(title, type, userId, isAnonymous);

      res.status(200).send('success!');
    } catch (error) {
      console.error(error);
    }
  });
};
