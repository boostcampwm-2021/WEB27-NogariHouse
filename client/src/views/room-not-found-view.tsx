import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import roomViewType from '@src/recoil/atoms/room-view-type';
import DefaultButton from '@common/default-button';
import NotFoundGif from '@images/not-found.gif';

const NotFoundImg = styled.img`
  box-sizing: border-box;
  width: 300px;
  margin: 0px 10px;
`;

function NotFoundRoomModal() {
  const setRoomView = useSetRecoilState(roomViewType);

  const leaveHandler = () => {
    setRoomView('createRoomView');
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
