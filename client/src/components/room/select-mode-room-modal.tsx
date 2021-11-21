/* eslint-disable  */
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import viewAnonymous from '@selectors/view-anonymous';
import RoomTypeCheckBox from './room-type-check-box';

const ModalLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const ModeButton = styled(RoomTypeCheckBox)`
 display: inline;
`;

function SelectModeRoomModal() {
  const [modeType, setModeType] = useState<string>();
  const setViewAnonymous = useSetRecoilState(viewAnonymous);

  const typeHandler = (mode: string) => {
    setViewAnonymous(mode);
  }

  return (
    <>
      <ModalLayout>
        <h2> 입장 모드 선택하기 </h2>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <ModeButton checkBoxName="notAnonymous" onClick={typeHandler.bind(null, 'notAnonymous')} roomType={modeType} />
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <ModeButton checkBoxName="anonymous" onClick={typeHandler.bind(null, 'anonymous')} roomType={modeType} />
      </ModalLayout>
    </>
  );
}

export default SelectModeRoomModal;
