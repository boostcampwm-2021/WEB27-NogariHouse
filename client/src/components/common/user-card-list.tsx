import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import UserCard from '@common/user-card';

interface UserCardProps {
  cardType: 'follow' | 'others';
  userList: {
    key: string,
    userName: string,
    userDesc: string,
    profileUrl: string,
    isFollow?: boolean,
  }[]
}

const makeUserToCard = ({ cardType, userList }: UserCardProps) => (
  userList.map((user) => (
    <UserCard
      cardType={cardType}
      userData={user}
    />
  ))
);

const UserDiv = styled.div`
`;

export default function UserCardList({ cardType, userList, clickEvent }:
  {
    cardType: 'follow' | 'others';
    userList: {
      key: string,
      userName: string,
      userDesc: string,
      profileUrl: string,
      isFollow?: boolean,
    }[],
    clickEvent?: ((e: MouseEvent) => void)
  }) {
  return <UserDiv onClick={clickEvent}>{makeUserToCard({ cardType, userList })}</UserDiv>;
}
