import { Server, Socket } from 'socket.io';
import registerRoomHandler from './room';
import userHandler from './user';

const server = new Server({
  cors: { origin: '*' },
});

const roomNameSpace = server.of('/room');
const userNameSpace = server.of('/user');

roomNameSpace.on('connection', (socket: Socket) => registerRoomHandler(socket, roomNameSpace));
userNameSpace.on('connection', (socket: Socket) => userHandler(socket, userNameSpace));

export default server;
