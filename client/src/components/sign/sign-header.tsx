import React from 'react';
import { CustomtHeader } from '@common/header';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

function SignHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };

  return (
    <CustomtHeader>
      {makeIconToLink(Icon)}
    </CustomtHeader>
  );
}

export default SignHeader;
