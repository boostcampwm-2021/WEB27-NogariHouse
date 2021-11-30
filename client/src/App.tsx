import React, { useCallback, useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Router from '@routes/index';
import userState from '@atoms/user';
import followingListState from '@atoms/following-list';
import BodyModal from '@common/body-modal';
import Toast from '@common/toast';
import LoadingSpinner from '@styles/loading-spinner';
import { getFollowingsList, getMyInfo } from '@api/user';
import { setAccessToken } from '@utils/index';

function App() {
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const setFollowingList = useSetRecoilState(followingListState);
  const [loading, setLoading] = useState(true);

  const updateUserState = useCallback(async (json) => {
    const {
      accessToken, userDocumentId, profileUrl, userName, userId,
    } = json;

    const response: any = await getFollowingsList(userDocumentId);
    setFollowingList(response);

    setUser({
      isLoggedIn: true, userDocumentId, profileUrl, userName, userId,
    });

    setAccessToken(accessToken as string);
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
