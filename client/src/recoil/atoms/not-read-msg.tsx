import { atom } from 'recoil';

export default atom<number>({
  key: 'notReadMsgCount', // 해당 atom의 고유 key
  default: 0,
});
