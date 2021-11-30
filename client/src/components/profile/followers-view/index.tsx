import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import LoadingSpinner from '@styles/loading-spinner';
import useFetchItems from '@src/hooks/useFetchItems';
import followingListState from '@atoms/following-list';
import UserCard from '@common/user/card';
import userState from '@atoms/user';
import { IUserForCard } from '@src/interfaces';
import { makeUserObjectIncludedIsFollow } from '@utils/item';

function FollowerView({ match }: RouteComponentProps<{id: string}>) {
  const userId = match.params.id;
  const [nowItemList, nowItemType] = useFetchItems<Required<IUserForCard>>(`/user/followers/${userId}`, 'followers');
  const [loading, setLoading] = useState(true);
  const followingList = useRecoilValue(followingListState);
  const user = useRecoilValue(userState);

  const makeItemToCardForm = (item: Required<IUserForCard>) => {
    const newUserItemForm = makeUserObjectIncludedIsFollow(item, followingList);
    if (newUserItemForm._id === user.userDocumentId) {
      return (
        <UserCard
          key={newUserItemForm._id}
          cardType="me"
          userData={newUserItemForm}
        />
      );
    }

    return (
      <UserCard
        key={newUserItemForm._id}
        cardType="follow"
        userData={newUserItemForm}
      />
    );
  };

  useEffect(() => {
    if (nowItemList && nowItemType === 'followers') {
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

export default FollowerView;
