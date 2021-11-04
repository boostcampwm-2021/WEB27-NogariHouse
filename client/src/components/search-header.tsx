import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos, MdPersonPin } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito } from '@styled-components/header';
import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component: IconType;
  link: string;
  size?: number;
  color?: string;
}

function SearchHeader() {
  const Icons: IconAndLink[] = [
    { Component: MdOutlineArrowBackIos, link: '/' },
    { Component: MdPersonPin, link: '/search/recent' },
  ];

  return (
    <CustomtHeader>
      {Icons.map(makeIconToLink)}
      <HeaderTitleNunito>Explore</HeaderTitleNunito>
    </CustomtHeader>
  );
}

export default SearchHeader;