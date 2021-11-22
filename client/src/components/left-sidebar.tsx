/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

import ActiveFollowingCard from '@common/active-following-card';
import { Socket } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { activeFollowingListState } from '@src/recoil/atoms/following-list';

const ActiveFollowingList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface ILeftSideBarProps {
  socketRef: React.RefObject<Socket | null>,
}

function LeftSideBar({ socketRef } : ILeftSideBarProps) {
  const activeFollowingList = useRecoilValue(activeFollowingListState);

  console.log(socketRef);

  return (
    <ActiveFollowingList>
      {activeFollowingList
        .filter((list) => list.isActive)
        .map((list) => (
          <ActiveFollowingCard
            key={list.userName}
            userName={list.userName}
            profileUrl={list.profileUrl}
          />
        ))}
    </ActiveFollowingList>
  );
}

export default LeftSideBar;
