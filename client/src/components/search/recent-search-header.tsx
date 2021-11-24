import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito } from '@common/header';
import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

function RecentSearchHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/search', key: 'search' };

  return (
    <CustomtHeader>
      {makeIconToLink(Icon)}
      <HeaderTitleNunito to="/search/recent">Recently Listened to</HeaderTitleNunito>
      <div />
    </CustomtHeader>
  );
}

export default RecentSearchHeader;
