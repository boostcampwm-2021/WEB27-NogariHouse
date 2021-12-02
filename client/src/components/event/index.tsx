import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { nowFetchingState } from '@atoms/main-section-scroll';
import LoadingSpinner from '@styles/loading-spinner';
import EventCardList from '@components/event/card-list';
import useFetchItems from '@hooks/useFetchItems';
import useItemFecthObserver from '@hooks/useItemFetchObserver';
import ObserverBlock from './style';

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

function EventView() {
  const [nowItemList, nowItemType] = useFetchItems<EventCardProps>('/event', 'event');
  const [loading, setLoading] = useState(true);
  const nowFetching = useRecoilValue(nowFetchingState);
  const [targetRef] = useItemFecthObserver(loading);

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
      <EventCardList eventList={nowItemList} />
      <ObserverBlock ref={targetRef}>
        {nowFetching && <LoadingSpinner />}
      </ObserverBlock>
    </>
  );
}

export default EventView;
