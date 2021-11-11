import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { BiCalendarPlus } from 'react-icons/bi';
import { useRecoilState } from 'recoil';

import { CustomtHeader, HeaderTitleNunito } from '@styled-components/header';
import { makeIconToLink } from '@utils/index';
import { isOpenEventRegisterModalState } from '@atoms/is-open-modal';

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

const EventAddButton = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  :hover {
    cursor: pointer;
  }
`;

function EventHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenEventRegisterModalState);

  const changeModalState = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <CustomtHeader>
        {makeIconToLink(Icon)}
        <HeaderTitleNunito onClick={() => alert('test modal')}>
          UPCOMING FOR YOU ▼
        </HeaderTitleNunito>
        <EventAddButton>
          <BiCalendarPlus onClick={changeModalState} size={48} />
        </EventAddButton>
      </CustomtHeader>
    </>
  );
}

export default EventHeader;
