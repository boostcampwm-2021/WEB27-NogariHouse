/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import styled, { css } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import { ChatHeaderStyle } from '@components/chat/style';
import { postChatRoom } from '@api/index';
import selectedUserType from '@atoms/chat-selected-users';
import userType from '@atoms/user';

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

const CanCelBtnStyle = styled.button`
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
  const [selectedUserList, setSelectedUserList] = useRecoilState(selectedUserType);
  const user = useRecoilValue(userType);
  const history = useHistory();

  const makeChatRoom = () => {
    if (selectedUserList.length === 0) return;
    postChatRoom([...selectedUserList.map((selectedUser: any) => selectedUser.userDocumentId), user.userDocumentId])
      .then((res: any) => {
        setSelectedUserList([]);
        history.push({ pathname: `/chat-rooms/${res.chatRoomId}` });
      });
  };

  return (
    <DoneBtnStyle onClick={makeChatRoom}>Done</DoneBtnStyle>
  );
};

const CancelBtn = () => {
  const [selectedUserList, setSelectedUserList] = useRecoilState(selectedUserType);
  const history = useHistory();

  const cancelEvent = () => {
    setSelectedUserList([]);
    history.push({ pathname: '/chat-rooms' });
  };

  return (<CanCelBtnStyle onClick={cancelEvent}>Cancel</CanCelBtnStyle>);
};

export default function NewChatRoomHeader() {
  return (
    <ChatHeaderStyle>
      <CancelBtn />
      <p>NEW MESSAGE</p>
      <DoneBtn />
    </ChatHeaderStyle>
  );
}
