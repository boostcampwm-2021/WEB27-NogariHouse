import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { HiOutlineCalendar } from 'react-icons/hi';
import { FaPlusCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

import { CustomtHeader, HeaderTitleNunito } from '@styled-components/header';
import { makeIconToLink } from '@utils/index';
import isOpenModalState from '@atoms/is-open-modal';

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
`;

const PlusIconStyle = styled(FaPlusCircle)`
  position: absolute;
  left: -6px;
  bottom: -6px;
  width: 24px;
  height: 24px;
  background: #f1f0e4;
`;

function EventHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalState);

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
          <HiOutlineCalendar onClick={() => changeModalState()} size={48} />
          <PlusIconStyle />
        </EventAddButton>
      </CustomtHeader>
    </>
  );
}

export default EventHeader;
