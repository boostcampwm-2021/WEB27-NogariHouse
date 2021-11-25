import { useRef } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';

import userType from '@atoms/user';
import { makeDateToHourMinute } from '@utils/index';

const ChatRoomFooterStyle = styled.div`
  position: absolute;
  bottom: 3%;

  width: 99%;
  height: 50px;
`;

const MsgInput = styled.textarea`
  position: absolute;
  left: 8%;

  width: 70%;
  height: auto;

  border: none;
  border-radius: 10px;
  background-color: #C4C4C4;

  font-family: 'Nunito';
  font-size: 20px;

  &:focus {
    outline: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SendBtnDiv = styled.div`
  position: absolute;
  right: 8%;

  width: 32px;
  height: 32px;
  transform: translateY(10px);
`;

export default function ChatRoomFooter({
  addChattingLog, chatDocumentId, chatSocket, participants,
}: any) {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const user = useRecoilValue(userType);

  const sendEvent = async () => {
    if (!messageInputRef.current) return;
    const message = messageInputRef.current.value;
    messageInputRef.current.value = '';

    chatSocket?.emit('chat:sendMsg', {
      userDocumentId: user.userDocumentId,
      userName: user.userName,
      profileUrl: user.profileUrl,
      message,
      date: makeDateToHourMinute(new Date()),
      chatDocumentId,
    });
    chatSocket?.emit('chat:alertMsg', { participants, chatDocumentId });
    chatSocket?.emit('chat:updateCount', participants);
    addChattingLog({
      userDocumentId: user.userDocumentId, userName: user.userName, profileUrl: user.profileUrl, message, date: makeDateToHourMinute(new Date()),
    });
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        sendEvent();
      }
    }
  };

  return (
    <ChatRoomFooterStyle onKeyPress={keyPressHandler}>
      <MsgInput ref={messageInputRef} />
      <SendBtnDiv onClick={sendEvent}><FiSend size={32} /></SendBtnDiv>
    </ChatRoomFooterStyle>
  );
}
