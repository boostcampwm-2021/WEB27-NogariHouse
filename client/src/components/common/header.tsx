import styled from 'styled-components';

export const CustomtHeader = styled.nav`
  position: relative;
  width: 99%;
  height: 48px;
  min-width: 320px;
  padding: 24px 48px;

  display: flex;
  justify-content: space-between;

  svg:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

export const HeaderTitleNunito = styled.div`
  position: absolute;
  line-height: 48px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 32px;
  text-decoration: none;
  text-align: center;
  color: black;
`;
