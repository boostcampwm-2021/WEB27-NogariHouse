import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { nowFetchingState } from '@atoms/main-section-scroll';
import LoadingSpinner from '@styles/loading-spinner';
import ActivityCard from '@components/activity/card';
import useFetchItems from '@hooks/useFetchItems';
import useItemFecthObserver from '@hooks/useItemFetchObserver';
import { ObserverBlock, ActivityDiv } from './style';

interface ActivityUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface ActivityCardProps {
  type: 'follow' | 'event' | 'room',
  clickDocumentId: string,
  from: ActivityUser,
  date: Date,
}

export const makeActivityToCard = (activity: ActivityCardProps) => (
  <ActivityCard
    key={`${(new Date(activity.date)).getTime()}_${activity.from.userId}`}
    type={activity.type}
    clickDocumentId={activity.clickDocumentId}
    from={activity.from}
    date={activity.date}
  />
);

export function ActivityCardList({ activityList }: { activityList: ActivityCardProps[] }) {
  return <ActivityDiv>{activityList.map(makeActivityToCard)}</ActivityDiv>;
}

function ActivityView() {
  const [nowItemList, nowItemType] = useFetchItems<ActivityCardProps>('/activity', 'activity');
  const [loading, setLoading] = useState(true);
  const nowFetching = useRecoilValue(nowFetchingState);
  const [targetRef] = useItemFecthObserver(loading);

  useEffect(() => {
    if (nowItemList && nowItemType === 'activity') {
      setLoading(false);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <ActivityCardList activityList={nowItemList} />

      <ObserverBlock ref={targetRef}>
        {nowFetching && <LoadingSpinner />}
      </ObserverBlock>
    </>
  );
}

export default ActivityView;
