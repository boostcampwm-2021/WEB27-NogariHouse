import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { CustomtHeader, HeaderTitleNunito } from '@common/header';

const LogoTitle = styled(Link)`
  font-family: "Bangers";
  font-size: 32px;
  text-decoration: none;
  color: black;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function FollowersHeader({ history, location }: RouteComponentProps) {
  return (
    <CustomtHeader>
      <MdOutlineArrowBackIos onClick={() => history.goBack()} size={48} />
      <HeaderTitleNunito to={location.pathname}>FOLLOWERS</HeaderTitleNunito>
      <LogoTitle to="/">NOGARIHOUSE</LogoTitle>
    </CustomtHeader>
  );
}

export default FollowersHeader;
