import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@common/header';
import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

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
