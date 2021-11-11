import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos, MdPersonPin } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito } from '@common/header';
import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

function SearchHeader() {
  const Icons: IconAndLink[] = [
    { Component: MdOutlineArrowBackIos, link: '/', key: 'main' },
    { Component: MdPersonPin, link: '/search/recent', key: 'recent' },
  ];

  return (
    <CustomtHeader>
      {Icons.map(makeIconToLink)}
      <HeaderTitleNunito>Explore</HeaderTitleNunito>
    </CustomtHeader>
  );
}

export default SearchHeader;
