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
      <ActivityCard
        type={nowItemList[0].type}
        clickDocumentId={nowItemList[0].clickDocumentId}
        from={nowItemList[0].from}
        date={nowItemList[0].date}
      />
      <ObserverBlock ref={targetRef}>
        {nowFetching && <LoadingSpinner />}
      </ObserverBlock>
    </>
  );
}

export default ActivityView;
