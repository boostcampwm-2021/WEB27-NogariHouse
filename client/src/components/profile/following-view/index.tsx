/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import LoadingSpinner from '@common/loading-spinner';
import useFetchItems from '@hooks/useFetchItems';
import followingListState from '@atoms/following-list';
import UserCard from '@common/user-card';
import userState from '@atoms/user';
import { IUserForCard } from '@interfaces/index';
import { makeUserObjectIncludedIsFollow } from '@utils/item';

function FollowingView({ match }: any) {
  const userId = match.params.id;
  const [nowItemList, nowItemType] = useFetchItems<Required<IUserForCard>>(`/user/followings/${userId}`, 'followings');
  const [loading, setLoading] = useState(true);
  const followingList = useRecoilValue(followingListState);
  const user = useRecoilValue(userState);

  const makeItemToCardForm = (item: Required<IUserForCard>) => {
    const newUserItemForm = makeUserObjectIncludedIsFollow(item, followingList);
    if (newUserItemForm._id === user.userDocumentId) {
      return (
        <UserCard
      // eslint-disable-next-line no-underscore-dangle
          key={newUserItemForm._id}
          cardType="me"
          userData={newUserItemForm}
        />
      );
    }

    return (
      <UserCard
          // eslint-disable-next-line no-underscore-dangle
        key={newUserItemForm._id}
        cardType="follow"
        userData={newUserItemForm}
        />
    );
  };

  useEffect(() => {
    if (nowItemList && nowItemType === 'followings') {
      setLoading(false);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {nowItemList.map(makeItemToCardForm)}
    </>
  );
}

export default FollowingView;
