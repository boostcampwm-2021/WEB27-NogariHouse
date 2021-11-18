import styled from 'styled-components';

const ChatHeaderStyle = styled.div`
  background-color: #B6B6B6;

  width: 100%;
  height: 80px;

  position: relative;

  p {
    width: 250px;

    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);

    font-family: 'Nunito';
    font-weight: Bold;
    font-size: 32px;

    margin: 0px;
  }
`;

export default ChatHeaderStyle;
