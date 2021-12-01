import { useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';

import userType from '@atoms/user';
import chatSocketMessage from '@constants/socket-message/chat';
import { makeDateToHourMinute } from '@utils/index';
import { ChatRoomFooterStyle, MsgInput, SendBtnDiv } from './style';

export default function ChatRoomFooter({
  addChattingLog, chatDocumentId, chatSocket, participants,
}: any) {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const user = useRecoilValue(userType);

  const sendEvent = async () => {
    if (!messageInputRef.current) return;
    const message = messageInputRef.current.value;
    const nowDate = new Date();
    messageInputRef.current.value = '';

    if (message.trim() === '') return;

    chatSocket?.emit(chatSocketMessage.sendMsg, {
      userDocumentId: user.userDocumentId,
      userName: user.userName,
      profileUrl: user.profileUrl,
      message,
      date: makeDateToHourMinute(nowDate),
      chatDocumentId,
      key: `${nowDate.getTime()}_${user.userDocumentId}`,
    });
    chatSocket?.emit(chatSocketMessage.alertMsg, { participants, chatDocumentId });
    chatSocket?.emit(chatSocketMessage.updateCount, participants, chatDocumentId);
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
