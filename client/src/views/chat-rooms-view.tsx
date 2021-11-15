/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import userType from '@atoms/user';
import ChatHeader from '@components/chat/chat-header';
import ChatUserCard from '@components/chat/chat-user-card';
import LoadingSpinner from '@common/loading-spinner';
import ScrollBarStyle from '@styles/scrollbar-style';
import { getChatRooms } from '@api/index';

const ChatRoomsLayout = styled.div`
  background-color: #FFFFFF;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  ${ScrollBarStyle};
`;

interface IChatUserType {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
}

interface IChatRoom {
  chatDocumentId: string,
  participants: Array<IChatUserType>
}

function ChatRoomsViews() {
  const [loading, setLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>([]);
  const { userDocumentId } = useRecoilValue(userType);

  useEffect(() => {
    getChatRooms(userDocumentId)
      .then((res: any) => {
        setChatRooms(res);
        setLoading(false);
      });
  }, []);

  if (loading) return (<LoadingSpinner />);
  return (
    <ChatRoomsLayout>
      <ChatHeader />
      {chatRooms?.map((chatRoom: IChatRoom) => <ChatUserCard key={chatRoom.chatDocumentId} participantsInfo={chatRoom.participants} />)}
    </ChatRoomsLayout>
  );
}

export default ChatRoomsViews;
