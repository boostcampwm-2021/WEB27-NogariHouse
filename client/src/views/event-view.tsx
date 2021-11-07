/* eslint-disable max-len */
import React, { MouseEvent, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { isOpenEventModalState } from '@recoil/atoms/is-open-modal';
import useFetchItems from '@src/hooks/useFetchItems';
import { makeDateToHourMinute } from '@src/utils';
import EventCard from '@styled-components/event-card';

interface EventUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface EventCardProps {
  key?: string,
  time: string,
  title: string,
  users: EventUser[],
  description: string,
}

const EventDiv = styled.div``;

const makeEventToCard = (event: EventCardProps) => (
  <EventCard
    key={event.key}
    time={makeDateToHourMinute(new Date(event.time))}
    title={event.title}
    users={event.users}
    description={event.description}
  />
);

function EventCardList({ eventList, setEventModal }: { eventList: EventCardProps[], setEventModal: ((e: MouseEvent) => void) }) {
  return <EventDiv onClick={setEventModal}>{eventList?.map(makeEventToCard)}</EventDiv>;
}

function EventView() {
  const [nowItemList, resetItemList] = useFetchItems<EventCardProps>('/event');
  const setIsOpenEventModal = useSetRecoilState(isOpenEventModalState);

  const setEventModal = useCallback((e: MouseEvent) => {
    setIsOpenEventModal(true);
    console.log(e.currentTarget);
  }, []);

  useEffect(() => resetItemList(), []);

  return (
    <>
      <EventCardList setEventModal={setEventModal} eventList={nowItemList} />
    </>
  );
}

export default EventView;
