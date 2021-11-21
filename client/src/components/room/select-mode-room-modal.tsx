/* eslint-disable  */
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import roomViewType from '@src/recoil/atoms/room-view-type';
import RoomTypeCheckBox from './room-type-check-box';

const ModalLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const ModeButton = styled(RoomTypeCheckBox)`
 display: inline;
`;

function SelectModeRoomModal() {
  const setRoomView = useSetRecoilState(roomViewType);

  return (
    <>
      <ModalLayout>
      <h2> 입장 모드 선택하기 </h2>
      {/* <ModeButton checkBoxName="public" />
      <ModeButton checkBoxName="social" /> */}
      </ModalLayout>
    </>
  );
}

export default SelectModeRoomModal;
