import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import RoomModal from '@components/room/room-modal';
import InRoomModal from '@components/room/in-room-modal';
import roomViewType from '@atoms/room-view-type';
import NotFoundRoomModal from './not-found-room-modal';

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

  if (roomView === 'createRoomView') {
    return (
      <RoomModalLayout>
        <RoomModal />
      </RoomModalLayout>
    );
  }
  if (roomView === 'closedSelectorView') {
    return (
      <RoomModalLayout>
        <h1> closed!!! </h1>
      </RoomModalLayout>
    );
  }
  if (roomView === 'inRoomView') {
    return (
      <RoomModalLayout>
        <InRoomModal />
      </RoomModalLayout>
    );
  }
  if (roomView === 'NotFoundRoom') {
    return (
      <RoomModalLayout>
        <NotFoundRoomModal />
      </RoomModalLayout>
    );
  }

  return (<div>Error</div>);
}

export default RightSideBar;
