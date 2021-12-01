import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlinePaperAirplane, HiSearch,
  HiOutlineMail, HiOutlineCalendar,
  HiOutlineBell, HiOutlineLogout,
  HiMenu, HiTable,
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
import chatSocketMessage from '@constants/socket-message/chat';
import userSocketMessage from '@constants/socket-message/user';
import { IconAndLink } from '@interfaces/index';
import { getUnReadMsgCount } from '@api/chat';
import getIsActivityChecked from '@api/activity';
import unReadMsgCountState from '@atoms/not-read-msg';
import useChatSocket from '@utils/chat-socket';
import useUserSocket from '@src/utils/user-socket';
import {
  CustomDefaultHeader, MenuIconsLayout,
  ResponsiveMenuIconsLayout, OpenMenuButton,
  OpenRoomStateButton, IconContainer,
  LogoTitle, ImageLayout,
  ActiveDot, MsgCount,
} from './style';

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
    chatSocket.emit(chatSocketMessage.viewJoin, user.userDocumentId);
    chatSocket.on(chatSocketMessage.updateCount, (chatDocumentId) => {
      if (!window.location.pathname.includes(`${chatDocumentId}`)) setUnReadMsgCount((oldCount) => oldCount + 1);
    });
    return () => {
      chatSocket.off(chatSocketMessage.updateCount);
    };
  }, [chatSocket]);

  useEffect(() => {
    if (!userSocket) return;
    userSocket.on(userSocketMessage.getActivity, () => setActivityChecked(true));
    return () => {
      userSocket.off(userSocketMessage.getActivity);
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
            <Link to={`/profile/${user.userId}`} aria-label="profile"><ImageLayout src={user.profileUrl} alt="사용자" /></Link>
            {leftSideIcons.map(makeIconToLink)}
            <Link to="/chat-rooms" aria-label="chat-room" style={{ position: 'relative' }}>
              {unReadMsgCount > 0 ? <MsgCount><span style={{ margin: '5px' }}>{unReadMsgCount > 99 ? '99+' : unReadMsgCount}</span></MsgCount> : ''}
              <HiOutlinePaperAirplane size={48} color="black" />
            </Link>
          </IconContainer>
          <IconContainer>
            {rightSideIcons.map(makeIconToLink)}
            <Link to="/activity" aria-label="activity" style={{ position: 'relative' }}>
              {isActivityChecked ? <ActiveDot /> : ''}
              <HiOutlineBell size={48} color="black" />
            </Link>
            <HiOutlineLogout size="48" onClick={signOutHandler} />
          </IconContainer>
        </MenuIconsLayout>
      </CustomDefaultHeader>
      {isOpenMenu && <SliderMenu isActivityChecked={isActivityChecked} unReadMsgCount={unReadMsgCount} />}
    </>
  );
}

export default DefaultHeader;
