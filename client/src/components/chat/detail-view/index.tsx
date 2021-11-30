/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
import React, {
  useEffect, useRef, useReducer, useState,
} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getChattingLog, setUnCheckedMsg0 } from '@api/chat';
import { ChatRoomsLayout } from '@components/chat/style';
import ChatRoomHeader from '@src/components/chat/detail-view/header';
import ChatRoomFooter from '@src/components/chat/detail-view/footer';
import userState from '@atoms/user';
import roomDocumentIdState from '@atoms/room-document-id';
import roomViewState from '@atoms/room-view-type';
import useChatSocket from '@src/utils/chat-socket';
import isOpenRoomState from '@atoms/is-open-room';
import NotFoundChatView from '@src/components/chat/not-found-view';
import LoadingSpinner from '@styles/loading-spinner';
import { chatReducer, initialState } from './reducer';
import {
  Chat, Message, UserProfile, DateDiv, ObserverBlock, ChattingLog,
} from './style';

type urlParams = { chatDocumentId: string };

interface IChattingLog {
  message: string,
  profileUrl: string,
  userName: string,
  userDocumentId: string,
  date: string,
  linkTo: string,
}

function ChatRoomDetailView() {
  const setRoomView = useSetRecoilState(roomViewState);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const { chatDocumentId } = useParams<urlParams>();
  const location = useLocation<any>();
  const user = useRecoilValue(userState);
  const chattingLogDiv = useRef<HTMLDivElement>(null);
  const chatSocket = useChatSocket();
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);
  const [chatState, dispatch] = useReducer(chatReducer, initialState);
  const targetRef = useRef<HTMLDivElement>(null);
  const [nowFetching, setNowFetching] = useState(true);
  let previousY = 0;
  let previousRatio = 0;

  const addChattingLog = (chatLog: any) => {
    dispatch({ type: 'ADD_CHATTING_LOG', payload: { chatLog } });
    chattingLogDiv.current!.scrollTop = chattingLogDiv.current!.scrollHeight - chattingLogDiv.current!.clientHeight;
  };

  const onIntersect = async (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const currentY = entry.boundingClientRect.y;
      const currentRatio = entry.intersectionRatio;
      const { isIntersecting } = entry;

      if (currentY > previousY && isIntersecting) {
        if (currentRatio > previousRatio && !nowFetching) {
          setNowFetching(true);
        }
      }
      previousY = currentY;
      previousRatio = currentRatio;
    });
  };

  const moveToLink = (linkTo: string) => {
    if (!linkTo) return;
    setRoomView('inRoomView');
    setRoomDocumentId(linkTo);
    setIsOpenRoom(true);
  };

  useEffect(() => {
    if (!location.state) return;
    if (nowFetching) {
      getChattingLog(chatDocumentId, chatState.chattingLog.length)
        .then((res: any) => {
          setNowFetching(false);
          dispatch({ type: 'UPDATE', payload: { responseChattingLog: res.chattingLog, participantsInfo: location.state.participantsInfo, user } });
        });
    }
  }, [nowFetching]);

  useEffect(() => {
    setUnCheckedMsg0(chatDocumentId, user.userDocumentId);

    return () => {
      setUnCheckedMsg0(chatDocumentId, user.userDocumentId).then(() => {

      });
    };
  }, []);

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.emit('chat:roomJoin', chatDocumentId);
    chatSocket.on('chat:sendMsg', (payload: any) => {
      dispatch({ type: 'ADD_CHATTING_LOG', payload: { chatLog: payload } });
    });
    return () => {
      chatSocket.off('chat:sendMsg');
      chatSocket.emit('chat:leave', chatDocumentId);
    };
  }, [chatSocket]);

  if (!location.state) {
    return (<NotFoundChatView />);
  }

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
    return () => observer?.disconnect();
  }, [targetRef.current]);

  return (
    <ChatRoomsLayout>
      <ChatRoomHeader participantsInfo={location.state.participantsInfo} />
      <ChattingLog ref={chattingLogDiv}>
        {chatState.chattingLog.map(({
          message, profileUrl, userName, userDocumentId, date, linkTo,
        } : IChattingLog, index: number) => (
          <Chat key={index} isMyMsg={userDocumentId === user.userDocumentId}>
            <UserProfile src={profileUrl} />
            <Message isMyMsg={userDocumentId === user.userDocumentId} onClick={() => moveToLink(linkTo)}>
              {userDocumentId === user.userDocumentId
                ? <p style={{ color: '#598272', marginBottom: '0px' }}>Me</p>
                : <p style={{ color: '#4A6970', marginBottom: '0px' }}>{userName}</p>}
              <p>{`${message}`}</p>
            </Message>
            <DateDiv><span>{date}</span></DateDiv>
          </Chat>
        ))}
        <ObserverBlock ref={targetRef}>
          {nowFetching && <LoadingSpinner />}
        </ObserverBlock>
      </ChattingLog>
      <ChatRoomFooter
        addChattingLog={addChattingLog}
        chatDocumentId={chatDocumentId}
        chatSocket={chatSocket}
        participants={location.state.participantsInfo.map((participant: any) => participant.userDocumentId)}
      />
    </ChatRoomsLayout>
  );
}

export default ChatRoomDetailView;
