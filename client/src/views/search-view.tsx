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
import roomViewType from '@atoms/room-view-type';
import roomDocumentIdState from '@atoms/room-document-id';
import followingListState from '@atoms/following-list';
import userState from '@atoms/user';
import {
  SearchViewLayout, SearchBarLayout, SearchInput, SearchScrollSection, ItemDiv,
} from '@components/search/style';
import LoadingSpinner from '@common/loading-spinner';
import UserCard from '@common/user-card';
import useSetEventModal from '@hooks/useSetEventModal';
import useItemFecthObserver from '@hooks/useItemFetchObserver';
import useFetchItems from '@hooks/useFetchItems';
import { makeUserObjectIncludedIsFollow } from '@utils/index';
import { makeEventToCard } from '@views/event-view';
import { makeRoomToCard } from '@views/room-view';

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
  const setRoomView = useSetRecoilState(roomViewType);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const followingList = useRecoilValue(followingListState);
  const searchInfoRef = useRef({ keyword: 'recent', option: 'all' });
  const [nowItemsList] = useFetchItems<any>(
    `/search/${searchInfoRef.current.option}/${searchInfoRef.current.keyword || 'recent'}`,
    searchInfoRef.current.keyword,
  );
  const setNowCount = useSetRecoilState(nowCountState);
  const setEventModal = useSetEventModal();
  const debounceTimeoutIDRef = useRef<NodeJS.Timeout>();

  const searchRequestHandler = () => {
    searchInfoRef.current.keyword = inputKeywordRef.current?.value as string;
    searchInfoRef.current.option = searchType.toLocaleLowerCase();
    resetItemList();
    setNowCount(0);
    setNowFetching(true);
  };

  const onChangeHandler = () => {
    if (debounceTimeoutIDRef.current) clearTimeout(debounceTimeoutIDRef.current);
    debounceTimeoutIDRef.current = setTimeout(() => {
      searchRequestHandler();
    }, 200);
  };

  const roomCardClickHandler = (e: MouseEvent) => {
    const RoomCardDiv = (e.target as HTMLDivElement).closest('.RoomCard');
    const roomDocumentId = RoomCardDiv?.getAttribute('data-id');
    setRoomView('inRoomView');
    if (roomDocumentId) setRoomDocumentId(roomDocumentId);
    else console.error('no room-id');
  };

  const makeItemToCardForm = (item: any) => {
    if (item.type === 'event') {
      return <ItemDiv key={item.key} onClick={setEventModal}>{makeEventToCard(item)}</ItemDiv>;
    }

    if (item.type === 'user') {
      if (item._id === user.userDocumentId) return '';
      const newUserItemForm = makeUserObjectIncludedIsFollow(item, followingList);

      return <UserCard key={newUserItemForm._id} cardType="follow" userData={newUserItemForm} />;
    }

    if (item.type === 'room') {
      return <ItemDiv key={item._id} onClick={roomCardClickHandler}>{makeRoomToCard(item)}</ItemDiv>;
    }

    return <div />;
  };

  useEffect(() => {
    searchRequestHandler();
  }, [searchType]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <SearchViewLayout>
      <SearchBarLayout>
        <SearchInput ref={inputKeywordRef} placeholder="🔍 Search ClubHouse" onChange={onChangeHandler} />
        <OptionBar />
      </SearchBarLayout>
      <SearchScrollSection>
        {!loading && <>{nowItemsList.map(makeItemToCardForm)}</>}
        <ObserverBlock ref={targetRef}>
          {nowFetching && <LoadingSpinner />}
        </ObserverBlock>
      </SearchScrollSection>
    </SearchViewLayout>
  );
}

export default SearchView;
