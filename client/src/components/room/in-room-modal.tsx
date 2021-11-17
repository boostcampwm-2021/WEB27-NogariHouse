import React, { useEffect, useState, RefObject } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  FiMoreHorizontal, FiScissors, FiPlus, FiMic, FiMicOff,
} from 'react-icons/fi';

import roomViewType from '@src/recoil/atoms/room-view-type';
import DefaultButton from '@common/default-button';
import { IParticipant, InRoomUserBox, InRoomOtherUserBox } from '@components/room/in-room-user-box';
import { getRoomInfo } from '@api/index';
import { useRtc } from '@hooks/useRtc';
import {
  InRoomHeader, TitleDiv, OptionBtn, InRoomFooter, InRoomUserList, FooterBtnDiv,
} from './style';

export interface IRooms extends Document{
  title: string,
  type: string,
  isAnonymous: boolean,
  participants: Array<IParticipant>,
}

// 룸 생성 모달
function InRoomModal() {
  const setRoomView = useSetRecoilState(roomViewType);
  const [roomInfo, setRoomInfo] = useState<IRooms>();
  const [isMic, setMic] = useState(true);
  const [participants, myVideoRef, roomDocumentId, user, socket, myStreamRef] = useRtc();

  const micToggle = (isMicOn : boolean) => {
    socket?.emit('room:mic', { roomDocumentId, userDocumentId: user.userDocumentId, isMicOn });
    setMic(isMicOn);
    myStreamRef.current!
      .getAudioTracks()
      // eslint-disable-next-line
      .forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));
  };

  // roomId 기반으로 room 정보 불러오기
  useEffect(() => {
    getRoomInfo(roomDocumentId)
      .then((res: any) => {
        setRoomInfo(res);
      });
  }, []);

  return (
    <>
      <InRoomHeader>
        <TitleDiv><span>{roomInfo?.title}</span></TitleDiv>
        <OptionBtn><FiMoreHorizontal /></OptionBtn>
      </InRoomHeader>
      <InRoomUserList>
        {/* eslint-disable-next-line max-len */}
        {participants.map(({ userDocumentId, stream, mic }: any) => <InRoomOtherUserBox key={userDocumentId} stream={stream} userDocumentId={userDocumentId} isMicOn={mic} isMine={false} />)}
        {/* eslint-disable-next-line max-len */}
        <InRoomUserBox ref={myVideoRef as RefObject<HTMLVideoElement>} key={user.userDocumentId} userDocumentId={user.userDocumentId} isMicOn={isMic} isMine />
      </InRoomUserList>
      <InRoomFooter>
        <DefaultButton buttonType="active" size="small" onClick={() => setRoomView('createRoomView')}> Leave a Quietly </DefaultButton>
        <FooterBtnDiv><FiScissors /></FooterBtnDiv>
        <FooterBtnDiv><FiPlus /></FooterBtnDiv>
        <FooterBtnDiv>
          {isMic
            ? <FiMic onClick={() => micToggle(false)} />
            : <FiMicOff onClick={() => micToggle(true)} />}
        </FooterBtnDiv>
      </InRoomFooter>
    </>
  );
}

export default InRoomModal;
