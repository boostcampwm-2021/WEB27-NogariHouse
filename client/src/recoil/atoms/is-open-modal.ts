import { atom } from 'recoil';

export default atom<boolean>({
  key: 'isOpenModalState', // 해당 atom의 고유 key
  default: false, // 기본값
});
