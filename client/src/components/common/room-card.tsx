/* eslint-disable  */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

interface Participants{
  _id: string,
  userName: string,
  profileUrl: string
}

interface RoomCardProps {
  _id: string,
  title: string,
  isAnonymous: boolean,
  participantsInfo: Array<Participants>,
}

interface ProfileProps {
  profileUrl: string,
  length: number
}

const RoomCardProfileDiv = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;

  position: relative;
`;

const RoomCardFirstProfile = styled.div.attrs((props: ProfileProps) => {
  return { style: { background: `center / contain no-repeat url(${props.profileUrl})` } }
})`
  position: absolute;

  width: ${(props: ProfileProps) => (props.length === 1 ? 85 : 65)}px;
  height: ${(props: ProfileProps) => (props.length === 1 ? 85 : 65)}px;

  border-radius: 25px;

  background-size: ${(props: ProfileProps) => (props.length === 1 ? 120 : 100)}px;
  z-index: 2;
`;

const RoomCardSecondProfile = styled.div.attrs((props: ProfileProps) => {
  if (props.length === 1) return ;
  return { style: { background: `center / contain no-repeat url(${props.profileUrl})` } }
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

const RoomCardUsers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  font-size: 24px;
  line-height: 30px;
  margin-left: 30px;
`;

const RoomCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  font-size: 32px;
  font-weight: bold;
`;

const RoomCardInfo = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0px 30px 30px 30px;
`;

const RoomCardLayout = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-left: 0.8%;
  width: 99%;
`;

const makeParticipantsInfoToHeadUsers = (acc: {name: string, key: string}[], participant: Participants, idx: number) => {
  if (idx > 3) return acc;
  acc.push({name: participant.userName, key: participant._id});
  return acc;
};

export default function RoomCard({ title, participantsInfo } : RoomCardProps) {
  const headUsers = participantsInfo.reduce(makeParticipantsInfoToHeadUsers, [])
  
  if (!participantsInfo.length) {
    return <></>
  }

  return (
    <RoomCardLayout>
      <RoomCardTitle>
        <span>{title}</span>
      </RoomCardTitle>
      <RoomCardInfo>
        <RoomCardProfileDiv>
          <RoomCardFirstProfile profileUrl={participantsInfo[0].profileUrl} length={participantsInfo.length} />
          {participantsInfo.length > 1 && <RoomCardSecondProfile profileUrl={participantsInfo[1].profileUrl} length={participantsInfo.length} /> }
        </RoomCardProfileDiv>
        <RoomCardUsers>
          {headUsers.map((user) => <span key={user.key}>{user.name}</span>)}
          <span>{participantsInfo.length} people</span>
        </RoomCardUsers>
      </RoomCardInfo>
    </RoomCardLayout>
  );
}
