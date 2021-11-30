import styled from 'styled-components';
import { whiteScroll } from '@styles/scrollbar-style';

export const Chat = styled.div< { isMyMsg: boolean } >`
  display: flex;
  width: auto;
  max-width: 99%;

  margin: 10px;
  ${({ isMyMsg }: any) => {
    if (isMyMsg) return 'flex-direction: row-reverse';
    return '';
  }};
`;

export const Message = styled.div< { isMyMsg: boolean } >`
  white-space: pre-line;

  width: auto;
  max-width: 60%;
  word-break: break-all;

  border-radius: 20px;

  background-color: ${({ isMyMsg }: any) => {
    if (isMyMsg) return '#F1F0E4';
    return '#C4CDC0';
  }};

  p {
    margin: 10px;
    &:hover {
      cursor: default;
    }
  }
`;

export const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  margin: 10px;

  border-radius: 15px;
`;

export const DateDiv = styled.div`
  color: #CED3C2;
  font-size: 15px;

  display: flex;
  align-items: end;
  margin: 5px;
`;

export const ObserverBlock = styled.div`
  position: relative;
  width: 100%;
  min-height: 50px;
`;

export const ChattingLog = styled.div`
  width: 100%;
  height: calc(97% - 150px);

  display: flex;
  flex-direction: column-reverse;

  ${whiteScroll};
`;
