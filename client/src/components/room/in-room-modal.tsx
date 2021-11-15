/* eslint-disable max-len */
import React, {
  useEffect, useState, useRef, useReducer, useCallback,
} from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  FiMoreHorizontal, FiScissors, FiPlus, FiMic, FiMicOff,
} from 'react-icons/fi';

import userTypeState from '@atoms/user';
import roomDocumentIdState from '@atoms/room-document-id';
import roomViewType from '@src/recoil/atoms/room-view-type';
import DefaultButton from '@common/default-button';
import { IParticipant, InRoomUserBox } from '@components/room/in-room-user-box';
import { getRoomInfo } from '@api/index';
import { reducer, initialState, TParticipant } from '@components/room/in-room-reducer';
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
      urls: [
        'stun:stun.l.google.com:19302',
      ],
    },
  ],
};

// 룸 생성 모달
function InRoomModal() {
  const setRoomView = useSetRecoilState(roomViewType);
  const [user] = useRecoilState(userTypeState);
  const roomDocumentId = useRecoilValue(roomDocumentIdState);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [roomInfo, setRoomInfo] = useState<IRooms>();
  const socket = useSocket();
  const [participants, setParticipants] = useState<Array<TParticipant>>([]);
  const [isMic, setMic] = useState(true);
  const peerConnections = useRef<{ [userDocumentId: string]: RTCPeerConnection }>({});
  const myStream = useRef<MediaStream>();

  const micToggle = (isMicOn : boolean) => {
    console.log(state);
    socket?.emit('room:mic', { roomDocumentId, userDocumentId: user.userDocumentId, isMicOn });
    setMic(isMicOn);
  };

  // roomId 기반으로 room 정보 불러오기
  useEffect(() => {
    getRoomInfo(roomDocumentId)
      .then((res: any) => {
        setRoomInfo(res);
        dispatch({ type: 'SET_USERS', payload: { participants: res.participants } });
      });
  }, []);

  const getLocalStream = useCallback(async () => {
    try {
      myStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      console.log(myStream.current);
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, []);

  const createPeerConnection = useCallback((mic: boolean) => {
    try {
      const peerConnection = new RTCPeerConnection(peerConnectionConfig);

      peerConnection.addEventListener('icecandidate', (data) => {
        if (!(socket && data.candidate)) return;
        socket.emit('room:ice', { candidate: data.candidate });
      });

      peerConnection.addEventListener('track', (data) => {
        setParticipants((oldParticipants) => oldParticipants!.filter((participant) => participant.userDocumentId !== user.userDocumentId)
          .concat({
            userDocumentId: user.userDocumentId,
            stream: data.streams[0],
            mic,
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
  }, []);

  // socket 이벤트
  useEffect(() => {
    console.log(socket);
    if (!socket) return;
    getLocalStream();

    socket.emit('room:join', {
      roomDocumentId, userDocumentId: user.userDocumentId,
    });

    socket.on('room:join', async (participantsInfo: Array<TParticipant>) => {
      // 접속 중인 모든 유저들
      participantsInfo.forEach(async (participant: TParticipant) => {
        if (!myStream.current) return;
        const peerConnection = createPeerConnection(participant.mic);
        if (!(peerConnection && socket)) return;
        peerConnections.current = { ...peerConnections.current, [participant.userDocumentId]: peerConnection };

        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);

        socket!.emit('room:offer', offer);
      });
    });

    socket.on('room:offer', async (offer: RTCSessionDescriptionInit, offerSendId: string) => {
      if (!myStream.current) return;

      const peerConnection = createPeerConnection(true);
      if (!(peerConnection && socket)) return;
      peerConnections.current = { ...peerConnections.current, [offerSendId]: peerConnection };
      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('room:answer', answer);
    });

    socket.on('room:answer', async (answer: RTCSessionDescriptionInit, answerSendId: string) => {
      const peerConnection = peerConnections.current[answerSendId];
      if (!peerConnection) return;
      peerConnection.setRemoteDescription(answer);
    });

    socket.on('room:ice', async (candidate: RTCIceCandidateInit, candidateSendId: string) => {
      const peerConnection = peerConnections.current[candidateSendId];
      if (!peerConnection) return;
      peerConnection.addIceCandidate(candidate);
    });

    socket.on('room:mic', async (payload: any) => {
      const { userData } = payload;
      dispatch({
        type: 'UPDATE_USER',
        payload: { userData },
      });
    });
    socket.on('room:leave', async (payload: any) => {
      const { userDocumentId } = payload;
      peerConnections.current[userDocumentId].close();
      delete peerConnections.current[userDocumentId];
      setParticipants((oldParticipants) => oldParticipants?.filter((participant) => participant.userDocumentId !== userDocumentId));
    });
  }, [socket, getLocalStream, createPeerConnection]);

  return (
    <>
      <InRoomHeader>
        <TitleDiv><span>{roomInfo?.title}</span></TitleDiv>
        <OptionBtn><FiMoreHorizontal /></OptionBtn>
      </InRoomHeader>
      <InRoomUserList>
        {participants.map(({ userDocumentId, stream, mic }: any) => <InRoomUserBox key={userDocumentId} stream={stream} userDocumentId={userDocumentId} isMicOn={mic} isMine={false} />)}
        <InRoomUserBox stream={myStream.current} key={user.userDocumentId} userDocumentId={user.userDocumentId} isMicOn={isMic} isMine />
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
