import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (namespace: string): Socket | undefined => {
  const socket = useRef<Socket>();

  useEffect(() => {
    const url = process.env.REACT_APP_SOCKET_URL as string;
    socket.current = io(url + namespace);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = undefined;
      }
    };
  }, []);

  return socket.current;
};

export default useSocket;
