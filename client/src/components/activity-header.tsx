import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito } from '@common/header';
import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

function ActivityHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };

  return (
    <CustomtHeader>
      {makeIconToLink(Icon)}
      <HeaderTitleNunito to="/activity">ACTIVITY</HeaderTitleNunito>
      <div />
    </CustomtHeader>
  );
}

export default ActivityHeader;
