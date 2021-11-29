import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import viewAnonymous from '@selectors/view-anonymous';
import roomViewState from '@atoms/room-view-type';
import roomDocumentIdState from '@atoms/room-document-id';
import DefaultButton from '@common/default-button';
import RoomTypeCheckBox from '../components/room/room-type-check-box';
import { ButtonLayout } from '../components/room/style';

const ModalLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 90%;
    width: 80%;
`;

const CheckboxLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

function SelectModeRoomModal() {
  const [modeType, setModeType] = useState<string>('known');
  const setViewAnonymous = useSetRecoilState(viewAnonymous);
  const setRoomView = useSetRecoilState(roomViewState);
  const resetRoomDocumentId = useResetRecoilState(roomDocumentIdState);

  const typeHandler = (mode: string) => {
    setModeType(mode);
  };

  const submitButtonHandler = () => {
    setViewAnonymous(modeType);
  };

  const clickGotoEvent = () => {
    setRoomView('createRoomView');
    resetRoomDocumentId();
  };

  return (
    <>
      <ModalLayout>
        <h2> Select the visiting mode </h2>
        <CheckboxLayout>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <RoomTypeCheckBox checkBoxName="known" onClick={typeHandler.bind(null, 'known')} roomType={modeType} />
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <RoomTypeCheckBox checkBoxName="unknown" onClick={typeHandler.bind(null, 'unknown')} roomType={modeType} />
        </CheckboxLayout>
        <ButtonLayout>
          <DefaultButton buttonType="secondary" size="medium" onClick={submitButtonHandler}>
            Lets Go
          </DefaultButton>
          <DefaultButton buttonType="thirdly" size="medium" onClick={clickGotoEvent}>
            Go to the Create View
          </DefaultButton>
        </ButtonLayout>
      </ModalLayout>
    </>
  );
}

export default SelectModeRoomModal;
