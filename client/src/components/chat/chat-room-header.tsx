/* eslint-disable max-len */
import styled from 'styled-components';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { ChatHeaderStyle } from '@components/chat/style';
import { makeIconToLink } from '@utils/index';
import React from 'react';

const BackBtn = styled.div`
  position: absolute;
  left: 5%;
`;

const ParticipantsDiv = styled.div`
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

const ParticipantsProfileDiv = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;

  width: 100%;
  height: 23px;

  margin-top: 10px;
`;

const ParticipantsProfile = styled.img`
  width: 30px;
  height: 30px;

  margin: 5px;
  border-radius: 20px;

  background-color: black;
`;

const ParticipantsName = styled.div`
  position: absolute;
  bottom: 10px;

  width: 100%;
  height: 20px;
  margin: 0px;

  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;

  white-space: nowrap;
`;

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
