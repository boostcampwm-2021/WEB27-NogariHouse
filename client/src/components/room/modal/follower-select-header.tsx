/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import toastListSelector from '@selectors/toast-list';
import userState from '@atoms/user';
import roomViewState from '@atoms/room-view-type';
import { isOpenRoomModalState } from '@atoms/is-open-modal';
import roomDoucumentIdState from '@atoms/room-document-id';
import { makeDateToHourMinute } from '@utils/index';
import useChatSocket from '@utils/chat-socket';
import { NewHeaderWrap, NewHeader, BtnStyle } from '@components/chat/style';

const CustomNewHeaderWrap = styled(NewHeaderWrap)`
  background-color: transparent;
`;

export default function FollowerSelectRoomHeader({ onClick, selectedUsers }: any) {
  const setToastList = useSetRecoilState(toastListSelector);
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
      message: `${user.userName}님이 노가리 방으로 초대했습니다! \n 메세지를 눌러 참여하세요!`,
      userInfo: {
        userDocumentId: user.userDocumentId,
        userName: user.userName,
        profileUrl: user.profileUrl,
      },
      roomDocumentId,
      date: makeDateToHourMinute(new Date()),
    };
    chatSocket.emit('chat:inviteRoom', inviteInfo);
    setToastList({
      type: 'success',
      title: '방 초대',
      description: '초대 메세지를 보냈습니다!',
    });
    setRoomView('inRoomView');
    setIsOpenRoomModal(false);
  };

  return (
    <CustomNewHeaderWrap>
      <NewHeader>
        <BtnStyle onClick={cancelEvent}>Cancel</BtnStyle>
        <p>START A ROOM</p>
        <BtnStyle onClick={submitEventHandler}>Done</BtnStyle>
      </NewHeader>
    </CustomNewHeaderWrap>
  );
}
