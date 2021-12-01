import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BackgroundWrapper } from '@styles/modal';
import { HiOutlineLogout } from 'react-icons/hi';

import isOpenSliderMenuState from '@atoms/is-open-slider-menu';
import isOpenRoomState from '@atoms/is-open-room';
import isOpenActiveFollowingModalState from '@atoms/is-open-active-following-modal';
import userState from '@atoms/user';
import { signOutHandler } from '@utils/index';
import {
  MenuModalBox, StyledLinkListLayout, MenuFooter, ProfileBox, ProfileInfo, ProfileUserName,
  ProfileUserId, ImageLayout, LinkMenu, StyledLink, SignOutButton, StyledButton, SignOutText,
  MenuWrap, ActiveDot, MsgCount,
} from './style';

interface ILinkList {
  key: string,
  text: string,
  link: string,
}

function SliderMenu({ isActivityChecked, unReadMsgCount }: any) {
  const user = useRecoilValue(userState);
  const [isOpenMenu, setIsOpenMenu] = useRecoilState(isOpenSliderMenuState);
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);
  const setisOpenActiveFollowingModal = useSetRecoilState(isOpenActiveFollowingModalState);
  const clickHandler = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsOpenRoom(false);
  };

  const makeLinkListToStyledLink = (listItem: ILinkList) => {
    if (listItem.key === 'chat-rooms') {
      return (
        <MenuWrap to={listItem.link} key={listItem.key} aria-label="chat-rooms">
          <LinkMenu>{listItem.text}</LinkMenu>
          {unReadMsgCount > 0 ? <MsgCount><span style={{ margin: '5px' }}>{unReadMsgCount > 99 ? '99+' : unReadMsgCount}</span></MsgCount> : ''}
        </MenuWrap>
      );
    }
    if (listItem.key === 'activity') {
      return (
        <MenuWrap to={listItem.link} key={listItem.key} aria-label="activity">
          <LinkMenu>{listItem.text}</LinkMenu>
          {isActivityChecked ? <ActiveDot /> : ''}
        </MenuWrap>
      );
    }
    return (
      <StyledLink to={listItem.link} key={listItem.key} aria-label={listItem.key as string}>
        <LinkMenu>{listItem.text}</LinkMenu>
      </StyledLink>
    );
  };

  const linkList:ILinkList[] = [
    { text: 'Search', link: '/search', key: 'search' },
    { text: 'Message', link: '/chat-rooms', key: 'chat-rooms' },
    { text: 'Invite', link: '/invite', key: 'invite' },
    { text: 'Activity', link: '/activity', key: 'activity' },
    { text: 'Event', link: '/event', key: 'event' },
  ];

  return (
    <>
      <BackgroundWrapper onClick={() => setIsOpenMenu(!isOpenMenu)} />
      <MenuModalBox state={isOpenMenu}>
        <StyledLinkListLayout onClick={clickHandler}>
          <StyledLink to={`/profile/${user.userId}`} aria-label="profile">
            <ProfileBox>
              <ImageLayout src={user.profileUrl} alt="사용자" />
              <ProfileInfo>
                <ProfileUserName>
                  {user.userName}
                </ProfileUserName>
                <ProfileUserId>
                  @
                  { user.userId}
                </ProfileUserId>
              </ProfileInfo>
            </ProfileBox>
          </StyledLink>
          {linkList.map(makeLinkListToStyledLink)}
          <StyledButton onClick={() => setisOpenActiveFollowingModal(true)}>
            Active Following List
          </StyledButton>
        </StyledLinkListLayout>
        <MenuFooter>
          <SignOutButton onClick={signOutHandler}>
            <SignOutText>Sign Out</SignOutText>
            <HiOutlineLogout size="35" />
          </SignOutButton>
        </MenuFooter>
      </MenuModalBox>
    </>
  );
}

export default SliderMenu;
