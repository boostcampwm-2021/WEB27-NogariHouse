import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getUserInfo } from '@api/index';

export interface IParticipant {
    userDocumentId: string,
    isMicOn: boolean,
}

const InRoomUserBoxStyle = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

const InRoomUserProfile = styled.div`
`;

const InRoomUserMic = styled.div`

`;

function InRoomUserBox({ userDocumentId, isMicOn } : IParticipant) {
  const [userInfo, setUserInfo] = useState<any>();
  console.log('InRoomUserBox :: ', userInfo);

  useEffect(() => {
    getUserInfo(userDocumentId)
      .then((res) => setUserInfo(res));
  });

  console.log('in room user box ::: ', userDocumentId, isMicOn);

  return (
    <InRoomUserBoxStyle>
      <InRoomUserProfile />
      <InRoomUserMic />
    </InRoomUserBoxStyle>
  );
}

export default InRoomUserBox;
