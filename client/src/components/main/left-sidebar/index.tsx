import React, {
  MouseEvent, useEffect, useState,
} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import followingListState from '@atoms/following-list';
import userState from '@atoms/user';
import { IToast } from '@atoms/toast-list';
import userSocketMessage from '@constants/socket-message/user';
import toastListSelector from '@selectors/toast-list';
import useUserSocket from '@utils/user-socket';
import ActiveFollowingCard from './active-following-card';
import { ActiveFollowingListWrapper, ExceptionMessage } from './style';

interface IActiveFollowingUser {
  userDocumentId: string,
  userName: string,
  userId: string,
  profileUrl: string,
  isActive: boolean,
}

function LeftSideBar() {
  const user = useRecoilValue(userState);
  const followingList = useRecoilValue(followingListState);
  const setToastList = useSetRecoilState(toastListSelector);
  const [activeFollowingList, setActiveFollowingList] = useState<IActiveFollowingUser[]>([]);

  const setFirstFollowingList = (firstActiveFollowingList: IActiveFollowingUser[]) => {
    setActiveFollowingList(() => firstActiveFollowingList);
  };

  const addNewActiveFollowing = (info: IActiveFollowingUser) => {
    setActiveFollowingList((list) => {
      const filteredList = list.filter((userInfo: IActiveFollowingUser) => userInfo.userDocumentId !== info.userDocumentId);
      return [...filteredList, info];
    });
  };

  const deleteLeaveActiveFollowing = (leaveUserDocumentId: string) => {
    setActiveFollowingList((list) => list.filter((info) => info.userDocumentId !== leaveUserDocumentId));
  };

  useEffect(() => {
    if (!user.isLoggedIn) return;
    const userSocket = useUserSocket();

    userSocket.on(userSocketMessage.firstFollowingList, (firstActiveFollowingList) => {
      setFirstFollowingList(firstActiveFollowingList);
    });
    userSocket.on(userSocketMessage.newActiveUser, (newActiveUserData) => {
      const newDocumentId = newActiveUserData.userDocumentId;
      if (followingList.includes(newDocumentId)) addNewActiveFollowing(newActiveUserData);
    });
    userSocket.on(userSocketMessage.newLeaveUser, (leaveUserDocumentId) => {
      deleteLeaveActiveFollowing(leaveUserDocumentId);
    });
    userSocket.on(userSocketMessage.hands, (handsData: { from: Partial<IActiveFollowingUser>, to: string }) => {
      if (handsData.to === user.userDocumentId) {
        const newToast: IToast = {
          type: 'info',
          title: '반가운 인사',
          description: `${handsData.from.userName}님이 손을 흔들었습니다!`,
        };
        setToastList(newToast);
      }
    });
  }, [user]);

  useEffect(() => () => {
    const userSocket = useUserSocket();
    if (userSocket) {
      userSocket.disconnect();
    }
  }, []);

  useEffect(() => {
    const userSocket = useUserSocket();
    if (userSocket) {
      userSocket.emit(userSocketMessage.join, {
        ...user, followingList,
      });
    }
  }, [followingList]);

  const onClickHands = (userDocumentId: string) => (e: MouseEvent) => {
    e.stopPropagation();
    useUserSocket().emit(userSocketMessage.hands, userDocumentId);
  };

  return (
    <ActiveFollowingListWrapper>
      {!activeFollowingList.length && <ExceptionMessage>There is no active friends</ExceptionMessage>}
      {activeFollowingList
        .filter((list) => list.isActive)
        .map((list) => (
          <ActiveFollowingCard
            key={list.userName}
            userDocumentId={list.userDocumentId}
            userName={list.userName}
            userId={list.userId}
            profileUrl={list.profileUrl}
            onClickHands={onClickHands}
          />
        ))}
    </ActiveFollowingListWrapper>
  );
}

export default LeftSideBar;
