import { atom } from 'recoil';

export default atom<boolean>({
  key: 'anonymousState', // 해당 atom의 고유 key
  default: false,
});
