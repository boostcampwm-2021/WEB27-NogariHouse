/* eslint-disable object-curly-newline, max-len */

import React from 'react';
import styled from 'styled-components';

const EventCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  width: 100%;
  height: max-content;
  max-height: 200px;

  div:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const TimeDiv = styled.div`
  font-size: 24px;
`;

const TitleDiv = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const ImageDiv = styled.div`
  display: flex;
  img:not(:last-child) {
    margin-right: 12px;
  }
`;
const ImageLayout = styled.img`
  width: 48px;
  min-width: 48px;
  height: 48px;
  margin-right: 10px;
  border-radius: 30%;
  overflow: hidden;
`;

const DiscriptionDiv = styled.div`
  font-size: 18px;
`;

interface EventUser {
  userId: string;
  userName: string;
  profileUrl: string;
}

interface EventCardProps {
  time: string;
  title: string;
  users: EventUser[];
  description: string;
}

const makeUserToImg = (user: EventUser, idx: number) => <ImageLayout key={idx} src={user.profileUrl} />;

function UserImageList({ users }: { users: EventUser[] }) {
  return <>{users?.map(makeUserToImg)}</>;
}

function EventCard({ time, title, users, description }: EventCardProps) {
  return (
    <EventCardLayout>
      <TimeDiv>{time}</TimeDiv>
      <TitleDiv>{title}</TitleDiv>
      <ImageDiv>
        <UserImageList users={users} />
      </ImageDiv>
      <DiscriptionDiv>{description}</DiscriptionDiv>
    </EventCardLayout>
  );
}

export default EventCard;
