/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  FiMoreHorizontal, FiScissors, FiPlus, FiMic, FiMicOff,
} from 'react-icons/fi';
import io from 'socket.io-client';

import userTypeState from '@atoms/user';
import DefaultButton from '@styled-components/default-button';
import InRoomUserBox, { IParticipant } from '@components/in-room-user-box';
// import useConnectSocket from '@hooks/useConnectSocket';
import { getRoomInfo } from '@api/index';
import ScrollBarStyle from '@styles/scrollbar-style';

type TView = 'createRoomView' | 'closedSelectorView' | 'inRoomView';

interface InRoomModalProps {
  changeRoomViewHandler: (viewType: TView) => void,
}

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
function InRoomModal({ changeRoomViewHandler } : InRoomModalProps) {
  const [user] = useRecoilState(userTypeState);
  const [roomInfo, setRoomInfo] = useState<IRooms>();
  const [socket, setSocket] = useState<any>(null);
  const [isMic, setMic] = useState(false);

  // roomId 기반으로 room 정보 불러오기
  useEffect(() => {
    getRoomInfo(user.roomDocumentId)
      .then((res: any) => setRoomInfo(res));
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

    /*
      음성채팅 연결 로직 추가
    */

    // socket?.on('room:join', (payload) => {
    //   const { userID, userData } = payload;
    //   dispatch({ type: 'UPDATE_USER', payload: { userID, userData } });
    // });
    // socket?.on('room:leave', (payload) => {
    //   const { userID } = payload;
    //   dispatch({ type: 'DELETE_USER', payload: { userID } });
    // });
    // socket?.on('room:micOff', (payload) => {
    //   const { userID, userData } = payload;
    //   dispatch({ type: 'UPDATE_USER', payload: { userID, userData } });
    // });
    // socket?.on('room:micOn', (payload) => {
    //   const { userID, userData } = payload;
    //   dispatch({ type: 'UPDATE_USER', payload: { userID, userData } });
    // });
  }, [socket]);

  const leaveEvent = () => {
    changeRoomViewHandler('createRoomView');
  };

  return (
    <>
      <InRoomHeader>
        <TitleDiv><span>{roomInfo?.title}</span></TitleDiv>
        <OptionBtn><FiMoreHorizontal /></OptionBtn>
      </InRoomHeader>
      <InRoomUserList>
        {roomInfo?.participants?.map((participant) => (
          <InRoomUserBox userDocumentId={participant.userDocumentId} isMicOn={participant.isMicOn} />
        ))}
        <InRoomUserBox userDocumentId={user.userDocumentId} isMicOn={isMic} />
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
