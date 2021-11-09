import { Socket } from 'socket.io';

import RoomService from '@services/rooms-service';

export default function registerRoomHandler(socket : Socket) {
  const handleRoomJoin = async (payload : any) => {
    const {
      roomID, userID,
    } = payload;
    socket.join(roomID);

    const userData = await RoomService.addParticipant(roomID, userID);
    socket.to(roomID).emit('space:join', { userID, userData });
  };

  socket.on('room:join', handleRoomJoin);
}
