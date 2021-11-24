import React from 'react';
import ActivityCard from '@components/activity/activity-card';

const user1 = {
  userId: 'userId',
  userName: 'userName',
  profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/puppy2.jpeg',
};

function ActivityView() {
  return (<ActivityCard type="follow" clickDocumentId="312" from={user1} date={new Date()} />);
}

export default ActivityView;
