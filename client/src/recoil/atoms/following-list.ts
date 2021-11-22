import { atom } from 'recoil';

interface IActiveFollowingUser {
  userName: string,
  profileUrl: string,
  isActive: boolean,
}

export default atom<string[]>({
  key: 'followingList', // 해당 atom의 고유 key
  default: [],
});

export const activeFollowingListState = atom<IActiveFollowingUser[]>({
  key: 'activeFollowingListState',
  default: [],
});
