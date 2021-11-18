/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import userType from '@atoms/user';
import ChatRoomListHeader from '@src/components/chat/chat-list-header';
import ChatUserCard from '@components/chat/chat-user-card';
import { ChatRoomsLayout } from '@components/chat/style';
import LoadingSpinner from '@common/loading-spinner';
import { getChatRooms } from '@api/index';

interface IChatUserType {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
}

interface IChatRoom {
  chatDocumentId: string,
  participants: Array<IChatUserType>,
  lastMsg: string,
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
      <ChatRoomListHeader />
      {chatRooms?.map((chatRoom: IChatRoom) => <ChatUserCard key={chatRoom.chatDocumentId} participantsInfo={chatRoom.participants} lastMsg={chatRoom.lastMsg} />)}
    </ChatRoomsLayout>
  );
}

export default ChatRoomsViews;
