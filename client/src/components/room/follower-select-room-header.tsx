/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components';
import { useResetRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';

import selectedUserType from '@atoms/chat-selected-users';

const HeaderStyle = styled.div`

  width: 100%;
  height: 80px;

  position: relative;

  p {
    width: 250px;

    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);

    font-family: 'Nunito';
    font-weight: Bold;
    font-size: 32px;

    margin: 0px;
  }
`;

const BtnStyle = css`
  position: absolute;
  transform: translateY(23px);

  font-size: 20px;

  border: none;

  &:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
  }
`;

const CanCelBtnStyle = styled(IoClose)`
  left: 5%;

  &:hover {
    cursor: pointer;
  }

  ${BtnStyle};
`;

export default function FollowerSelectRoomHeader({ onClick }: any) {
  const resetSelectedUserList = useResetRecoilState(selectedUserType);

  const cancelEvent = () => {
    resetSelectedUserList();
    onClick();
  };

  return (
    <HeaderStyle>
      <CanCelBtnStyle size={40} onClick={cancelEvent}>Cancel</CanCelBtnStyle>
      <p>START A ROOM</p>
    </HeaderStyle>
  );
}
