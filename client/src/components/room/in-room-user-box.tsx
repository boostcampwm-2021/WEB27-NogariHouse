import React, { useEffect, useRef, useState } from 'react';
import {
  FiMic, FiMicOff,
} from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import { getUserInfo } from '@api/user';
import SoundMeter from '@src/utils/voice';
import anonymousState from '@atoms/anonymous';
import {
  InRoomUserBoxStyle, InRoomUserMicDiv, UserBox, Video,
} from './style';

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
  const imageRef = useRef<HTMLImageElement>(null);
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
    soundMeter.connectToSource(isAnonymous as boolean, stream as MediaStream, () => {
      meterRefresh = setInterval(() => {
        const num = Number(soundMeter.instant.toFixed(2));
        if (num > 0.02 && ref) {
          imageRef.current!.style.border = '2px solid #58964F';
        } else {
          imageRef.current!.style.border = 'none';
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
      <Video
        ref={ref}
        autoPlay
        playsInline
        muted={isAnonymous}
      />
      {isAnonymous
        ? (
          <UserBox ref={imageRef} src={process.env.REACT_APP_DEFAULT_USER_IMAGE} />
        )
        : (
          <Link to={`/profile/${userInfo?.userId}`}>
            <UserBox ref={imageRef} src={userInfo?.profileUrl} />
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
    const myVideoRef = useRef<any>(ref);
    const myImageRef = useRef<HTMLImageElement>(null);

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
      soundMeter.connectToSource(false, props.stream, () => {
        meterRefresh = setInterval(() => {
          const num = Number(soundMeter.instant.toFixed(2));
          if (num > 0.02 && myImageRef.current) {
            myImageRef.current.style.border = '2px solid #58964F';
          } else {
            myImageRef.current!.style.border = 'none';
          }
        }, 500);
      });

      return () => {
        if (myImageRef.current) myImageRef.current.style.border = 'none';
        clearInterval(meterRefresh);
        soundMeter.stop();
      };
    }, [props.isMicOn]);

    return (
      <InRoomUserBoxStyle>
        <Video
          ref={myVideoRef}
          autoPlay
          muted
          playsInline
        />
        { isAnonymous
          ? (
            <UserBox ref={myImageRef} src={process.env.REACT_APP_DEFAULT_USER_IMAGE} />
          )
          : (
            <Link to={`/profile/${userInfo?.userId}`}>
              <UserBox ref={myImageRef} src={userInfo?.profileUrl} />
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
