import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { RouteComponentProps } from 'react-router-dom';

import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@styles/header';

function ProfileHeader({ history, location }: RouteComponentProps<{id: string}>) {
  return (
    <>
      <CustomtHeader>
        <HeaderTitleNunito to={location.pathname}>
          Profile
        </HeaderTitleNunito>
        <CustomMenuIconsLayout>
          <MdOutlineArrowBackIos onClick={() => history.goBack()} size={48} />
        </CustomMenuIconsLayout>
      </CustomtHeader>
    </>
  );
}

export default ProfileHeader;
