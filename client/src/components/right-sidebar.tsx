import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import roomTypeState from '@atoms/room-type';
import DefaultButton from './styled-components/default-button';
import RoomTypeCheckBox from './room-type-check-box';

const CreatRoomModal = styled.div`
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
`;

const AnonymousCheckBox = styled.div`
  background-color: #ffffff;
  border-radius: 30px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CustomTitleForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  font-size: 16px;
`;

const TitleInputbar = styled.input`
  border: 1px solid;
  padding: 0;
  placeholder: 'input';
`;

function RightSideBar() {
  const [roomType] = useRecoilState(roomTypeState);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitButtonHandler = () => {
    console.log('submit', inputRef.current?.value);
    console.log('submit', roomType);
  };

  const inputOnChange = () => {
    setIsDisabled(!inputRef.current?.value);
  };

  return (
    <CreatRoomModal>
      <RoomTypeCheckBox checkBoxName="public" />
      <RoomTypeCheckBox checkBoxName="social" />
      <RoomTypeCheckBox checkBoxName="closed" />
      <AnonymousCheckBox />
      <CustomTitleForm>
        <div>Title:</div>
        <TitleInputbar ref={inputRef} onChange={inputOnChange} />
      </CustomTitleForm>
      <DefaultButton buttonType="secondary" size="medium" onClick={submitButtonHandler} isDisabled={isDisabled}>
        Lets Go
      </DefaultButton>
    </CreatRoomModal>
  );
}

export default RightSideBar;
