import React from 'react';

import { SearchBarLayout, SearchInput, SearchCategoryLayout } from './style';

function SearchBar() {
  return (
    <SearchBarLayout>
      <SearchInput placeholder="🔍 Search ClubHouse" />
      <SearchCategoryLayout>
        {/* <CategoryBox />
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
        <CategoryBox /> */}
      </SearchCategoryLayout>
    </SearchBarLayout>
  );
}

export default SearchBar;
