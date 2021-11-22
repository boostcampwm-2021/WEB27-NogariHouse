import { Server, Socket } from 'socket.io';

export default function chatEventHandler(socket : Socket, server : Server) {
  const chatJoinHandler = (chatDocumentId: string) => {
    socket.join(chatDocumentId);
  };

  const sendMsgHandler = (payload: any) => {
    const {
      userDocumentId, userName, profileUrl, message, date, chatDocumentId,
    } = payload;

    socket.to(chatDocumentId).emit('chat:sendMsg', {
      userDocumentId, userName, profileUrl, message, date,
    });
  };

  socket.on('chat:join', chatJoinHandler);
  socket.on('chat:sendMsg', sendMsgHandler);
}
