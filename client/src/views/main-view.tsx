/* eslint-disable*/

import React, {  UIEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { nowFetchingState } from '@atoms/main-section-scroll'
import LargeLogo from '@components/large-logo';
import LeftSideBar from '@components/left-sidebar';
import RightSideBar from '@components/right-sidebar';
import HeaderRouter from '@routes/header';
import MainRouter from '@routes/main';
import DefaultButton from '@styled-components/default-button';
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
  position: relative;
  width: 100%;
  height: 500px;
  min-width: 500px;
  flex-grow: 3;
  margin: 10px;

  > div + div {
    margin-top: 10px;
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const nowFetchingRef = useRef<boolean>(false);

  const onScrollHandler = (e : UIEvent<HTMLDivElement>) => {
    if(nowFetchingRef.current){
      return 0;
    }
    else{
      const diff = (e.currentTarget).scrollHeight - (e.currentTarget).scrollTop;
      if(diff < 700) {
        setNowFetching(true);
        nowFetchingRef.current = true;
        setTimeout(() => {nowFetchingRef.current = false;}, 200);
        }
      }
    };
  if (isLoggedIn) {
    return (
      <>
        <HeaderRouter />
        <SectionLayout>
          <ActiveFollowingLayout>
            <LeftSideBar />
          </ActiveFollowingLayout>
          <MainSectionLayout onScroll={onScrollHandler}>
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
          <Link to="/">
            <DefaultButton onClick={() => {setIsLoggedIn(true)}} buttonType="thirdly" size="large">
              SIGN IN
            </DefaultButton>
          </Link>
        </ButtonLayout>
      </MainLayout>
    </>
  );
}

export default MainView;
