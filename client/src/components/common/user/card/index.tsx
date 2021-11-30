import React, { MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserImage from '@common/user/image';
import DefaultButton from '@common/default-button';
import useIsFollowingRef from '@hooks/useIsFollowingRef';
import LoadingSpinner from '@styles/loading-spinner';
import {
  UserCardLayout, UserInfoLayout, UserImageLayout, UserDescLayout, UserName, UserId, UserDescription,
} from './style';

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
