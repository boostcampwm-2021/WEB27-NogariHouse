import React from 'react';

import {
  EventCardLayout, TimeDiv, TitleDiv, ImageDiv, ImageLayout, DiscriptionDiv,
} from './style';

interface EventUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface EventCardProps {
  time: string,
  title: string,
  participants: EventUser[],
  description: string,
}

const makeUserToImg = (participant: EventUser, idx: number) => <ImageLayout key={idx} src={participant.profileUrl} />;

function UserImageList({ participants }: { participants: EventUser[] }) {
  return <>{participants?.map(makeUserToImg)}</>;
}

function EventCard({
  time, title, participants, description,
}: EventCardProps) {
  return (
    <EventCardLayout>
      <TimeDiv>{time}</TimeDiv>
      <TitleDiv>{title}</TitleDiv>
      <ImageDiv>
        <UserImageList participants={participants} />
      </ImageDiv>
      <DiscriptionDiv>{description}</DiscriptionDiv>
    </EventCardLayout>
  );
}

export default EventCard;
