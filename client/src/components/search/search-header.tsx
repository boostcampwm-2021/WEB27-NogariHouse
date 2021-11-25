import React from 'react';
import { MdOutlineArrowBackIos, MdPersonPin } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@common/header';
import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

function SearchHeader() {
  const Icons: IconAndLink[] = [
    { Component: MdOutlineArrowBackIos, link: '/', key: 'main' },
    { Component: MdPersonPin, link: '/search/recent', key: 'recent' },
  ];

  return (
    <CustomtHeader>
      <CustomMenuIconsLayout>
        {Icons.map(makeIconToLink)}
      </CustomMenuIconsLayout>
      <HeaderTitleNunito to="/search">Explore</HeaderTitleNunito>
    </CustomtHeader>
  );
}

export default SearchHeader;
