import React, { useRef } from 'react';
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

function EventRegisterModal() {
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalState);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);
  const textDescRef = useRef<HTMLTextAreaElement>(null);

  const changeModalState = () => {
    setIsOpenModal(!isOpenModal);
  };

  // const makeDateFormat = () => {

  // };

  const publishButtonHandler = () => {
    const eventInfo = {
      title: inputTitleRef.current?.value,
      participants: ['test'],
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
            <button type="button" onClick={changeModalState}>Cancel</button>
            <span>NEW EVENT</span>
            <button type="button" onClick={publishButtonHandler}>Publish</button>
          </ModalHeader>
          <CustomEventForm>
            <input type="text" ref={inputTitleRef} name="title" placeholder="Event Name" />
            <div>
              <span>with</span>
            </div>
            <input type="date" ref={inputDateRef} name="date" />
            <input type="time" ref={inputTimeRef} name="time" />
            <textarea ref={textDescRef} name="description" placeholder="description" />
          </CustomEventForm>
        </CustomEventRegisterModal>
      </>
    );
  }
  return (<></>);
}

export default EventRegisterModal;
