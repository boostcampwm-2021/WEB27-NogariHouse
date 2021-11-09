/*
 * user 정보 전역 상태관리
 * roomId :: 현재 접속해 있는 방 , 접속해 있는 방이 없다면 ''
*/

import { atom } from 'recoil';

interface IUser {
  roomId: string,
  userDocumentId: string,
}

export default atom<IUser>({
  key: 'user', // 해당 atom의 고유 key
  default: {
    roomId: '',
    userDocumentId: '유저 다큐멘트 아이디 입니다.',
  },
});
