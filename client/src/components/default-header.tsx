import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
  HiOutlinePaperAirplane, HiSearch, HiOutlineMail, HiOutlineCalendar, HiOutlineBell,
} from 'react-icons/hi';

import { makeIconToLink } from '@utils/index';

const CustomDefaultHeader = styled.nav`
  position: relative;
  width: calc(100%-96px);
  height: 64px;
  min-width: 900px;
  padding: 24px 48px;

  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a:not(:last-child) {
    margin-right: 3vw;
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
  Component: IconType,
  link: string,
  size?: number,
  color?: string,
}

function DefaultHeader() {
  const leftSideIcons: IconAndLink[] = [
    { Component: HiSearch, link: '/search' },
    { Component: HiOutlinePaperAirplane, link: '/chat' },
  ];
  const rightSideIcons: IconAndLink[] = [
    { Component: HiOutlineMail, link: '/invite' },
    { Component: HiOutlineCalendar, link: '/event' },
    { Component: HiOutlineBell, link: '/activity' },
  ];
  return (
    <CustomDefaultHeader>
      <IconContainer>
        {leftSideIcons.map(makeIconToLink)}
      </IconContainer>
      <LogoTitle to="/"> NogariHouse </LogoTitle>
      <IconContainer>
        {rightSideIcons.map(makeIconToLink)}
        <Link to="/profile"><ImageLayout src="https://avatars.githubusercontent.com/u/59464537?v=4" alt="사용자" /></Link>
      </IconContainer>
    </CustomDefaultHeader>
  );
}

export default DefaultHeader;
