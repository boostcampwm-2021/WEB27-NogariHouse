/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import userType from '@atoms/user';
import ChatRoomListHeader from '@components/chat/chat-list-header';
import ChatUserCard from '@components/chat/chat-user-card';
import { ChatRoomsLayout } from '@components/chat/style';
import LoadingSpinner from '@common/loading-spinner';
import { getChatRooms } from '@api/index';
import { makeDateToHourMinute, makeDateToMonthDate } from '@utils/index';

interface IChatUserType {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
}

interface IChatRoom {
  chatDocumentId: string,
  participants: Array<IChatUserType>,
  lastMsg: string,
  recentActive: Date,
  unCheckedMsg: number,
}

function ChatRoomsViews() {
  const [loading, setLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>([]);
  const { userDocumentId } = useRecoilValue(userType);
  const history = useHistory();

  const clickEvent = (chatDocumentId: string, participantsInfo: Array<IChatUserType>) => {
    history.push({
      pathname: `/chat-rooms/${chatDocumentId}`,
      state: { participantsInfo },
    });
  };

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
      {chatRooms?.map((chatRoom: IChatRoom) => {
        const date = new Date(chatRoom.recentActive);
        return (
          <ChatUserCard
            key={chatRoom.chatDocumentId}
            clickEvent={
        () => clickEvent(chatRoom.chatDocumentId, chatRoom.participants)
        }
            participantsInfo={chatRoom.participants}
            lastMsg={chatRoom.lastMsg}
            recentActive={date.getDate() === (new Date()).getDate() ? makeDateToHourMinute(date) : makeDateToMonthDate(date)}
            unCheckedMsg={chatRoom.unCheckedMsg}
          />
        );
      })}
    </ChatRoomsLayout>
  );
}

export default ChatRoomsViews;
