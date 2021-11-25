import { io, Socket } from 'socket.io-client';

let userSocket : Socket | null = null;

export default () => {
  if (userSocket) return userSocket;
  const url = process.env.REACT_APP_SOCKET_URL as string;
  userSocket = io(`${url}/user`);
  return userSocket;
};
