import React from 'react';
import styled from 'styled-components';

import LogoImage from '@images/logo.svg';

const AppTitle = styled.span`
  font-family: "Bangers";
  font-size: 48px;
`;

function LargeLogo() {
  return (
    <>
      <img src={LogoImage} alt="logo" />
      <AppTitle>NOGARIHOUSE</AppTitle>
    </>
  );
}

export default LargeLogo;
