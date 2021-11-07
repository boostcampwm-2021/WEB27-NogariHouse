import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import isOpenModalState from '@atoms/is-open-modal';

const CustomEventRegisterModal = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width : 100%;
  min-width: 500px;
  min-height: 500px;
  background-color:white;
  border-radius: 30px;
`;

const ModalHeader = styled.div`
  margin: 20px;
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const CustomEventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CancelButton = styled.button`
  color : #58964F;
  border: none;
  background-color: #FFFFFF;
  &:hover {
    cursor: pointer;
  }
`;

const PublishButton = styled.button`
  color :  #586A9A;
  border: none;
  background-color: #FFFFFF;
  &:hover {
    cursor: pointer;
  }
  :disabled{
    color : #B6B6B6;
    &:hover {
      cursor: default;
    }
  }
`;

function EventRegisterModal() {
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalState);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);
  const textDescRef = useRef<HTMLTextAreaElement>(null);

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

  const publishButtonHandler = () => {
    const eventInfo = {
      title: inputTitleRef.current?.value,
      users: ['test'],
      date: new Date(`${inputDateRef.current?.value} ${inputTimeRef.current?.value}`),
      description: textDescRef.current?.value,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/event`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventInfo),

    }).then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  if (isOpenModal) {
    return (
      <>
        <CustomEventRegisterModal>
          <ModalHeader>
            <CancelButton type="button" onClick={changeModalState}>Cancel</CancelButton>
            <span>NEW EVENT</span>
            <PublishButton type="button" onClick={publishButtonHandler} disabled={isDisabled}>Publish</PublishButton>
          </ModalHeader>
          <CustomEventForm>
            <input type="text" ref={inputTitleRef} name="title" placeholder="Event Name" onChange={inputOnChange} />
            <div>
              <span>with</span>
            </div>
            <input type="date" ref={inputDateRef} name="date" onChange={inputOnChange} />
            <input type="time" ref={inputTimeRef} name="time" onChange={inputOnChange} />
            <textarea ref={textDescRef} name="desc" placeholder="desc" onChange={inputOnChange} />
          </CustomEventForm>
        </CustomEventRegisterModal>
      </>
    );
  }
  return (<></>);
}

export default EventRegisterModal;
