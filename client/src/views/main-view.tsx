import React, {
  UIEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useRecoilState, useResetRecoilState, useSetRecoilState, useRecoilValue,
} from 'recoil';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { nowFetchingState } from '@atoms/main-section-scroll';
import userState from '@atoms/user';
import followingListState from '@atoms/following-list';
import LargeLogo from '@components/sign/large-logo';
import LeftSideBar from '@components/left-sidebar';
import RightSideBar from '@components/room/right-sidebar';
import HeaderRouter from '@routes/header';
import MainRouter from '@routes/main';
import DefaultButton from '@common/default-button';
import ScrollBarStyle from '@styles/scrollbar-style';
import LoadingSpinner from '@common/loading-spinner';
import { getFollowingsList } from '@src/api';
import isOpenRoomState from '@atoms/is-open-room';
import { slideXFromTo } from '@src/assets/styles/keyframe';

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
  height: 600px;
`;

const ActiveFollowingLayout = styled.div`
  height: 80vh;
  flex-grow: 1;
  margin: 10px;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const MainSectionLayout = styled.div`
  position: relative;
  height: 80vh;
  min-width: 320px;
  flex-grow: 10;
  margin: 10px;
`;

const MainScrollSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${ScrollBarStyle};
`;

const RoomLayout = styled.div`
  @media (minx-width: 768px) {
    margin: 10px;
    height: 80vh;
    flex-grow: 1;
  }
  
  @media (max-width: 768px) {
    position: fixed;
    display: ${(props: { state : boolean}) => (props.state ? 'flex' : 'none')};;
    z-index: 100;
    height: 85vh;
    width: 96%;
    margin-left: 10px;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-name: ${slideXFromTo(300, 0)};
    animation-fill-mode: forward;
  }
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
  const [user, setUser] = useRecoilState(userState);
  const setFollowingList = useSetRecoilState(followingListState);
  const resetUser = useResetRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const nowFetchingRef = useRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['accessToken']);
  const isOpenRoom = useRecoilValue(isOpenRoomState);

  const scrollBarChecker = useCallback((e: UIEvent<HTMLDivElement>) => {
    if (!nowFetchingRef.current) {
      const diff = e.currentTarget.scrollHeight - e.currentTarget.scrollTop;
      if (diff < 700) {
        setNowFetching(true);
        nowFetchingRef.current = true;
        setTimeout(() => {
          nowFetchingRef.current = false;
        }, 200);
      }
    }
  }, []);

  const updateUserState = useCallback(async (json) => {
    const {
      accessToken, userDocumentId, profileUrl, userName, userId,
    } = json;

    getFollowingsList(userDocumentId).then((response:any) => setFollowingList(response));

    setUser({
      isLoggedIn: true, userDocumentId, profileUrl, userName, userId,
    });

    setCookie('accessToken', accessToken);
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          updateUserState(json);
        } else {
          resetUser();
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user.isLoggedIn) {
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
          </MainSectionLayout>
          <RoomLayout state={isOpenRoom}>
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
            <DefaultButton buttonType="thirdly" size="medium">
              SIGN IN
            </DefaultButton>
          </Link>
        </ButtonLayout>
      </MainLayout>
    </>
  );
}

export default MainView;
