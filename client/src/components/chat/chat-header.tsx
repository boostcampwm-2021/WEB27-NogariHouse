/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  FiMoreHorizontal, FiMessageSquare,
} from 'react-icons/fi';
import { useRecoilValue } from 'recoil';

import { makeIconToLink } from '@utils/index';
import { postChatRoom } from '@api/index';
import selectedUserType from '@atoms/chat-selected-users';
import userType from '@atoms/user';

const ChatHeaderStyle = styled.div`
  background-color: #B6B6B6;

  width: 100%;
  height: 80px;

  position: relative;

  p {
    width: 250px;

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
      filter: invert(88%) sepia(1%) saturate(121%) hue-rotate(12deg) brightness(62%) contrast(79%);
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

const BtnStyle = css`
  position: absolute;
  transform: translateY(30px);

  font-size: 20px;

  background-color: transparent;
  border: none;

  &:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

const CanCelBtn = styled.button`
  left: 5%;
  color: #58964F;
  ${BtnStyle};
`;

const DoneBtnStyle = styled.button`
  right: 5%;
  color: #58964F;
  ${BtnStyle};
`;

const DoneBtn = () => {
  const selectedUserList = useRecoilValue(selectedUserType);
  const user = useRecoilValue(userType);
  const history = useHistory();

  const makeChatRoom = () => {
    if (selectedUserList.length === 0) return;
    postChatRoom([...selectedUserList.map((selectedUser: any) => selectedUser.userDocumentId), user.userDocumentId])
      .then((res: any) => {
        history.push({ pathname: `/chat-rooms/${res.chatRoomId}` });
      });
  };

  return (
    <DoneBtnStyle onClick={makeChatRoom}>Done</DoneBtnStyle>
  );
};

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
      <Link to="/chat-rooms"><CanCelBtn>Cancel</CanCelBtn></Link>
      <p>NEW MESSAGE</p>
      <DoneBtn />
    </ChatHeaderStyle>
  );
}
