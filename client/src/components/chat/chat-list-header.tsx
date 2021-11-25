/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import styled from 'styled-components';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { ChatHeaderStyle } from '@components/chat/style';

const ChatHeaderBtnDiv = styled.div`
  margin-right: 10%;
  svg{
    margin: 0px 10px;

    width: min(5vw, 32px);
    &:hover {
      filter: invert(88%) sepia(1%) saturate(121%) hue-rotate(12deg) brightness(62%) contrast(79%);
    }
  }
`;

export default function ChatRoomListHeader() {
  return (
    <ChatHeaderStyle>
      <p>BACK CHANNEL</p>
      <ChatHeaderBtnDiv>
        <Link to="/chat-rooms/new">
          <BiMessageSquareAdd size={32} color="black" />
        </Link>
      </ChatHeaderBtnDiv>
    </ChatHeaderStyle>
  );
}
