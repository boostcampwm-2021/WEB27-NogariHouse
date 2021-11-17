/* eslint-disable object-shorthand */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import roomTypeState from '@atoms/room-type';
import roomDocumentIdState from '@atoms/room-document-id';
import userTypeState from '@atoms/user';
import roomViewType from '@atoms/room-view-type';
import { postRoomInfo } from '@api/index';
import DefaultButton from '@common/default-button';
import RoomTypeCheckBox from '@components/room/room-type-check-box';
import AnonymousCheckBox from '@components/room/anonymous-checkbox';

const CustomTitleForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleInputbar = styled.input`
  background: none;
  color: #58964F;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #58964F;
  &:focus {
    outline: none;
  }
`;

const TitleInputbarLabel = styled.label`
  font-size: 12px;
  color: #B6B6B6;
`;

// 룸 생성 모달
function RoomModal() {
  const user = useRecoilValue(userTypeState);
  const setRoomView = useSetRecoilState(roomViewType);
  const [roomType] = useRecoilState(roomTypeState);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitButtonHandler = () => {
    const roomInfo = {
      type: roomType,
      title: inputRef.current?.value as string,
      userId: user.userId,
      userName: user.userName,
      isAnonymous: isAnonymous,
    };
    postRoomInfo(roomInfo)
      .then((roomDocumentId: any) => {
        setRoomDocumentId(roomDocumentId);
        if (roomType === 'closedSelectorView') setRoomView('closedSelectorView');
        else setRoomView('inRoomView');
      })
      .catch((err) => console.error(err));
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
