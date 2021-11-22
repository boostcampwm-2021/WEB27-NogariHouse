import { io, Socket } from 'socket.io-client';

let socket : Socket | null = null;

export default (namespace: string) => {
  if (socket) return socket;
  const url = process.env.REACT_APP_SOCKET_URL as string;
  socket = io(url + namespace);
  return socket;
};
