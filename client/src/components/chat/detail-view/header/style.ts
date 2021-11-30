import styled from 'styled-components';

export const BackBtn = styled.div`
  position: absolute;
  left: 5%;
`;

export const ParticipantsDiv = styled.div`
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

export const ParticipantsProfileDiv = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;

  width: 100%;
  height: 23px;

  margin-top: 10px;
`;

export const ParticipantsProfile = styled.img`
  width: 30px;
  height: 30px;

  margin: 5px;
  border-radius: 20px;

  background-color: black;
`;

export const ParticipantsName = styled.div`
  position: absolute;
  bottom: 10px;

  width: 100%;
  height: 20px;
  margin: 0px;

  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;

  white-space: nowrap;
`;
