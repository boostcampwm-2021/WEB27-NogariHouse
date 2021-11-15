/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Ref, RefObject, useEffect, useRef, useState,
} from 'react';
import {
  FiMic, FiMicOff,
} from 'react-icons/fi';

import { getUserInfo } from '@api/index';
import { InRoomUserBoxStyle, InRoomUserMicDiv, UserBox } from './style';

export interface IParticipant {
    userDocumentId: string,
    isMicOn: boolean,
    stream?: any,
}

export function InRoomUserBox({ userDocumentId, isMicOn, stream }: IParticipant) {
  const [userInfo, setUserInfo] = useState<any>();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getUserInfo(userDocumentId)
      .then((res) => setUserInfo(res));
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current!.srcObject = stream;
  }, [stream]);

  return (
    <InRoomUserBoxStyle>
      <UserBox ref={ref} poster={userInfo?.profileUrl} autoPlay playsInline />
      <InRoomUserMicDiv>
        { isMicOn ? <FiMic /> : <FiMicOff /> }
      </InRoomUserMicDiv>
      <p>{ userInfo?.userName }</p>
    </InRoomUserBoxStyle>
  );
}
