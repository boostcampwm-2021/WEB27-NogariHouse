import styled from 'styled-components';

export const EventCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  height: max-content;
  max-height: 200px;
  padding: 24px;
  border-radius: 30px;

  margin-left: 0.8%;

  div:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
  background-color: #eeebe4e4;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
`;

export const TimeDiv = styled.div`
  font-size: 14px;
  color: gray;
`;

export const TitleDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
export const ImageDiv = styled.div`
  display: flex;
  img:not(:last-child) {
    margin-right: 12px;
  }
`;
export const ImageLayout = styled.img`
  width: 48px;
  min-width: 48px;
  height: 48px;
  margin-right: 10px;
  border-radius: 30%;
  overflow: hidden;
`;

export const DiscriptionDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
