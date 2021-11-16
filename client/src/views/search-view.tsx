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
  SearchViewLayout, SearchBarLayout, SearchInput, SearchScrollSection,
} from '@components/search/style';
import LoadingSpinner from '@common/loading-spinner';
import useSetEventModal from '@hooks/useSetEventModal';
import { EventCardList } from '@views/event-view';
import { RoomCardList } from '@views/room-view';
import UserCardList from '@common/user-card-list';
import roomViewType from '@atoms/room-view-type';
import roomDocumentIdState from '@atoms/room-document-id';
import followingListState from '@atoms/following-list';

function SearchView() {
  const searchType = useRecoilValue(searchTypeState);
  const inputKeywordRef = useRef<HTMLInputElement>(null);
  const nowFetchingRef = useRef<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const followingList = useRecoilValue(followingListState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const nowItemTypeRef = useRef<string>('');
  const searchInfo = useRef({ keyword: 'recent', option: 'top' });

  const setEventModal = useSetEventModal();

  const fetchItems = async () => {
    try {
      const newItemsList = await fetch(`${process.env.REACT_APP_API_URL}/api/search/${searchInfo.current.option}/${searchInfo.current.keyword || 'recent'}?count=${nowItemsList.length}`)
        .then((res) => res.json())
        .then((json) => json.items);
      setNowItemsList([...nowItemsList, ...newItemsList]);
      nowItemTypeRef.current = searchInfo.current.keyword;
    } catch (e) {
      console.log(e);
    }
  };

  const searchRequestHandler = () => {
    searchInfo.current.keyword = inputKeywordRef.current?.value as string;
    searchInfo.current.option = searchType.toLocaleLowerCase();
    resetItemList();
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
        setNowFetching(true);
        nowFetchingRef.current = true;
        setTimeout(() => {
          nowFetchingRef.current = false;
        }, 200);
      }
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

  // eslint-disable-next-line consistent-return
  const itemList = () => {
    if (searchInfo.current.option !== searchType.toLocaleLowerCase()) {
      return <LoadingSpinner />;
    }

    if (searchType === 'Events') {
      return <EventCardList setEventModal={setEventModal} eventList={nowItemsList} />;
    }

    if (searchType === 'Rooms') {
      return <RoomCardList roomCardClickHandler={roomCardClickHandler} roomList={nowItemsList} />;
    }

    if (searchType === 'People') {
      const filteredItemList = nowItemsList.map((item) => {
        const {
          key, userName, userDesc, profileUrl, isFollow,
        } = item;

        const newItem = {
          key,
          userName,
          userDesc,
          profileUrl,
          isFollow: followingList.includes(key) ? true : isFollow,
        };

        return newItem;
      });
      return <UserCardList userList={filteredItemList} cardType="follow" />;
    }
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
          : itemList()}
      </SearchScrollSection>
    </SearchViewLayout>
  );
}

export default SearchView;
