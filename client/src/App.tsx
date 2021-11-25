/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

import Router from '@routes/index';
import userState from '@atoms/user';
import followingListState from '@atoms/following-list';
import BodyModal from '@components/body-modal';
import Toast from '@components/common/toast';
import LoadingSpinner from '@common/loading-spinner';
import { getFollowingsList, getMyInfo } from '@src/api';

function App() {
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const setFollowingList = useSetRecoilState(followingListState);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(['accessToken']);

  const updateUserState = useCallback(async (json) => {
    const {
      accessToken, userDocumentId, profileUrl, userName, userId,
    } = json;

    const response: any = await getFollowingsList(userDocumentId);
    setFollowingList(response);

    setUser({
      isLoggedIn: true, userDocumentId, profileUrl, userName, userId,
    });

    setCookie('accessToken', accessToken);
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchGetMyInfo = async () => {
      const json = await getMyInfo();
      if (json?.ok) updateUserState(json);
      else {
        resetUser();
        setLoading(false);
      }
    };

    fetchGetMyInfo();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Router />
      <BodyModal />
      <Toast />
    </>
  );
}

export default App;
