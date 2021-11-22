import { Namespace, Socket } from 'socket.io';

interface IJoinPayload {
    userDocumentId: string,
    userName: string,
    profileUrl: string,
    followingList: string[],
}

interface IActiveFollowingUser {
    userName: string,
    profileUrl: string,
    isActive: boolean,
}

const activeUser = new Map();
activeUser.set('618238ccd24b76444a6c592f', { userName: 'dlatqdlatq', profileUrl: 'https://avatars.githubusercontent.com/u/55152516?v=4' });

export default function userHandler(socket : Socket, server : Namespace) {
  const handleUserJoin = ({
    userDocumentId, userName, profileUrl, followingList,
  }: IJoinPayload) => {
    activeUser.set(userDocumentId, { userName, profileUrl });
    const activeFollowingList = followingList.reduce((acc: IActiveFollowingUser[], id: string) => {
      if (activeUser.has(id)) acc.push({ ...activeUser.get(id), isActive: true });
      return acc;
    }, []);

    socket.emit('user:newActiveUser', { userDocumentId: { userName, profileUrl, isActive: true } });
    // 기존 접속자들에게 새로운 유저 데이터 보내주기

    server.to(socket.id).emit('user:firstFollowingList', activeFollowingList);
    // 신규 접속자에게 현재 접속중인 팔로우 리스트 전달
  };

  socket.on('user:join', handleUserJoin);
}
