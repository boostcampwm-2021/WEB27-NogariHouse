/* eslint-disable no-underscore-dangle */
import React, { MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UserImage from '@common/user-image';
import DefaultButton from '@common/default-button';
import useIsFollowingRef from '@hooks/useIsFollowingRef';
import LoadingSpinner from './loading-spinner';

interface IUserCardProps {
  cardType: 'follow' | 'me' | 'others';
  userData: {
    _id: string,
    userName: string,
    userId: string,
    description: string,
    profileUrl: string,
    isFollow?: boolean,
  },
}

interface ISizeProps {
  sizeType : 'follow' |'me' |'others'
}

const sizes = {
  follow: { cardLayoutSize: 100, userNameSize: 24, descriptionSize: 18 },
  me: { cardLayoutSize: 100, userNameSize: 24, descriptionSize: 18 },
  others: { cardLayoutSize: 60, userNameSize: 16, descriptionSize: 12 },
};

const UserCardLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  margin-left: 0.8%;
  width: 99%;
  height: ${(props: ISizeProps) => sizes[props.sizeType].cardLayoutSize}px;
  color: black;
  text-decoration: none;

  &:hover {
  cursor: default;
  background-color: #eeebe4e4;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
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
  font-size: ${(props: ISizeProps) => sizes[props.sizeType].userNameSize}px;
  margin-bottom:3px;
  user-select: none;
`;

const UserId = styled.div`
  font-size: ${(props: ISizeProps) => sizes[props.sizeType].descriptionSize}px;
  margin-bottom:3px;
  user-select: none;
`;

const UserDescription = styled.div`
  font-size: ${(props: ISizeProps) => sizes[props.sizeType].descriptionSize}px;
  user-select: none;
`;

export default function UserCard({ cardType, userData }: IUserCardProps) {
  const [loading, setLoading] = useState(false);
  const [isFollowingRef, fetchFollow] = useIsFollowingRef(setLoading, userData.isFollow);
  const history = useHistory();

  return (
    <UserCardLayout onClick={() => cardType !== 'others' && history.push(`/profile/${userData.userId}`)} sizeType={cardType}>
      <UserInfoLayout>
        <UserImageLayout>
          <UserImage src={userData.profileUrl} size={cardType === 'others' ? 'others' : 'default'} />
        </UserImageLayout>
        <UserDescLayout>
          <UserName sizeType={cardType}>
            {userData.userName}
          </UserName>
          <UserId sizeType={cardType}>
            {userData.userId}
          </UserId>
          <UserDescription sizeType={cardType}>
            {userData.description}
          </UserDescription>
        </UserDescLayout>
      </UserInfoLayout>
      {loading && <LoadingSpinner />}
      {cardType === 'follow'
        && (
          <DefaultButton
            buttonType={isFollowingRef.current ? 'following' : 'follow'}
            size="small"
            font="Nunito"
            isDisabled={false}
            onClick={(e: MouseEvent) => { e.stopPropagation(); fetchFollow(isFollowingRef.current as boolean, userData._id); }}
          >
            {isFollowingRef.current ? 'following' : 'follow'}
          </DefaultButton>
        )}
    </UserCardLayout>
  );
}
