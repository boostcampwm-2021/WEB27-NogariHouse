/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

import { deleteRoom } from '@api/index';
import { isEmptyArray } from '@utils/index';
import { Participants, RoomCardProps } from '@interfaces/index';

const RoomCardProfileDiv = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;

  position: relative;
`;

const RoomCardFirstProfile = styled.div.attrs((props: IProfileProps) => {
  return { style: { background: `center / cover no-repeat url(${props.profileUrl})` } };
})`
  position: absolute;

  width: ${(props: IProfileProps) => (props.length === 1 ? 85 : 65)}px;
  height: ${(props: IProfileProps) => (props.length === 1 ? 85 : 65)}px;

  border-radius: 25px;

  background-size: ${(props: IProfileProps) => (props.length === 1 ? 120 : 100)}px;
  z-index: 2;
`;

const RoomCardSecondProfile = styled.div.attrs((props: IProfileProps) => {
  if (props.length === 1) return ;
  return { style: { background: `center / cover no-repeat url(${props.profileUrl})` } };
})`
  position: absolute;
  top: 50px;
  left: 40px;

  width: 55px;
  height: 55px;
  background-size: 80px;
  border-radius: 20px;

  z-index: 1;
`;

type RoomCardProfileComponent = typeof RoomCardFirstProfile | typeof RoomCardSecondProfile;

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

const AnonymousSpan = styled.span`
  color: gray;
  font-size: 24px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const ParticipantsNumberSpan = styled.span`
  color: #C3C0B6;
  font-size: 18px;
  font-weight: bold;
`

const RoomCardInfo = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0px 30px 30px 30px;
`;

const RoomCardLayout = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-left: 0.8%;
  width: 99%;

  &:hover {
    background-color: #eeebe4e4;
    cursor: pointer;
  }
`;

interface IProfileProps {
  profileUrl: string,
  length: number
}

interface IUserName {
  name: string,
  key: string,
}

interface IProfileList {
  profileUrl: string,
  Style: RoomCardProfileComponent
}

const makeParticipantsInfoToUserNames = (acc: IUserName[], participant: Participants, idx: number) => {
  if (acc.length > 2) return acc;
  if(!participant.isAnonymous){
    acc.push({ name: participant.userName, key: participant._id });
  }else acc.push({ name: 'anonymous', key: participant._id });
  return acc;
};

const userNameList = (userNames: IUserName[]) => userNames.map((user, idx) => <span key={idx}>{user.name}</span>);

const ProfileStyleArray = [RoomCardFirstProfile, RoomCardSecondProfile];

const profileList = (thumbnailUrl: IProfileList[]) => thumbnailUrl.map(({ profileUrl, Style }, idx) => <Style key={idx} profileUrl={profileUrl} length={thumbnailUrl.length} />);

function AnonymousText () {
  return <AnonymousSpan>Anonymous</AnonymousSpan>;
}

export default function RoomCard({
  _id, isAnonymous, title, participantsInfo,
} : RoomCardProps) {

  const userNames = participantsInfo.reduce(makeParticipantsInfoToUserNames, []);

  if (isEmptyArray(participantsInfo)) {
    deleteRoom(_id);
    return <></>;
  }

  const thumbnailUrl = participantsInfo
  .filter((val, idx) => idx < 2)
  .map((participant, idx) => {
    if (participant.isAnonymous){
      return { profileUrl: process.env.REACT_APP_DEFAULT_USER_IMAGE as string, Style: ProfileStyleArray[idx] }
    }
    return { profileUrl: participant.profileUrl, Style: ProfileStyleArray[idx] }
  });

  return (
    <RoomCardLayout>
      <RoomCardTitle>{title}{isAnonymous && <AnonymousText />}</RoomCardTitle>
      <RoomCardInfo>
        <RoomCardProfileDiv>
          {profileList(thumbnailUrl)}
        </RoomCardProfileDiv>
        <RoomCardUsers>
          {userNameList(userNames)}
          <ParticipantsNumberSpan>{`${participantsInfo.length} people`}</ParticipantsNumberSpan>
        </RoomCardUsers>
      </RoomCardInfo>
    </RoomCardLayout>
  );
}
