import { css } from 'styled-components';

export default css`
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background: #f1f0e4;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #DCD9CD;

    &:hover {
      background-color: #CECABB;
    }
  }
  &::-webkit-scrollbar-track {
    background: #f1f0e4;
  }
  overflow-y: scroll;
`;
