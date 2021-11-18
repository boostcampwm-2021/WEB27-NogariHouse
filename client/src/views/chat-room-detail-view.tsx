import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ChatRoomsLayout } from '@components/chat/style';
import ChatRoomHeader from '@components/chat/chat-room-header';

type urlParams = { chatDocumentId: string };

function ChatRoomDetailView() {
  const { chatDocumentId } = useParams<urlParams>();
  const location = useLocation<any>();

  return (
    <ChatRoomsLayout>
      <ChatRoomHeader participantsInfo={location.state.participantsInfo} />
      <h1>{chatDocumentId}</h1>
    </ChatRoomsLayout>
  );
}

export default ChatRoomDetailView;
