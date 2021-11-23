/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import { Socket } from 'socket.io';
import Chats from '@models/chats';

export default function chatEventHandler(socket : Socket) {
  const chatRoomJoinHandler = (chatDocumentId: string) => socket.join(chatDocumentId);
  const chatViewJoinHandler = (userDocumentId: string) => socket.join(userDocumentId);

  const sendMsgHandler = (payload: any) => {
    const {
      userDocumentId, userName, profileUrl, message, date, chatDocumentId,
    } = payload;

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
        chatDocumentId, lastMsg: chatInfo.lastMsg, recentActive: chatInfo.recentActive, unCheckedMsg: count,
      });
    });
  };

  const makeChatHandler = ({ participantsInfo, chatDocumentId }: any) => {
    participantsInfo.map((user: any) => {
      const newParticipants = participantsInfo.filter((participant: any) => participant.userDocumentId !== user.userDocumentId);
      socket.to(user.userDocumentId).emit('chat:makeChat', { chatDocumentId, participantsInfo: newParticipants });
    });
  };

  socket.on('chat:roomJoin', chatRoomJoinHandler);
  socket.on('chat:viewJoin', chatViewJoinHandler);
  socket.on('chat:sendMsg', sendMsgHandler);
  socket.on('chat:leave', chatLeaveHandler);
  socket.on('chat:alertMsg', alertMsgHandler);
  socket.on('chat:makeChat', makeChatHandler);
}
