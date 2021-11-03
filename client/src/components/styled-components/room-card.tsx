/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

interface user{
  userName: string,
  profileURL: string
}

interface roomCardProps {
  title: string,
  users: Array<user>
}

interface profileProps {
  user: user,
  length: number
}

const RoomCardProfileDiv = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;

  position: relative;
`;

const RoomCardFirstProfile = styled.div`
  position: absolute;

  width: ${(props: profileProps) => (props.length === 1 ? 85 : 65)}px;
  height: ${(props: profileProps) => (props.length === 1 ? 85 : 65)}px;

  background: center / contain no-repeat url(${(props : profileProps) => props.user.profileURL});
  border-radius: 25px;

  background-size: ${(props: profileProps) => (props.length === 1 ? 120 : 100)}px;
  z-index: 2;
`;

const RoomCardSecondProfile = styled.div`
  position: absolute;
  top: 50px;
  left: 40px;

  width: 55px;
  height: 55px;
  background: center / contain no-repeat url(${(props : profileProps) => props.user.profileURL});
  background-size: 80px;
  border-radius: 25px;

  z-index: 1;
`;

const RoomCardUsers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  font-family: "Bangers";
  font-size: 24px;
  line-height: 30px;

  margin-left: 30px;
`;

const RoomCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  font-family: "Bangers";
  font-size: 32px;
  font-style: bold;
`;

const RoomCardInfo = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0px 30px 30px 30px;
`;

const RoomCardLayout = styled.div`
  background-color: #FFFFFF;
  border-radius: 25px;
  width: 600px;
`;

export default function RoomCard({ title, users } : roomCardProps) {
  const userNames = [];
  for (let i = 0; i < 3 && i < users.length; i += 1) userNames.push(users[i]);
  return (
    <RoomCardLayout>
      <RoomCardTitle>
        <span>{title}</span>
      </RoomCardTitle>
      <RoomCardInfo>
        <RoomCardProfileDiv>
          <RoomCardFirstProfile user={users[0]} length={users.length} />
          {users.length > 1 && <RoomCardSecondProfile user={users[1]} length={users.length} /> }
        </RoomCardProfileDiv>
        <RoomCardUsers>
          {userNames.map((v) => <div><span key={1}>{v.userName}</span></div>)}
          <div><span>{users.length}</span></div>
        </RoomCardUsers>
      </RoomCardInfo>
    </RoomCardLayout>
  );
}

/*
 104번째 줄: max len 100 넘어가서 첫번째 줄에 예외처리 해줌
 95번째 줄: for문을 이용하지 않고 구현하는 방법...
 폰트설정, 인원수 부분에 이미지 설정 못해줌
 Title 부분에 있던 점 3개 ... 구현할 버튼 이벤트가 없어서 삭제함
 background-size값이 width, height 보다 커지면 테두리가 잘리는 것 같다 >> 이미지의 비율이 정사각형이 아닌경우... 어떻게 처리를 해야할지
*/
