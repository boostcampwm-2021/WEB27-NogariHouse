import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CustomDefaultHeader = styled.nav`
  width: 100%;
  height: 48px;
  margin: 24px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MenuIconsLayout = styled.nav`
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

export const ResponsiveMenuIconsLayout = styled.nav`
  @media (min-width: 1025px) {
    display: none;
  }
  width: 100%;
  height: 48px;
  margin: 0 min(1vw,24px);

  display: flex;
  justify-content: space-between;
`;

export const OpenMenuButton = styled.button`
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

export const OpenRoomStateButton = styled.button`
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

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    margin-right: 30px;
  }

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

export const LogoTitle = styled(Link)`
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

export const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    border-radius: 70%;
    overflow: hidden;
`;

export const ActiveDot = styled.div`
  position: absolute;
  right: 10%;

  background-color: #e97171;
  width: 15px;
  height: 15px;
  border-radius: 10px;
`;

export const MsgCount = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
  right: 1%;
  background-color: #e97171;

  font-size: 12px;
  color: white;
`;
