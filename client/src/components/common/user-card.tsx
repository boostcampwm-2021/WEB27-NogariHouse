/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

import UserImage from '@common/user-image';
import DefaultButton from '@common/default-button';

interface userCardProps {
  cardType: 'follow' | 'others';
  userData: {
    userName: string,
    description: string,
    profileUrl: string,
    isFollow?: boolean,
  }
}

interface sizeProps {
  sizeType : 'follow' | 'others'
}

const sizes = {
  follow: { cardLayoutSize: 80, userNameSize: 24, descriptionSize: 20 },
  others: { cardLayoutSize: 60, userNameSize: 16, descriptionSize: 12 },
};

const UserCardLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  width: 100%;
  height: ${(props: sizeProps) => sizes[props.sizeType].cardLayoutSize}px;
`;

const UserInfoLayout = styled.div`
  display: flex;
  align-items: center;
`;

const UserImageLayout = styled.div`
  display:flex;
  align-items: center;
  margin: 0 20px;
`;

const UserDescLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: ${(props: sizeProps) => sizes[props.sizeType].userNameSize}px;
  margin-bottom:3px;
  user-select: none;
`;

const UserDescription = styled.div`
  font-size: ${(props: sizeProps) => sizes[props.sizeType].descriptionSize}px;
  user-select: none;
`;

export default function UserCard(props:userCardProps) {
  return (
    <UserCardLayout sizeType={props.cardType}>
      <UserInfoLayout>
        <UserImageLayout>
          <UserImage src={props.userData.profileUrl} size={props.cardType === 'follow' ? 'default' : 'others'} />
        </UserImageLayout>
        <UserDescLayout>
          <UserName sizeType={props.cardType}>
            {props.userData.userName}
          </UserName>
          <UserDescription sizeType={props.cardType}>
            {props.userData.description}
          </UserDescription>
        </UserDescLayout>
      </UserInfoLayout>
      {props.cardType === 'follow'
        ? (
          <DefaultButton
            buttonType="primary"
            size="small"
            font="Nunito"
            isDisabled={!props.userData.isFollow}
          >
            {props.userData.isFollow ? 'following' : 'follow'}
          </DefaultButton>
        ) : ''}
    </UserCardLayout>
  );
}
