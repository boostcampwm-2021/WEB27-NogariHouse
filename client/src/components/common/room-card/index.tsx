/* eslint-disable react/no-array-index-key */
import React from 'react';

import { deleteRoom } from '@api/room';
import { isEmptyArray } from '@utils/index';
import { Participants, RoomCardProps } from '@interfaces/index';
import {
  RoomCardProfileDiv, RoomCardFirstProfile,
  RoomCardSecondProfile, RoomCardUsers,
  RoomCardTitle, AnonymousSpan,
  ParticipantsNumberSpan, RoomCardInfo,
  RoomCardLayout,
} from './style';

type RoomCardProfileComponent = typeof RoomCardFirstProfile | typeof RoomCardSecondProfile;

interface IUserName {
  name: string,
  key: string,
}

interface IProfileList {
  profileUrl: string,
  Style: RoomCardProfileComponent
}

const makeParticipantsInfoToUserNames = (acc: IUserName[], participant: Participants) => {
  if (acc.length > 2) return acc;
  if (!participant.isAnonymous) {
    acc.push({ name: participant.userName, key: participant._id });
  } else acc.push({ name: 'anonymous', key: participant._id });
  return acc;
};

const userNameList = (userNames: IUserName[]) => userNames.map((user, idx) => <span key={idx}>{user.name}</span>);

const ProfileStyleArray = [RoomCardFirstProfile, RoomCardSecondProfile];

const profileList = (thumbnailUrl: IProfileList[]) => thumbnailUrl.map(
  ({ profileUrl, Style }, idx) => <Style key={idx} profileUrl={profileUrl} length={thumbnailUrl.length} />,
);

function AnonymousText() {
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
      if (participant.isAnonymous) {
        return { profileUrl: process.env.REACT_APP_DEFAULT_USER_IMAGE as string, Style: ProfileStyleArray[idx] };
      }
      return { profileUrl: participant.profileUrl, Style: ProfileStyleArray[idx] };
    });

  return (
    <RoomCardLayout>
      <RoomCardTitle>
        {title}
        {isAnonymous && <AnonymousText />}
      </RoomCardTitle>
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
