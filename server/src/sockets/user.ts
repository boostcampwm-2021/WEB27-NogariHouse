import { Namespace, Socket } from 'socket.io';

interface IJoinPayload {
    userDocumentId: string,
    userId: string,
    profileUrl: string,
    followingList: string[],
}

interface IActiveFollowingUser {
    userId: string,
    profileUrl: string,
    active: boolean,
}

const activeUser = new Map();
activeUser.set('618238ccd24b76444a6c592f', { userId: 'dlatqdlatq', profileUrl: 'https://avatars.githubusercontent.com/u/55152516?v=4' });

export default function userHandler(socket : Socket, server : Namespace) {
  const handleUserJoin = ({
    userDocumentId, userId, profileUrl, followingList,
  }: IJoinPayload) => {
    console.log(userId, profileUrl, followingList);
    activeUser.set(userDocumentId, { userId, profileUrl });
    const activeFollowingList = followingList.reduce((acc: IActiveFollowingUser[], id: string) => {
      if (activeUser.has(id)) acc.push({ ...activeUser.get(id), active: true });
      return acc;
    }, []);

    server.to(socket.id).emit('user:firstFollowingList', activeFollowingList);
  };

  socket.on('user:join', handleUserJoin);
}
