import React, { useState, useEffect, MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import followingListState from '@atoms/following-list';
import UserCardList from '@components/common/user-card-list';
import { findUsersByIdList } from '@api/index';
import { IUserForCard } from '@interfaces/index';
import LoadingSpinner from '@common/loading-spinner';

interface IEventSelectUserDropdownProps {
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>,
  isOpenSelectedList: boolean,
}

const DropDownWrapper = styled.div`
  display: ${(props: { isOpenSelectedList: boolean}) => !props.isOpenSelectedList && 'none'};
  position: absolute;
  top: 30%;
  width: 200px;
  max-height: 300px;
  overflow-y: scroll;
  background-color: #F1F0E4;
  border-radius: 30px;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
    }
`;

const EventSelectUserDropdown = React.memo(({ setSelectedList, isOpenSelectedList }: IEventSelectUserDropdownProps) => {
  const followingList = useRecoilValue(followingListState);
  const [userList, setUserList] = useState<IUserForCard[]>([]);
  const [loading, setLoading] = useState(true);

  const clickSelectedList = (e: MouseEvent) => {
    const userCardDiv = (e.target as HTMLDivElement).closest('.userCard');
    const userId = userCardDiv?.getAttribute('data-userId');
    if (!userId) return;
    setSelectedList((list) => {
      if (list.includes(userId)) {
        return list.filter((inListUserId) => inListUserId !== userId);
      }
      return [...list.filter((inListUserId) => inListUserId !== userId), userId];
    });
  };

  useEffect(() => {
    findUsersByIdList(followingList)
      .then((res: any) => setUserList(res.userList))
      .then(() => setLoading(false));
  }, [followingList]);

  if (loading) {
    return (
      <DropDownWrapper isOpenSelectedList={isOpenSelectedList}>
        <LoadingSpinner />
      </DropDownWrapper>
    );
  }

  return (
    <DropDownWrapper isOpenSelectedList={isOpenSelectedList}>
      <UserCardList cardType="others" userList={userList} clickEvent={clickSelectedList} />
    </DropDownWrapper>
  );
});

export default EventSelectUserDropdown;
