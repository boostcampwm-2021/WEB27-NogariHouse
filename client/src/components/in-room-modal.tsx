/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import React, {
  useEffect, useState, useRef, useReducer,
} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  FiMoreHorizontal, FiScissors, FiPlus, FiMic, FiMicOff,
} from 'react-icons/fi';
import io from 'socket.io-client';

import userTypeState from '@atoms/user';
import roomViewType from '@src/recoil/atoms/room-view-type';
import DefaultButton from '@styled-components/default-button';
import InRoomUserBox, { IParticipant } from '@components/in-room-user-box';
import { getRoomInfo } from '@api/index';
import ScrollBarStyle from '@styles/scrollbar-style';
import { reducer, initialState } from './in-room-reducer';

export interface IRooms extends Document{
  title: string,
  type: string,
  isAnonymous: boolean,
  participants: Array<IParticipant>,
}

const InRoomHeader = styled.div`
  position: absolute;
  top: 10px;

  display: flex;
  flex-direction: row;

  padding: 20px 10px 20px 10px;

  width: 100%;
  height: 25px;
`;

const TitleDiv = styled.div`
  font-family: "Nunito";
  font-style: normal;
  font-size: 20px;

  width: 70%;

  margin-left: 30px;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const OptionBtn = styled.div`
  width: 30%;

  text-align: center;
  transform: translate(0px, 6px);
`;

const InRoomFooter = styled.div`
  position: absolute;
  bottom: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
`;

const InRoomUserList = styled.div`
  position: absolute;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  box-sizing: border-box;
  padding: 0px 30px;

  width: 100%;
  height: 70%;

  ${ScrollBarStyle}
`;

const FooterBtnDiv = styled.div`
  width: 32px;
  height: 32px;

  border-radius: 30px;
  margin-top: 5px;

  background-color: #58964F;

  svg {
    transform: translate(8px, 8px);
  };
`;

// 룸 생성 모달
function InRoomModal() {
  const setRoomView = useSetRecoilState(roomViewType);
  const [user] = useRecoilState(userTypeState);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [roomInfo, setRoomInfo] = useState<IRooms>();
  const [socket, setSocket] = useState<any>(null);
  const [isMic, setMic] = useState(false);
  const myPeerConnection = useRef(new RTCPeerConnection());
  const myStream = useRef<any>();
  const myBox = useRef<HTMLVideoElement>();

  const handleIce = (data: any) => {
    socket.emit('room:ice', data.candidate);
  };

  // 다른 유저 접속시 연결하기 dispatch로 비디오 태그 추가
  const handleAddStream = (data: any) => {
    console.log(data);
  };

  const makeConnection = () => {
    myPeerConnection.current.addEventListener('icecandidate', handleIce);
    myPeerConnection.current.addEventListener('addstream', handleAddStream);
    myStream.current
      .getTracks()
      .forEach((track: any) => myPeerConnection.current.addTrack(track, myStream.current));
  };

  const getMedia = async () => {
    try {
      myStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      myBox.current!.srcObject = myStream.current || null;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMedia();
    makeConnection();
  }, []);

  // roomId 기반으로 room 정보 불러오기
  useEffect(() => {
    getRoomInfo(user.roomDocumentId)
      .then((res: any) => {
        setRoomInfo(res);
        dispatch({ type: 'SET_USERS', payload: { participants: res.participants } });
      });
  }, []);

  useEffect(() => {
    if (socket === null) {
      const url = process.env.REACT_APP_SERVER_URL as string;
      setSocket(io(url));
    }
    return () => {
      if (socket !== null) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket]);

  // socket 이벤트
  useEffect(() => {
    socket?.emit('room:join', {
      roomDocumentID: user.roomDocumentId, userDocumentId: user.userDocumentId,
    });

    socket?.on('room:join', async (payload: any) => {
      const { userDocumentId, userData } = payload;
      dispatch({
        type: 'UPDATE_USER',
        payload: { userDocumentId, userData },
      });

      const offer = await myPeerConnection.current.createOffer();
      myPeerConnection.current.setLocalDescription(offer);
      socket.emit('room:offer', offer);
    });

    socket?.on('room:offer', async (offer: RTCSessionDescriptionInit) => {
      myPeerConnection.current.setRemoteDescription(offer);
      const answer = await myPeerConnection.current.createAnswer();
      myPeerConnection.current.setLocalDescription(answer);
      socket.emit('room:answer', answer);
    });

    socket?.on('room:answer', async (answer: RTCSessionDescriptionInit) => {
      myPeerConnection.current.setRemoteDescription(answer);
    });

    socket?.on('room:ice', async (ice: RTCIceCandidateInit) => {
      myPeerConnection.current.addIceCandidate(ice);
    });
  }, [socket]);

  const leaveEvent = () => {
    setRoomView('createRoomView');
  };

  return (
    <>
      <InRoomHeader>
        <TitleDiv><span>{roomInfo?.title}</span></TitleDiv>
        <OptionBtn><FiMoreHorizontal /></OptionBtn>
      </InRoomHeader>
      <InRoomUserList>
        {Object.entries(state.participants).map((participant) => (
          <InRoomUserBox userDocumentId={participant[0]} isMicOn={participant[1].isMicOn} />
        ))}
        {/* {roomInfo?.participants?.map((participant) => (
          <InRoomUserBox userDocumentId={participant.userDocumentId} isMicOn={participant.isMicOn} />
        ))} */}
        <InRoomUserBox userDocumentId={user.userDocumentId} isMicOn={isMic} videoRef={myBox} />
      </InRoomUserList>
      <InRoomFooter>
        <DefaultButton buttonType="active" size="small" onClick={leaveEvent}> Leave a Quietly </DefaultButton>
        <FooterBtnDiv><FiScissors /></FooterBtnDiv>
        <FooterBtnDiv><FiPlus /></FooterBtnDiv>
        <FooterBtnDiv>{isMic ? <FiMic onClick={() => setMic(false)} /> : <FiMicOff onClick={() => setMic(true)} />}</FooterBtnDiv>
      </InRoomFooter>
    </>
  );
}

export default InRoomModal;
