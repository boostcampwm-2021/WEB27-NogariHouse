/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

import UserImage from '@common/user-image';

interface userCardProps {
  userData: {
    userName: string,
    userDesc: string,
    profileUrl: string,
    checkFollow: boolean,
    isFollow?: boolean,
  }
}

const UserCardLayout = styled.div`
  display: flex;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  height: 80px;
`;

const UserImageLayout = styled.div`
  display:flex;
  align-items: center;
  margin: 0 20px;
`;

const UserInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom:3px;
`;

const UserDescription = styled.div`
  font-size : 20px;
`;

const FollowButton = styled.button``;

export default function UserCard(props:userCardProps) {
  return (
    <UserCardLayout>
      <UserImageLayout>
        <UserImage profileUrl={props.userData.profileUrl} />
      </UserImageLayout>
      <UserInfoLayout>
        <UserName>
          {props.userData.userName}
        </UserName>
        <UserDescription>
          {props.userData.userDesc}
        </UserDescription>
      </UserInfoLayout>
      {props.userData.checkFollow ? <FollowButton type="button" /> : ''}
    </UserCardLayout>
  );
}
