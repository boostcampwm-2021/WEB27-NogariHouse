/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Ref, RefObject, useEffect, useRef, useState,
} from 'react';
import {
  FiMic, FiMicOff,
} from 'react-icons/fi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import { getUserInfo } from '@api/index';
import SoundMeter from '@src/utils/voice';
import anonymousState from '@atoms/anonymous';
import { InRoomUserBoxStyle, InRoomUserMicDiv, UserBox } from './style';

export interface IParticipant {
    userDocumentId: string,
    isMicOn: boolean,
    stream?: MediaStream | undefined,
    isAnonymous?: boolean
}

export function InRoomOtherUserBox({
  userDocumentId, isMicOn, stream, isAnonymous,
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

  useEffect(() => {
    if (!ref.current || !isMicOn) return;
    const soundMeter = new SoundMeter(audioCtxRef.current);
    let meterRefresh: any = null;
    soundMeter.connectToSource(isAnonymous as boolean, stream as MediaStream, (e: any) => {
      meterRefresh = setInterval(() => {
        const num = Number(soundMeter.instant.toFixed(2));
        if (num > 0.02 && ref) {
          ref.current!.style.border = '2px solid #58964F';
        } else {
          ref.current!.style.border = 'none';
        }
      }, 500);
    });

    return () => {
      if (ref.current) ref.current.style.border = 'none';
      clearInterval(meterRefresh);
      soundMeter.stop();
    };
  }, [isMicOn]);

  return (
    <InRoomUserBoxStyle>
      {isAnonymous
        ? (
          <UserBox
            ref={ref}
            poster={isAnonymous
              ? process.env.REACT_APP_DEFAULT_USER_IMAGE
              : userInfo?.profileUrl}
            autoPlay
            playsInline
            muted={isAnonymous}
          />
        )
        : (
          <Link to={`/profile/${userInfo?.userId}`}>
            <UserBox
              ref={ref}
              poster={isAnonymous
                ? process.env.REACT_APP_DEFAULT_USER_IMAGE
                : userInfo?.profileUrl}
              autoPlay
              playsInline
              muted={isAnonymous}
            />
          </Link>
        )}
      <InRoomUserMicDiv>
        { isMicOn ? <FiMic /> : <FiMicOff /> }
      </InRoomUserMicDiv>
      <p>{ isAnonymous ? 'anonymous' : userInfo?.userName }</p>
    </InRoomUserBoxStyle>
  );
}

export const InRoomUserBox = React.forwardRef<HTMLVideoElement, IParticipant>(
  (props, ref) => {
    const [isAnonymous, setIsAnonymous] = useRecoilState(anonymousState);
    const [userInfo, setUserInfo] = useState<any>();
    const audioCtxRef = useRef(new (window.AudioContext || (window as any).webkitAudioContext)());
    const myRef = useRef<any>(ref);

    useEffect(() => {
      getUserInfo(props.userDocumentId)
        .then((res) => setUserInfo(res!.userInfo));

      return () => {
        setIsAnonymous(false);
      };
    }, []);

    useEffect(() => {
      if (!props.stream || !props.isMicOn) return;
      const soundMeter = new SoundMeter(audioCtxRef.current);
      let meterRefresh: any = null;
      soundMeter.connectToSource(isAnonymous, props.stream, () => {
        meterRefresh = setInterval(() => {
          const num = Number(soundMeter.instant.toFixed(2));
          if (num > 0.02 && myRef.current) {
            myRef.current.style.border = '2px solid #58964F';
          } else {
            myRef.current.style.border = 'none';
          }
        }, 500);
      });

      return () => {
        if (myRef.current) myRef.current.style.border = 'none';
        clearInterval(meterRefresh);
        soundMeter.stop();
      };
    }, [props.isMicOn]);

    return (
      <InRoomUserBoxStyle>
        { isAnonymous
          ? (
            <UserBox
              ref={myRef}
              poster={isAnonymous
                ? process.env.REACT_APP_DEFAULT_USER_IMAGE
                : userInfo?.profileUrl}
              autoPlay
              muted
              playsInline
            />
          )
          : (
            <Link to={`/profile/${userInfo?.userId}`}>
              <UserBox
                ref={myRef}
                poster={isAnonymous
                  ? process.env.REACT_APP_DEFAULT_USER_IMAGE
                  : userInfo?.profileUrl}
                autoPlay
                muted
                playsInline
              />
            </Link>
          )}
        <InRoomUserMicDiv>
          { props.isMicOn ? <FiMic /> : <FiMicOff /> }
        </InRoomUserMicDiv>
        <p>{ isAnonymous ? 'anonymous' : userInfo?.userName }</p>
      </InRoomUserBoxStyle>
    );
  },
);
