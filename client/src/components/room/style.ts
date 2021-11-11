import styled from 'styled-components';
import ScrollBarStyle from '@styles/scrollbar-style';

export const InRoomHeader = styled.div`
  position: absolute;
  top: 10px;

  display: flex;
  flex-direction: row;

  padding: 20px 10px 20px 10px;

  width: 100%;
  height: 25px;
`;

export const TitleDiv = styled.div`
  font-family: "Nunito";
  font-style: normal;
  font-size: 20px;

  width: 70%;

  margin-left: 30px;

  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OptionBtn = styled.div`
  width: 30%;

  text-align: center;
  transform: translate(0px, 6px);
`;

export const InRoomFooter = styled.div`
  position: absolute;
  bottom: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
`;

export const InRoomUserList = styled.div`
  position: absolute;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  box-sizing: border-box;
  padding: 0px 30px;

  width: 100%;
  height: 70%;

  ${ScrollBarStyle}
`;

export const FooterBtnDiv = styled.div`
  width: 32px;
  height: 32px;

  border-radius: 30px;
  margin-top: 5px;

  background-color: #58964F;

  svg {
    transform: translate(8px, 8px);
  };
`;
