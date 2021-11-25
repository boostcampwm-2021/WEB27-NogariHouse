import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import searchTypeState from '@atoms/search-type';

const Box = styled.button`
  width : 25%;
  height : 100%;
  background-color:${(props : {isSelected : boolean}) => (props.isSelected ? '#FFF' : '#E9E5E5')};
  border-radius: 30px;
  display : flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border:none;
  box-shadow: ${(props : {isSelected : boolean}) => (props.isSelected ? '0px 2px 1px' : 'none')};
`;

const BoxText = styled.div`
  font-size: 14px;
`;

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
