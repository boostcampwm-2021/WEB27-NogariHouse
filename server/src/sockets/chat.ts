/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
import { Socket, Namespace } from 'socket.io';

import chatSocketMessage from '@constants/socket-message/chat';
import Chats from '@models/chats';
import chatService from '@services/chat-service';

export default function chatEventHandler(socket : Socket, namespace: Namespace) {
  const chatRoomJoinHandler = (chatDocumentId: string) => socket.join(chatDocumentId);
  const chatViewJoinHandler = (userDocumentId: string) => socket.join(userDocumentId);

  const sendMsgHandler = async (payload: any) => {
    const {
      userDocumentId, userName, profileUrl, message, chatDocumentId, date, key,
    } = payload;
    const chattingLog = { date: new Date(), userDocumentId, message };
    await chatService.addChattingLog(chattingLog, chatDocumentId, userDocumentId);

    socket.to(chatDocumentId).emit(chatSocketMessage.sendMsg, {
      userDocumentId, userName, profileUrl, message, date, key,
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
      socket.to(userDocumentId).emit(chatSocketMessage.alertMsg, {
        chatDocumentId, lastMsg: chatInfo.lastMsg, recentActive: chatInfo.recentActive, unCheckedMsg: count + 1,
      });
    });
  };

  const makeChatHandler = ({ participantsInfo, chatDocumentId }: any) => {
    participantsInfo.map((user: any) => {
      const newParticipants = participantsInfo.filter((participant: any) => participant.userDocumentId !== user.userDocumentId);
      socket.to(user.userDocumentId).emit(chatSocketMessage.makeChat, { chatDocumentId, participantsInfo: newParticipants });
    });
  };

  const updateCountHandler = (participants: Array<string>, chatDocumentId: string) => {
    participants.forEach((userDocumentId: string) => socket.to(userDocumentId).emit(chatSocketMessage.updateCount, chatDocumentId));
  };

  const inviteRoomHandler = (payload: any) => {
    const {
      // eslint-disable-next-line no-unused-vars
      participants, message, roomDocumentId, userInfo, date, key,
    } = payload;
    participants.forEach(async (participant: any) => {
      const { chatRoom, chatDocumentId, isNew } = await chatService.makeChatRoom([participant.userDocumentId, userInfo.userDocumentId].sort());
      await chatService.addChattingLog({
        message,
        date: new Date(),
        userDocumentId: userInfo.userDocumentId,
        linkTo: roomDocumentId,
      }, chatDocumentId, userInfo.userDocumentId);

      namespace.to(chatDocumentId.toString()).emit(chatSocketMessage.sendMsg, {
        userDocumentId: userInfo.userDocumentId, userName: userInfo.userName, profileUrl: userInfo.profileUrl, message, date, linkTo: roomDocumentId, key,
      });

      if (isNew) {
        socket.to(participant.userDocumentId).emit(chatSocketMessage.makeChat, { chatDocumentId, participantsInfo: [userInfo] });
        namespace.to(userInfo.userDocumentId).emit(chatSocketMessage.makeChat, { chatDocumentId, participantsInfo: [participant] });
      }

      socket.to(participant.userDocumentId).emit(chatSocketMessage.alertMsg, {
        chatDocumentId,
        lastMsg: message,
        recentActive: new Date(),
        unCheckedMsg: chatRoom!.unReadMsg[chatRoom!.unReadMsg.findIndex((user: any) => user.userDocumentId === participant.userDocumentId)].count + 1,
      });

      namespace.to(userInfo.userDocumentId).emit(chatSocketMessage.alertMsg, {
        chatDocumentId,
        lastMsg: message,
        recentActive: new Date(),
        unCheckedMsg: 0,
      });
      await chatService.setUnCheckedMsg(chatDocumentId, userInfo.userDocumentId);
      socket.to(participant.userDocumentId).emit(chatSocketMessage.updateCount, chatDocumentId);
    });
  };

  socket.on(chatSocketMessage.roomJoin, chatRoomJoinHandler);
  socket.on(chatSocketMessage.viewJoin, chatViewJoinHandler);
  socket.on(chatSocketMessage.sendMsg, sendMsgHandler);
  socket.on(chatSocketMessage.leave, chatLeaveHandler);
  socket.on(chatSocketMessage.alertMsg, alertMsgHandler);
  socket.on(chatSocketMessage.makeChat, makeChatHandler);
  socket.on(chatSocketMessage.inviteRoom, inviteRoomHandler);
  socket.on(chatSocketMessage.updateCount, updateCountHandler);
}
