/* eslint-disable max-len */
import React, { useEffect } from 'react';
import EventCard from '@styled-components/event-card';
import EventRegisterModal from '@components/event-register-modal';
import useFetchItems from '@src/hooks/useFetchItems';

interface EventUser {
  userId: string;
  userName: string;
  profileUrl: string;
}

interface EventCardProps {
  key?: string;
  time: string;
  title: string;
  users: EventUser[];
  description: string;
}

const makeEventToCard = (event: EventCardProps) => (
  <EventCard key={event.key} time={event.time} title={event.title} users={event.users} description={event.description} />
);

function EventCardList({ eventList }: { eventList: EventCardProps[] }) {
  return <>{eventList?.map(makeEventToCard)}</>;
}

function EventView() {
  const [nowItemList, resetItemList] = useFetchItems<EventCardProps>('/event');

  useEffect(() => resetItemList(), []);

  return (
    <>
      <EventCardList eventList={nowItemList} />
      <EventRegisterModal />
    </>
  );
}

export default EventView;
