import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DefaultButton from '@styled-components/default-button';
import MainRouter from '@routes/main';
import LargeLogo from '@src/components/large-logo';

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
  const [isLoggedIn] = useState(false);
  if (isLoggedIn) {
    return (
      <>
        <div>side bar이다</div>
        <MainRouter />
        <div>side bar2이다</div>
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
