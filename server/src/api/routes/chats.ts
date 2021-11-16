import {
  Router, Request, Response,
} from 'express';
import chatService from '@services/chat-service';

const chatRouter = Router();

export default (app: Router) => {
  app.use('/chat-rooms', chatRouter);

  chatRouter.get('/:userDocumentId', async (req: Request, res: Response) => {
    try {
      const { userDocumentId } = req.params;

      const chatRoomInfo = await chatService.getChatRooms(userDocumentId);

      res.status(200).json(chatRoomInfo);
    } catch (error) {
      console.error(error);
    }
  });
};
