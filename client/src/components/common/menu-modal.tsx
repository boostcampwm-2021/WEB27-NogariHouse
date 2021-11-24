import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { slideXFromTo } from '@src/assets/styles/keyframe';
import { BackgroundWrapper } from '@common/modal';

import isOpenSliderMenuState from '@atoms/is-open-slider-menu';
import isOpenRoomState from '@atoms/is-open-room';
import userState from '@atoms/user';

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
  cursor: default;
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

function SliderMenu() {
  const user = useRecoilValue(userState);
  const [isOpenMenu, setIsOpenMenu] = useRecoilState(isOpenSliderMenuState);
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);
  const clickHandler = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsOpenRoom(false);
  };
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
                  { user.userName}
                </ProfileUserName>
                <ProfileUserId>
                  @
                  { user.userId}
                </ProfileUserId>
              </ProfileInfo>
            </ProfileBox>
          </StyledLink>
          <StyledLink to="/search">
            <LinkMenu>Search</LinkMenu>
          </StyledLink>
          <StyledLink to="/chat-rooms">
            <LinkMenu>Message</LinkMenu>
          </StyledLink>
          <StyledLink to="/invite">
            <LinkMenu>Invite</LinkMenu>
          </StyledLink>
          <StyledLink to="/activity">
            <LinkMenu>Activity</LinkMenu>
          </StyledLink>
          <StyledLink to="/event">
            <LinkMenu>Event</LinkMenu>
          </StyledLink>
        </StyledLinkListLayout>

        <button type="button" onClick={() => setIsOpenMenu(!isOpenMenu)}>close</button>
      </MenuModalBox>
    </>
  );
}

export default SliderMenu;
