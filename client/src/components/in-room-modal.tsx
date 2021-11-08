/* eslint-disable object-shorthand */
import React from 'react';
import { useRecoilState } from 'recoil';

import userTypeState from '@atoms/user';

// 룸 생성 모달
function InRoomModal() {
  const [user] = useRecoilState(userTypeState);
  return (
    <>
      <h1>
        { user.roomId }
      </h1>
    </>
  );
}

export default InRoomModal;
