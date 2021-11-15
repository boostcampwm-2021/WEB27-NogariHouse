import React from 'react';
import styled from 'styled-components';

import ChatHeader from '@components/chat/chat-header';

const ChatRoomsLayout = styled.div`
  background-color: #FFFFFF;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;
`;

function ChatRoomsViews() {
  return (
    <ChatRoomsLayout>
      <ChatHeader />
    </ChatRoomsLayout>
  );
}

export default ChatRoomsViews;
