import ScrollBarStyle from '@styles/scrollbar-style';
import styled from 'styled-components';

const ChatRoomsLayout = styled.div`
  background-color: #FFFFFF;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  ${ScrollBarStyle};
`;

export default ChatRoomsLayout;
