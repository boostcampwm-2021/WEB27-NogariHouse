/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ActiveFollowingCard from '@common/active-following-card';
import { io, Socket } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import followingListState from '@src/recoil/atoms/following-list';
import userState from '@src/recoil/atoms/user';

const ActiveFollowingListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface IActiveFollowingUser {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
  isActive: boolean,
}

function LeftSideBar() {
  const user = useRecoilValue(userState);
  const followingList = useRecoilValue(followingListState);
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
    if (user.isLoggedIn) {
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
    }

    return () => {
      if (userSocketRef.current) {
        userSocketRef.current.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    if (userSocketRef.current) {
      userSocketRef.current.emit('user:join', {
        userDocumentId: user.userDocumentId, userName: user.userName, profileUrl: user.profileUrl, followingList,
      });
    }
  }, [followingList]);

  return (
    <ActiveFollowingListWrapper>
      {activeFollowingList
        .filter((list) => list.isActive)
        .map((list) => (
          <ActiveFollowingCard
            key={list.userName}
            userName={list.userName}
            profileUrl={list.profileUrl}
          />
        ))}
    </ActiveFollowingListWrapper>
  );
}

export default LeftSideBar;
