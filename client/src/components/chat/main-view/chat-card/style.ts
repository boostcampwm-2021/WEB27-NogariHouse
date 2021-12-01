import styled from 'styled-components';

type ProfileProps = { length: number };

export const ChatUserCardLayout = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 30px 30px;
  margin-bottom: 10px;
  @media (min-width: 769px){
    width: 100%;
  }
  @media (max-width: 768px){
    width: 98%;
  }
  
  height: 120px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const ChatUserCardProfileDiv = styled.div`
  width: 100px;
  min-width: 100px;
  margin-right: 10px;
  display : flex;
  align-items : center;
  justify-content: center;


  position: relative;
`;

export const ChatUserCardFirstProfile = styled.img`
  position: absolute;

  width: ${(props: ProfileProps) => (props.length === 1 ? 75 : 60)}px;
  height: ${(props: ProfileProps) => (props.length === 1 ? 75 : 60)}px;
  ${(props: ProfileProps) => {
    if (props.length > 1) return 'top: 15px; left: 10px;';
  }}

  border-radius: 20px;

  z-index: 2;
`;

export const ChatUserCardSecondProfile = styled.img`
  position: absolute;
  top: 50px;
  left: 40px;

  width: 50px;
  height: 50px;
  border-radius: 20px;

  z-index: 1;
`;

export const ChatUserCardInfo = styled.div`
  width: calc(100% - 180px);
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p{
    margin: 0px 0px 10px 0px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const UserNameInfo = styled.p`
  font-size: min(4.8vw,24px);
  font-weight: bold;
`;

export const LastChatMsg = styled.p`
  font-size: min(4vw, 20px);
`;

export const ExInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  min-width:80px;

  margin-right: 15px;

  p {
    margin: 5px 0px 10px 0px;
    font-size: min(4vw, 20px);
  }
`;

export const UnCheckMsg = styled.div`
  width: min(4vw, 25px);
  height: min(4vw, 25px);
  font-size: min(2.5vw, 16px);
  background-color: #C4CDC0;

  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
