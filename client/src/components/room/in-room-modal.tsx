/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, {
  useEffect, useState, useRef, useReducer, useCallback, RefObject,
} from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  FiMoreHorizontal, FiScissors, FiPlus, FiMic, FiMicOff,
} from 'react-icons/fi';

import userTypeState from '@atoms/user';
import roomDocumentIdState from '@atoms/room-document-id';
import roomViewType from '@src/recoil/atoms/room-view-type';
import DefaultButton from '@common/default-button';
import { IParticipant, InRoomUserBox, InRoomOtherUserBox } from '@components/room/in-room-user-box';
import { getRoomInfo } from '@api/index';
import { reducer, initialState, TParticipant } from '@components/room/in-room-reducer';
import { useLocalStream } from '@hooks/useRtc';
import useSocket from '@src/hooks/useSocket';
import {
  InRoomHeader, TitleDiv, OptionBtn, InRoomFooter, InRoomUserList, FooterBtnDiv,
} from './style';

export interface IRooms extends Document{
  title: string,
  type: string,
  isAnonymous: boolean,
  participants: Array<IParticipant>,
}

const peerConnectionConfig = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

// 룸 생성 모달
function InRoomModal() {
  const setRoomView = useSetRecoilState(roomViewType);
  const [user] = useRecoilState(userTypeState);
  const roomDocumentId = useRecoilValue(roomDocumentIdState);
  const [roomInfo, setRoomInfo] = useState<IRooms>();
  const socket = useSocket();
  const [participants, setParticipants] = useState<Array<TParticipant>>([]);
  const [isMic, setMic] = useState(true);
  const peerConnections = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const [myStream, myVideo, getLocalStream] = useLocalStream();

  const micToggle = (isMicOn : boolean) => {
    socket?.emit('room:mic', { roomDocumentId, userDocumentId: user.userDocumentId, isMicOn });
    setMic(isMicOn);
  };

  // roomId 기반으로 room 정보 불러오기
  useEffect(() => {
    getRoomInfo(roomDocumentId)
      .then((res: any) => {
        setRoomInfo(res);
      });
  }, []);

  const createPeerConnection = useCallback((userDocumentId:string, socketId: string, mic: boolean) => {
    try {
      const peerConnection = new RTCPeerConnection(peerConnectionConfig);

      peerConnection.addEventListener('icecandidate', ({ candidate }) => {
        if (!(socket && candidate)) return;
        socket.emit('room:ice', candidate, socketId);
      });

      peerConnection.addEventListener('track', (data) => {
        setParticipants((oldParticipants) => oldParticipants!.filter((participant) => (participant.userDocumentId !== userDocumentId)).concat({
          stream: data.streams[0],
          userDocumentId,
          mic,
          socketId,
        }));
      });

      if (myStream.current) {
        myStream.current.getTracks().forEach((track) => {
          if (!myStream.current) return;
          peerConnection.addTrack(track, myStream.current);
        });
      } else {
        console.error('no local stream');
      }

      return peerConnection;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, [socket]);

  // socket 이벤트
  useEffect(() => {
    if (!socket) return;

    const init = async () => {
      await getLocalStream();
      socket.emit('room:join', {
        roomDocumentId, userDocumentId: user.userDocumentId, socketId: socket!.id,
      });
    };

    init();

    // 신규 유저
    socket.on('room:join', async (participantsInfo: Array<TParticipant>) => {
      participantsInfo.forEach(async (participant: TParticipant) => {
        if (!myStream.current) return;
        const peerConnection = createPeerConnection(participant.userDocumentId, participant.socketId, participant.mic);
        if (!(peerConnection && socket)) return;
        peerConnections.current = { ...peerConnections.current, [participant.socketId]: peerConnection };
        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);

        socket.emit('room:offer', offer, participant.socketId);
      });
    });

    // 기존 유저
    socket.on('room:offer', async (offer: RTCSessionDescriptionInit, userDocumentId: string, socketId: string) => {
      if (!myStream.current) return;
      const peerConnection = createPeerConnection(userDocumentId, socketId, true);
      if (!(peerConnection && socket)) return;
      peerConnections.current = { ...peerConnections.current, [socketId]: peerConnection };
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('room:answer', answer, socketId);
    });

    // 신규 유저
    socket.on('room:answer', async (answer: RTCSessionDescriptionInit, socketId: string) => {
      const peerConnection = peerConnections.current[socketId];
      if (!peerConnection) return;
      peerConnection.setRemoteDescription(answer);
    });

    socket.on('room:ice', async (data: { candidate: RTCIceCandidateInit, candidateSendId: string }) => {
      const peerConnection = peerConnections.current[data.candidateSendId];
      if (!peerConnection) return;
      await peerConnection.addIceCandidate(data.candidate);
    });

    socket.on('room:mic', async (payload: any) => {
      const { userData } = payload;
    });
    socket.on('room:leave', async (socketId: string) => {
      peerConnections.current[socketId].close();
      delete peerConnections.current[socketId];
      setParticipants((oldParticipants) => oldParticipants?.filter((participant) => participant.socketId !== socketId));
    });

    // eslint-disable-next-line consistent-return
    return () => {
      participants.forEach((participant) => {
        if (!peerConnections.current[participant.userDocumentId]) return;
        peerConnections.current[participant.userDocumentId].close();
        delete peerConnections.current[participant.userDocumentId];
      });
    };
  }, [socket, createPeerConnection]);

  return (
    <>
      <InRoomHeader>
        <TitleDiv><span>{roomInfo?.title}</span></TitleDiv>
        <OptionBtn><FiMoreHorizontal /></OptionBtn>
      </InRoomHeader>
      <InRoomUserList>
        {participants.map(({ userDocumentId, stream, mic }: any) => <InRoomOtherUserBox key={userDocumentId} stream={stream} userDocumentId={userDocumentId} isMicOn={mic} isMine={false} />)}
        <InRoomUserBox ref={myVideo as RefObject<HTMLVideoElement>} key={user.userDocumentId} userDocumentId={user.userDocumentId} isMicOn={isMic} isMine />
      </InRoomUserList>
      <InRoomFooter>
        <DefaultButton buttonType="active" size="small" onClick={() => setRoomView('createRoomView')}> Leave a Quietly </DefaultButton>
        <FooterBtnDiv><FiScissors /></FooterBtnDiv>
        <FooterBtnDiv><FiPlus /></FooterBtnDiv>
        <FooterBtnDiv>{isMic ? <FiMic onClick={() => micToggle(false)} /> : <FiMicOff onClick={() => micToggle(true)} />}</FooterBtnDiv>
      </InRoomFooter>
    </>
  );
}

export default InRoomModal;
