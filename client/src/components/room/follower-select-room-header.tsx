/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import styled, { css } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';

import userState from '@atoms/user';
import roomViewState from '@atoms/room-view-type';
import { isOpenRoomModalState } from '@atoms/is-open-modal';
import roomDoucumentIdState from '@atoms/room-document-id';
import { makeDateToHourMinute } from '@utils/index';
import useChatSocket from '@utils/chat-socket';

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
`;

const CanCelBtnStyle = styled(IoClose)`
  left: 5%;

  &:hover {
    cursor: pointer;
  }

  ${BtnStyle};
`;

const DoneBtnStyle = styled.button`
  right: 5%;
  background-color: #F1F0E4;
  &:hover {
    cursor: pointer;
  }

  ${BtnStyle};
`;

export default function FollowerSelectRoomHeader({ onClick, selectedUsers }: any) {
  const setIsOpenRoomModal = useSetRecoilState(isOpenRoomModalState);
  const setRoomView = useSetRecoilState(roomViewState);
  const roomDocumentId = useRecoilValue(roomDoucumentIdState);
  const user = useRecoilValue(userState);
  const chatSocket = useChatSocket();

  const cancelEvent = () => {
    onClick();
  };

  const submitEventHandler = () => {
    const inviteInfo = {
      participants: selectedUsers,
      message: `${user.userName}님이 노가리 방으로 초대했습니다!`,
      userInfo: {
        userDocumentId: user.userDocumentId,
        userName: user.userName,
        profileUrl: user.profileUrl,
      },
      roomDocumentId,
      date: makeDateToHourMinute(new Date()),
    };
    chatSocket.emit('chat:inviteRoom', inviteInfo);
    setRoomView('inRoomView');
    setIsOpenRoomModal(false);
  };

  return (
    <HeaderStyle>
      <CanCelBtnStyle size={40} onClick={cancelEvent} />
      <p>START A ROOM</p>
      <DoneBtnStyle onClick={submitEventHandler}>Done</DoneBtnStyle>
    </HeaderStyle>
  );
}
