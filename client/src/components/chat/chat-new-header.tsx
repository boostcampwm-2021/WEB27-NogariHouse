import { useRecoilState, useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

import useChatSocket from '@utils/chat-socket';
import { postChatRoom } from '@api/index';
import userState from '@atoms/user';
import { NewHeaderWrap, NewHeader, BtnStyle } from './style';

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
        chatSocket.emit('chat:makeChat', {
          chatDocumentId: res.chatDocumentId,
          participantsInfo: [...selectedUserList, { userDocumentId: user.userDocumentId, userName: user.userName, profileUrl: user.profileUrl }],
        });
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
    <NewHeaderWrap>
      <NewHeader>
        <CancelBtn />
        <p>NEW MESSAGE</p>
        <DoneBtn selectedUserList={selectedUserList} />
      </NewHeader>
    </NewHeaderWrap>
  );
}
