/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BiMessageSquareAdd } from 'react-icons/bi';

import { ChatHeaderStyle } from '@components/chat/style';
import { makeIconToLink } from '@utils/index';

const ChatHeaderBtnDiv = styled.div`
  margin-right: 15px;
  svg{
    margin: 0px 10px;

    width: min(5vw, 32px);
    &:hover {
      filter: invert(88%) sepia(1%) saturate(121%) hue-rotate(12deg) brightness(62%) contrast(79%);
    }
  }
`;

const chatRoomHeaderBtns = [
  {
    Component: BiMessageSquareAdd, link: '/chat-rooms/new', key: 'newChat', size: 32,
  },
  {
    Component: FiMoreHorizontal, link: '/chat-rooms/new', key: 'selector', size: 32,
  },
];

export default function ChatRoomListHeader() {
  return (
    <ChatHeaderStyle>
      <p>BACK CHANNEL</p>
      <ChatHeaderBtnDiv>
        {chatRoomHeaderBtns.map(makeIconToLink)}
      </ChatHeaderBtnDiv>
    </ChatHeaderStyle>
  );
}
