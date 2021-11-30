import styled from 'styled-components';

interface IProfileProps {
  profileUrl: string,
  length: number
}

export const RoomCardProfileDiv = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;

  position: relative;
`;

export const RoomCardFirstProfile = styled.div.attrs((props: IProfileProps) => (
  { style: { background: `center / cover no-repeat url(${props.profileUrl})` } }))`
  position: absolute;

  width: ${(props: IProfileProps) => (props.length === 1 ? 85 : 65)}px;
  height: ${(props: IProfileProps) => (props.length === 1 ? 85 : 65)}px;

  border-radius: 25px;

  background-size: ${(props: IProfileProps) => (props.length === 1 ? 120 : 100)}px;
  z-index: 2;
`;

export const RoomCardSecondProfile = styled.div.attrs((props: IProfileProps) => {
  if (props.length === 1) return;
  return { style: { background: `center / cover no-repeat url(${props.profileUrl})` } };
})`
  position: absolute;
  top: 50px;
  left: 40px;

  width: 55px;
  height: 55px;
  background-size: 80px;
  border-radius: 20px;

  z-index: 1;
`;

export const RoomCardUsers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  font-size: 24px;
  line-height: 30px;
  margin-left: 30px;
`;

export const RoomCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  font-size: 32px;
  font-weight: bold;
`;

export const AnonymousSpan = styled.span`
  color: gray;
  font-size: 24px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const ParticipantsNumberSpan = styled.span`
  color: #C3C0B6;
  font-size: 18px;
  font-weight: bold;
`;

export const RoomCardInfo = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0px 30px 30px 30px;
`;

export const RoomCardLayout = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-left: 0.8%;
  width: 99%;

  &:hover {
    background-color: #eeebe4e4;
    cursor: pointer;
  }
`;
