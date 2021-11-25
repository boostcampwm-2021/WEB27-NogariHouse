import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  HiOutlinePaperAirplane,
  HiSearch,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineBell,
  HiOutlineLogout,
  HiMenu,
  HiTable,
} from 'react-icons/hi';
import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';

import { makeIconToLink, signOutHandler } from '@utils/index';
import userState from '@atoms/user';
import { nowCountState, nowFetchingState, nowItemsListState } from '@atoms/main-section-scroll';
import isOpenSliderMenuState from '@atoms/is-open-slider-menu';
import isOpenRoomState from '@atoms/is-open-room';
import SliderMenu from '@common/menu-modal';
import { IconAndLink } from '@interfaces/index';

const CustomDefaultHeader = styled.nav`
  width: 100%;
  height: 48px;
  margin: 24px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuIconsLayout = styled.nav`
  @media (max-width: 1024px) {
    display: none;
  }
  position: relative;
  width: 100%;
  height: 48px;
  margin: 0 min(1vw,24px);

  display: flex;
  justify-content: space-between;
`;

const ResponsiveMenuIconsLayout = styled.nav`
  @media (min-width: 1025px) {
    display: none;
  }
  width: 100%;
  height: 48px;
  margin: 0 min(1vw,24px);

  display: flex;
  justify-content: space-between;
`;

const OpenMenuButton = styled.button`
  @media (min-width: 1025px) {
      display: none;
  }
  background: inherit ;
  border:none;
  box-shadow:none;
  border-radius:0;
  padding:0;
  overflow:visible;
  cursor:pointer;
  margin-left: min(2vw,24px);
`;

const OpenRoomStateButton = styled.button`
  @media (min-width: 768px) {
      display: none;
  }

  background: inherit ;
  border:none;
  box-shadow:none;
  border-radius:0;
  padding:0;
  overflow:visible;
  cursor:pointer;
  margin-right: min(2vw,24px);
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    margin-right: 30px;
  }

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

const LogoTitle = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Bangers";
  font-size: min(8vw, 48px);
  text-decoration: none;
  color: black;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    border-radius: 70%;
    overflow: hidden;
`;

function DefaultHeader() {
  const user = useRecoilValue(userState);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const resetNowItemsList = useResetRecoilState(nowItemsListState);
  const [isOpenMenu, setIsOpenMenu] = useRecoilState(isOpenSliderMenuState);
  const [isOpenRoom, setIsOpenRoom] = useRecoilState(isOpenRoomState);
  const setNowCount = useSetRecoilState(nowCountState);

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
        <LogoTitle to="/" onClick={() => { resetNowItemsList(); setNowCount(0); setNowFetching(true); }}> NogariHouse </LogoTitle>
        <ResponsiveMenuIconsLayout>
          <OpenMenuButton onClick={() => { setIsOpenMenu(!isOpenMenu); }}>
            <HiMenu size="48" />
          </OpenMenuButton>
          <OpenRoomStateButton className="open-room-button" onClick={() => { setIsOpenRoom(!isOpenRoom); }}>
            <HiTable size="48" />
          </OpenRoomStateButton>
        </ResponsiveMenuIconsLayout>
        <MenuIconsLayout>
          <IconContainer>
            <Link to={`/profile/${user.userId}`}><ImageLayout src={user.profileUrl} alt="사용자" /></Link>
            {leftSideIcons.map(makeIconToLink)}
          </IconContainer>
          <IconContainer>
            {rightSideIcons.map(makeIconToLink)}
            <HiOutlineLogout size="48" onClick={signOutHandler} />
          </IconContainer>
        </MenuIconsLayout>
      </CustomDefaultHeader>
      {isOpenMenu && <SliderMenu />}
    </>
  );
}

export default DefaultHeader;
