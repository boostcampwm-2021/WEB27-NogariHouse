import { atom } from 'recoil';

export default atom<string>({
  key: 'roomTypeState', // 해당 atom의 고유 key
  default: 'public', // 기본값
});
