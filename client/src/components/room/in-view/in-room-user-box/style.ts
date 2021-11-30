import styled from 'styled-components';

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

export const UserBox = styled.img`
  width: 60px;
  min-width: 48px;
  height: 60px;
  border-radius: 30%;
  overflow: hidden;
  background-color: #6F8A87;

  &[poster] {
    object-fit: cover;
  }
`;

export const Video = styled.video`
  display: none;
`;
