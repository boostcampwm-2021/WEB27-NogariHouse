/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import { NewChatRoomHeader } from '@components/chat/chat-header';
import ChatRoomsLayout from '@components/chat/chat-room-layout';
import UserCardList from '@components/common/user-card-list';
import { findUsersById } from '@api/index';
import followType from '@atoms/following-list';
import selectedUserType from '@atoms/chat-selected-users';

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

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #DCD9CD;

    &:hover {
      background-color: #CECABB;
    }
  }
`;

const SelectInputBar = styled.input`
  position: absolute;
  top: 11px;
  left: 90px;

  width: 300px;
  height: 30px;

  border: none;
  font-size: 18px;
  font-family: 'Nunito';

  &:focus {
    outline: none;
  }
`;

const SelectedUserDiv = styled.div`
  margin: 0% 15% 0% 15%;


  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SelectUserComponent = styled.div`
  margin 0px 10px 5px 0px;
  background-color: #F1F0E4;
  border-radius: 30px;

  line-height: 30px;
  font-family: 'Nunito';
  color: #819C88;

  cursor: default;
`;

function ChatRoomsNewView() {
  const followingList = useRecoilValue(followType);
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUserType);
  const [allUserList, setAllUserList] = useState([]);
  const [filteredUserList, setUserList] = useState([]);
  const inputBar = useRef(null);
  const selectedUserDiv = useRef(null);

  const addSelectedUser = (e: any) => {
    const userCardDiv = e.target.closest('.userCard');
    if (!userCardDiv) return;
    const userName = userCardDiv?.getAttribute('data-username');
    (inputBar!.current as any).value = '';
    setSelectedUsers([...selectedUsers, { userDocumentId: userCardDiv?.getAttribute('data-id'), userName }]);
  };

  const deleteUser = (e: any) => {
    setSelectedUsers(selectedUsers.filter((user: any) => user.userDocumentId !== e.target.getAttribute('data-id')));
    (inputBar!.current as any).value = '';
  };

  const searchUser = () => {
    const searchWord = (inputBar.current as any).value;
    const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
    setUserList(allUserList
      .filter((user: any) => (user.userId.indexOf(searchWord) > -1 || user.userName.indexOf(searchWord) > -1) && selectedUserIds.indexOf(user._id) === -1));
  };

  useEffect(() => {
    findUsersById(followingList).then((res: any) => {
      const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
      setAllUserList(res.userList);
      setUserList(res.userList.filter((user: any) => selectedUserIds.indexOf(user._id) === -1));
    });
  }, [followingList]);

  useEffect(() => {
    const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
    setUserList(allUserList.filter((user: any) => selectedUserIds.indexOf(user._id) === -1));
  }, [selectedUsers]);

  return (
    <ChatRoomsLayout>
      <NewChatRoomHeader />
      <SelectDiv>
        <p>TO : </p>
        <SelectInputBar ref={inputBar} onChange={searchUser} />
      </SelectDiv>
      <SelectedUserDiv ref={selectedUserDiv}>
        {selectedUsers.map((user: any) => (
          <SelectUserComponent key={user.userDocumentId} data-id={user.userDocumentId} onClick={deleteUser}>
            {user.userName}
          </SelectUserComponent>
        ))}
      </SelectedUserDiv>
      <UserCardList cardType="others" userList={filteredUserList} clickEvent={addSelectedUser} />
    </ChatRoomsLayout>
  );
}

export default ChatRoomsNewView;
