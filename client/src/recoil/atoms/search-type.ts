import { atom } from 'recoil';

export default atom<string>({
  key: 'searchTypeState',
  default: 'Top',
});
