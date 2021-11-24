import { Server, Socket } from 'socket.io';
import roomHandler from './room';
import userHandler from './user';
import chatHandler from './chat';

const server = new Server({
  cors: { origin: '*' },
});

const roomNamespace = server.of('/room');
const userNamespace = server.of('/user');
const chatNamespace = server.of('/chat');

roomNamespace.on('connection', (socket: Socket) => roomHandler(socket, roomNamespace));
userNamespace.on('connection', (socket: Socket) => userHandler(socket, userNamespace));
chatNamespace.on('connection', (socket: Socket) => chatHandler(socket, chatNamespace));

export default server;
