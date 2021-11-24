/* eslint-disable object-curly-newline */
import React from 'react';
import styled from 'styled-components';

const ActivityCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  height: max-content;
  padding: 24px;
  border-radius: 30px;

  margin-left: 0.8%;

  div:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
  background-color: #eeebe4e4;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
`;

const TimeDiv = styled.div`
  font-size: 14px;
  color: gray;
`;

const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 70%;
    overflow: hidden;
`;

const UserNameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const DiscriptionDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

interface ActivityUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface ActivityCardProps {
  type: 'follow' | 'event' | 'room',
  clickDocumentId: string,
  from: ActivityUser,
  time: string,
}

const mapping = {
  follow: '님이 팔로우 했습니다',
  room: '님이 room을 생성했습니다. 참여하실래요?',
  event: '이벤트 등록',
};

function ActivityCard({ type, clickDocumentId, from, time }: ActivityCardProps) {
  console.log(type, clickDocumentId);
  return (
    <ActivityCardLayout>
      <ImageLayout src="github.com/iHoHyeon.png" />
      <UserNameDiv>{from.userName}</UserNameDiv>
      <DiscriptionDiv>{mapping[type]}</DiscriptionDiv>
      <TimeDiv>{time}</TimeDiv>
    </ActivityCardLayout>
  );
}

export default ActivityCard;
