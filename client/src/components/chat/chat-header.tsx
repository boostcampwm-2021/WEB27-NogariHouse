import styled from 'styled-components';
import {
  FiMoreHorizontal, FiMessageSquare,
} from 'react-icons/fi';

import { makeIconToLink } from '@utils/index';

const ChatHeaderStyle = styled.div`
  background-color: #B6B6B6;

  width: 100%;
  height: 80px;

  position: relative;

  p {
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);

    font-family: 'Nunito';
    font-weight: Bold;
    font-size: 32px;

    margin: 0px;
  }
`;

const ChatHeaderBtnDiv = styled.div`
  position: absolute;
  top: 25px;
  right: 5%;

  svg{
    margin: 0px 10px 0px 10px;
    &:hover {
      filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
    }
  }
`;

const chatRoomHeaderBtns = [
  {
    Component: FiMessageSquare, link: '/chat-rooms/new', key: 'newChat', size: 32,
  },
  {
    Component: FiMoreHorizontal, link: '/chat-rooms/new', key: 'selector', size: 32,
  },
];

type btnDivProps = {dir: 'left' | 'right'};

const BtnDiv = styled.button`
  ${(props : btnDivProps) => {
    if (props.dir === 'left') return 'left: 5%; color: #58964F;';
    return 'right: 5%; color: #D7D7D7;';
  }}

  position: absolute;
  transform: translateY(30px);

  font-size: 20px;

  background-color: transparent;
  border: none;
`;

export function ChatRoomHeader() {
  return (
    <ChatHeaderStyle>
      <p>BACK CHANNEL</p>
      <ChatHeaderBtnDiv>
        {chatRoomHeaderBtns.map(makeIconToLink)}
      </ChatHeaderBtnDiv>
    </ChatHeaderStyle>
  );
}

export function NewChatRoomHeader() {
  return (
    <ChatHeaderStyle>
      <BtnDiv dir="left">Cancel</BtnDiv>
      <p>NEW MESSAGE</p>
      <BtnDiv dir="right">Done</BtnDiv>
    </ChatHeaderStyle>
  );
}
