/* eslint-disable  */
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import viewAnonymous from '@selectors/view-anonymous';
import RoomTypeCheckBox from './room-type-check-box';
import DefaultButton from '../common/default-button';

const ModalLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 90%;
    width: 80%;
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const ModeButton = styled(RoomTypeCheckBox)`
 display: inline;
`;

function SelectModeRoomModal() {
  const [modeType, setModeType] = useState<string>('known');
  const setViewAnonymous = useSetRecoilState(viewAnonymous);

  const typeHandler = (mode: string) => {
    setModeType(mode)
  }

  const submitButtonHandler = () => {
    setViewAnonymous(modeType);
  }

  return (
    <>
      <ModalLayout>
        <h2> Please select the room mode. </h2>
        <ButtonLayout>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <ModeButton checkBoxName="known" onClick={typeHandler.bind(null, 'known')} roomType={modeType} />
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <ModeButton checkBoxName="unknown" onClick={typeHandler.bind(null, 'unknown')} roomType={modeType} />
        </ButtonLayout>
        <DefaultButton buttonType="secondary" size="medium" onClick={submitButtonHandler}>
          Lets Go
        </DefaultButton>
      </ModalLayout>
    </>
  );
}

export default SelectModeRoomModal;
