import { atom } from 'recoil';
import { IUser } from '@interfaces/index';

export default atom<IUser[]>({
  key: 'chatSelectedUsers', // 해당 atom의 고유 key
  default: [],
});
