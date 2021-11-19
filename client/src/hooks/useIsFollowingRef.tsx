/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import react, { useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';

import followingListState from '@src/recoil/atoms/following-list';

const useIsFollowingRef = (setLoading: React.Dispatch<React.SetStateAction<boolean>>, isFollowDafult?: boolean)
  : [react.MutableRefObject<boolean | undefined>, (isFollow: boolean, targetUserDocumentId: string) => void] => {
  const isFollowingRef = useRef<boolean>(isFollowDafult as boolean);
  const [followingList, setFollowingList] = useRecoilState(followingListState);

  const fetchFollow = useCallback((isFollow: boolean, targetUserDocumentId: string) => {
    setLoading(true);
    const type = isFollow ? 'unfollow' : 'follow';
    fetch(`${process.env.REACT_APP_API_URL}/api/user/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ type, targetUserDocumentId }),
    }).then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          isFollowingRef.current
            ? setFollowingList((followList) => followList.filter((id) => id !== targetUserDocumentId))
            : setFollowingList((followList) => [...followList, targetUserDocumentId]);
          isFollowingRef.current = !isFollowingRef.current;
        }
        console.log(followingList);
        setLoading(false);
      });
  }, [isFollowingRef.current]);

  return [isFollowingRef, fetchFollow];
};

export default useIsFollowingRef;
