/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { MdOutlineArrowBackIos, MdSettings } from 'react-icons/md';
import { HiShare } from 'react-icons/hi';
import { useRecoilState } from 'recoil';

import { CustomtHeader, HeaderTitleNunito } from '@common/header';
import { makeIconToLink } from '@utils/index';
import { isOpenEventRegisterModalState } from '@atoms/is-open-modal';

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

function ProfileHeader() {
  const BackIcon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };
  const SettingIcon: IconAndLink = { Component: MdSettings, link: '/settings', key: 'setting' };
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenEventRegisterModalState);

  const changeModalState = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <CustomtHeader>
        {makeIconToLink(BackIcon)}
        <HeaderTitleNunito>
          MyPage
        </HeaderTitleNunito>
        <IconContainer>
          <HiShare size={48} />
          <MdSettings size={48} />
        </IconContainer>
      </CustomtHeader>
    </>
  );
}

export default ProfileHeader;
