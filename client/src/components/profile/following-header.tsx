import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { RouteComponentProps } from 'react-router-dom';

import { CustomtHeader, HeaderTitleNunito } from '@common/header';

function FollowingHeader({ history }: RouteComponentProps) {
  return (
    <CustomtHeader>
      <MdOutlineArrowBackIos onClick={() => history.goBack()} size={48} />
      <HeaderTitleNunito>FOLLOWING</HeaderTitleNunito>
      <div />
    </CustomtHeader>
  );
}

export default FollowingHeader;
