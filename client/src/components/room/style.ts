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

  ${ScrollBarStyle};
    overflow: overlay;
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

  &:hover {
    cursor: pointer;
  }
`;

export const InRoomUserBoxStyle = styled.div`
  position: relative;
  width: 80px;
  height: 90px;

  p {
    margin: 5px;
  }
`;

export const InRoomUserMicDiv = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;

  width: 30px;
  height: 30px;

  background-color: #58964F;
  border-radius: 30px;

  svg {
    transform: translate(6px, 6px);
  }
`;

export const UserBox = styled.video`
  width: 60px;
  min-width: 48px;
  height: 60px;
  border-radius: 30%;
  overflow: hidden;
  background-color: #6F8A87;
`;

export const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 30%;
`;
