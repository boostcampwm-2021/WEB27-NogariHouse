import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { slideXFromTo } from '@styles/keyframe';

export const MenuModalBox = styled.div`
  position: fixed;
  width: 300px;
  height: -webkit-fill-available;
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

export const StyledLinkListLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuFooter = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  border-top: 1px solid #B6B6B6;
`;

export const ProfileBox = styled.div`
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

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const ProfileUserName = styled.div`
  font-size: 18px;
`;

export const ProfileUserId = styled.div`
  font-weight: bold;
`;

export const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 70%;
    overflow: hidden;
`;

export const LinkMenu = styled.div`
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

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const SignOutButton = styled.button`
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

export const StyledButton = styled.button`
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

export const SignOutText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

export const MenuWrap = styled(Link)`
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

export const ActiveDot = styled.div`
  position: absolute;
  right: 10%;

  background-color: #e97171;
  width: 10px;
  height: 10px;
  border-radius: 10px;
`;

export const MsgCount = styled.div`
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
