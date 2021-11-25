import React from 'react';

import SearchTypeCheckBox from '@components/search/search-type-check-box';
import { SearchCategoryLayout } from '@components/search/style';

function OptionBar() {
  return (
    <>
      <SearchCategoryLayout>
        <SearchTypeCheckBox searchBoxName="All" />
        <SearchTypeCheckBox searchBoxName="People" />
        <SearchTypeCheckBox searchBoxName="Rooms" />
        <SearchTypeCheckBox searchBoxName="Events" />
      </SearchCategoryLayout>
    </>
  );
}

export default OptionBar;
