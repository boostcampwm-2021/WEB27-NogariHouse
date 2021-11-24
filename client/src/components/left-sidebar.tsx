/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  MouseEvent, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ActiveFollowingCard from '@common/active-following-card';
import { IToast } from '@atoms/toast-list';
import toastListSelector from '@selectors/toast-list';
import followingListState from '@src/recoil/atoms/following-list';
import userState from '@src/recoil/atoms/user';

const ActiveFollowingListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ExceptionMessage = styled.div`
  position: relative;
  top: 30vh;
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
  const userSocketRef = useRef<Socket | null>(null);

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
    userSocketRef.current = io(`${process.env.REACT_APP_SOCKET_URL}/user`);

    userSocketRef.current.on('user:firstFollowingList', (firstActiveFollowingList) => {
      setFirstFollowingList(firstActiveFollowingList);
    });
    userSocketRef.current.on('user:newActiveUser', (newActiveUserData) => {
      const newDocumentId = newActiveUserData.userDocumentId;
      if (followingList.includes(newDocumentId)) addNewActiveFollowing(newActiveUserData);
    });
    userSocketRef.current.on('user:newLeaveUser', (leaveUserDocumentId) => {
      deleteLeaveActiveFollowing(leaveUserDocumentId);
    });
    userSocketRef.current.on('user:hands', (handsData: { from: Partial<IActiveFollowingUser>, to: string }) => {
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
    if (userSocketRef.current) {
      userSocketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (userSocketRef.current) {
      userSocketRef.current.emit('user:join', {
        ...user, followingList,
      });
    }
  }, [followingList]);

  const onClickHands = (userDocumentId: string) => (e: MouseEvent) => {
    e.stopPropagation();
    userSocketRef.current?.emit('user:hands', userDocumentId);
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
