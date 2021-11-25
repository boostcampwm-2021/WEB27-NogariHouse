import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@common/header';
import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

function InviteHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };

  return (
    <CustomtHeader>
      <CustomMenuIconsLayout>
        {makeIconToLink(Icon)}
      </CustomMenuIconsLayout>
      <HeaderTitleNunito to="/invite">INVITE</HeaderTitleNunito>
      <div />
    </CustomtHeader>
  );
}

export default InviteHeader;
