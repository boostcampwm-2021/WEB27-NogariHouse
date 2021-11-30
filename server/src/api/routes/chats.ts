import {
  Router, Request, Response,
} from 'express';
import chatService from '@services/chat-service';
import authJWT from '@middlewares/auth';

const chatRouter = Router();

export default (app: Router) => {
  app.use('/chat-rooms', chatRouter);

  chatRouter.post('/', async (req: Request, res: Response) => {
    try {
      const { participants } = req.body;
      participants.sort();
      const { chatDocumentId, isNew } = await chatService.makeChatRoom(participants);

      res.status(200).json({ chatDocumentId, isNew });
    } catch (error) {
      res.json({ ok: false });
    }
  });

  chatRouter.get('/unReadMsgCount', authJWT, async (req: Request, res: Response) => {
    const { userDocumentId } = req.body;
    try {
      const unReadMsgCount = await chatService.getUnReadMsgCount(userDocumentId);

      res.json({ ok: false, unReadMsgCount });
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
      const { count } = req.query;

      const chattingLog = await chatService.getChattingLog(chatDocumentId, Number(count));

      res.status(200).json(chattingLog);
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
