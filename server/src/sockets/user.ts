/* eslint-disable max-len */
import { Namespace, Socket } from 'socket.io';

interface IJoinPayload {
    userDocumentId: string,
    userName: string,
    userId: string,
    profileUrl: string,
    followingList: string[],
}

interface IActiveFollowingUser {
    userDocumentId: string,
    userName: string,
    userId: string,
    profileUrl: string,
    isActive: boolean,
}

const socketUser = new Map();

const activeUser = new Map();

export default function userHandler(socket : Socket, namespace : Namespace) {
  const handleUserJoin = ({
    userDocumentId, userName, userId, profileUrl, followingList,
  }: IJoinPayload) => {
    activeUser.set(userDocumentId, { info: { userName, userId, profileUrl }, socketId: socket.id });
    socketUser.set(socket.id, userDocumentId);

    const activeFollowingList = followingList.reduce((acc: IActiveFollowingUser[], id: string) => {
      if (activeUser.has(id)) acc.push({ ...(activeUser.get(id)).info, userDocumentId: id, isActive: true });
      return acc;
    }, []);

    namespace.emit('user:newActiveUser', {
      userDocumentId, userName, userId, profileUrl, isActive: true,
    });
    // 기존 접속자들에게 새로운 유저 데이터 보내주기

    namespace.to(socket.id).emit('user:firstFollowingList', activeFollowingList);
    // 신규 접속자에게 현재 접속중인 팔로우 리스트 전달
  };

  const handleUserLeave = () => {
    const userDocumentId = socketUser.get(socket.id);
    socketUser.delete(socket.id);
    activeUser.delete(userDocumentId);

    namespace.emit('user:newLeaveUser', userDocumentId);
  };

  const handleUserHands = (targetDocumentId: string) => {
    const userDocumentId = socketUser.get(socket.id);
    const userInfo = (activeUser.get(userDocumentId)).info;
    const targetSocketId = (activeUser.get(targetDocumentId)).socketId;
    namespace.to(targetSocketId).emit('user:hands', { from: { ...userInfo }, to: targetDocumentId });
  };

  socket.on('user:join', handleUserJoin);
  socket.on('user:hands', handleUserHands);
  socket.on('disconnect', handleUserLeave);
}
