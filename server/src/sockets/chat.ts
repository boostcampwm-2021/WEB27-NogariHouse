/* eslint-disable prefer-destructuring */

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

  socket.on('chat:roomJoin', chatRoomJoinHandler);
  socket.on('chat:viewJoin', chatViewJoinHandler);
  socket.on('chat:sendMsg', sendMsgHandler);
  socket.on('chat:leave', chatLeaveHandler);
  socket.on('chat:alertMsg', alertMsgHandler);
}
