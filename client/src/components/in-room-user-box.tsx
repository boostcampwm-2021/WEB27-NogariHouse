/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  FiMic, FiMicOff,
} from 'react-icons/fi';

import UserImage from '@styled-components/user-image';
import { getUserInfo } from '@api/index';

export interface IParticipant {
    userDocumentId: string,
    isMicOn: boolean,
}

const InRoomUserBoxStyle = styled.div`
  position: relative;
  width: 80px;
  height: 90px;

  p {
    margin: 5px;
  }
`;

const InRoomUserMicDiv = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;

  width: 30px;
  height: 30px;

  background-color: #58964F;
  border-radius: 30px;

  svg {
    transform: translate(6px, 6px);
  }
`;

function InRoomUserBox({ userDocumentId, isMicOn } : IParticipant) {
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    getUserInfo(userDocumentId)
      .then((res) => setUserInfo(res));
  }, []);

  return (
    <InRoomUserBoxStyle>
      <UserImage profileUrl={userInfo?.profileUrl} />
      <InRoomUserMicDiv>
        { isMicOn ? <FiMic /> : <FiMicOff /> }
      </InRoomUserMicDiv>
      <p>{ userInfo?.userName }</p>
    </InRoomUserBoxStyle>
  );
}

export default InRoomUserBox;
