import React, {
  UIEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { useSetRecoilState } from 'recoil';
// import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { nowFetchingState } from '@atoms/main-section-scroll';
import LargeLogo from '@components/large-logo';
import LeftSideBar from '@components/left-sidebar';
import RightSideBar from '@components/right-sidebar';
import HeaderRouter from '@routes/header';
import MainRouter from '@routes/main';
import DefaultButton from '@styled-components/default-button';
import ScrollBarStyle from '@styles/scrollbar-style';
import EventRegisterModal from '@components/event-register-modal';

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
  height: 80vh;
  min-width: 500px;
  flex-grow: 3;
  margin: 10px;

  ${ScrollBarStyle}
`;

const MainScrollSection = styled.div`
  width: 100%;
  height: 100%;
  ${ScrollBarStyle};
`;

const RoomLayout = styled.div`
  flex-grow: 2;
  margin: 10px;
`;

const ButtonLayout = styled.div`
  margin-top: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function MainView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [cookies] = useCookies(['jwt']);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const nowFetchingRef = useRef<boolean>(false);

  const scrollBarChecker = useCallback((e : UIEvent<HTMLDivElement>) => {
    if (!nowFetchingRef.current) {
      const diff = (e.currentTarget).scrollHeight - (e.currentTarget).scrollTop;
      if (diff < 700) {
        setNowFetching(true);
        nowFetchingRef.current = true;
        setTimeout(() => { nowFetchingRef.current = false; }, 200);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ok) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <HeaderRouter />
        <SectionLayout>
          <ActiveFollowingLayout>
            <LeftSideBar />
          </ActiveFollowingLayout>
          <MainSectionLayout>
            <MainScrollSection onScroll={scrollBarChecker}>
              <MainRouter />
            </MainScrollSection>
            <EventRegisterModal />
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
            <DefaultButton buttonType="secondary" size="medium">
              SIGN UP
            </DefaultButton>
          </Link>
          <Link to="/signin">
            <DefaultButton onClick={() => { setIsLoggedIn(false); }} buttonType="thirdly" size="medium">
              SIGN IN
            </DefaultButton>
          </Link>
        </ButtonLayout>
      </MainLayout>
    </>
  );
}

export default MainView;
