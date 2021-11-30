import styled from 'styled-components';

import ScrollBarStyle from '@styles/scrollbar-style';

export const SearchViewLayout = styled.div`
  position: absolute;
  height: 80vh;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index:10;
`;

export const SearchBarLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F1F0E4;
  margin-bottom: 10px;
`;

export const SearchInput = styled.input`
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

export const SearchScrollSection = styled.div`
  width: 100%;
  height: 70vh;
  ${ScrollBarStyle};
`;

export const TestBox = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  background-color: white;
`;

export const ItemDiv = styled.div`
  div + div {
  margin-bottom: 10px;
  }
`;

export const ObserverBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;
