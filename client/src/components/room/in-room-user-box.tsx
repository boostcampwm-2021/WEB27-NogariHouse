/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Ref, RefObject, useEffect, useRef, useState,
} from 'react';
import {
  FiMic, FiMicOff,
} from 'react-icons/fi';

import { getUserInfo } from '@api/index';
import SoundMeter from '@src/utils/voice';
import { Link } from 'react-router-dom';
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
  const audioCtxRef = useRef(new (window.AudioContext)());

  useEffect(() => {
    getUserInfo(userDocumentId)
      .then((res) => setUserInfo(res!.userInfo));
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current!.srcObject = stream as MediaStream;
  }, [stream]);

  // useEffect(() => {
  //   if (!ref.current || !isMicOn) return;
  //   const soundMeter = new SoundMeter(audioCtxRef.current);
  //   let meterRefresh: any = null;
  //   soundMeter.connectToSource(true, stream as MediaStream, (e: any) => {
  //     meterRefresh = setInterval(() => {
  //       const num = Number(soundMeter.instant.toFixed(2));
  //       if (num > 0.02 && ref) {
  //         ref.current!.style.border = '2px solid #58964F';
  //       } else {
  //         ref.current!.style.border = 'none';
  //       }
  //     }, 500);
  //   });

  //   // eslint-disable-next-line consistent-return
  //   return () => {
  //     clearInterval(meterRefresh);
  //     soundMeter.stop();
  //   };
  // }, [isMicOn]);

  return (
    <InRoomUserBoxStyle>
      <Link to={`/profile/${userInfo?.userId}`}>
        <UserBox ref={ref} poster={userInfo?.profileUrl} autoPlay playsInline muted />
      </Link>
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
    const audioCtxRef = useRef(new (window.AudioContext || (window as any).webkitAudioContext)());
    const myRef = useRef<any>(ref);

    useEffect(() => {
      getUserInfo(props.userDocumentId)
        .then((res) => setUserInfo(res!.userInfo));
    }, []);

    // useEffect(() => {
    //   if (!props.stream || !props.isMicOn) return;
    //   const soundMeter = new SoundMeter(audioCtxRef.current);
    //   let meterRefresh: any = null;
    //   soundMeter.connectToSource(true, props.stream, () => {
    //     meterRefresh = setInterval(() => {
    //       const num = Number(soundMeter.instant.toFixed(2));
    //       if (num > 0.02 && myRef.current) {
    //         myRef.current.style.border = '2px solid #58964F';
    //       } else {
    //         myRef.current.style.border = 'none';
    //       }
    //     }, 500);
    //   });

    //   // eslint-disable-next-line consistent-return
    //   return () => {
    //     clearInterval(meterRefresh);
    //     soundMeter.stop();
    //   };
    // }, [props.isMicOn]);

    return (
      <InRoomUserBoxStyle>
        <Link to={`/profile/${userInfo?.userId}`}>
          <UserBox ref={myRef} poster={userInfo?.profileUrl} autoPlay muted playsInline />
        </Link>
        <InRoomUserMicDiv>
          { props.isMicOn ? <FiMic /> : <FiMicOff /> }
        </InRoomUserMicDiv>
        <p>{ userInfo?.userName }</p>
      </InRoomUserBoxStyle>
    );
  },
);
