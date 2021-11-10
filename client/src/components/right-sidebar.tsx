/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import styled from 'styled-components';

import RoomModal from '@components/room-modal';
import InRoomModal from '@components/in-room-modal';

type TView = 'createRoomView' | 'closedSelectorView' | 'inRoomView';

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
  const [roomView, setRoomView] = useState<TView>('createRoomView');

  const changeRoomViewHandler = (view: TView) => {
    setRoomView(view);
  };

  if (roomView === 'createRoomView') { // 방 생성 모달
    return (
      <RoomModalLayout>
        <RoomModal changeRoomViewHandler={changeRoomViewHandler} />
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
        <InRoomModal changeRoomViewHandler={changeRoomViewHandler} />
      </RoomModalLayout>
    );
  }

  return (<div>Error</div>);
}

export default RightSideBar;
