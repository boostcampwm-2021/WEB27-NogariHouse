/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import userType from '@atoms/user';
import ChatHeader from '@components/chat/chat-header';
import ChatUserCard from '@components/chat/chat-user-card';
import LoadingSpinner from '@common/loading-spinner';
import { getChatRooms } from '@api/index';

const ChatRoomsLayout = styled.div`
  background-color: #FFFFFF;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;
`;

interface IChatRoomType {
  _id: string,
  userName: string,
  profileUrl: string,
}

function ChatRoomsViews() {
  const [loading, setLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState<Array<Array<IChatRoomType>>>([]);
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
      {chatRooms.map((chatRoom:Array<IChatRoomType>) => <ChatUserCard key={chatRoom._id} participantsInfo={chatRoom} />)}
    </ChatRoomsLayout>
  );
}

export default ChatRoomsViews;
