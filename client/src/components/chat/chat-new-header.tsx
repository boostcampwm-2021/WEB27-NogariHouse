/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import useChatSocket from '@utils/chat-socket';
import { postChatRoom } from '@api/index';
import selectedUserType from '@atoms/chat-selected-users';
import userType from '@atoms/user';

const ChatNewHeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #B6B6B6;
`;

const ChatNewHeader = styled.div`
  width: 90%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  p{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;

    font-weight: Bold;
    font-size: min(4vw,28px);

    margin: 0px;
  }
`;

const BtnStyle = styled.button`
  font-size: min(4vw,28px);

  background-color: transparent;
  border: none;
  color: #58964F;

  &:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

const DoneBtn = () => {
  const [selectedUserList, setSelectedUserList] = useRecoilState(selectedUserType);
  const user = useRecoilValue(userType);
  const history = useHistory();
  const chatSocket = useChatSocket();

  const makeChatRoom = () => {
    if (selectedUserList.length === 0) return;
    postChatRoom([...selectedUserList.map((selectedUser: any) => selectedUser.userDocumentId), user.userDocumentId])
      .then((res: any) => {
        history.push({
          pathname: `/chat-rooms/${res.chatRoomId}`,
          state: { participantsInfo: selectedUserList },
        });
        setSelectedUserList([]);
        chatSocket.emit('chat:makeChat', {
          chatDocumentId: res.chatRoomId,
          participantsInfo: [...selectedUserList, { userDocumentId: user.userDocumentId, userName: user.userName, profileUrl: user.profileUrl }],
        });
      });
  };

  return (
    <BtnStyle onClick={makeChatRoom}>Done</BtnStyle>
  );
};

const CancelBtn = () => {
  const [selectedUserList, setSelectedUserList] = useRecoilState(selectedUserType);
  const history = useHistory();

  const cancelEvent = () => {
    setSelectedUserList([]);
    history.push({ pathname: '/chat-rooms' });
  };

  return (<BtnStyle onClick={cancelEvent}>Cancel</BtnStyle>);
};

export default function NewChatRoomHeader() {
  return (
    <ChatNewHeaderWrap>
      <ChatNewHeader>
        <CancelBtn />
        <p>NEW MESSAGE</p>
        <DoneBtn />
      </ChatNewHeader>
    </ChatNewHeaderWrap>

  );
}
