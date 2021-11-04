import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DefaultButton from '@styled-components/default-button';
import HeaderRouter from '@routes/header';
import MainRouter from '@routes/main';
import LargeLogo from '@src/components/large-logo';
import LeftSideBar from '@src/components/left-sidebar';
import RightSideBar from '@src/components/right-sidebar';
import ScrollBarStyle from '@styles/scrollbar-style';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SectionLayout = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 500px;
`;

const ActiveFollowingLayout = styled.div`
  flex-grow: 1;
  margin: 10px;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
`;
const MainSectionLayout = styled.div`
  width: 100%;
  min-width: 500px;
  flex-grow: 3;
  margin: 10px;

  > div + div {
    margin-top: 20px;
  }
  ${ScrollBarStyle}
`;

const RoomLayout = styled.div`
  flex-grow: 2;
  margin: 10px;
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
        <SectionLayout>
          <ActiveFollowingLayout>
            <LeftSideBar />
          </ActiveFollowingLayout>
          <MainSectionLayout>
            <MainRouter />
          </MainSectionLayout>
          <RoomLayout>
            <RightSideBar />
          </RoomLayout>
        </SectionLayout>
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
