/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
// import { useRecoilValue } from 'recoil';

import LoadingSpinner from '@common/loading-spinner';
import UserCardList from '@src/components/common/user-card-list';
import useFetchItems from '@src/hooks/useFetchItems';
// import followingListState from '@atoms/following-list';

function FollowingView({ match }:any) {
  const userId = match.params.id;
  const [nowItemList, nowItemType] = useFetchItems<any>(`/user/followings/${userId}`, 'followings');
  const [loading, setLoading] = useState(true);
  // const [userFollowingList, setUserFollowingList] = useState([]);
  // const myFollowingList = useRecoilValue(followingListState);

  // const makeUserObjectIncludedIsFollow = (
  //   userItem: {
  //     _id: string,
  //     userName:
  //     string,
  //     description: string,
  //     profileUrl: string
  //   },
  // ) => ({
  //   _id: userItem._id,
  //   userName: userItem.userName,
  //   description: userItem.description,
  //   profileUrl: userItem.profileUrl,
  //   isFollow: !!myFollowingList.includes(userItem._id),
  // });

  useEffect(() => {
    if (nowItemList && nowItemType === 'followings') {
      console.log(nowItemList);
      setLoading(false);
    }
  });

  // useEffect(() => {
  //   const followingListIncludedIsFollow = nowItemList.map(makeUserObjectIncludedIsFollow);
  //   setUserFollowingList(followingListIncludedIsFollow);
  // }, [nowItemList]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <UserCardList userList={nowItemList} cardType="follow" />
    </>
  );
}

export default FollowingView;
