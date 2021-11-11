/* eslint-disable object-shorthand */
import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import RoomModal from '@components/room-modal';
import InRoomModal from '@components/in-room-modal';
import roomViewType from '@src/recoil/atoms/room-view-type';

const RoomModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  min-width: 400px;
  max-width: 500px;
  margin-bottom: 10%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;

`;

function RightSideBar() {
  const roomView = useRecoilValue(roomViewType);

  if (roomView === 'createRoomView') { // 방 생성 모달
    return (
      <RoomModalLayout>
        <RoomModal />
      </RoomModalLayout>
    );
  } if (roomView === 'closedSelectorView') { // closed인 경우 특정 인원을 지정하는 화면을 만들어야함
    return (
      <RoomModalLayout>
        <h1> closed!!! </h1>
      </RoomModalLayout>
    );
  }
  // 방에 들어가 있는 경우
  if (roomView === 'inRoomView') {
    return (
      <RoomModalLayout>
        <InRoomModal />
      </RoomModalLayout>
    );
  }

  return (<div>Error</div>);
}

export default RightSideBar;
