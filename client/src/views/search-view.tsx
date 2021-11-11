import React, {
  useRef, useCallback, UIEvent, useEffect, useState, MouseEvent,
} from 'react';
import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';

import { nowFetchingState, nowItemsListState } from '@atoms/main-section-scroll';
import searchTypeState from '@atoms/search-type';
import OptionBar from '@components/search/option-bar';
import {
  SearchViewLayout, SearchBarLayout, SearchInput, SearchScrollSection,
} from '@components/search/style';
import { isOpenEventModalState } from '@src/recoil/atoms/is-open-modal';
import LoadingSpinner from '@common/loading-spinner';
import { makeDateToHourMinute } from '@src/utils';
import EventCard from '@src/components/common/event-card';

interface EventUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface EventCardProps {
  key: string,
  time: string,
  title: string,
  participants: EventUser[],
  description: string,
}

const EventDiv = styled.div`
 div + div {
   margin-bottom: 10px;
 }
`;

const makeEventToCard = (event: EventCardProps) => (
  <EventCard
    key={event.key}
    time={makeDateToHourMinute(new Date(event.time))}
    title={event.title}
    participants={event.participants}
    description={event.description}
  />
);

function EventCardList({ eventList, setEventModal }
  : { eventList: EventCardProps[], setEventModal: ((e: MouseEvent) => void) }) {
  return <EventDiv onClick={setEventModal}>{eventList?.map(makeEventToCard)}</EventDiv>;
}

function SearchView() {
  const searchType = useRecoilValue(searchTypeState);
  const inputKeywordRef = useRef<HTMLInputElement>(null);
  const nowFetchingRef = useRef<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const nowItemTypeRef = useRef<string>('');
  const searchInfo = useRef({ keyword: 'recent', option: 'top' });

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

  useEffect(() => {
    resetItemList();
    setNowFetching(true);

    return () => resetItemList();
  }, []);

  useEffect(() => {
    if (nowFetching) {
      console.log(searchInfo.current.keyword);
      fetchItems().then(() => setNowFetching(false));
    }
  }, [nowFetching]);

  const searchRequestHandler = () => {
    searchInfo.current.keyword = inputKeywordRef.current?.value as string;
    searchInfo.current.option = searchType.toLocaleLowerCase();
    resetItemList();
    setNowFetching(true);
  };

  useEffect(() => {
    if (nowItemsList && (nowItemTypeRef.current === 'recent' || nowItemTypeRef.current === inputKeywordRef.current?.value)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  });

  const setIsOpenEventModal = useSetRecoilState(isOpenEventModalState);

  const setEventModal = useCallback((e: MouseEvent) => {
    setIsOpenEventModal(true);
    console.log(e.currentTarget);
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
          : <EventCardList setEventModal={setEventModal} eventList={nowItemsList} />}
      </SearchScrollSection>
    </SearchViewLayout>
  );
}

export default SearchView;
