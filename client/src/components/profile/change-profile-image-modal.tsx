import React from 'react';
import { useRecoilState } from 'recoil';

import { isOpenChangeProfileImageModalState } from '@atoms/is-open-modal';
import { ModalBox, BackgroundWrapper } from '@common/modal';

function ShareModal() {
  const [isOpenChangeProfileImageModal,
    setIsOpenChangeProfileImageModalState] = useRecoilState(isOpenChangeProfileImageModalState);

  return (
    <>
      <BackgroundWrapper />
      <ModalBox>
        <div>SHARE</div>
        <button type="button" aria-label="test" onClick={() => setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal)}>cancle</button>
      </ModalBox>
    </>
  );
}

export default ShareModal;
