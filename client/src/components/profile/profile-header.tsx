import React from 'react';
import styled from 'styled-components';
import { MdOutlineArrowBackIos, MdSettings } from 'react-icons/md';
import { HiShare } from 'react-icons/hi';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { isOpenShareModalState } from '@atoms/is-open-modal';
import userState from '@atoms/user';
import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@common/header';
import { makeIconToLink } from '@utils/index';
import { IconAndLink } from '@interfaces/index';

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
function ProfileHeader({ match, history, location }: RouteComponentProps<{id: string}>) {
  const SettingIcon: IconAndLink = { Component: MdSettings, link: '/settings', key: 'setting' };
  const user = useRecoilValue(userState);
  const setIsOpenModal = useSetRecoilState(isOpenShareModalState);

  const changeModalState = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <CustomtHeader>
        <HeaderTitleNunito to={location.pathname}>
          Profile
        </HeaderTitleNunito>
        <CustomMenuIconsLayout>
          <MdOutlineArrowBackIos onClick={() => history.goBack()} size={48} />

          <IconContainer>
            <HiShare onClick={changeModalState} size={48} />
            {(match.params.id === user.userId) && makeIconToLink(SettingIcon)}
          </IconContainer>
        </CustomMenuIconsLayout>
      </CustomtHeader>
    </>
  );
}

export default ProfileHeader;
