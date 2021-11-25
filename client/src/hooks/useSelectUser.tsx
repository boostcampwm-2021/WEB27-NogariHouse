/* eslint-disable */
import { useEffect, useState, RefObject } from 'react';
import { useRecoilValue } from 'recoil';

import followState from '@atoms/following-list';
import { findUsersByIdList } from '@api/index';
import { IUser } from '@interfaces/index';

const useSelectUser = (inputBarRef: RefObject<HTMLInputElement>): any => {
  const followingList = useRecoilValue(followState);
  const [selectedUsers, setSelectedUsers] = useState<Array<IUser>>([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [allUserList, setAllUserList] = useState([]);

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

  return [selectedUsers, filteredUserList, searchUser, deleteUser, addSelectedUser];
};

export default useSelectUser;
