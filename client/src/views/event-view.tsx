/* eslint-disable max-len */
import React, {
  MouseEvent, useEffect, useState,
} from 'react';
import styled from 'styled-components';

import useFetchItems from '@src/hooks/useFetchItems';
import { makeDateToHourMinute } from '@src/utils';
import EventCard from '@common/event-card';
import LoadingSpinner from '@common/loading-spinner';
import useSetEventModal from '@hooks/useSetEventModal';

interface EventUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface EventCardProps {
  key: string,
  time: string,
  title: string,
  participants: EventUser[],
  description: string,
}

const EventDiv = styled.div`
 div + div {
   margin-bottom: 10px;
 }
`;

const makeEventToCard = (event: EventCardProps) => (
  <EventCard
    key={event.key}
    time={makeDateToHourMinute(new Date(event.time))}
    title={event.title}
    participants={event.participants}
    description={event.description}
  />
);

export function EventCardList({ eventList, setEventModal }: { eventList: EventCardProps[], setEventModal: ((e: MouseEvent) => void) }) {
  return <EventDiv onClick={setEventModal}>{eventList?.map(makeEventToCard)}</EventDiv>;
}

function EventView() {
  const [nowItemList, nowItemType] = useFetchItems<EventCardProps>('/event', 'event');
  const [loading, setLoading] = useState(true);
  const setEventModal = useSetEventModal();

  useEffect(() => {
    if (nowItemList && nowItemType === 'event') {
      setLoading(false);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <EventCardList setEventModal={setEventModal} eventList={nowItemList} />
    </>
  );
}

export default EventView;
