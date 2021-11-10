/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Ref, RefObject, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import {
  FiMic, FiMicOff,
} from 'react-icons/fi';

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

const UserBox = styled.video`
width: 60px;
min-width: 48px;
height: 60px;
border-radius: 30%;
overflow: hidden;
background-color: #6F8A87;
`;

const InRoomUserBox = React.forwardRef<HTMLVideoElement, IParticipant>(
  (props, ref) => {
    const [userInfo, setUserInfo] = useState<any>();

    useEffect(() => {
      getUserInfo(props.userDocumentId)
        .then((res) => setUserInfo(res));
    }, []);

    return (
      <InRoomUserBoxStyle>
        <UserBox ref={ref} poster={userInfo?.profileUrl} autoPlay />
        <InRoomUserMicDiv>
          { props.isMicOn ? <FiMic /> : <FiMicOff /> }
        </InRoomUserMicDiv>
        <p>{ userInfo?.userName }</p>
      </InRoomUserBoxStyle>
    );
  },
);

export default InRoomUserBox;
