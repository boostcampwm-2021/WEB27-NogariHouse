/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import useFetchItems from '@hooks/useFetchItems';
import { nowFetchingState } from '@atoms/main-section-scroll';
import ActivityCard from '@components/activity/activity-card';
import useItemFecthObserver from '@hooks/useItemFetchObserver';
import LoadingSpinner from '@common/loading-spinner';

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

const ObserverBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const ActivityDiv = styled.div`
 div + div {
   margin-bottom: 10px;
 }
`;

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
