import styled from 'styled-components';

export const ActivityCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;

  height: max-content;
  padding: 24px;
  border-radius: 30px;

  margin-left: 0.8%;

  &:hover {
  background-color: #eeebe4e4;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
`;

export const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 70%;
    overflow: hidden;
`;

export const UserNameSpan = styled.span`
  font-weight: bold;
`;

export const DiscriptionSpan = styled.span`
  font-size: min(16px, 4vw);
  word-break: break-all;
  width: calc(100% - 60px);
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  overflow: hidden;
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 20%;
`;

export const TimeDiv = styled.div`
  font-size: min(3vw, 14px);
  color: gray;
`;
