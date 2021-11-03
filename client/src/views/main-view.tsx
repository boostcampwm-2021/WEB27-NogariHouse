import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DefaultButton from '@styled-components/default-button';
import HeaderRouter from '@routes/header';
import MainRouter from '@routes/main';
import LargeLogo from '@src/components/large-logo';
import LeftSideBar from '@src/components/left-sidebar';
import RightSideBar from '@src/components/right-sidebar';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const ButtonLayout = styled.div`
  margin-top: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function MainView() {
  const [isLoggedIn] = useState(true);
  if (isLoggedIn) {
    return (
      <>
        <HeaderRouter />
        <LeftSideBar />
        <MainRouter />
        <RightSideBar />
      </>
    );
  }
  return (
    <>
      <MainLayout>
        <LargeLogo />
        <ButtonLayout>
          <Link to="/signup">
            <DefaultButton buttonType="secondary" size="large">
              SIGN UP
            </DefaultButton>
          </Link>
          <Link to="/signin">
            <DefaultButton buttonType="thirdly" size="large">
              SIGN IN
            </DefaultButton>
          </Link>
        </ButtonLayout>
      </MainLayout>
    </>
  );
}

export default MainView;
