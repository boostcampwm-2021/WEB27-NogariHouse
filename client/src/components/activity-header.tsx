import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito } from '@styled-components/header';
import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component: IconType;
  link: string;
  size?: number;
  color?: string;
}

function ActivityHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/' };

  return (
    <CustomtHeader>
      {makeIconToLink(Icon)}
      <HeaderTitleNunito>ACTIVITY</HeaderTitleNunito>
      <div />
    </CustomtHeader>
  );
}

export default ActivityHeader;
