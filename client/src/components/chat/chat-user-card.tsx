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

type ProfileProps = { profileUrl: string, length: number };

const ChatUserCardLayout = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-left: 0.8%;
  margin-bottom: 10px;
  width: 99%;
  height: 120px;

  display: flex;
  flex-direction: row;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const ChatUserCardProfileDiv = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;

  position: relative;
`;

const ChatUserCardFirstProfile = styled.div.attrs((props: ProfileProps) => ({ style: { background: `center / contain no-repeat url(${props.profileUrl})` } }))`
  position: absolute;

  width: ${(props: ProfileProps) => (props.length === 1 ? 75 : 60)}%;
  height: ${(props: ProfileProps) => (props.length === 1 ? 75 : 60)}%;

  border-radius: 25px;

  background-size: ${(props: ProfileProps) => (props.length === 1 ? 120 : 100)}px;
  z-index: 2;
`;

const ChatUserCardSecondProfile = styled.div.attrs((props: ProfileProps) => {
  if (props.length === 1) return;
  return { style: { background: `center / contain no-repeat url(${props.profileUrl})` } };
})`
  position: absolute;
  top: 50px;
  left: 40px;

  width: 50%;
  height: 50%;
  background-size: 50%;
  border-radius: 30px;

  z-index: 1;
`;

const ChatUserCardInfo = styled.div`
  min-width: 150px;
  p{
    margin: 0px 0px 10px 0px;
    transform: translate(10px, 25px);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const UserNameInfo = styled.p`
  width: 200px;
  font-family: "Nunito";
  font-size: 24px;
  font-weight: bold;
`;

const LastChatMsg = styled.p`
  width: 300px;
  font-family: "Nunito";
  font-size: 20px;
`;

const ExInfoDiv = styled.div`
  margin-left: 20px;
  position: absolute;
  right: 10%;

  p {
    margin: 5px 0px 10px 0px;
    transform: translateY(25px);
    font-size: 20px;
    font-family: "Nunito";
  }
`;

const UnCheckMsg = styled.p`
  width: 25px;
  height: 25px;
  background-color: #C4CDC0;

  border-radius: 20px;
  text-align: center;
`;

const ChatUserCard = ({
  participantsInfo, lastMsg, recentActive, clickEvent, unCheckedMsg,
} : chatUserCardProps) => {
  const userNames = participantsInfo.map((participant) => participant.userName).join(', ');
  return (
    <ChatUserCardLayout onClick={clickEvent}>
      <ChatUserCardProfileDiv>
        <ChatUserCardFirstProfile profileUrl={participantsInfo[0].profileUrl} length={participantsInfo.length} />
        {participantsInfo.length > 1 && <ChatUserCardSecondProfile profileUrl={participantsInfo[1].profileUrl} length={participantsInfo.length} /> }
      </ChatUserCardProfileDiv>
      <ChatUserCardInfo>
        <UserNameInfo>{userNames}</UserNameInfo>
        <LastChatMsg>{lastMsg}</LastChatMsg>
      </ChatUserCardInfo>
      <ExInfoDiv>
        <p style={{ color: '#C4CDC0' }}>{recentActive}</p>
        {unCheckedMsg > 0 ? <UnCheckMsg>{unCheckedMsg}</UnCheckMsg> : ''}
      </ExInfoDiv>
    </ChatUserCardLayout>
  );
};

export default ChatUserCard;
