import { useRef } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';

import userType from '@atoms/user';
import { makeDateToHourMinute } from '@utils/index';
import { postChattingMsg } from '@api/index';

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
  const messageInput = useRef(null);
  const user = useRecoilValue(userType);

  const sendEvent = async () => {
    const message = (messageInput as any).current.value;
    (messageInput as any).current.value = '';
    const res : any = await postChattingMsg({ userDocumentId: user.userDocumentId, message, date: new Date() }, chatDocumentId, user.userDocumentId);
    if (!res.ok) return;
    const chatLog = {
      userDocumentId: user.userDocumentId, userName: user.userName, profileUrl: user.profileUrl, message, date: makeDateToHourMinute(new Date()),
    };

    chatSocket?.emit('chat:sendMsg', {
      userDocumentId: user.userDocumentId,
      userName: user.userName,
      profileUrl: user.profileUrl,
      message,
      date: makeDateToHourMinute(new Date()),
      chatDocumentId,
    });
    chatSocket?.emit('chat:alertMsg', { participants, chatDocumentId });
    addChattingLog(chatLog);
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
      <MsgInput ref={messageInput} />
      <SendBtnDiv onClick={sendEvent}><FiSend size={32} /></SendBtnDiv>
    </ChatRoomFooterStyle>
  );
}
