import React from 'react';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@common/header';
import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

function RecentSearchHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/search', key: 'search' };

  return (
    <CustomtHeader>
      <CustomMenuIconsLayout>
        {makeIconToLink(Icon)}
      </CustomMenuIconsLayout>
      <HeaderTitleNunito to="/search/recent">Recently Listened to</HeaderTitleNunito>
    </CustomtHeader>
  );
}

export default RecentSearchHeader;
