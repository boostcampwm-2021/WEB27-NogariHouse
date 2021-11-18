import React from 'react';
import { useSetRecoilState } from 'recoil';

import { isOpenShareModalState } from '@atoms/is-open-modal';
import { ModalBox, BackgroundWrapper } from '@common/modal';

function ShareModal() {
  const setIsOpenShareModal = useSetRecoilState(isOpenShareModalState);

  return (
    <>
      <BackgroundWrapper />
      <ModalBox>
        <div>SHARE</div>
        <button type="button" aria-label="test" onClick={() => setIsOpenShareModal(false)}>cancle</button>
      </ModalBox>
    </>
  );
}

export default ShareModal;
