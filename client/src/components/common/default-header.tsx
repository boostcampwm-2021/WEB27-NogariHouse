import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
  HiOutlinePaperAirplane, HiSearch, HiOutlineMail, HiOutlineCalendar, HiOutlineBell,
} from 'react-icons/hi';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { makeIconToLink } from '@utils/index';
import userState from '@atoms/user';
import { nowFetchingState, nowItemsListState } from '@src/recoil/atoms/main-section-scroll';

const CustomDefaultHeader = styled.nav`
  position: relative;
  width: calc(100%-96px);
  height: 48px;
  min-width: 900px;
  padding: 24px 48px;

  display: flex;
  justify-content: space-between;
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
  left: 50%;
  transform: translateX(-50%);
  font-family: "Bangers";
  font-size: 48px;
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
    <CustomDefaultHeader>
      <IconContainer>
        {leftSideIcons.map(makeIconToLink)}
      </IconContainer>
      <LogoTitle to="/" onClick={() => { resetNowItemsList(); setNowFetching(true); }}> NogariHouse </LogoTitle>
      <IconContainer>
        {rightSideIcons.map(makeIconToLink)}
        <Link to="/profile"><ImageLayout src={user.profileUrl} alt="사용자" /></Link>
      </IconContainer>
    </CustomDefaultHeader>
  );
}

export default DefaultHeader;
