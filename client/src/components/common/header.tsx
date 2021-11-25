import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CustomtHeader = styled.nav`
  position: relative;
  width: 100%;
  height: 48px;
  min-width: 320px;
  margin: 24px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

export const CustomMenuIconsLayout = styled.nav`
  width: 95%;
  display: flex;
  justify-content: space-between;
`;

export const HeaderTitleNunito = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: min(4.4vw, 32px);
  text-decoration: none;
  text-align: center;
  color: black;
`;
