import React, { useRef, useCallback, UIEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getSearchResult } from '@src/api';
import { nowFetchingState } from '@atoms/main-section-scroll';
import searchTypeState from '@atoms/search-type';
import OptionBar from '@components/search/option-bar';
import {
  SearchViewLayout, SearchBarLayout, SearchInput, SearchScrollSection, TestBox,
} from '@components/search/style';

function SearchView() {
  const searchType = useRecoilValue(searchTypeState);
  const inputKeywordRef = useRef<HTMLInputElement>(null);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const nowFetchingRef = useRef<boolean>(false);

  const searchRequestHandler = () => {
    const searchInfo = {
      keyword: inputKeywordRef.current?.value as string,
      option: searchType.toLocaleLowerCase(),
    };

    getSearchResult(searchInfo)
      .then((res) => console.log(res)).catch((err) => console.error(err));
  };

  const scrollBarChecker = useCallback((e: UIEvent<HTMLDivElement>) => {
    if (!nowFetchingRef.current) {
      const diff = e.currentTarget.scrollHeight - e.currentTarget.scrollTop;
      console.log(e.currentTarget);
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
        <SearchInput ref={inputKeywordRef} placeholder="🔍 Search ClubHouse" onChange={searchRequestHandler} />
        <OptionBar />
      </SearchBarLayout>
      <SearchScrollSection onScroll={scrollBarChecker}>
        <TestBox />
        <TestBox />
        <TestBox />
        <TestBox />
        <TestBox />
        <TestBox />
        <TestBox />
        <TestBox />
        <TestBox />
      </SearchScrollSection>
    </SearchViewLayout>
  );
}

export default SearchView;
