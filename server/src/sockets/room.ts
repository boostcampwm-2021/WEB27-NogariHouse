import { Socket } from 'socket.io';

import RoomService from '@services/rooms-service';
import usersService from '@services/users-service';

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

    await RoomService.addParticipant(roomDocumentID, userDocumentId);
    const userData = await usersService.findUser(userDocumentId);
    socket.to(roomDocumentID).emit('room:join', { userDocumentId, userData });
  };

  const handleRoomLeave = () => {
    const { roomDocumentID, userDocumentId } = users[socket.id];
    delete users[socket.id];

    // room service에서 나간 유저 제거 코드 추가하기
    socket.to(roomDocumentID).emit('room:leave', { userDocumentId });
  };

  // eslint-disable-next-line no-undef
  const handleRoomOffer = (offer: RTCSessionDescriptionInit) => {
    const { roomDocumentID } = users[socket.id];

    socket.to(roomDocumentID).emit('room:offer', offer);
  };

  // eslint-disable-next-line no-undef
  const handleRoomAnswer = (answer: RTCSessionDescriptionInit) => {
    const { roomDocumentID } = users[socket.id];

    socket.to(roomDocumentID).emit('room:answer', answer);
  };

  // eslint-disable-next-line no-undef
  const handleRoomIce = (ice: RTCIceCandidateInit) => {
    const { roomDocumentID } = users[socket.id];

    socket.to(roomDocumentID).emit('room:ice', ice);
  };

  socket.on('room:join', handleRoomJoin);
  socket.on('room:offer', handleRoomOffer);
  socket.on('room:answer', handleRoomAnswer);
  socket.on('room:ice', handleRoomIce);
  socket.on('disconnect', handleRoomLeave);
}
