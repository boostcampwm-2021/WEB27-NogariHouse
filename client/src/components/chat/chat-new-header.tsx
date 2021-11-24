import { useRecoilState, useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import useChatSocket from '@utils/chat-socket';
import { postChatRoom } from '@api/index';
import selectedUserType from '@atoms/chat-selected-users';
import userType from '@atoms/user';
import { NewHeaderWrap, NewHeader, BtnStyle } from './style';

const DoneBtn = () => {
  const [selectedUserList, setSelectedUserList] = useRecoilState(selectedUserType);
  const user = useRecoilValue(userType);
  const history = useHistory();
  const chatSocket = useChatSocket();

  const makeChatRoom = () => {
    if (selectedUserList.length === 0) return;
    postChatRoom([...selectedUserList.map((selectedUser: any) => selectedUser.userDocumentId), user.userDocumentId])
      .then((res: any) => {
        history.push({
          pathname: `/chat-rooms/${res.chatRoomId}`,
          state: { participantsInfo: selectedUserList },
        });
        setSelectedUserList([]);
        chatSocket.emit('chat:makeChat', {
          chatDocumentId: res.chatRoomId,
          participantsInfo: [...selectedUserList, { userDocumentId: user.userDocumentId, userName: user.userName, profileUrl: user.profileUrl }],
        });
      });
  };

  return (
    <BtnStyle onClick={makeChatRoom}>Done</BtnStyle>
  );
};

const CancelBtn = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedUserList, setSelectedUserList] = useRecoilState(selectedUserType);
  const history = useHistory();

  const cancelEvent = () => {
    setSelectedUserList([]);
    history.push({ pathname: '/chat-rooms' });
  };

  return (<BtnStyle onClick={cancelEvent}>Cancel</BtnStyle>);
};

export default function NewChatRoomHeader() {
  return (
    <NewHeaderWrap>
      <NewHeader>
        <CancelBtn />
        <p>NEW MESSAGE</p>
        <DoneBtn />
      </NewHeader>
    </NewHeaderWrap>

  );
}
