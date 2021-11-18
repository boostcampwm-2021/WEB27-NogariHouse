/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import followingListState from '@atoms/following-list';
import UserImage from '@common/user-image';
import DefaultButton from '@common/default-button';
import LoadingSpinner from './loading-spinner';

interface UserCardProps {
  cardType: 'follow' | 'me' | 'others';
  userData: {
    _id: string,
    userName: string,
    description: string,
    profileUrl: string,
    isFollow?: boolean,
  }
}

interface sizeProps {
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

const UserId = styled.div`
  font-size: ${(props: sizeProps) => sizes[props.sizeType].descriptionSize}px;
  margin-bottom:3px;
  user-select: none;
`;

const UserDescription = styled.div`
  font-size: ${(props: sizeProps) => sizes[props.sizeType].descriptionSize}px;
  user-select: none;
`;

export default function UserCard(props: UserCardProps) {
  const [loading, setLoading] = useState(false);
  const isFollowingRef = useRef<boolean>(props.userData.isFollow as boolean);
  const setFollowingList = useSetRecoilState(followingListState);

  const fetchFollow = useCallback((isFollow: boolean, targetUserDocumentId: string) => {
    setLoading(true);
    const type = isFollow ? 'unfollow' : 'follow';
    fetch(`${process.env.REACT_APP_API_URL}/api/user/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ type, targetUserDocumentId }),
    }).then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          isFollowingRef.current = !isFollowingRef.current;
          isFollow ? setFollowingList((followList) => followList.filter((id) => id !== targetUserDocumentId)) : setFollowingList((followList) => [...followList, targetUserDocumentId]);
        }
        setLoading(false);
      });
  }, []);

  return (
    <UserCardLayout sizeType={props.cardType}>
      <UserInfoLayout>
        <UserImageLayout>
          <UserImage src={props.userData.profileUrl} size={props.cardType === 'others' ? 'others' : 'default'} />
        </UserImageLayout>
        <UserDescLayout>
          <UserName sizeType={props.cardType}>
            {props.userData.userName}
          </UserName>
          <UserId sizeType={props.cardType}>
            @userId
          </UserId>
          <UserDescription sizeType={props.cardType}>
            {props.userData.description}
          </UserDescription>
        </UserDescLayout>
      </UserInfoLayout>
      {loading && <LoadingSpinner />}
      {props.cardType === 'follow'
        && (
          <DefaultButton
            buttonType={isFollowingRef.current ? 'following' : 'follow'}
            size="small"
            font="Nunito"
            isDisabled={false}
            onClick={() => fetchFollow(isFollowingRef.current, props.userData._id)}
          >
            {isFollowingRef.current ? 'following' : 'follow'}
          </DefaultButton>
        )}
    </UserCardLayout>
  );
}
