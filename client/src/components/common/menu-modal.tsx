import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { slideXFromTo } from '@src/assets/styles/keyframe';
import { BackgroundWrapper } from '@common/modal';
import { HiOutlineLogout } from 'react-icons/hi';

import isOpenSliderMenuState from '@atoms/is-open-slider-menu';
import isOpenRoomState from '@atoms/is-open-room';
import isOpenActiveFollowingModalState from '@atoms/is-open-active-following-modal';
import userState from '@atoms/user';
import { signOutHandler } from '@utils/index';

const MenuModalBox = styled.div`
  position: fixed;
  width: 300px;
  height: 100vh;
  top: 0px;
  display: ${(props: { state : boolean}) => (props.state ? 'flex' : 'hidden')};
  flex-direction: column;
  justify-content: space-between;
  background-color: #F1F0E4;
  box-shadow: rgb(0 0 0 / 55%) 0px 10px 25px;
  z-index: 990;
  opacity: 1;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${slideXFromTo(-300, 0)};
  animation-fill-mode: forward;
   ;
`;

const StyledLinkListLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuFooter = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  border-top: 1px solid #B6B6B6;
`;

const ProfileBox = styled.div`
  width: 100%-20px;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;
  border-bottom: 1px solid #B6B6B6;

  &:hover {
    cursor: default;
    background-color: #eeebe4e4;
    box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
    cursor: pointer;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const ProfileUserName = styled.div`
  font-size: 18px;
`;

const ProfileUserId = styled.div`
  font-weight: bold;
`;

const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 70%;
    overflow: hidden;
`;

const LinkMenu = styled.div`
  width: 100% - 10px;
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  text-decoration: none;
  color: black;
  border-bottom: 1px solid #e6e6e6;

  &:hover {
    cursor: pointer;
    background-color: #eeebe4e4;
    box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  background: inherit ;
  border:none;
  box-shadow:none;
  border-radius:0;
  padding:0;
  overflow:visible;
  cursor:pointer;
  margin: 10px 10px 10px 0;
`;

const StyledButton = styled.button`
  background: inherit ;
  border:none;
  box-shadow:none;
  border-radius:0;
  padding:0;
  overflow:visible;

  width: 100% - 10px;
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: black;
  border-bottom: 1px solid #e6e6e6;

  &:hover {
    cursor: pointer;
    background-color: #eeebe4e4;
    box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
`;

const SignOutText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const MenuWrap = styled(Link)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  text-decoration: none;
  border-bottom: 1px solid #e6e6e6;

    &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    background-color: #eeebe4e4;
    box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
`;

const ActiveDot = styled.div`
  position: absolute;
  right: 10%;

  background-color: #e97171;
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
  right: 8%;
  background-color: #e97171;

  font-size: 12px;
  color: white;
`;

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

  const makeLinkListToStyledLink = (list: ILinkList) => {
    if (list.key === 'chat-rooms') {
      return (
        <MenuWrap to={list.link} key={list.key}>
          <LinkMenu>{list.text}</LinkMenu>
          {unReadMsgCount > 0 ? <MsgCount><span style={{ margin: '5px' }}>{unReadMsgCount > 99 ? '99+' : unReadMsgCount}</span></MsgCount> : ''}
        </MenuWrap>
      );
    }
    if (list.key === 'activity') {
      return (
        <MenuWrap to={list.link} key={list.key}>
          <LinkMenu>{list.text}</LinkMenu>
          {isActivityChecked ? <ActiveDot /> : ''}
        </MenuWrap>
      );
    }
    return (
      <StyledLink to={list.link} key={list.key}>
        <LinkMenu>{list.text}</LinkMenu>
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
          <StyledLink to={`/profile/${user.userId}`}>
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
