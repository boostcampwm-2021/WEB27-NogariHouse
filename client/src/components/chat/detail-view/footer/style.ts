import styled from 'styled-components';

export const ChatRoomFooterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 99%;
  height: 70px;
`;

export const MsgInput = styled.textarea`
  @media (min-width :1025px){
    width: 80%;
  }

  width: 70%;
  border: none;
  border-radius: 10px;
  background-color: #C4C4C4;
  font-size: 20px;
  margin-left: 5%;

  &:focus {
    outline: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SendBtnDiv = styled.div`
  margin-right: 5%;
  width: 32px;
  height: 32px;
`;
