import { Socket } from 'socket.io';

import RoomService from '@services/rooms-service';

interface IUsers {
  [id: string]: any,
}

const users: IUsers = {};

export default function registerRoomHandler(socket : Socket) {
  const handleRoomJoin = async (payload : any) => {
    const {
      roomDocumentID, userDocumentId,
    } = payload;
    socket.join(roomDocumentID);

    users[socket.id] = { roomDocumentID, userDocumentId };

    const userData = await RoomService.addParticipant(roomDocumentID, userDocumentId);
    console.log('socket :: ', users);
    socket.to(roomDocumentID).emit('room:join', { userDocumentId, userData });
  };

  const handleRoomLeave = () => {
    const { spaceID, userID } = users[socket.id];
    delete users[socket.id];

    // room service에서 나간 유저 제거 코드 추가하기
    socket.to(spaceID).emit('space:leave', { userID });
  };

  socket.on('room:join', handleRoomJoin);
  socket.on('disconnect', handleRoomLeave);
}
