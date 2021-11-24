/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
import { Socket, Namespace } from 'socket.io';
import Chats from '@models/chats';
import chatService from '@services/chat-service';

export default function chatEventHandler(socket : Socket, namespace: Namespace) {
  const chatRoomJoinHandler = (chatDocumentId: string) => socket.join(chatDocumentId);
  const chatViewJoinHandler = (userDocumentId: string) => socket.join(userDocumentId);

  const sendMsgHandler = async (payload: any) => {
    const {
      userDocumentId, userName, profileUrl, message, chatDocumentId, date,
    } = payload;
    const chattingLog = { date: new Date(), userDocumentId, message };
    await chatService.addChattingLog(chattingLog, chatDocumentId, userDocumentId);

    socket.to(chatDocumentId).emit('chat:sendMsg', {
      userDocumentId, userName, profileUrl, message, date,
    });
  };

  const chatLeaveHandler = (chatDocumentId: string) => {
    socket.leave(chatDocumentId);
  };

  const alertMsgHandler = (payload: any) => {
    const { participants, chatDocumentId } = payload;
    participants.forEach(async (userDocumentId: string) => {
      const chatInfo : any = await Chats.findOne({ _id: chatDocumentId }, ['lastMsg', 'unReadMsg', 'recentActive']);
      const count = chatInfo.unReadMsg[chatInfo.unReadMsg.findIndex((user: any) => user.userDocumentId === userDocumentId)].count;
      socket.to(userDocumentId).emit('chat:alertMsg', {
        chatDocumentId, lastMsg: chatInfo.lastMsg, recentActive: chatInfo.recentActive, unCheckedMsg: count + 1,
      });
    });
  };

  const makeChatHandler = ({ participantsInfo, chatDocumentId }: any) => {
    participantsInfo.map((user: any) => {
      const newParticipants = participantsInfo.filter((participant: any) => participant.userDocumentId !== user.userDocumentId);
      socket.to(user.userDocumentId).emit('chat:makeChat', { chatDocumentId, participantsInfo: newParticipants });
    });
  };

  const inviteRoomHandler = (payload: any) => {
    const {
      // eslint-disable-next-line no-unused-vars
      participants, message, roomDocumentId, userInfo, date,
    } = payload;
    participants.forEach(async (participant: any) => {
      const { chatRoom, chatDocumentId, isNew } = await chatService.makeChatRoom([participant.userDocumentId, userInfo.userDocumentId].sort());
      await chatService.addChattingLog({
        message,
        date: new Date(),
        userDocumentId: userInfo.userDocumentId,
        linkTo: roomDocumentId,
      }, chatDocumentId, userInfo.userDocumentId);

      namespace.to(chatDocumentId.toString()).emit('chat:sendMsg', {
        userDocumentId: userInfo.userDocumentId, userName: userInfo.userName, profileUrl: userInfo.profileUrl, message, date, linkTo: roomDocumentId,
      });

      if (isNew) {
        socket.to(participant.userDocumentId).emit('chat:makeChat', { chatDocumentId, participantsInfo: [userInfo] });
        namespace.to(userInfo.userDocumentId).emit('chat:makeChat', { chatDocumentId, participantsInfo: [participant] });
      }
      socket.to(participant.userDocumentId).emit('chat:alertMsg', {
        chatDocumentId,
        lastMsg: message,
        recentActive: new Date(),
        unCheckedMsg: chatRoom!.unReadMsg[chatRoom!.unReadMsg.findIndex((user: any) => user.userDocumentId === participant.userDocumentId)].count + 1,
      });
      namespace.to(userInfo.userDocumentId).emit('chat:alertMsg', {
        chatDocumentId,
        lastMsg: message,
        recentActive: new Date(),
        unCheckedMsg: 0,
      });
      await chatService.setUnCheckedMsg(chatDocumentId, userInfo.userDocumentId);
    });
  };

  socket.on('chat:roomJoin', chatRoomJoinHandler);
  socket.on('chat:viewJoin', chatViewJoinHandler);
  socket.on('chat:sendMsg', sendMsgHandler);
  socket.on('chat:leave', chatLeaveHandler);
  socket.on('chat:alertMsg', alertMsgHandler);
  socket.on('chat:makeChat', makeChatHandler);
  socket.on('chat:inviteRoom', inviteRoomHandler);
}
