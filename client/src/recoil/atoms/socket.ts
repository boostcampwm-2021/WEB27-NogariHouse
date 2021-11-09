import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

type TSocket = Socket | null ;

export default atom<TSocket>({
  key: 'socket', // 해당 atom의 고유 key
  default: null,
});
