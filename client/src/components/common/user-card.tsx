/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

import UserImage from '@common/user-image';

interface userCardProps {
  cardType: 'follow' | 'others';
  userData: {
    userName: string,
    userDesc: string,
    profileUrl: string,
    checkFollow: boolean,
    isFollow?: boolean,
  }
}

interface sizeProps {
  sizeType : 'follow' | 'others'
}

const sizes = {
  follow: { userNameSize: 24, userDescSize: 20 },
  others: { userNameSize: 16, userDescSize: 12 },
};

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
  font-size: ${(props: sizeProps) => sizes[props.sizeType].userNameSize}px;
  margin-bottom:3px;
`;

const UserDescription = styled.div`
  font-size: ${(props: sizeProps) => sizes[props.sizeType].userDescSize}px;
`;

const FollowButton = styled.button``;

export default function UserCard(props:userCardProps) {
  return (
    <UserCardLayout>
      <UserImageLayout>
        <UserImage profileUrl={props.userData.profileUrl} />
      </UserImageLayout>
      <UserInfoLayout>
        <UserName sizeType={props.cardType}>
          {props.userData.userName}
        </UserName>
        <UserDescription sizeType={props.cardType}>
          {props.userData.userDesc}
        </UserDescription>
      </UserInfoLayout>
      {props.userData.checkFollow ? <FollowButton type="button" /> : ''}
    </UserCardLayout>
  );
}
