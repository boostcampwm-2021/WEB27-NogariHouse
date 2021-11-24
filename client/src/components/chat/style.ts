import styled from 'styled-components';
import ScrollBarStyle from '@styles/scrollbar-style';

export const ChatRoomsLayout = styled.div`
  background-color: #FFFFFF;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;

  ${ScrollBarStyle};
`;

export const ChatHeaderStyle = styled.div`
  background-color: #B6B6B6;

  width: 100%;
  height: 80px;

  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  p {
    width: auto;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    font-weight: Bold;
    font-size: min(4vw,28px);
    text-align: center;

    margin: 0px;
  }
`;

export const ChattingLog = styled.div`
  width: 100%;
  height: calc(97% - 150px);

  overflow-y: scroll;
`;
