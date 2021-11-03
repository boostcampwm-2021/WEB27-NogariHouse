import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { HiOutlineCalendar } from 'react-icons/hi';
import { FaPlusCircle } from 'react-icons/fa';

import { CustomtHeader, HeaderTitleNunito } from '@styled-components/header';
import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component: IconType;
  link: string;
  size?: number;
  color?: string;
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
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/' };

  return (
    <CustomtHeader>
      {makeIconToLink(Icon)}
      <HeaderTitleNunito onClick={() => alert('test modal')}>UPCOMING FOR YOU ▼</HeaderTitleNunito>
      <EventAddButton>
        <HiOutlineCalendar onClick={() => alert('test')} size={48} />
        <PlusIconStyle />
      </EventAddButton>
    </CustomtHeader>
  );
}

export default EventHeader;
