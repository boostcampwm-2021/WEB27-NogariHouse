/* eslint-disable object-shorthand */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import toastListSelector from '@selectors/toast-list';
import roomDocumentIdState from '@atoms/room-document-id';
import userTypeState from '@atoms/user';
import roomViewState from '@atoms/room-view-type';
import { isOpenRoomModalState } from '@atoms/is-open-modal';
import DefaultButton from '@common/default-button';
import RoomTypeCheckBox from '@components/room/room-type-check-box';
import AnonymousCheckBox from '@components/room/anonymous-checkbox';
import { getRandomRoomDocumentId, postRoomInfo } from '@api/room';
import { ButtonLayout } from '../components/room/style';

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

const CheckboxLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const TitleInputbarLabel = styled.label`
  font-size: 12px;
  color: #B6B6B6;
`;

// 룸 생성 모달
function RoomModal() {
  const user = useRecoilValue(userTypeState);
  const setToastList = useSetRecoilState(toastListSelector);
  const setRoomView = useSetRecoilState(roomViewState);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const setIsOpenModal = useSetRecoilState(isOpenRoomModalState);
  const [roomType, setRoomType] = useState('public');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitButtonHandler = () => {
    const roomInfo = {
      type: roomType,
      title: inputRef.current?.value as string,
      userId: user.userId,
      userName: user.userName,
      isAnonymous: (roomType !== 'closed') ? isAnonymous : false,
    };
    postRoomInfo(roomInfo)
      .then((roomDocumentId: any) => {
        setRoomDocumentId(roomDocumentId);
        if (roomType === 'closed') setIsOpenModal(true);
        else if (isAnonymous) setRoomView('selectModeView');
        else {
          setRoomView('inRoomView');
          setToastList({
            type: 'success',
            title: '방 생성',
            description: '성공적으로 방이 생성됐습니다!',
          });
        }
      })
      .catch((err) => {
        setToastList({
          type: 'danger',
          title: '방 생성',
          description: '방 생성을 실패했습니다',
        });
        console.error(err);
      });
  };

  const inputHandler = () => {
    setIsDisabled(!inputRef.current?.value);
  };

  const checkboxHandler = () => {
    setIsAnonymous(!isAnonymous);
  };

  const roomTypeHandler = (checkBoxName: string) => {
    setRoomType(checkBoxName);
  };

  const randomlyAssignedHandler = async () => {
    const roomDocumentId = await getRandomRoomDocumentId();
    setRoomDocumentId(roomDocumentId);
    setRoomView('selectModeView');
  };

  return (
    <>
      <h2> Let&apos;s have fun together! </h2>
      <CheckboxLayout>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <RoomTypeCheckBox checkBoxName="public" onClick={roomTypeHandler.bind(null, 'public')} roomType={roomType} />
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <RoomTypeCheckBox checkBoxName="closed" onClick={roomTypeHandler.bind(null, 'closed')} roomType={roomType} />
      </CheckboxLayout>
      <AnonymousCheckBox checked={isAnonymous} onChange={checkboxHandler} roomType={roomType} text="Allow anonymous ?" />
      <CustomTitleForm>
        <TitleInputbarLabel>Add a Room Title</TitleInputbarLabel>
        <TitleInputbar ref={inputRef} onChange={inputHandler} />
      </CustomTitleForm>
      <ButtonLayout>
        <DefaultButton buttonType="secondary" size="medium" onClick={submitButtonHandler} isDisabled={isDisabled}>
          Let&apos;s Go
        </DefaultButton>
        <DefaultButton buttonType="thirdly" size="medium" onClick={randomlyAssignedHandler}>
          Randomly assigned
        </DefaultButton>
      </ButtonLayout>
    </>
  );
}

export default RoomModal;
