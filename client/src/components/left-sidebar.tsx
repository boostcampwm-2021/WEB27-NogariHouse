/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

import ActiveFollowingCard from '@common/active-following-card';
import { Socket } from 'socket.io-client';

const ActiveFollowingList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const dummyFollowingList = [
  {
    userName: 'Mulgyeol',
    profileUrl: 'https://avatars.githubusercontent.com/u/59464537?v=4',
    description: 'test1',
    isActive: true,
  },
  {
    userName: 'HanCiHu',
    profileUrl: 'https://avatars.githubusercontent.com/u/51700274?v=4',
    description: 'test2',
    isActive: true,
  },
  {
    userName: 'NEM-NE',
    profileUrl: 'https://avatars.githubusercontent.com/u/55152516?v=4',
    description: 'test2',
    isActive: true,
  },
  {
    userName: 'iHoHyeon',
    profileUrl: 'https://github.com/iHoHyeon.png',
    description: 'test3',
    isActive: true,
  },
];

interface ILeftSideBarProps {
  socketRef: React.RefObject<Socket | null>,
}

function LeftSideBar({ socketRef } : ILeftSideBarProps) {
  console.log(socketRef);
  return (
    <ActiveFollowingList>
      {dummyFollowingList
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
