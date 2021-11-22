import {
  Router, Request, Response,
} from 'express';
import chatService from '@services/chat-service';

const chatRouter = Router();

export default (app: Router) => {
  app.use('/chat-rooms', chatRouter);

  chatRouter.post('/', async (req: Request, res: Response) => {
    try {
      const { participants } = req.body;
      participants.sort();
      const chatRoomId = await chatService.makeChatRoom(participants);

      res.status(200).json({ chatRoomId });
    } catch (error) {
      res.json({ ok: false });
    }
  });

  chatRouter.get('/:userDocumentId', async (req: Request, res: Response) => {
    try {
      const { userDocumentId } = req.params;

      const chatRoomInfo = await chatService.getChatRooms(userDocumentId);

      res.status(200).json(chatRoomInfo);
    } catch (error) {
      res.json({ ok: false });
    }
  });

  chatRouter.get('/chat-log/:chatDocumentId', async (req: Request, res: Response) => {
    try {
      const { chatDocumentId } = req.params;

      const chattingLog = await chatService.getChattingLog(chatDocumentId);

      res.status(200).json(chattingLog);
    } catch (e) {
      res.json({ ok: false });
    }
  });

  chatRouter.post('/chat-log', async (req: Request, res: Response) => {
    try {
      const { chattingLog, chatDocumentId, userDocumentId } = req.body;

      await chatService.addChattingLog(chattingLog, chatDocumentId, userDocumentId);

      res.status(200).json({ ok: true });
    } catch (e) {
      res.json({ ok: false });
    }
  });

  chatRouter.get('/setUnCheckedMsg/:chatDocumentId/:userDocumentId', async (req: Request, res: Response) => {
    try {
      const { chatDocumentId, userDocumentId } = req.params;

      await chatService.setUnCheckedMsg(chatDocumentId, userDocumentId);

      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(404).json({ ok: false });
    }
  });
};
