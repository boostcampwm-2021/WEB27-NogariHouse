import React from 'react';

import SearchTypeCheckBox from '@components/search/type-check-box';
import SearchCategoryLayout from '@components/search/option-bar/style';

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
