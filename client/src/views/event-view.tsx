/* eslint-disable max-len */
import React, {
  MouseEvent, useEffect, useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { nowFetchingState } from '@atoms/main-section-scroll';
import EventCard from '@common/event-card';
import LoadingSpinner from '@common/loading-spinner';
import useFetchItems from '@hooks/useFetchItems';
import useItemFecthObserver from '@hooks/useItemFetchObserver';
import useSetEventModal from '@hooks/useSetEventModal';
import { makeDateToHourMinute, makeDateToMonthDate } from '@src/utils';

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

const ObserverBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

export const makeEventToCard = (event: EventCardProps) => (
  <EventCard
    key={event.key}
    time={`${makeDateToMonthDate(new Date(event.time))} ${makeDateToHourMinute(new Date(event.time))}`}
    title={event.title}
    participants={event.participants}
    description={event.description}
  />
);

export function EventCardList({ eventList, setEventModal }: { eventList: EventCardProps[], setEventModal: ((e: MouseEvent) => void) }) {
  return <EventDiv onClick={setEventModal}>{eventList.map(makeEventToCard)}</EventDiv>;
}

function EventView() {
  const [nowItemList, nowItemType] = useFetchItems<EventCardProps>('/event', 'event');
  const [loading, setLoading] = useState(true);
  const nowFetching = useRecoilValue(nowFetchingState);
  const [targetRef] = useItemFecthObserver(loading);
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
      <ObserverBlock ref={targetRef}>
        {nowFetching && <LoadingSpinner />}
      </ObserverBlock>
    </>
  );
}

export default EventView;
