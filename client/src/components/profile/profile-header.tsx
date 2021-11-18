import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos, MdSettings } from 'react-icons/md';
import { HiShare } from 'react-icons/hi';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { isOpenShareModalState } from '@atoms/is-open-modal';
import userState from '@atoms/user';
import { CustomtHeader, HeaderTitleNunito } from '@common/header';
import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;

  svg:not(:last-child) {
    margin-right: 30px;
  }

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;
function ProfileHeader({ match }: RouteComponentProps<{id: string}>) {
  const BackIcon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };
  const SettingIcon: IconAndLink = { Component: MdSettings, link: '/settings', key: 'setting' };
  const user = useRecoilValue(userState);
  const setIsOpenModal = useSetRecoilState(isOpenShareModalState);

  const changeModalState = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <CustomtHeader>
        {makeIconToLink(BackIcon)}
        <HeaderTitleNunito>
          Profile
        </HeaderTitleNunito>
        <IconContainer>
          <HiShare onClick={changeModalState} size={48} />
          {(match.params.id === user.userId) && makeIconToLink(SettingIcon)}
        </IconContainer>
      </CustomtHeader>
    </>
  );
}

export default ProfileHeader;
