import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  HiOutlinePaperAirplane,
  HiSearch,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineBell,
  HiOutlineLogout,
  HiMenu,
  HiTable,
} from 'react-icons/hi';
import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';

import { makeIconToLink, signOutHandler } from '@utils/index';
import userState from '@atoms/user';
import { nowCountState, nowFetchingState, nowItemsListState } from '@atoms/main-section-scroll';
import isOpenSliderMenuState from '@atoms/is-open-slider-menu';
import isOpenRoomState from '@atoms/is-open-room';
import SliderMenu from '@common/menu-modal';
import { IconAndLink } from '@interfaces/index';
import { getIsActivityChecked, getUnReadMsgCount } from '@api/index';
import unReadMsgCountState from '@atoms/not-read-msg';
import useChatSocket from '@utils/chat-socket';
import useUserSocket from '@src/utils/user-socket';

const CustomDefaultHeader = styled.nav`
  width: 100%;
  height: 48px;
  margin: 24px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuIconsLayout = styled.nav`
  @media (max-width: 1024px) {
    display: none;
  }
  position: relative;
  width: 100%;
  height: 48px;
  margin: 0 min(1vw,24px);

  display: flex;
  justify-content: space-between;
`;

const ResponsiveMenuIconsLayout = styled.nav`
  @media (min-width: 1025px) {
    display: none;
  }
  width: 100%;
  height: 48px;
  margin: 0 min(1vw,24px);

  display: flex;
  justify-content: space-between;
`;

const OpenMenuButton = styled.button`
  @media (min-width: 1025px) {
      display: none;
  }
  background: inherit ;
  border:none;
  box-shadow:none;
  border-radius:0;
  padding:0;
  overflow:visible;
  cursor:pointer;
  margin-left: min(2vw,24px);
`;

const OpenRoomStateButton = styled.button`
  @media (min-width: 768px) {
      display: none;
  }

  background: inherit ;
  border:none;
  box-shadow:none;
  border-radius:0;
  padding:0;
  overflow:visible;
  cursor:pointer;
  margin-right: min(2vw,24px);
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    margin-right: 30px;
  }

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

const LogoTitle = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Bangers";
  font-size: min(8vw, 48px);
  text-decoration: none;
  color: black;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    border-radius: 70%;
    overflow: hidden;
`;

const ActiveDot = styled.div`
  position: absolute;
  right: 10%;

  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 10px;
`;

const MsgCount = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
  right: 1%;
  background-color: red;

  font-size: 12px;
  color: white;
`;
function DefaultHeader() {
  const user = useRecoilValue(userState);
  const setNowFetching = useSetRecoilState(nowFetchingState);
  const resetNowItemsList = useResetRecoilState(nowItemsListState);
  const [isOpenMenu, setIsOpenMenu] = useRecoilState(isOpenSliderMenuState);
  const [isOpenRoom, setIsOpenRoom] = useRecoilState(isOpenRoomState);
  const [isActivityChecked, setActivityChecked] = useState(false);
  const [unReadMsgCount, setUnReadMsgCount] = useRecoilState(unReadMsgCountState);
  const setNowCount = useSetRecoilState(nowCountState);
  const userSocket = useUserSocket();
  const chatSocket = useChatSocket();

  const leftSideIcons: IconAndLink[] = [
    { Component: HiSearch, link: '/search', key: 'search' },
  ];
  const rightSideIcons: IconAndLink[] = [
    { Component: HiOutlineMail, link: '/invite', key: 'invite' },
    { Component: HiOutlineCalendar, link: '/event', key: 'event' },
  ];

  useEffect(() => {
    getIsActivityChecked().then((res) => {
      if (res.isActivityChecked) setActivityChecked(true);
      else setActivityChecked(false);
    });
  }, [chatSocket]);

  useEffect(() => {
    getUnReadMsgCount().then((res: any) => setUnReadMsgCount(res.unReadMsgCount));
    chatSocket.emit('chat:viewJoin', user.userDocumentId);
    chatSocket.on('chat:updateCount', () => setUnReadMsgCount((oldCount) => oldCount + 1));
    return () => {
      chatSocket.off('chat:updateCount');
    };
  }, [chatSocket]);

  useEffect(() => {
    if (!userSocket) return;
    userSocket.on('user:getActivity', () => setActivityChecked(true));
    return () => {
      userSocket.off('user:getActivity');
    };
  }, [userSocket]);

  return (
    <>
      <CustomDefaultHeader>
        <LogoTitle to="/" onClick={() => { resetNowItemsList(); setNowCount(0); setNowFetching(true); }}> NogariHouse </LogoTitle>
        <ResponsiveMenuIconsLayout>
          <OpenMenuButton onClick={() => { setIsOpenMenu(!isOpenMenu); }}>
            <HiMenu size="48" />
          </OpenMenuButton>
          <OpenRoomStateButton className="open-room-button" onClick={() => { setIsOpenRoom(!isOpenRoom); }}>
            <HiTable size="48" />
          </OpenRoomStateButton>
        </ResponsiveMenuIconsLayout>
        <MenuIconsLayout>
          <IconContainer>
            <Link to={`/profile/${user.userId}`}><ImageLayout src={user.profileUrl} alt="사용자" /></Link>
            {leftSideIcons.map(makeIconToLink)}
            <Link to="/chat-rooms" style={{ position: 'relative' }}>
              {unReadMsgCount > 0 ? <MsgCount><span style={{ margin: '5px' }}>{unReadMsgCount > 99 ? '99+' : unReadMsgCount}</span></MsgCount> : ''}
              <HiOutlinePaperAirplane size={48} color="black" />
            </Link>
          </IconContainer>
          <IconContainer>
            {rightSideIcons.map(makeIconToLink)}
            <Link to="/activity" style={{ position: 'relative' }}>
              {isActivityChecked ? <ActiveDot /> : ''}
              <HiOutlineBell size={48} color="black" />
            </Link>
            <HiOutlineLogout size="48" onClick={signOutHandler} />
          </IconContainer>
        </MenuIconsLayout>
      </CustomDefaultHeader>
      {isOpenMenu && <SliderMenu />}
    </>
  );
}

export default DefaultHeader;
