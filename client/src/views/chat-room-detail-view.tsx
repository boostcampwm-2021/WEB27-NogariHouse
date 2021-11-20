/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable max-len */
/* eslint-disable prefer-template */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { ChatRoomsLayout, ChattingLog } from '@components/chat/style';
import ChatRoomHeader from '@components/chat/chat-room-header';
import ChatRoomFooter from '@components/chat/chat-room-footer';
import userType from '@atoms/user';

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
  }
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  margin: 10px;

  border-radius: 15px;
`;

interface IChattingLog {
  message: string,
  profileUrl: string,
  userName: string,
  userDocumentId: string,
}

function ChatRoomDetailView() {
  const { chatDocumentId } = useParams<urlParams>();
  const location = useLocation<any>();
  const [chattingLog, setChattingLog] = useState<any>([{
    message: 'test', userDocumentId: '1', profileUrl: 'https://avatars.githubusercontent.com/u/51700274?v=4', userName: 'caj',
  }]);
  const user = useRecoilValue(userType);
  const chattingLogDiv = useRef(null);

  console.log(chatDocumentId);

  const addChattingLog = (message: string) => {
    setChattingLog([...chattingLog, message]);
  };

  useEffect(() => {
    (chattingLogDiv as any).current.scrollTop = (chattingLogDiv as any).current.scrollHeight - (chattingLogDiv as any).current.clientHeight;
  }, [chattingLog]);

  return (
    <ChatRoomsLayout>
      <ChatRoomHeader participantsInfo={location.state.participantsInfo} />
      <ChattingLog ref={chattingLogDiv}>
        {chattingLog.map(({
          message, profileUrl, userName, userDocumentId,
        } : IChattingLog, index: number) => (
          <Chat key={index} isMyMsg={userDocumentId === user.userDocumentId}>
            <UserProfile src={profileUrl} />
            <Message isMyMsg={userDocumentId === user.userDocumentId}>
              <p>{`${userName}\n${message}`}</p>
            </Message>
          </Chat>
        ))}
      </ChattingLog>
      <ChatRoomFooter addChattingLog={addChattingLog} />
    </ChatRoomsLayout>
  );
}

export default ChatRoomDetailView;
