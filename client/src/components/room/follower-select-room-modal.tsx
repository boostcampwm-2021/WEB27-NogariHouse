/* eslint-disable */
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { isOpenRoomModalState } from '@atoms/is-open-modal';
import UserCardList from '@components/common/user-card-list';
import FollowerSelectRoomHeader from '@components/room/follower-select-room-header';
import { BackgroundWrapper, ModalBox } from '@common/modal';
import {
  SelectDiv, SelectInputBar, SelectedUserDiv, SelectUserComponent,
} from '@common/select';
import { hiddenScroll } from '@styles/scrollbar-style';
import useSelectUser from '@src/hooks/useSelectUser';

const Layout = styled.div`
  background-color: #F1F0E4;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  ${hiddenScroll}
`;

const CustomModalBox = styled(ModalBox)`
  width: calc(50% + 112px);
  padding: 0;
`;

const CustomSelectInputBar = styled(SelectInputBar)`
  background-color: #F1F0E4;
  font-size: min(4vw, 18px);
  height: min(6vw, 30px);
`;

const CustomInputTitle = styled.p`
  font-size: min(4vw, 20px) !important;
`;

function FollowerSelectModal() {
  const setIsOpenRoomModal = useSetRecoilState(isOpenRoomModalState);
  const inputBarRef = useRef<HTMLInputElement>(null);
  const [selectedUsers, filteredUserList, searchUser, deleteUser, addSelectedUser] = useSelectUser(inputBarRef);

  return (
    <>
      <BackgroundWrapper onClick={() => setIsOpenRoomModal(false)} />
      <CustomModalBox>
      <FollowerSelectRoomHeader onClick={() => setIsOpenRoomModal(false)} selectedUsers={selectedUsers} />
        <Layout>
          <SelectDiv>
            <CustomInputTitle>ADD : </CustomInputTitle>
            <CustomSelectInputBar ref={inputBarRef} onChange={searchUser} />
          </SelectDiv>
          <SelectedUserDiv>
            {selectedUsers.map((user: any) => (
              <SelectUserComponent key={user.userDocumentId} data-id={user.userDocumentId} onClick={deleteUser}>
                {user.userName}
              </SelectUserComponent>
            ))}
          </SelectedUserDiv>
          <UserCardList cardType="others" userList={filteredUserList} clickEvent={addSelectedUser} />
        </Layout>
      </CustomModalBox>
    </>
  );
}

export default FollowerSelectModal;
