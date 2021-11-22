import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
  HiOutlinePaperAirplane, HiSearch, HiOutlineMail, HiOutlineCalendar, HiOutlineBell,
} from 'react-icons/hi';
import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';

import { makeIconToLink } from '@utils/index';
import userState from '@atoms/user';
import { nowFetchingState, nowItemsListState } from '@src/recoil/atoms/main-section-scroll';
import isOpenSliderMenuState from '@atoms/is-open-slider-menu';
import isOpenRoomState from '@atoms/is-open-room';
import SliderMenu from '@common/menu-modal';

const CustomDefaultHeader = styled.nav`
  position: relative;
  width: 95%;
  height: 48px;
  margin: 24px;

  display: flex;
  justify-content: space-between;
`;

const MenuIconsLayout = styled.nav`
  @media (max-width: 1024px) {
    display: none;
  }
  position: relative;
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: space-between;
`;

const OpenMenuButton = styled.button`
  @media (min-width: 1024px) {
      display: none;
  }
`;

const OpenRoomStateButton = styled.button`
  margin-right: 24px;
  @media (min-width: 768px) {
      display: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a:not(:last-child) {
    margin-right: 30px;
  }

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

const LogoTitle = styled(Link)`
  position: absolute;
  left: 47.5%;
  transform: translateX(-47.5%);
  font-family: "Bangers";
  font-size: min(8vw, 48px);
  text-decoration: none;
  color: black;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 70%;
    overflow: hidden;
`;

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

function DefaultHeader() {
  const user = useRecoilValue(userState);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const resetNowItemsList = useResetRecoilState(nowItemsListState);
  const [isOpenMenu, setIsOpenMenu] = useRecoilState(isOpenSliderMenuState);
  const [isOpenRoom, setIsOpenRoom] = useRecoilState(isOpenRoomState);

  const leftSideIcons: IconAndLink[] = [
    { Component: HiSearch, link: '/search', key: 'search' },
    { Component: HiOutlinePaperAirplane, link: '/chat-rooms', key: 'chat' },
  ];
  const rightSideIcons: IconAndLink[] = [
    { Component: HiOutlineMail, link: '/invite', key: 'invite' },
    { Component: HiOutlineCalendar, link: '/event', key: 'event' },
    { Component: HiOutlineBell, link: '/activity', key: 'activity' },
  ];
  return (
    <>
      <CustomDefaultHeader>
        <LogoTitle to="/" onClick={() => { resetNowItemsList(); setNowFetching(true); }}> NogariHouse </LogoTitle>
        <OpenMenuButton onClick={() => { setIsOpenMenu(!isOpenMenu); }}>Menu</OpenMenuButton>
        <OpenRoomStateButton onClick={() => { setIsOpenRoom(!isOpenRoom); }}>
          Room
        </OpenRoomStateButton>
        <MenuIconsLayout>
          <IconContainer>
            {leftSideIcons.map(makeIconToLink)}
          </IconContainer>
          <IconContainer>
            {rightSideIcons.map(makeIconToLink)}
            <Link to={`/profile/${user.userId}`}><ImageLayout src={user.profileUrl} alt="사용자" /></Link>
          </IconContainer>
        </MenuIconsLayout>
      </CustomDefaultHeader>
      {isOpenMenu && <SliderMenu />}
    </>
  );
}

export default DefaultHeader;
