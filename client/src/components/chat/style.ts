import styled from 'styled-components';

export const ChatRoomsLayout = styled.div`
  background-color: #fff;
  border-radius: 30px;

  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width : 768px){
    max-height: calc(100% - 100px);
  }

  overflow: hidden;
`;

export const ChatHeaderStyle = styled.div`
  background-color: #B6B6B6;

  width: 100%;
  height: 80px;

  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-radius: 30px 30px 0 0;

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
