import { useSetRecoilState } from 'recoil';

import roomViewType from '@src/recoil/atoms/room-view-type';
import DefaultButton from '@common/default-button';
import isOpenRoomState from '@atoms/is-open-room';
import NotFoundGif from '@images/not-found.gif';
import NotFoundImg from './style';

function NotFoundRoomModal() {
  const setRoomView = useSetRecoilState(roomViewType);
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);

  const leaveHandler = () => {
    setRoomView('createRoomView');
    setIsOpenRoom(false);
  };

  return (
    <>
      <h2>Not Found Room!</h2>
      <NotFoundImg src={NotFoundGif} alt="Not Found" />
      <DefaultButton buttonType="secondary" size="medium" onClick={leaveHandler}>
        Go to the Create View
      </DefaultButton>
    </>
  );
}

export default NotFoundRoomModal;
