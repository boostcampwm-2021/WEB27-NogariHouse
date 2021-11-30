import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@styles/header';
import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

function SearchHeader() {
  const Icons: IconAndLink[] = [
    { Component: MdOutlineArrowBackIos, link: '/', key: 'main' },
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
