/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  MouseEvent, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import followingListState from '@atoms/following-list';
import userState from '@atoms/user';
import ActiveFollowingCard from '@common/active-following-card';
import { IToast } from '@atoms/toast-list';
import toastListSelector from '@selectors/toast-list';
import useUserSocket from '@utils/user-socket';

const ActiveFollowingListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px){
    width: 80%;
    margin-top: 20px;
  };
`;

const ExceptionMessage = styled.div`
  position: relative;
  margin: auto;
  color: #a8a59b;
  font-size: 18px;
  font-weight: bold;
`;

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

    userSocket.on('user:firstFollowingList', (firstActiveFollowingList) => {
      setFirstFollowingList(firstActiveFollowingList);
    });
    userSocket.on('user:newActiveUser', (newActiveUserData) => {
      const newDocumentId = newActiveUserData.userDocumentId;
      if (followingList.includes(newDocumentId)) addNewActiveFollowing(newActiveUserData);
    });
    userSocket.on('user:newLeaveUser', (leaveUserDocumentId) => {
      deleteLeaveActiveFollowing(leaveUserDocumentId);
    });
    userSocket.on('user:hands', (handsData: { from: Partial<IActiveFollowingUser>, to: string }) => {
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
      userSocket.emit('user:join', {
        ...user, followingList,
      });
    }
  }, [followingList]);

  const onClickHands = (userDocumentId: string) => (e: MouseEvent) => {
    e.stopPropagation();
    useUserSocket().emit('user:hands', userDocumentId);
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
