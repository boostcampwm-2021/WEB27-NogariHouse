import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProfileViewLayout = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;

  width: 80%;
  height: 100%;
  margin: auto;
`;

export const ImageAndFollowButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LargeProfileImageBox = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 30%;

  &:hover{
    cursor: ${(props: {isMine:boolean}) => (props.isMine && 'pointer')};
  };
`;

export const UserNameDiv = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
`;

export const UserIdDiv = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

export const FollowBox = styled.div`
  position:relative;
  display: flex;
  align-items:center;
  width: 100%;
`;

export const FollowBoxDiv = styled(Link)`
  display: flex;
  color: black;
  text-decoration: none;
  margin: 20px 20px 20px 0;
`;

export const FollowNumberDiv = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-right: 10px;
`;

export const FollowTextDiv = styled.div`
  font-size: 24px;
  transform: translateY(3px);
`;

export const DescriptionDiv = styled.div`
  font-size: 20px;
  margin-top: 30px;
`;

export const JoinDateDiv = styled.div`
  font-size: 20px;
  margin-top: 50px;
`;
