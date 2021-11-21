/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {
  useRef, useEffect, useState, MouseEvent,
} from 'react';
import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';

import { nowCountState, nowFetchingState, nowItemsListState } from '@atoms/main-section-scroll';
import searchTypeState from '@atoms/search-type';
import OptionBar from '@components/search/option-bar';
import {
  SearchViewLayout, SearchBarLayout, SearchInput, SearchScrollSection, ItemDiv,
} from '@components/search/style';
import LoadingSpinner from '@common/loading-spinner';
import useSetEventModal from '@hooks/useSetEventModal';
import { makeEventToCard } from '@views/event-view';
import { makeRoomToCard } from '@views/room-view';
import roomViewType from '@atoms/room-view-type';
import roomDocumentIdState from '@atoms/room-document-id';
import followingListState from '@atoms/following-list';
import userState from '@atoms/user';
import UserCard from '@common/user-card';
import useItemFecthObserver from '@src/hooks/useItemFetchObserver';
import useFetchItems from '@src/hooks/useFetchItems';

const ObserverBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

function SearchView() {
  const searchType = useRecoilValue(searchTypeState);
  const inputKeywordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [targetRef] = useItemFecthObserver(loading);
  const user = useRecoilValue(userState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const followingList = useRecoilValue(followingListState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const searchInfo = useRef({ keyword: 'recent', option: 'all' });
  const [nowItemsList, nowItemType] = useFetchItems<any>(`/search/${searchInfo.current.option}/${searchInfo.current.keyword || 'recent'}`, searchInfo.current.keyword);
  const setNowCount = useSetRecoilState(nowCountState);

  const setEventModal = useSetEventModal();

  const searchRequestHandler = () => {
    searchInfo.current.keyword = inputKeywordRef.current?.value as string;
    searchInfo.current.option = searchType.toLocaleLowerCase();
    resetItemList();
    setNowCount(0);
    setNowFetching(true);
  };

  useEffect(() => {
    searchRequestHandler();
  }, [searchType]);

  useEffect(() => {
    if (nowItemsList && (nowItemType === 'recent' || nowItemType === inputKeywordRef.current?.value)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  const setRoomView = useSetRecoilState(roomViewType);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);

  const roomCardClickHandler = (e: MouseEvent) => {
    const RoomCardDiv = (e.target as HTMLDivElement).closest('.RoomCard');
    const roomDocumentId = RoomCardDiv?.getAttribute('data-id');
    setRoomView('inRoomView');
    if (roomDocumentId) setRoomDocumentId(roomDocumentId);
    else console.error('no room-id');
  };

  const makeUserObjectIncludedIsFollow = (
    userItem: {
      _id: string,
      userName: string,
      userId: string,
      description: string,
      profileUrl: string
    },
  ) => ({
    _id: userItem._id,
    userName: userItem.userName,
    userId: userItem.userId,
    description: userItem.description,
    profileUrl: userItem.profileUrl,
    isFollow: !!followingList.includes(userItem._id),
  });

  const makeItemToCardForm = (item: any) => {
    if (item.type === 'event') {
      return <ItemDiv key={item.key} onClick={setEventModal}>{makeEventToCard(item)}</ItemDiv>;
    }

    if (item.type === 'user') {
      if (item._id === user.userDocumentId) return '';
      const newUserItemForm = makeUserObjectIncludedIsFollow(item);

      return (
        <UserCard
          // eslint-disable-next-line no-underscore-dangle
          key={newUserItemForm._id}
          cardType="follow"
          userData={newUserItemForm}
        />
      );
    }

    if (item.type === 'room') {
      // eslint-disable-next-line max-len
      return <ItemDiv key={item._id} onClick={roomCardClickHandler}>{makeRoomToCard(item)}</ItemDiv>;
    }

    return <div />;
  };

  // eslint-disable-next-line consistent-return
  const showList = () => {
    if (searchInfo.current.option !== searchType.toLocaleLowerCase()) {
      return <LoadingSpinner />;
    }

    return <>{nowItemsList.map(makeItemToCardForm)}</>;
  };

  return (
    <SearchViewLayout>
      <SearchBarLayout>
        <SearchInput ref={inputKeywordRef} placeholder="🔍 Search ClubHouse" onChange={searchRequestHandler} onKeyUp={searchRequestHandler} />
        {/* 너무 빨리 입력하는 경우 놓치게되어서 onChange, onKeyup을 둘 다 달았습니다..  */}
        <OptionBar />
      </SearchBarLayout>
      <SearchScrollSection>
        {loading
          ? <LoadingSpinner />
          : showList()}
        <ObserverBlock ref={targetRef}>
          {nowFetching && <LoadingSpinner />}
        </ObserverBlock>
      </SearchScrollSection>
    </SearchViewLayout>
  );
}

export default SearchView;
