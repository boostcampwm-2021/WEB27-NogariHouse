/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
import { Socket, Namespace } from 'socket.io';
import Chats, { IUnReadMsg } from '@models/chats';
import chatService from '@services/chat-service';

interface IAlertMsgHandlerProps {
  participants: Array<string>,
  chatDocumentId: string,
}

interface IsendMsgHandler {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
  message: string,
  chatDocumentId: string,
  date: string,
  key: string,
}

interface IUserInfo {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
}

interface IinviteHandlerProps {
  participants: Array<IUserInfo>,
  message: string,
  userInfo: IUserInfo,
  roomDocumentId: string,
  date: string,
  key: string,
}

export default function chatEventHandler(socket : Socket, namespace: Namespace) {
  const chatRoomJoinHandler = (chatDocumentId: string) => socket.join(chatDocumentId);
  const chatViewJoinHandler = (userDocumentId: string) => socket.join(userDocumentId);

  const sendMsgHandler = async ({
    userDocumentId, userName, profileUrl, message, chatDocumentId, date, key,
  }: IsendMsgHandler) => {
    const chattingLog = { date: new Date(), userDocumentId, message };
    await chatService.addChattingLog(chattingLog, chatDocumentId, userDocumentId);

    socket.to(chatDocumentId).emit('chat:sendMsg', {
      userDocumentId, userName, profileUrl, message, date, key,
    });
  };

  const chatLeaveHandler = (chatDocumentId: string) => {
    socket.leave(chatDocumentId);
  };

  const alertMsgHandler = ({ participants, chatDocumentId }: IAlertMsgHandlerProps) => {
    participants.forEach(async (userDocumentId: string) => {
      const chatInfo = await Chats.findOne({ _id: chatDocumentId }, ['lastMsg', 'unReadMsg', 'recentActive']);
      const count = chatInfo!.unReadMsg[chatInfo!.unReadMsg.findIndex((user: IUnReadMsg) => user.userDocumentId === userDocumentId)].count;
      socket.to(userDocumentId).emit('chat:alertMsg', {
        chatDocumentId, lastMsg: chatInfo!.lastMsg, recentActive: chatInfo!.recentActive, unCheckedMsg: count + 1,
      });
    });
  };

  const makeChatHandler = ({ participantsInfo, chatDocumentId }: { participantsInfo: Array<IUserInfo>, chatDocumentId: string }) => {
    participantsInfo.map((user: IUserInfo) => {
      const newParticipants = participantsInfo.filter((participant: IUserInfo) => participant.userDocumentId !== user.userDocumentId);
      socket.to(user.userDocumentId).emit('chat:makeChat', { chatDocumentId, participantsInfo: newParticipants });
    });
  };

  const updateCountHandler = (participants: Array<string>, chatDocumentId: string) => {
    participants.forEach((userDocumentId: string) => socket.to(userDocumentId).emit('chat:updateCount', chatDocumentId));
  };

  const inviteRoomHandler = ({
    participants, message, roomDocumentId, userInfo, date, key,
  }: IinviteHandlerProps) => {
    participants.forEach(async (participant: IUserInfo) => {
      const { chatRoom, chatDocumentId, isNew } = await chatService.makeChatRoom([participant.userDocumentId, userInfo.userDocumentId].sort());
      await chatService.addChattingLog({
        message,
        date: new Date(),
        userDocumentId: userInfo.userDocumentId,
        linkTo: roomDocumentId,
      }, chatDocumentId, userInfo.userDocumentId);

      namespace.to(chatDocumentId.toString()).emit('chat:sendMsg', {
        userDocumentId: userInfo.userDocumentId, userName: userInfo.userName, profileUrl: userInfo.profileUrl, message, date, linkTo: roomDocumentId, key,
      });

      if (isNew) {
        socket.to(participant.userDocumentId).emit('chat:makeChat', { chatDocumentId, participantsInfo: [userInfo] });
        namespace.to(userInfo.userDocumentId).emit('chat:makeChat', { chatDocumentId, participantsInfo: [participant] });
      }

      socket.to(participant.userDocumentId).emit('chat:alertMsg', {
        chatDocumentId,
        lastMsg: message,
        recentActive: new Date(),
        unCheckedMsg: chatRoom!.unReadMsg[chatRoom!.unReadMsg.findIndex((user: IUnReadMsg) => user.userDocumentId === participant.userDocumentId)].count + 1,
      });

      namespace.to(userInfo.userDocumentId).emit('chat:alertMsg', {
        chatDocumentId,
        lastMsg: message,
        recentActive: new Date(),
        unCheckedMsg: 0,
      });
      await chatService.setUnCheckedMsg(chatDocumentId, userInfo.userDocumentId);
      socket.to(participant.userDocumentId).emit('chat:updateCount', chatDocumentId);
    });
  };

  socket.on('chat:roomJoin', chatRoomJoinHandler);
  socket.on('chat:viewJoin', chatViewJoinHandler);
  socket.on('chat:sendMsg', sendMsgHandler);
  socket.on('chat:leave', chatLeaveHandler);
  socket.on('chat:alertMsg', alertMsgHandler);
  socket.on('chat:makeChat', makeChatHandler);
  socket.on('chat:inviteRoom', inviteRoomHandler);
  socket.on('chat:updateCount', updateCountHandler);
}
