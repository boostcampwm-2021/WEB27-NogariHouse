/* eslint-disable consistent-return */
/* eslint-disable max-len */
import styled from 'styled-components';

interface Participants{
  _id: string,
  userName: string,
  profileUrl: string
}

type chatUserCardProps = { participantsInfo: Array<Participants> };
type ProfileProps = { profileUrl: string, length: number };

const ChatUserCardLayout = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-left: 0.8%;
  width: 99%;
  height: 120px;

  display: flex;
  flex-direction: row;
`;

const ChatUserCardProfileDiv = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;

  position: relative;
`;

const ChatUserCardFirstProfile = styled.div.attrs((props: ProfileProps) => ({ style: { background: `center / contain no-repeat url(${props.profileUrl})` } }))`
  position: absolute;

  width: ${(props: ProfileProps) => (props.length === 1 ? 85 : 65)}px;
  height: ${(props: ProfileProps) => (props.length === 1 ? 85 : 65)}px;

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

  width: 55px;
  height: 55px;
  background-size: 80px;
  border-radius: 25px;

  z-index: 1;
`;

const ChatUserCardInfo = styled.div`
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

const ChatUserCard = ({ participantsInfo } : chatUserCardProps) => {
  const userNames = participantsInfo.map((participant) => participant.userName).join(', ');
  return (
    <ChatUserCardLayout>
      <ChatUserCardProfileDiv>
        <ChatUserCardFirstProfile profileUrl={participantsInfo[0].profileUrl} length={participantsInfo.length} />
        {participantsInfo.length > 1 && <ChatUserCardSecondProfile profileUrl={participantsInfo[1].profileUrl} length={participantsInfo.length} /> }
      </ChatUserCardProfileDiv>
      <ChatUserCardInfo>
        <UserNameInfo>{userNames}</UserNameInfo>
        <LastChatMsg>최근에 보내거나 받은 메세지</LastChatMsg>
      </ChatUserCardInfo>
    </ChatUserCardLayout>
  );
};

export default ChatUserCard;
