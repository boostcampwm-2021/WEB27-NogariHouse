import { atom } from 'recoil';

interface user {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
}

export default atom<user[]>({
  key: 'chatSelectedUsers', // 해당 atom의 고유 key
  default: [],
});
