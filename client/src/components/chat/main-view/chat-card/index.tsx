import { IUser } from '@interfaces/index';
import {
  ChatUserCardLayout,
  ChatUserCardProfileDiv,
  ChatUserCardFirstProfile,
  ChatUserCardSecondProfile,
  ChatUserCardInfo,
  UserNameInfo,
  LastChatMsg,
  ExInfoDiv,
  UnCheckMsg,
} from './style';

interface chatUserCardProps {
  participantsInfo: Array<IUser>,
  lastMsg: string,
  clickEvent(): void,
  recentActive: string,
  unCheckedMsg: number,
}

const ChatUserCard = ({
  participantsInfo, lastMsg, recentActive, clickEvent, unCheckedMsg,
} : chatUserCardProps) => {
  const userNames = participantsInfo.map((participant) => participant.userName).join(', ');
  return (
    <ChatUserCardLayout onClick={clickEvent}>
      <ChatUserCardProfileDiv>
        <ChatUserCardFirstProfile src={participantsInfo[0].profileUrl} length={participantsInfo.length} />
        {participantsInfo.length > 1 && <ChatUserCardSecondProfile src={participantsInfo[1].profileUrl} /> }
      </ChatUserCardProfileDiv>
      <ChatUserCardInfo>
        <UserNameInfo>{userNames}</UserNameInfo>
        <LastChatMsg>{lastMsg}</LastChatMsg>
      </ChatUserCardInfo>
      <ExInfoDiv>
        <p style={{ color: '#C4CDC0', width: 'max-content' }}>{recentActive}</p>
        {unCheckedMsg > 0 ? <UnCheckMsg><span>{unCheckedMsg}</span></UnCheckMsg> : <UnCheckMsg style={{ visibility: 'hidden' }} />}
      </ExInfoDiv>
    </ChatUserCardLayout>
  );
};

export default ChatUserCard;
