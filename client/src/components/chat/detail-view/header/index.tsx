import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { ChatHeaderStyle } from '@components/chat/style';
import { makeIconToLink } from '@utils/index';
import {
  BackBtn, ParticipantsDiv, ParticipantsProfileDiv, ParticipantsProfile, ParticipantsName,
} from './style';

export default React.memo(({ participantsInfo }: any) => {
  const userNames = participantsInfo.map((user:any) => user.userName).join(', ');

  return (
    <ChatHeaderStyle>
      <BackBtn>
        {makeIconToLink({
          Component: MdOutlineArrowBackIos, link: '/chat-rooms', key: 'back', size: 32,
        })}
      </BackBtn>
      <ParticipantsDiv>
        <ParticipantsProfileDiv>
          {participantsInfo.map((user: any) => (<ParticipantsProfile key={user.userDocumentId} src={user.profileUrl} />))}
        </ParticipantsProfileDiv>
        <ParticipantsName>{userNames}</ParticipantsName>
      </ParticipantsDiv>
    </ChatHeaderStyle>
  );
});
