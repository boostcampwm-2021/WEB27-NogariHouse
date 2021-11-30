import React from 'react';
import { CustomtHeader, CustomMenuIconsLayout } from '@styles/header';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

function SignHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };

  return (
    <CustomtHeader>
      <CustomMenuIconsLayout>
        {makeIconToLink(Icon)}
      </CustomMenuIconsLayout>
    </CustomtHeader>
  );
}

export default SignHeader;
