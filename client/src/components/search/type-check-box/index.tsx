import React from 'react';
import { useRecoilState } from 'recoil';

import searchTypeState from '@atoms/search-type';
import { Box, BoxText } from './style';

interface SearchTypeCheckBoxProps{
    searchBoxName : 'All' | 'People' | 'Rooms' | 'Events'
}

function SearchTypeCheckBox({ searchBoxName } : SearchTypeCheckBoxProps) {
  const [searchType, setSearchType] = useRecoilState(searchTypeState);

  const onClick = () => {
    setSearchType(searchBoxName);
  };

  return (
    <Box isSelected={searchType === searchBoxName} onClick={onClick}>
      <BoxText>{searchBoxName}</BoxText>
    </Box>
  );
}

export default SearchTypeCheckBox;
