import { atom } from 'recoil';

export default atom<string>({
  key: 'roomDocumentIdState', // 해당 atom의 고유 key
  default: '',
});
