import React from 'react';
import styled from 'styled-components';

import ChatHeader from '@components/chat/chat-header';
import ChatUserCard from '@components/chat/chat-user-card';

const ChatRoomsLayout = styled.div`
  background-color: #FFFFFF;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;
`;

const dummyData = [
  { _id: 'hello', userName: 'helo', profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/cat.jpeg' },
  { _id: 'hello', userName: 'test!', profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/puppy2.jpeg' },
  { _id: 'hello', userName: 'ChanHUi', profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/puppy2.jpeg' },
];

// const dummyData = [
//   { _id: 'hello', userName: 'helo', profileUrl: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/cat.jpeg' },
// ];

function ChatRoomsViews() {
  return (
    <ChatRoomsLayout>
      <ChatHeader />
      <ChatUserCard participantsInfo={dummyData} />
    </ChatRoomsLayout>
  );
}

export default ChatRoomsViews;
