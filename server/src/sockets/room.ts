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
    const room = await RoomService.findRoom(roomDocumentId);
    const participantsInfo = room?.participants;
    await RoomService.addParticipant(roomDocumentId, userDocumentId);
    socket.to(roomDocumentId).emit('room:join', participantsInfo);
  };

  const handleRoomLeave = async () => {
    const { roomDocumentId, userDocumentId } = users[socket.id];
    delete users[socket.id];

    await RoomService.deleteParticipant(roomDocumentId, userDocumentId);
    socket.to(roomDocumentId).emit('room:leave', { userDocumentId });
  };

  // eslint-disable-next-line no-undef
  const handleRoomOffer = (offer: RTCSessionDescriptionInit) => {
    const { roomDocumentId, userDocumentId } = users[socket.id];
    const offerSendId = userDocumentId;
    socket.to(roomDocumentId).emit('room:offer', offer, offerSendId);
  };

  // eslint-disable-next-line no-undef
  const handleRoomAnswer = (answer: RTCSessionDescriptionInit) => {
    const { roomDocumentId, userDocumentId } = users[socket.id];
    const answerSendId = userDocumentId;
    socket.to(roomDocumentId).emit('room:answer', answer, answerSendId);
  };

  // eslint-disable-next-line no-undef
  const handleRoomIce = (candidate: RTCIceCandidateInit) => {
    const { roomDocumentId, userDocumentId } = users[socket.id];
    const candidateSendId = userDocumentId;
    socket.to(roomDocumentId).emit('room:ice', candidate, candidateSendId);
  };

  const handleMic = async (payload: any) => {
    const {
      roomDocumentId, userDocumentId, isMicOn,
    } = payload;

    await RoomService.setMic(roomDocumentId, userDocumentId, isMicOn);

    const userData = { userDocumentId, isMicOn };
    socket.to(roomDocumentId).emit('room:mic', { userData });
  };

  socket.on('room:join', handleRoomJoin);
  socket.on('room:offer', handleRoomOffer);
  socket.on('room:answer', handleRoomAnswer);
  socket.on('room:ice', handleRoomIce);
  socket.on('disconnect', handleRoomLeave);
  socket.on('room:mic', handleMic);
}
