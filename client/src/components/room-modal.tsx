/* eslint-disable object-shorthand */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import roomTypeState from '@atoms/room-type';
import userTypeState from '@atoms/user';
import DefaultButton from './styled-components/default-button';
import RoomTypeCheckBox from './room-type-check-box';
import AnonymousCheckBox from './anonymous-checkbox';

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

function RoomModal() {
  const [roomType] = useRecoilState(roomTypeState);
  const [user, setUser] = useRecoilState(userTypeState);
  console.log('user unused 방지용 :: ', user);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitButtonHandler = () => {
    // userId 현재 아이디 가져와야함
    const roomInfo = {
      type: roomType,
      title: inputRef.current?.value,
      userId: 'dlatqdlatq',
      isAnonymous: isAnonymous,
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/room`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomInfo),

    }).then((res) => console.log(res))
      .catch((err) => console.error(err));

    // 유저가 방 접속했다고 상태 변경
    setUser({ roomId: roomType });
  };

  const inputOnChange = () => {
    setIsDisabled(!inputRef.current?.value);
  };

  const checkboxOnChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <>
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
    </>
  );
}

export default RoomModal;
