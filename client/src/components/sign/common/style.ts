import scrollbarStyle from '@src/assets/styles/scrollbar-style';
import styled from 'styled-components';

export const SignBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
  ${scrollbarStyle};

  button {
    margin-top: 30px;
  }
`;

export const TitleDiv = styled.div`
  width: max-content;
  font-size: min(6vw, 60px);
  text-align: center;
  margin-bottom: 10px;
`;
