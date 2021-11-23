/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import userState from '@atoms/user';
import ChatRoomListHeader from '@components/chat/chat-list-header';
import ChatUserCard from '@components/chat/chat-user-card';
import { ChatRoomsLayout } from '@components/chat/style';
import LoadingSpinner from '@common/loading-spinner';
import { getChatRooms } from '@api/index';
import { makeDateToHourMinute, makeDateToMonthDate } from '@utils/index';
import useChatSocket from '@src/utils/chat-socket';

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
  const { userDocumentId } = useRecoilValue(userState);
  const history = useHistory();
  const socket = useChatSocket();

  const clickEvent = (chatDocumentId: string, participantsInfo: Array<IChatUserType>) => {
    history.push({
      pathname: `/chat-rooms/${chatDocumentId}`,
      state: { participantsInfo },
    });
  };

  const setNewRooms = (payload: any) => {
    const {
      chatDocumentId, lastMsg, recentActive, unCheckedMsg,
    } = payload;
    setChatRooms((oldRooms) => {
      const newChatRooms = oldRooms.reduce((acc: any, cur) => {
        if (cur.chatDocumentId !== chatDocumentId) acc.push(cur);
        else {
          acc.push({
            chatDocumentId, lastMsg, recentActive, unCheckedMsg, participants: cur.participants,
          });
        }
        return acc;
      }, []);
      return (newChatRooms.sort((a: any, b: any) => {
        if (a.recentActive < b.recentActive) return 1;
        if (a.recentActive > b.recentActive) return -1;
        return 0;
      }));
    });
  };

  useEffect(() => {
    getChatRooms(userDocumentId)
      .then((res: any) => {
        setChatRooms(res);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('chat:viewJoin', userDocumentId);
    socket.on('chat:alertMsg', setNewRooms);
  }, [socket]);

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
