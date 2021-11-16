/*
 * user 정보 전역 상태관리
 * roomId :: 현재 접속해 있는 방 , 접속해 있는 방이 없다면 ''
*/

import { atom } from 'recoil';

interface IUser {
  isLoggedIn: boolean,
  userDocumentId: string,
  profileUrl: string,
  userName: string,
  userId: string,
  followings: string[],
  followers: string[],
}

export default atom<IUser>({
  key: 'userState', // 해당 atom의 고유 key
  default: {
    isLoggedIn: false,
    userDocumentId: '',
    userName: '',
    userId: '',
    profileUrl: '',
    followings: [],
    followers: [],
  },
});
