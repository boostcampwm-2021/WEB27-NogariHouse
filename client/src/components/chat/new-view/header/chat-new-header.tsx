import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import useChatSocket from '@utils/chat-socket';
import { postChatRoom } from '@api/chat';
import userState from '@atoms/user';
import chatSocketMessage from '@constants/socket-message/chat';
import { SelectHeaderWrap, SelectHeader, BtnStyle } from '@src/assets/styles/select-view-style';

const DoneBtn = ({ selectedUserList }: any) => {
  const user = useRecoilValue(userState);
  const history = useHistory();
  const chatSocket = useChatSocket();

  const makeChatRoom = () => {
    if (selectedUserList.length === 0) return;
    postChatRoom([...selectedUserList.map((selectedUser: any) => selectedUser.userDocumentId), user.userDocumentId])
      .then((res: any) => {
        history.push({
          pathname: `/chat-rooms/${res.chatDocumentId}`,
          state: { participantsInfo: selectedUserList },
        });
        if (res.isNew) {
          chatSocket.emit(chatSocketMessage.makeChat, {
            chatDocumentId: res.chatDocumentId,
            participantsInfo: [...selectedUserList, { userDocumentId: user.userDocumentId, userName: user.userName, profileUrl: user.profileUrl }],
          });
        }
      });
  };

  return (
    <BtnStyle onClick={makeChatRoom}>Done</BtnStyle>
  );
};

const CancelBtn = () => {
  const history = useHistory();

  const cancelEvent = () => {
    history.push({ pathname: '/chat-rooms' });
  };

  return (<BtnStyle onClick={cancelEvent}>Cancel</BtnStyle>);
};

export default function NewChatRoomHeader({ selectedUserList }: any) {
  return (
    <SelectHeaderWrap>
      <SelectHeader>
        <CancelBtn />
        <p>NEW MESSAGE</p>
        <DoneBtn selectedUserList={selectedUserList} />
      </SelectHeader>
    </SelectHeaderWrap>
  );
}
