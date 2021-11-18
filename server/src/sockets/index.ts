import { Server, Socket } from 'socket.io';
import registerRoomHandler from './room';

const server = new Server({
  cors: { origin: '*' },
});

const handleConnection = (socket : Socket) => {
  registerRoomHandler(socket, server);
};

server.on('connection', handleConnection);

export default server;
