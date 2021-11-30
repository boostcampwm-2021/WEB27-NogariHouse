import styled from 'styled-components';

export const ActiveFollowingListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px){
    width: 80%;
    margin-top: 20px;
  };
`;

export const ExceptionMessage = styled.div`
  position: relative;
  margin: auto;
  color: #a8a59b;
  font-size: 18px;
  font-weight: bold;
`;
