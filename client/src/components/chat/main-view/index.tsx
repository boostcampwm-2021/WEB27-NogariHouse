/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import userState from '@atoms/user';
import unReadMsgCountState from '@atoms/not-read-msg';
import ChatRoomListHeader from '@src/components/chat/main-view/header';
import ChatUserCard from '@src/components/chat/main-view/chat-card';
import { ChatRoomsLayout } from '@components/chat/style';
import LoadingSpinner from '@common/loading-spinner';
import { getChatRooms } from '@api/chat';
import { makeDateToHourMinute, makeDateToMonthDate } from '@utils/index';
import useChatSocket from '@src/utils/chat-socket';
import { IUser } from '@interfaces/index';
import ChatUserCardWrap from './style';

interface IChatRoom {
  chatDocumentId: string,
  participants: Array<IUser>,
  lastMsg: string,
  recentActive: Date,
  unCheckedMsg: number,
}

function ChatRoomsViews() {
  const [loading, setLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>([]);
  const [unReadMsgCount, setUnReadMsgCount] = useRecoilState(unReadMsgCountState);
  const { userDocumentId } = useRecoilValue(userState);
  const history = useHistory();
  const socket = useChatSocket();

  const chatUserCardClickEvent = (chatDocumentId: string, participantsInfo: Array<IUser>, unCheckedMsg: number) => {
    setUnReadMsgCount(unReadMsgCount - unCheckedMsg);
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

  const newChatRooms = (payload: any) => {
    const { chatDocumentId, participantsInfo } = payload;
    setChatRooms((oldRooms: any) => [{
      chatDocumentId, participants: participantsInfo, lastMsg: '', recentActive: new Date(), unCheckedMsg: 0,
    }, ...oldRooms]);
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
    socket.on('chat:alertMsg', setNewRooms);
    socket.on('chat:makeChat', newChatRooms);
    return () => {
      socket.off('chat:alertMsg');
      socket.off('chat:makeChat');
    };
  }, [socket]);

  if (loading) return (<LoadingSpinner />);
  return (
    <ChatRoomsLayout>
      <ChatRoomListHeader />
      <ChatUserCardWrap>
        {chatRooms?.map((chatRoom: IChatRoom) => {
          const date = new Date(chatRoom.recentActive);
          return (
            <ChatUserCard
              key={chatRoom.chatDocumentId}
              clickEvent={() => chatUserCardClickEvent(chatRoom.chatDocumentId, chatRoom.participants, chatRoom.unCheckedMsg)}
              participantsInfo={chatRoom.participants}
              lastMsg={chatRoom.lastMsg}
              recentActive={date.getDate() === (new Date()).getDate() ? makeDateToHourMinute(date) : makeDateToMonthDate(date)}
              unCheckedMsg={chatRoom.unCheckedMsg}
            />
          );
        })}
      </ChatUserCardWrap>
    </ChatRoomsLayout>
  );
}

export default ChatRoomsViews;
