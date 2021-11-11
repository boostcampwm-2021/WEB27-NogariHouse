import React from 'react';

import SearchTypeCheckBox from '@components/search/search-type-check-box';
import { SearchCategoryLayout } from '@components/search/style';

function OptionBar() {
  return (
    <>
      <SearchCategoryLayout>
        <SearchTypeCheckBox searchBoxName="Top" />
        <SearchTypeCheckBox searchBoxName="People" />
        <SearchTypeCheckBox searchBoxName="Clubs" />
        <SearchTypeCheckBox searchBoxName="Rooms" />
        <SearchTypeCheckBox searchBoxName="Events" />
      </SearchCategoryLayout>
    </>
  );
}

export default OptionBar;
