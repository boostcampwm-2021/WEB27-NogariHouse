import React from 'react';

import UserCard from '@common/user-card';

function FollowingView() {
  const testUser1 = {
    userName: 'Mulgyeol1',
    userDesc: 'test for1',
    profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/default-user-image.png',
    isFollow: false,
  };

  const testUser2 = {
    userName: 'Mulgyeol2',
    userDesc: 'test for2',
    profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/default-user-image.png',
    isFollow: true,
  };

  const testUser3 = {
    userName: 'Mulgyeol1',
    userDesc: 'test for1',
    profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/default-user-image.png',
  };

  const testUser4 = {
    userName: 'Mulgyeol2',
    userDesc: 'test for2',
    profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/default-user-image.png',
  };

  return (
    <>
      <UserCard userData={testUser1} cardType="follow" />
      <UserCard userData={testUser2} cardType="follow" />
      <UserCard userData={testUser3} cardType="others" />
      <UserCard userData={testUser4} cardType="others" />
    </>
  );
}

export default FollowingView;
