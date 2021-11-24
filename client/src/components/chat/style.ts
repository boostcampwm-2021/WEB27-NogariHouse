import styled from 'styled-components';
import ScrollBarStyle from '@styles/scrollbar-style';

export const ChatRoomsLayout = styled.div`
  background-color: #fff;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;

  ${ScrollBarStyle};
`;

export const ChatHeaderStyle = styled.div`
  background-color: #B6B6B6;

  width: 100%;
  height: 80px;

  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  p {
    width: auto;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    font-weight: Bold;
    font-size: min(4vw,28px);
    text-align: center;

    margin: 0px;
  }
`;

export const ChattingLog = styled.div`
  width: 100%;
  height: calc(97% - 150px);

  overflow-y: scroll;
`;

export const NewHeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #B6B6B6;
`;

export const NewHeader = styled.div`
  width: 90%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  p{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;

    font-weight: Bold;
    font-size: min(4vw,28px);

    margin: 0px;
  }
`;

export const BtnStyle = styled.button`
  font-size: min(4vw,28px);

  background-color: transparent;
  border: none;
  color: #58964F;

  &:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
    cursor: pointer;
  }
`;
