/* eslint-disable max-len */
import React, { MouseEvent, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import EventRegisterModal from '@components/event-register-modal';
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

const makeEventToCard = (event: EventCardProps) => {
  const setIsOpenEventModal = useSetRecoilState(isOpenEventModalState);

  const setEventModal = useCallback((e: MouseEvent) => {
    setIsOpenEventModal(true);
    console.log(e.currentTarget);
  }, []);

  return (
    <EventCard
      key={event.key}
      onClick={setEventModal}
      time={makeDateToHourMinute(new Date(event.time))}
      title={event.title}
      users={event.users}
      description={event.description}
    />
  );
};

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
