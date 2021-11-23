/* eslint-disable consistent-return */
/* eslint-disable max-len */
import styled from 'styled-components';

interface Participants{
  userDocumentId: string,
  userName: string,
  profileUrl: string
}

interface chatUserCardProps {
  participantsInfo: Array<Participants>,
  lastMsg: string,
  clickEvent(): void,
  recentActive: string,
  unCheckedMsg: number,
}

type ProfileProps = { length: number };

const ChatUserCardLayout = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin-bottom: 10px;
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const ChatUserCardProfileDiv = styled.div`
  width: 100px;
  min-width: 100px;
  margin-right: 10px;
  display : flex;
  align-items : center;
  justify-content: center;


  position: relative;
`;

const ChatUserCardFirstProfile = styled.img`
  position: absolute;

  width: ${(props: ProfileProps) => (props.length === 1 ? 75 : 60)}px;
  height: ${(props: ProfileProps) => (props.length === 1 ? 75 : 60)}px;
  ${(props: ProfileProps) => {
    if (props.length > 1) return 'top: 15px; left: 10px;';
  }}

  border-radius: 20px;

  z-index: 2;
`;

const ChatUserCardSecondProfile = styled.img`
  position: absolute;
  top: 50px;
  left: 40px;

  width: 50px;
  height: 50px;
  border-radius: 20px;

  z-index: 1;
`;

const ChatUserCardInfo = styled.div`
  width: calc(100% - 180px);
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p{
    margin: 0px 0px 10px 0px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const UserNameInfo = styled.p`
  font-size: min(4.8vw,24px);
  font-weight: bold;
`;

const LastChatMsg = styled.p`
  font-size: min(4vw, 20px);
`;

const ExInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  min-width:80px;

  margin-right: 15px;

  p {
    margin: 5px 0px 10px 0px;
    font-size: min(4vw, 20px);
  }
`;

const UnCheckMsg = styled.div`
  width: min(4vw, 25px);
  height: min(4vw, 25px);
  font-size: min(2.5vw, 16px);
  background-color: #C4CDC0;

  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
