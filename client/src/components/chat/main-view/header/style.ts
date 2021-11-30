import styled from 'styled-components';

const ChatHeaderBtnDiv = styled.div`
  margin-right: 10%;
  svg{
    margin: 0px 10px;

    width: min(5vw, 32px);
    &:hover {
      filter: invert(88%) sepia(1%) saturate(121%) hue-rotate(12deg) brightness(62%) contrast(79%);
    }
  }
`;

export default ChatHeaderBtnDiv;
