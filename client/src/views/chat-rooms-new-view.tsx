/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { NewChatRoomHeader } from '@components/chat/chat-header';
import ChatRoomsLayout from '@components/chat/chat-room-layout';
import UserCardList from '@components/common/user-card-list';
import { findUsersById } from '@api/index';
import userType from '@atoms/user';

const SelectDiv = styled.div`
  width: 90%;
  height: 50px;

  position: relative;

  p {
    position: absolute;
    margin: 15px 20px 0px 30px;

    font-size: 20px;
    font-weight: bold;
  }
`;

const SelectInputBar = styled.input`
  position: absolute;
  top: 11px;
  left: 90px;

  width: 400px;
  height: 30px;

  border: none;
  font-size: 18px;
  font-family: 'Nunito';

  &:focus {
    outline: none;
  }
`;

const SelectUserDiv = styled.div`
  position: absolute;
  height: 32px;
  left: 90px;
  top: 11px;

`;

const SelectUserComponent = styled.div`

`;

function ChatRoomsNewView() {
  const { followers, followings } = useRecoilValue(userType);
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);

  const addSelectedUser = (e: any) => {
    const userCardDiv = e.target.closest('.userCard');
    alert(userCardDiv.getAttribute('data-userName'));
    setSelectedUsers([{ key: '123', userName: 'test' }]);
  };

  useEffect(() => {
    const findUserList = followers.concat(followings).filter((item, index) => followers.indexOf(item) !== index);
    findUsersById(findUserList).then((res: any) => setUserList(res.userList));
  }, []);

  return (
    <ChatRoomsLayout>
      <NewChatRoomHeader />
      <SelectDiv>
        <p>TO : </p>
        <SelectUserDiv>
          {selectedUsers.map((user: any) => (
            <SelectUserComponent key={user.key}>
              {user.userName}
            </SelectUserComponent>
          ))}
        </SelectUserDiv>
        <SelectInputBar />
      </SelectDiv>
      <UserCardList cardType="others" userList={userList} clickEvent={addSelectedUser} />
    </ChatRoomsLayout>
  );
}

export default ChatRoomsNewView;
