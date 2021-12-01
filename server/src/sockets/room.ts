import { Namespace, Socket } from 'socket.io';

import RoomService from '@services/rooms-service';

interface IUsers {
  [id: string]: any,
}

interface IHandleMic {
  roomDocumentId: string,
  userDocumentId: string,
  isMicOn: boolean,
}

const users: IUsers = {};

export default function RoomHandler(socket : Socket, namespace : Namespace) {
  const handleRoomJoin = async (payload:
    {roomDocumentId: string, userDocumentId: string, socketId: string, isAnonymous: boolean}) => {
    const {
      roomDocumentId, userDocumentId, socketId, isAnonymous,
    } = payload;
    socket.join(roomDocumentId);

    users[socket.id] = { roomDocumentId, userDocumentId, isAnonymous };
    await RoomService.addParticipant(roomDocumentId, userDocumentId, socketId, isAnonymous);
    const room = await RoomService.findRoom(roomDocumentId);
    const participantsInfo = room?.participants
      .filter((participant) => participant.userDocumentId !== userDocumentId);

    namespace.to(socket.id).emit('room:join', participantsInfo);
  };

  const handleRoomLeave = async () => {
    if (!users[socket.id]) return;
    const { roomDocumentId, userDocumentId } = users[socket.id];
    delete users[socket.id];

    await RoomService.deleteParticipant(roomDocumentId, userDocumentId);
    socket.to(roomDocumentId).emit('room:leave', socket.id);
  };

  // eslint-disable-next-line no-undef
  const handleRoomOffer = (offer: RTCSessionDescriptionInit, receiveId: string) => {
    const { userDocumentId, isAnonymous } = users[socket.id];
    socket.to(receiveId).emit('room:offer', offer, userDocumentId, socket.id, isAnonymous);
  };

  // eslint-disable-next-line no-undef
  const handleRoomAnswer = (answer: RTCSessionDescriptionInit, receiveId: string) => {
    socket.to(receiveId).emit('room:answer', answer, socket.id);
  };

  // eslint-disable-next-line no-undef
  const handleRoomIce = (candidate: RTCIceCandidateInit, receiveId: string) => {
    socket.to(receiveId).emit('room:ice', { candidate, candidateSendId: socket.id });
  };

  const handleMic = async (payload: IHandleMic) => {
    const { roomDocumentId, userDocumentId, isMicOn } = payload;
    await RoomService.setMic(roomDocumentId, userDocumentId, isMicOn);

    const userData = { userDocumentId, isMicOn, socketId: socket.id };
    socket.to(roomDocumentId).emit('room:mic', { userData });
  };

  socket.on('room:join', handleRoomJoin);
  socket.on('room:offer', handleRoomOffer);
  socket.on('room:answer', handleRoomAnswer);
  socket.on('room:ice', handleRoomIce);
  socket.on('disconnect', handleRoomLeave);
  socket.on('room:mic', handleMic);
}
