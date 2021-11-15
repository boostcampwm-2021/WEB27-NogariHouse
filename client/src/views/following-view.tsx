import React from 'react';

import UserCard from '@common/user-card';

function FollowingView() {
  const testUser = {
    userName: 'Mulgyeol',
    userDesc: 'test for',
    profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/default-user-image.png',
    checkFollow: true,
    isFollow: false,
  };

  return (
    <>
      <UserCard userData={testUser} CardType="follow" />
    </>
  );
}

export default FollowingView;
