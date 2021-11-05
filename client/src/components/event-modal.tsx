import React from 'react';
import { useSetRecoilState } from 'recoil';

import { isOpenEventModalState } from '@atoms/is-open-modal';
import { ModalBox, BackgroundWrapper } from '@styled-components/modal';

function EventModal() {
  const setIsOpenEventModal = useSetRecoilState(isOpenEventModalState);

  return (
    <>
      <BackgroundWrapper />
      <ModalBox>
        <button type="button" aria-label="test" onClick={() => setIsOpenEventModal(false)}>cancle</button>
      </ModalBox>
    </>
  );
}

export default EventModal;
