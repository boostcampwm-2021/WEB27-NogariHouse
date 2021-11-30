/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { makeDateToHourMinute, makeDateToMonthDate } from '@utils/index';
import roomDocumentIdState from '@atoms/room-document-id';
import roomViewState from '@atoms/room-view-type';
import anonymousState from '@atoms/anonymous';
import isOpenRoomState from '@atoms/is-open-room';
import { ActivityCardLayout, ImageLayout, UserNameSpan, DiscriptionSpan, LeftSide, RightSide, TimeDiv } from './style';

interface ActivityUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface ActivityCardProps {
  type: 'follow' | 'event' | 'room',
  clickDocumentId: string,
  from: ActivityUser,
  date: Date,
}

const mapping = {
  follow: '님이 팔로우 했습니다',
  room: '님이 room을 생성했습니다. 참여하실래요?',
  event: '님이 등록한 이벤트에 초대되셨습니다 !',
};

function ActivityCard({ type, clickDocumentId, from, date }: ActivityCardProps) {
  const history = useHistory();
  const setRoomView = useSetRecoilState(roomViewState);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const setIsAnonymous = useSetRecoilState(anonymousState);
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);

  const activityClickEvent = () => {
    if (type === 'follow') {
      history.push(`/profile/${from.userId}`);
    } else if (type === 'room') {
      setIsAnonymous(false);
      setRoomDocumentId(clickDocumentId);
      setRoomView('inRoomView');
      setIsOpenRoom(true);
    }
  };

  const time = new Date(date);
  return (
    <ActivityCardLayout onClick={activityClickEvent}>
      <LeftSide>
        <ImageLayout src={from.profileUrl} />
        <DiscriptionSpan>
          <UserNameSpan>{from.userName}</UserNameSpan>
          {mapping[type]}
        </DiscriptionSpan>
      </LeftSide>
      <RightSide>
        <TimeDiv>{time.getDate() === (new Date()).getDate() ? makeDateToHourMinute(time) : makeDateToMonthDate(time)}</TimeDiv>
      </RightSide>
    </ActivityCardLayout>
  );
}

export default ActivityCard;
