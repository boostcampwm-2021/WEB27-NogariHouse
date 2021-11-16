import styled from 'styled-components';
import {
  FiMoreHorizontal, FiMessageSquare,
} from 'react-icons/fi';

import { makeIconToLink } from '@utils/index';

const ChatHeaderStyle = styled.div`
  background-color: #B6B6B6;

  width: 100%;
  height: 110px;

  position: relative;

  p {
    position: absolute;
    top: 35px;
    left:50%;
    transform: translateX(-50%);

    font-family: 'Nunito';
    font-style: Bold;
    font-size: 32px;

    margin: 0px;
  }
`;

const ChatHeaderBtnDiv = styled.div`
  position: absolute;
  top: 35px;
  right: 5%;

  svg{
    margin: 0px 10px 0px 10px;
    &:hover {
      filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
    }
  }
`;

const chatHeaderBtn = [
  {
    Component: FiMessageSquare, link: '/chat-rooms/new', key: 'newChat', size: 32,
  },
  {
    Component: FiMoreHorizontal, link: '//chat-rooms/new', key: 'selector', size: 32,
  },
];

function ChatHeader() {
  return (
    <ChatHeaderStyle>
      <p>BackChannel</p>
      <ChatHeaderBtnDiv>
        {chatHeaderBtn.map(makeIconToLink)}
      </ChatHeaderBtnDiv>
    </ChatHeaderStyle>
  );
}

export default ChatHeader;
