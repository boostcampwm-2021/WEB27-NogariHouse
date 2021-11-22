import { atom } from 'recoil';

export default atom<string[]>({
  key: 'followingList', // 해당 atom의 고유 key
  default: [],
});
