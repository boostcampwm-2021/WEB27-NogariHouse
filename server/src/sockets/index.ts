import { Server, Socket } from 'socket.io';
import registerRoomHandler from './room';

const server = new Server({
  cors: { origin: '*' },
});

const handleConnection = (socket : Socket) => {
  registerRoomHandler(socket);
};

server.on('connection', handleConnection);

module.exports = server;
