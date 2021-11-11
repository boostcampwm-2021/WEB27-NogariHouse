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
      roomDocumentId, userDocumentId,
    } = payload;
    socket.join(roomDocumentId);

    users[socket.id] = { roomDocumentId, userDocumentId };
    await RoomService.addParticipant(roomDocumentId, userDocumentId);
    const userData = await usersService.findUser(userDocumentId);
    // eslint-disable-next-line no-underscore-dangle
    const obj = { userDocumentId: userData!._id, mic: false };
    socket.to(roomDocumentId).emit('room:join', { userData: obj });
  };

  const handleRoomLeave = async () => {
    const { roomDocumentId, userDocumentId } = users[socket.id];
    delete users[socket.id];

    await RoomService.deleteParticipant(roomDocumentId, userDocumentId);
    socket.to(roomDocumentId).emit('room:leave', { userDocumentId });
  };

  // eslint-disable-next-line no-undef
  const handleRoomOffer = (offer: RTCSessionDescriptionInit) => {
    const { roomDocumentId } = users[socket.id];
    socket.to(roomDocumentId).emit('room:offer', offer);
  };

  // eslint-disable-next-line no-undef
  const handleRoomAnswer = (answer: RTCSessionDescriptionInit) => {
    const { roomDocumentId } = users[socket.id];

    socket.to(roomDocumentId).emit('room:answer', answer);
  };

  // eslint-disable-next-line no-undef
  const handleRoomIce = (ice: RTCIceCandidateInit) => {
    const { roomDocumentId } = users[socket.id];

    socket.to(roomDocumentId).emit('room:ice', ice);
  };

  socket.on('room:join', handleRoomJoin);
  socket.on('room:offer', handleRoomOffer);
  socket.on('room:answer', handleRoomAnswer);
  socket.on('room:ice', handleRoomIce);
  socket.on('disconnect', handleRoomLeave);
}
