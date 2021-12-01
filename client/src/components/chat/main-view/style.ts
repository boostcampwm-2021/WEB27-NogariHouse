import styled from 'styled-components';
import { whiteScroll } from '@styles/scrollbar-style';

const ChatUserCardWrap = styled.div`
  height: calc(100% - 80px);
  width: 100%;

  overflow-x: hidden;
  ${whiteScroll};
`;

export default ChatUserCardWrap;
