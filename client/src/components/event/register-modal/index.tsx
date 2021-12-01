import React, { useRef, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { isOpenEventRegisterModalState } from '@atoms/is-open-modal';
import toastListSelector from '@selectors/toast-list';
import { BackgroundWrapper } from '@styles/modal';
import postEvent from '@api/event';
import { nowCountState, nowFetchingState, nowItemsListState } from '@src/recoil/atoms/main-section-scroll';
import toastMessage from '@constants/toast-message';
import EventSelectUserDropdown from './select-uesr-dropdown';
import {
  CustomEventRegisterModal, ModalHeader, CustomEventForm, CustomFormBox,
  CancelButton, PublishButton, CustomInput, CustomInputDiv, CustomTextArea,
  SelectUserComponent, InputDescSpan, AddGuestSpan,
} from './style';

function EventRegisterModal() {
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenEventRegisterModalState);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);
  const textDescRef = useRef<HTMLTextAreaElement>(null);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [isOpenSelectedList, setisOpenSelectedList] = useState(false);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const resetNowItemsList = useResetRecoilState(nowItemsListState);
  const setNowCount = useSetRecoilState(nowCountState);
  const setToastList = useSetRecoilState(toastListSelector);

  const changeModalState = () => {
    setIsOpenModal(!isOpenModal);
  };

  const inputOnChange = () => {
    if (inputTitleRef.current?.value
      && inputDateRef.current?.value
      && inputTimeRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const publishButtonHandler = async () => {
    try {
      const eventInfo = {
        title: inputTitleRef.current?.value,
        participants: selectedList,
        date: new Date(`${inputDateRef.current?.value} ${inputTimeRef.current?.value}`),
        description: textDescRef.current?.value,
      };

      await postEvent(eventInfo);
      setToastList(toastMessage.addEventSuccess(`${inputTitleRef.current?.value} 이벤트가 등록되었습니다!`));

      changeModalState();
      resetNowItemsList();
      setNowCount(0);
      setNowFetching(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isOpenModal) {
    return (
      <>
        <BackgroundWrapper />
        <CustomEventRegisterModal>
          <ModalHeader>
            <CancelButton type="button" onClick={changeModalState}>Cancel</CancelButton>
            <span>NEW EVENT</span>
            <PublishButton type="button" onClick={publishButtonHandler} disabled={isDisabled}>Publish</PublishButton>
          </ModalHeader>
          <CustomEventForm>
            <CustomFormBox>
              <CustomInput type="text" ref={inputTitleRef} name="title" placeholder="Event Name" onChange={inputOnChange} />
              <CustomInputDiv>
                <InputDescSpan>with</InputDescSpan>
                {selectedList.map((userId: string) => (
                  <SelectUserComponent key={userId} data-id={userId}>
                    {`@${userId}`}
                  </SelectUserComponent>
                ))}
              </CustomInputDiv>
              <CustomInputDiv>
                <AddGuestSpan onClick={() => setisOpenSelectedList((now) => (!now))}>Add a Co-host or Guest</AddGuestSpan>
                <EventSelectUserDropdown isOpenSelectedList={isOpenSelectedList} setSelectedList={setSelectedList} />
              </CustomInputDiv>
            </CustomFormBox>
            <CustomFormBox>
              <CustomInput type="date" ref={inputDateRef} name="date" onChange={inputOnChange} />
              <CustomInput type="time" ref={inputTimeRef} name="time" onChange={inputOnChange} />
            </CustomFormBox>
            <CustomFormBox>
              <CustomTextArea ref={textDescRef} name="desc" placeholder="desc" onChange={inputOnChange} />
            </CustomFormBox>
          </CustomEventForm>
        </CustomEventRegisterModal>
      </>
    );
  }
  return (<></>);
}

export default EventRegisterModal;
