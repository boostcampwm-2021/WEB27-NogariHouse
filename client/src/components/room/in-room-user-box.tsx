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
    stream?: MediaStream | undefined,
    isMine: boolean
}

export function InRoomOtherUserBox({
  userDocumentId, isMicOn, stream, isMine,
}: IParticipant) {
  const [userInfo, setUserInfo] = useState<any>();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(userDocumentId);
    getUserInfo(userDocumentId)
      .then((res) => setUserInfo(res));
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current!.srcObject = stream as MediaStream;
  }, [stream]);

  return (
    <InRoomUserBoxStyle>
      <UserBox ref={ref} poster={userInfo?.profileUrl} autoPlay playsInline muted={isMine} />
      <InRoomUserMicDiv>
        { isMicOn ? <FiMic /> : <FiMicOff /> }
      </InRoomUserMicDiv>
      <p>{ userInfo?.userName }</p>
    </InRoomUserBoxStyle>
  );
}

export const InRoomUserBox = React.forwardRef<HTMLVideoElement, IParticipant>(
  (props, ref) => {
    const [userInfo, setUserInfo] = useState<any>();

    useEffect(() => {
      getUserInfo(props.userDocumentId)
        .then((res) => setUserInfo(res));
    }, []);

    return (
      <InRoomUserBoxStyle>
        <UserBox ref={ref} poster={userInfo?.profileUrl} autoPlay muted playsInline />
        <InRoomUserMicDiv>
          { props.isMicOn ? <FiMic /> : <FiMicOff /> }
        </InRoomUserMicDiv>
        <p>{ userInfo?.userName }</p>
      </InRoomUserBoxStyle>
    );
  },
);
