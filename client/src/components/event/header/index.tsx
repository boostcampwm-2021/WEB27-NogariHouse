import React from 'react';
import styled from 'styled-components';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { BiCalendarPlus } from 'react-icons/bi';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { isOpenEventRegisterModalState } from '@atoms/is-open-modal';
import { nowCountState, nowFetchingState, nowItemsListState } from '@atoms/main-section-scroll';
import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@styles/header';
import { IconAndLink } from '@interfaces/index';
import { makeIconToLink } from '@utils/index';

const EventAddButton = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  :hover {
    cursor: pointer;
  }
`;

function EventHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };
  const setIsOpenModal = useSetRecoilState(isOpenEventRegisterModalState);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const resetNowItemsList = useResetRecoilState(nowItemsListState);
  const setNowCount = useSetRecoilState(nowCountState);

  const changeModalState = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <CustomtHeader>

        <HeaderTitleNunito
          to="/event"
          style={{ fontSize: 'min(5vw, 32px)' }}
          onClick={() => { resetNowItemsList(); setNowCount(0); setNowFetching(true); }}
        >
          UPCOMING FOR EVERYONE
        </HeaderTitleNunito>
        <CustomMenuIconsLayout>
          {makeIconToLink(Icon)}
          <EventAddButton>
            <BiCalendarPlus onClick={changeModalState} size={48} />
          </EventAddButton>
        </CustomMenuIconsLayout>
      </CustomtHeader>
    </>
  );
}

export default EventHeader;
