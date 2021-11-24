/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
import React, {
  useEffect, useRef, useReducer,
} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getChattingLog, setUnCheckedMsg0 } from '@api/index';
import { ChatRoomsLayout, ChattingLog } from '@components/chat/style';
import ChatRoomHeader from '@components/chat/chat-room-header';
import ChatRoomFooter from '@components/chat/chat-room-footer';
import userState from '@atoms/user';
import roomDocumentIdState from '@atoms/room-document-id';
import roomViewState from '@atoms/room-view-type';
import useChatSocket from '@src/utils/chat-socket';
import { chatReducer, initialState } from '@components/chat/reducer';

type urlParams = { chatDocumentId: string };

const Chat = styled.div< { isMyMsg: boolean } >`
  display: flex;
  width: auto;
  max-width: 99%;

  margin: 10px;
  ${({ isMyMsg }: any) => {
    if (isMyMsg) return 'flex-direction: row-reverse';
    return '';
  }};
`;

const Message = styled.div< { isMyMsg: boolean } >`
  white-space: pre-line;

  width: auto;
  max-width: 60%;
  word-break: break-all;

  border-radius: 20px;

  background-color: ${({ isMyMsg }: any) => {
    if (isMyMsg) return '#F1F0E4';
    return '#C4CDC0';
  }};

  p {
    margin: 10px;
    &:hover {
      cursor: default;
    }
  }
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  margin: 10px;

  border-radius: 15px;
`;

const DateDiv = styled.div`
  color: #CED3C2;
  font-size: 15px;

  display: flex;
  align-items: end;
  margin: 5px;
`;

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
  const chattingLogDiv = useRef(null);
  const chatSocket = useChatSocket();
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  const addChattingLog = (chatLog: any) => {
    dispatch({ type: 'ADD_CHATTING_LOG', payload: { chatLog } });
  };

  const moveToLink = (linkTo: string) => {
    if (!linkTo) return;
    setRoomDocumentId(linkTo);
    setRoomView('inRoomView');
  };

  useEffect(() => {
    getChattingLog(chatDocumentId)
      .then((res: any) => {
        setUnCheckedMsg0(chatDocumentId, user.userDocumentId);
        dispatch({ type: 'UPDATE', payload: { responseChattingLog: res.chattingLog, participantsInfo: location.state.participantsInfo, user } });
        (chattingLogDiv as any).current.scrollTop = (chattingLogDiv as any).current.scrollHeight - (chattingLogDiv as any).current.clientHeight;
      });
    return () => {
      setUnCheckedMsg0(chatDocumentId, user.userDocumentId).then(() => {

      });
    };
  }, [chatDocumentId]);

  useEffect(() => {
    (chattingLogDiv as any).current.scrollTop = (chattingLogDiv as any).current.scrollHeight - (chattingLogDiv as any).current.clientHeight;
  }, [chatState.chattingLog]);

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.emit('chat:roomJoin', chatDocumentId);
    chatSocket.on('chat:sendMsg', (payload: any) => {
      dispatch({ type: 'ADD_CHATTING_LOG', payload: { chatLog: payload } });
    });
    return () => {
      chatSocket.emit('chat:leave', chatDocumentId);
    };
  }, [chatSocket]);

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
