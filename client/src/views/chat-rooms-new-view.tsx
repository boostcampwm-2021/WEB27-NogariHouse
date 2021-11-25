/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import NewChatRoomHeader from '@src/components/chat/chat-new-header';
import { ChatRoomsLayout, NewChatRoomBody } from '@components/chat/style';
import UserCardList from '@components/common/user-card-list';
import { findUsersByIdList } from '@api/index';
import followState from '@atoms/following-list';
import {
  SelectDiv, SelectInputBar, SelectedUserDiv, SelectUserComponent,
} from '@common/select';

function ChatRoomsNewView() {
  const followingList = useRecoilValue(followState);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [allUserList, setAllUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const inputBarRef = useRef<HTMLInputElement>(null);

  const addSelectedUser = (e: any) => {
    const userCardDiv = e.target.closest('.userCard');
    const profileUrl = userCardDiv.querySelector('img');
    if (!userCardDiv || !profileUrl) return;
    const userName = userCardDiv?.getAttribute('data-username');
    inputBarRef.current!.value = '';
    setSelectedUsers([...selectedUsers,
      {
        userDocumentId: userCardDiv?.getAttribute('data-id'),
        userName,
        profileUrl: profileUrl.getAttribute('src'),
      }]);
  };

  const deleteUser = (e: any) => {
    setSelectedUsers(selectedUsers.filter((user: any) => user.userDocumentId !== e.target.getAttribute('data-id')));
    inputBarRef.current!.value = '';
  };

  const searchUser = () => {
    const searchWord = inputBarRef.current!.value;
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
      <NewChatRoomHeader selectedUserList={selectedUsers} />
      <SelectDiv>
        <p>TO : </p>
        <SelectInputBar ref={inputBarRef} onChange={searchUser} />
      </SelectDiv>
      <NewChatRoomBody>
        <SelectedUserDiv>
          {selectedUsers.map((user: any) => (
            <SelectUserComponent key={user.userDocumentId} data-id={user.userDocumentId} onClick={deleteUser}>
              {user.userName}
            </SelectUserComponent>
          ))}
        </SelectedUserDiv>
        <UserCardList cardType="others" userList={filteredUserList} clickEvent={addSelectedUser} />
      </NewChatRoomBody>
    </ChatRoomsLayout>
  );
}

export default ChatRoomsNewView;
