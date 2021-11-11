import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { getSearchResult } from '@src/api';

import searchTypeState from '@atoms/search-type';
import OptionBar from '@components/search/option-bar';
import { SearchBarLayout, SearchInput } from '@components/search/style';

function SearchView() {
  const searchType = useRecoilValue(searchTypeState);
  const inputKeywordRef = useRef<HTMLInputElement>(null);

  const searchRequestHandler = () => {
    const searchInfo = {
      keyword: (inputKeywordRef.current?.value as string).toLocaleLowerCase(),
      option: searchType,
    };

    getSearchResult(searchInfo)
      .then((res) => console.log(res)).catch((err) => console.error(err));
  };

  return (
    <>
      <SearchBarLayout>
        <SearchInput ref={inputKeywordRef} placeholder="🔍 Search ClubHouse" onChange={searchRequestHandler} />
        <OptionBar />
      </SearchBarLayout>
    </>
  );
}

export default SearchView;
