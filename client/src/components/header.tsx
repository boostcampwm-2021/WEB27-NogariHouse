import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
  HiOutlinePaperAirplane, HiSearch, HiOutlineMail, HiOutlineCalendar, HiOutlineBell,
} from 'react-icons/hi';

import { makeIconToLink } from '@utils/index';

const CustomDefaultHeader = styled.nav`
  width: calc(100%-48px);
  height: 64px;
  min-width: 500px;
  padding: 48px 24px 24px 24px;

  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a:not(: last-child) {
    margin-right: 3vw;
  }
`;

const LogoTitle = styled(Link)`
  font-family: "Bangers";
  font-size: 48px;
  text-decoration: none;
  color: black;
`;

interface IconAndLink {
    Component:IconType,
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
      </IconContainer>
    </CustomDefaultHeader>
  );
}

export default DefaultHeader;
