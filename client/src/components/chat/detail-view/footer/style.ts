import styled from 'styled-components';

export const ChatRoomFooterStyle = styled.div`
  position: absolute;
  bottom: 3%;

  width: 99%;
  height: 50px;
`;

export const MsgInput = styled.textarea`
  position: absolute;
  left: 8%;

  width: 70%;
  height: auto;

  border: none;
  border-radius: 10px;
  background-color: #C4C4C4;

  font-family: 'Nunito';
  font-size: 20px;

  &:focus {
    outline: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SendBtnDiv = styled.div`
  position: absolute;
  right: 8%;

  width: 32px;
  height: 32px;
  transform: translateY(10px);
`;
