/* eslint-disable no-underscore-dangle */
import React, { useRef } from 'react';

import NewChatRoomHeader from '@src/components/chat/chat-new-header';
import { ChatRoomsLayout, NewChatRoomBody } from '@components/chat/style';
import UserCardList from '@components/common/user-card-list';
import {
  SelectDiv, SelectInputBar, SelectedUserDiv, SelectUserComponent,
} from '@common/select';
import useSelectUser from '@hooks/useSelectUser';

function ChatRoomsNewView() {
  const inputBarRef = useRef<HTMLInputElement>(null);
  const [selectedUsers, filteredUserList, searchUser, deleteUser, addSelectedUser] = useSelectUser(inputBarRef);

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
