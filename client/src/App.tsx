import React, { useCallback, useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

import Router from '@routes/index';
import userState from '@atoms/user';
import followingListState from '@atoms/following-list';
import BodyModal from '@components/body-modal';
import Toast from '@components/common/toast';
import LoadingSpinner from '@common/loading-spinner';
import { getFollowingsList, getMyInfo } from '@api/user';

function App() {
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const setFollowingList = useSetRecoilState(followingListState);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
