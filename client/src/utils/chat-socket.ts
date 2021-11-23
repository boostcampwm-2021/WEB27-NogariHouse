import { io, Socket } from 'socket.io-client';

let chatSocket : Socket | null = null;

export default () => {
  if (chatSocket) return chatSocket;
  const url = process.env.REACT_APP_SOCKET_URL as string;
  chatSocket = io(`${url}/chat`);
  return chatSocket;
};
