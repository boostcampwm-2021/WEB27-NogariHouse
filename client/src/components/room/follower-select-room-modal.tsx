/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { isOpenRoomModalState } from '@atoms/is-open-modal';
import followState from '@atoms/following-list';
import UserCardList from '@components/common/user-card-list';
import FollowerSelectRoomHeader from '@components/room/follower-select-room-header';
import { BackgroundWrapper, ModalBox } from '@common/modal';
import {
  SelectDiv, SelectInputBar, SelectedUserDiv, SelectUserComponent,
} from '@common/select';
import { findUsersByIdList } from '@api/index';
import { hiddenScroll } from '@styles/scrollbar-style';
import { IUser } from '@interfaces/index';

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
  const followingList = useRecoilValue(followState);
  const [selectedUsers, setSelectedUsers] = useState<Array<IUser>>([]);
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
    setSelectedUsers([...selectedUsers, { userDocumentId: userCardDiv?.getAttribute('data-id'), userName, profileUrl: profileUrl.getAttribute('src') }]);
  };

  const deleteUser = (e: any) => {
    setSelectedUsers(selectedUsers.filter((user: any) => user.userDocumentId !== e.target.getAttribute('data-id')));
    (inputBarRef!.current as any).value = '';
  };

  const searchUser = () => {
    const searchWord = (inputBarRef.current as any).value;
    const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
    setFilteredUserList(allUserList
      .filter((user: any) => (user.userId.indexOf(searchWord) > -1 || user.userName.indexOf(searchWord) > -1) && selectedUserIds.indexOf(user._id) === -1));
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
    <>
      <BackgroundWrapper onClick={() => setIsOpenRoomModal(false)} />
      <CustomModalBox>
      <FollowerSelectRoomHeader onClick={() => setIsOpenRoomModal(false)} selectedUsers={selectedUsers} />
        <Layout>
          <SelectDiv>
            <CustomInputTitle>ADD : </CustomInputTitle>
            <CustomSelectInputBar ref={inputBarRef} onChange={searchUser} />
          </SelectDiv>
          <SelectedUserDiv ref={selectedUserDivRef}>
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
