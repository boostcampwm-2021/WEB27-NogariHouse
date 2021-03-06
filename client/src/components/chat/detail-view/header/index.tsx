import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { ChatHeaderStyle } from '@components/chat/style';
import { makeIconToLink } from '@utils/index';
import {
  BackBtn, ParticipantsDiv, ParticipantsProfileDiv, ParticipantsProfile, ParticipantsName,
} from './style';

interface IParticipantInfo {
  profileUrl: string,
  userDocumentId: string,
  userName: string,
}

interface IHeaderProps {
  participantsInfo: Array<IParticipantInfo>
}

export default React.memo(({ participantsInfo }: IHeaderProps) => {
  const userNames = participantsInfo.map((user: IParticipantInfo) => user.userName).join(', ');

  return (
    <ChatHeaderStyle>
      <BackBtn>
        {makeIconToLink({
          Component: MdOutlineArrowBackIos, link: '/chat-rooms', key: 'back', size: 32,
        })}
      </BackBtn>
      <ParticipantsDiv>
        <ParticipantsProfileDiv>
          {participantsInfo.map((user: IParticipantInfo) => (<ParticipantsProfile key={user.userDocumentId} src={user.profileUrl} />))}
        </ParticipantsProfileDiv>
        <ParticipantsName>{userNames}</ParticipantsName>
      </ParticipantsDiv>
    </ChatHeaderStyle>
  );
});
