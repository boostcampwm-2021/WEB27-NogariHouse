/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {
  useRef, useCallback, UIEvent, useEffect, useState, MouseEvent,
} from 'react';
import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';

import { nowFetchingState, nowItemsListState } from '@atoms/main-section-scroll';
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

function SearchView() {
  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const setRoomView = useSetRecoilState(roomViewType);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const user = useRecoilValue(userState);
  const followingList = useRecoilValue(followingListState);
  const searchType = useRecoilValue(searchTypeState);
  const [loading, setLoading] = useState(true);
  const [searchDataCount, setSearchDataCount] = useState(0);
  const inputKeywordRef = useRef<HTMLInputElement>(null);
  const nowFetchingRef = useRef<boolean>(false);
  const nowItemTypeRef = useRef<string>('');
  const searchInfoRef = useRef({ keyword: 'recent', option: 'all' });
  const setEventModal = useSetEventModal();

  const fetchItems = async () => {
    try {
      const newItemsList = await fetch(`${process.env.REACT_APP_API_URL}/api/search/${searchInfoRef.current.option}/${searchInfoRef.current.keyword || 'recent'}?count=${searchDataCount}`)
        .then((res) => res.json())
        .then((json) => json.items);
      setNowItemsList([...nowItemsList, ...newItemsList]);
      nowItemTypeRef.current = searchInfoRef.current.keyword;
    } catch (e) {
      console.error(e);
    }
  };

  const searchRequestHandler = () => {
    searchInfoRef.current.keyword = inputKeywordRef.current?.value as string;
    searchInfoRef.current.option = searchType.toLocaleLowerCase();
    resetItemList();
    setSearchDataCount(0);
    setNowFetching(true);
  };

  useEffect(() => {
    searchRequestHandler();
  }, [searchType]);

  useEffect(() => {
    if (nowFetching) {
      fetchItems().then(() => setNowFetching(false));
    }
  }, [nowFetching]);

  useEffect(() => {
    if (nowItemsList && (nowItemTypeRef.current === 'recent' || nowItemTypeRef.current === inputKeywordRef.current?.value)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  const scrollBarChecker = useCallback((e: UIEvent<HTMLDivElement>) => {
    if (!nowFetchingRef.current) {
      const diff = e.currentTarget.scrollHeight - e.currentTarget.scrollTop;
      if (diff < 700) {
        setSearchDataCount(searchDataCount + 10);
        setNowFetching(true);
        nowFetchingRef.current = true;
        setTimeout(() => {
          nowFetchingRef.current = false;
        }, 200);
      }
    }
  }, []);

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
    if (searchInfoRef.current.option !== searchType.toLocaleLowerCase()) {
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
      <SearchScrollSection onScroll={scrollBarChecker}>
        {loading
          ? <LoadingSpinner />
          : showList()}
      </SearchScrollSection>
    </SearchViewLayout>
  );
}

export default SearchView;
