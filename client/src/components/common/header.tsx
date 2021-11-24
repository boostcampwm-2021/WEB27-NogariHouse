import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CustomtHeader = styled.nav`
  position: relative;
  width: 95%;
  height: 48px;
  min-width: 320px;
  margin: 24px 24px;

  display: flex;
  justify-content: space-between;

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

export const HeaderTitleNunito = styled(Link)`
  position: absolute;
  line-height: 48px;
  left: 47.5%;
  transform: translateX(-47.5%);
  font-weight: bold;
  font-size: min(4.4vw, 32px);
  text-decoration: none;
  text-align: center;
  color: black;
`;
