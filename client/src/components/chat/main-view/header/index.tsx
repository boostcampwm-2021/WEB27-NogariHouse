import { BiMessageSquareAdd } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { ChatHeaderStyle } from '@components/chat/style';
import ChatHeaderBtnDiv from './style';

export default function ChatRoomListHeader() {
  return (
    <ChatHeaderStyle>
      <p>BACK CHANNEL</p>
      <ChatHeaderBtnDiv>
        <Link to="/chat-rooms/new">
          <BiMessageSquareAdd size={32} color="black" />
        </Link>
      </ChatHeaderBtnDiv>
    </ChatHeaderStyle>
  );
}
