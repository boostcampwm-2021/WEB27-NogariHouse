/* eslint-disable max-len */
import React from 'react';
import EventCard from '@styled-components/event-card';

interface EventUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface EventCardProps {
  time: string,
  title: string,
  users: EventUser[],
  discription: string,
}

const dummy: EventCardProps = {
  time: '20:00',
  title: '스테레오/공간음향 소개',
  users: [
    {
      userId: 'test',
      userName: 'test',
      profileUrl: 'https://avatars.githubusercontent.com/u/59464537?v=4',
    },
    {
      userId: 'test',
      userName: 'test',
      profileUrl: 'https://avatars.githubusercontent.com/u/59464537?v=4',
    },
  ],
  discription: '클럽하우스와 음(mm)에서 지원을 시작한 스테레오 기능을 활용하면 음악과 다양한 음성콘텐츠에서 공간음향을 경험할 수 있습니다.',
};

const makeEventToCard = (event: EventCardProps) => (
  <EventCard time={event.time} title={event.title} users={event.users} discription={event.discription} />
);

function EventCardList({ eventList }: { eventList: EventCardProps[] }) {
  return <>{eventList.map(makeEventToCard)}</>;
}

function EventView() {
  return <EventCardList eventList={[dummy, dummy, dummy, dummy, dummy]} />;
}

export default EventView;
