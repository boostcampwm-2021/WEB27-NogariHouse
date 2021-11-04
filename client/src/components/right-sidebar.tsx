import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import roomTypeState from '@atoms/room-type';
import DefaultButton from './styled-components/default-button';
import RoomTypeCheckBox from './room-type-check-box';
import AnonymousCheckBox from './anonymous-checkbox';

const RoomModal = styled.div`
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

const CustomTitleForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleInputbar = styled.input`
  border: 1px solid #58964F;
  border-radius: 8px;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const TitleInputbarLabel = styled.label`
  font-size: 12px;
  color: #B6B6B6;
`;

function RightSideBar() {
  const [roomType] = useRecoilState(roomTypeState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitButtonHandler = () => {
    const roomInfo = {
      type: roomType,
      title: inputRef.current?.value,
      participants: ['test'],
      isAnonymous,
    };

    fetch('http://localhost:3000/api/room', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomInfo),

    }).then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const inputOnChange = () => {
    setIsDisabled(!inputRef.current?.value);
  };

  const checkboxOnChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <RoomModal>
      <RoomTypeCheckBox checkBoxName="public" />
      <RoomTypeCheckBox checkBoxName="social" />
      <RoomTypeCheckBox checkBoxName="closed" />
      <AnonymousCheckBox checked={isAnonymous} onChange={checkboxOnChange} />
      <CustomTitleForm>
        <TitleInputbarLabel>Add a Room Title</TitleInputbarLabel>
        <TitleInputbar ref={inputRef} onChange={inputOnChange} />
      </CustomTitleForm>
      <DefaultButton buttonType="secondary" size="medium" onClick={submitButtonHandler} isDisabled={isDisabled}>
        Lets Go
      </DefaultButton>
    </RoomModal>
  );
}

export default RightSideBar;
