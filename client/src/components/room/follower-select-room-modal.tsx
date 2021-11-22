/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { isOpenRoomModalState } from '@atoms/is-open-modal';
import followType from '@atoms/following-list';
import selectedUserType from '@atoms/chat-selected-users';
import roomViewState from '@atoms/room-view-type';
import { BackgroundWrapper } from '@common/modal';
import UserCardList from '@components/common/user-card-list';
import FollowerSelectRoomHeader from '@components/room/follower-select-room-header';
import { findUsersById } from '@api/index';
import Scroll from '@styles/scrollbar-style';
import { slideYFromTo } from '@src/assets/styles/keyframe';
import DefaultButton from '@src/components/common/default-button';

const ModalBox = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  top: 20%;
  display: flex;
  flex-direction: column;
  background-color: #F1F0E4;
  border-radius: 32px;
  margin-left: 25%;
  box-shadow: rgb(0 0 0 / 55%) 0px 10px 25px;
  z-index: 990;
  opacity: 1;
  
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${slideYFromTo(300, 0)};
  animation-fill-mode: forward;
`;

const Layout = styled.div`
  background-color: #F1F0E4;
  border-radius: 30px;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  ${Scroll};
`;

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

  background-color: #F1F0E4;

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
  margin: 0px 10px 5px 0px;
  padding: 0px 10px;
  background-color: #F1F0E4;
  border-radius: 30px;

  line-height: 30px;
  font-family: 'Nunito';
  color: #819C88;

  cursor: default;
`;

function FollowerSelectModal() {
  const setIsOpenRoomModal = useSetRecoilState(isOpenRoomModalState);
  const followingList = useRecoilValue(followType);
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUserType);
  const setRoomView = useSetRecoilState(roomViewState);
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
    findUsersById(followingList).then((res: any) => {
      const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
      setAllUserList(res.userList);
      setFilteredUserList(res.userList.filter((user: any) => selectedUserIds.indexOf(user._id) === -1));
    });
  }, [followingList]);

  useEffect(() => {
    const selectedUserIds = selectedUsers.map((user: any) => user.userDocumentId);
    setFilteredUserList(allUserList.filter((user: any) => selectedUserIds.indexOf(user._id) === -1));

  }, [selectedUsers]);


  const submitEventHandler = () => {
    //지정한 친구들에게 채팅 메세지 보내는 요청 추가 해줄것.
    setRoomView('inRoomView');
    setIsOpenRoomModal(false);
  }

  return (
    <>
      <BackgroundWrapper onClick={() => setIsOpenRoomModal(false)} />
      <ModalBox>
        <Layout>
          <FollowerSelectRoomHeader onClick={() => setIsOpenRoomModal(false)} />
          <SelectDiv>
            <p>ADD : </p>
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
          <DefaultButton buttonType="thirdly" size="small" onClick={submitEventHandler}>
            🎉 Let&apos;s Go
          </DefaultButton>
        </Layout>
      </ModalBox>
    </>
  );
}

export default FollowerSelectModal;
