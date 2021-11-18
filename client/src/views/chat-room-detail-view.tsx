/* eslint-disable prefer-template */
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ChatRoomsLayout, ChattingLog } from '@components/chat/style';
import ChatRoomHeader from '@components/chat/chat-room-header';
import ChatRoomFooter from '@components/chat/chat-room-footer';

type urlParams = { chatDocumentId: string };

function ChatRoomDetailView() {
  const { chatDocumentId } = useParams<urlParams>();
  const location = useLocation<any>();
  const [chattingLog, setChattingLog] = useState<any>([]);

  const addChattingLog = (message: string) => {
    setChattingLog([...chattingLog, message]);
  };

  console.log(chatDocumentId);

  return (
    <ChatRoomsLayout>
      <ChatRoomHeader participantsInfo={location.state.participantsInfo} />
      <ChattingLog>{chattingLog.map((message: string) => <div style={{ whiteSpace: 'pre-line' }}>{message}</div>)}</ChattingLog>
      <ChatRoomFooter addChattingLog={addChattingLog} />
    </ChatRoomsLayout>
  );
}

export default ChatRoomDetailView;
