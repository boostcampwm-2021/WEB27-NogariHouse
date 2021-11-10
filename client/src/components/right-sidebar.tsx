/* eslint-disable object-shorthand */
import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import RoomModal from '@components/room-modal';
import InRoomModal from '@components/in-room-modal';
import roomTypeState from '@atoms/room-type';
import userTypeState from '@atoms/user';

const RoomModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  min-width: 350px;
  max-width: 400px;
  margin-bottom: 10%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;

`;

function RightSideBar() {
  const [roomType] = useRecoilState(roomTypeState);
  const [user] = useRecoilState(userTypeState);

  if (user.roomId === '') { // 방 생성 모달
    return (
      <RoomModalLayout>
        <RoomModal />
      </RoomModalLayout>
    );
  } if (roomType === 'closed') { // closed인 경우 특정 인원을 지정하는 화면을 만들어야함
    return (
      <RoomModalLayout>
        <h1> closed!!! </h1>
      </RoomModalLayout>
    );
  }
  // 방에 들어가 있는 경우
  return (
    <RoomModalLayout>
      <InRoomModal />
    </RoomModalLayout>
  );
}

export default RightSideBar;
