/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import NewChatRoomHeader from '@src/components/chat/chat-new-header';
import { ChatRoomsLayout } from '@components/chat/style';
import UserCardList from '@components/common/user-card-list';
import { findUsersByIdList } from '@api/index';
import followType from '@atoms/following-list';
import selectedUserType from '@atoms/chat-selected-users';
import {
  SelectDiv, SelectInputBar, SelectedUserDiv, SelectUserComponent,
} from '@common/select';

function ChatRoomsNewView() {
  const followingList = useRecoilValue(followType);
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUserType);
  const [allUserList, setAllUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const inputBarRef = useRef(null);
  const selectedUserDivRef = useRef(null);

  const addSelectedUser = (e: any) => {
    const userCardDiv = e.target.closest('.userCard');
    const profileUrl = userCardDiv.querySelector('img');
    if (!userCardDiv || !profileUrl) return;
    const userName = userCardDiv?.getAttribute('data-username');
    (inputBarRef!.current as any).value = '';
    setSelectedUsers([...selectedUsers,
      {
        userDocumentId: userCardDiv?.getAttribute('data-id'),
        userName,
        profileUrl: profileUrl.getAttribute('src'),
      }]);
  };

  const deleteUser = (e: any) => {
    setSelectedUsers(selectedUsers.filter((user: any) => user.userDocumentId !== e.target.getAttribute('data-id')));
    (inputBarRef!.current as any).value = '';
  };

  const searchUser = () => {
    const searchWord = (inputBarRef.current as any).value;
    const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
    setFilteredUserList(allUserList
      .filter((user: any) => (user.userId.indexOf(searchWord) > -1 || user.userName.indexOf(searchWord) > -1)
      && selectedUserIds.indexOf(user._id) === -1));
  };

  useEffect(() => {
    findUsersByIdList(followingList).then((res: any) => {
      const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
      setAllUserList(res.userList);
      setFilteredUserList(res.userList.filter((user: any) => selectedUserIds.indexOf(user._id) === -1));
    });
  }, [followingList]);

  useEffect(() => {
    const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
    setFilteredUserList(allUserList.filter((user: any) => selectedUserIds.indexOf(user._id) === -1));
  }, [selectedUsers]);

  return (
    <ChatRoomsLayout>
      <NewChatRoomHeader />
      <SelectDiv>
        <p>TO : </p>
        <SelectInputBar ref={inputBarRef} onChange={searchUser} />
      </SelectDiv>
      <SelectedUserDiv ref={selectedUserDivRef}>
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
