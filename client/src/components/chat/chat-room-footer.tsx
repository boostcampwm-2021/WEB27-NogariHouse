import { useRef } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';

const ChatRoomFooterStyle = styled.div`
  position: absolute;
  bottom: 3%;

  width: 99%;
  height: 50px;
`;

const MsgInput = styled.textarea`
  position: absolute;
  left: 8%;

  width: 70%;
  height: auto;

  border: none;
  border-radius: 10px;
  background-color: #C4C4C4;

  font-family: 'Nunito';
  font-size: 20px;

  &:focus {
    outline: 0;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background: #C4C4C4;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #DCD9CD;
  }
  overflow-y: scroll;
`;

const SendBtnDiv = styled.div`
  position: absolute;
  right: 8%;

  width: 32px;
  height: 32px;
  transform: translateY(10px);
`;

export default function ChatRoomFooter({ addChattingLog }: any) {
  const messageInput = useRef(null);

  const sendEvent = () => {
    const message = (messageInput as any).current.value;
    (messageInput as any).current.value = '';
    addChattingLog(message);
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        sendEvent();
      }
    }
  };

  return (
    <ChatRoomFooterStyle onKeyPress={keyPressHandler}>
      <MsgInput ref={messageInput} />
      <SendBtnDiv onClick={sendEvent}><FiSend size={32} /></SendBtnDiv>
    </ChatRoomFooterStyle>
  );
}
