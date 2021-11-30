import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import isOpenActiveFollowingModal from '@atoms/is-open-active-following-modal';
import {
  CardLayout, ImageLayout, GreenLight, DescriptionLayout, UserName, HandsLayout,
} from './style';

interface IActiveFollowingCardProps{
  userDocumentId:string,
  userName: string,
  userId: string,
  profileUrl: string,
  onClickHands: (userDocumentId: string) => (e: MouseEvent) => void;
}

function ActiveFollowingCard({
  userDocumentId, userName, userId, profileUrl, onClickHands,
}: IActiveFollowingCardProps) {
  const history = useHistory();
  const setIsOpenActiveFollowingModal = useSetRecoilState(isOpenActiveFollowingModal);

  return (
    <CardLayout onClick={() => {
      history.push(`/profile/${userId}`);
      setIsOpenActiveFollowingModal(false);
    }}
    >
      <ImageLayout>
        <GreenLight />
        <img src={profileUrl} alt="profile" width="48px" height="48px" />
      </ImageLayout>
      <DescriptionLayout>
        <UserName>{userName}</UserName>
        <div>online</div>
      </DescriptionLayout>
      <HandsLayout onClick={onClickHands(userDocumentId)}>
        👋
      </HandsLayout>
    </CardLayout>
  );
}

export default ActiveFollowingCard;
