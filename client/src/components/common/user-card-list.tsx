/* eslint-disable no-underscore-dangle */
import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import UserCard from '@common/user-card';

interface IUserForCard{
  _id: string,
  userName: string,
  userId: string,
  description: string,
  profileUrl: string,
  isFollow?: boolean,
}

interface UserCardProps {
  cardType: 'follow' | 'others';
  userList: IUserForCard[]
}

const makeUserToCard = ({ cardType, userList }: UserCardProps) => (
  userList.map((user) => (
    <div key={user._id} className="userCard" data-id={user._id} data-username={user.userName}>
      <UserCard
      // eslint-disable-next-line no-underscore-dangle
        key={user._id}
        cardType={cardType}
        userData={user}
      />
    </div>
  ))
);

const UserDiv = styled.div`
`;

export default function UserCardList({ cardType, userList, clickEvent }:
  {
    cardType: 'follow' | 'others';
    userList: IUserForCard[],
    clickEvent?: ((e: MouseEvent) => void)
  }) {
  return <UserDiv onClick={clickEvent}>{makeUserToCard({ cardType, userList })}</UserDiv>;
}
