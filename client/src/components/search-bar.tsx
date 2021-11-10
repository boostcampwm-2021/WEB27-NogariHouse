import React from 'react';
import styled from 'styled-components';

const SearchBarLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 90%;
  height: 48px;
  margin-bottom: 10px;
  padding: 0 5%;
  border: none;
  border-radius: 30px;
  background-color: #E0DCCE;
  font-size: 20px;
  &:focus {outline:none;}
`;

const SearchCategoryLayout = styled.div`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 30px;
  background-color: #E9E5E5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
