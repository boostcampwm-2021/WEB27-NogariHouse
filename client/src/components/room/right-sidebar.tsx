import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import roomViewType from '@atoms/room-view-type';
import RoomModal from '@src/views/room-new-view';
import InRoomModal from '@src/views/room-in-view';
import NotFoundRoomModal from '@src/views/room-not-found-view';
import SelectModeRoomModal from '@src/views/room-select-view';

const RoomModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  min-width: 320px;
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

  if (roomView === 'selectModeView') {
    return (
      <RoomModalLayout>
        <SelectModeRoomModal />
      </RoomModalLayout>
    );
  }

  if (roomView === 'notFoundRoomView') {
    return (
      <RoomModalLayout>
        <NotFoundRoomModal />
      </RoomModalLayout>
    );
  }

  return (<div>Error</div>);
}

export default RightSideBar;
