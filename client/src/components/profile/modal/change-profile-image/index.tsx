/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import followingListState from '@atoms/following-list';
import toastListSelector from '@selectors/toast-list';
import { isOpenChangeProfileImageModalState } from '@atoms/is-open-modal';
import { ModalBox, BackgroundWrapper } from '@styles/modal';
import userState from '@atoms/user';
import DefaultButton from '@common/default-button';
import userSocketMessage from '@constants/socket-message/user';
import toastMessage from '@constants/toast-message';
import { changeProfileImage } from '@api/user';
import useUserSocket from '@utils/user-socket';
import {
  ChangePofileImageLayout, PreviewProfileImage, CustomForm, ButtonsLayout, CustomInput,
} from './style';

function ShareModal() {
  const [isOpenChangeProfileImageModal,
    setIsOpenChangeProfileImageModalState] = useRecoilState(isOpenChangeProfileImageModalState);
  const [user, setUser] = useRecoilState(userState);
  const setToastList = useSetRecoilState(toastListSelector);
  const [previewImageURL, setPreviewImageURL] = useState(user.profileUrl);
  const [potentialProfileImage, setPotentialProfileImage] = useState<any>(null);
  const followingList = useRecoilValue(followingListState);

  const inputOnChange = (e : any) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setPreviewImageURL(imageUrl);
      setPotentialProfileImage(imageFile);
    }
  };

  const changeImageHandler = async () => {
    if (potentialProfileImage) {
      const formData = new FormData();
      formData.append('profileImage', potentialProfileImage);
      formData.append('userDocumentId', user.userDocumentId);
      const response = await changeProfileImage(user.userDocumentId, formData) as any;
      const { newProfileUrl } = response;
      setUser((oldUser) => ({ ...oldUser, profileUrl: newProfileUrl }));
      setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal);
      setToastList(toastMessage.profileChangeSuccess());
      const userSocket = useUserSocket();
      if (userSocket) {
        userSocket.emit(userSocketMessage.join, {
          ...user, profileUrl: newProfileUrl, followingList,
        });
      }
    }
  };

  return (
    <>
      <BackgroundWrapper
        onClick={() => setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal)}
      />
      <ModalBox>
        <ChangePofileImageLayout>
          <h2>Change your photo</h2>
          <CustomForm>
            <CustomInput id="c2" type="file" accept="image/gif, image/jpeg, image/png" onChange={inputOnChange} />
            <label htmlFor={'c2' as string}>
              <PreviewProfileImage src={previewImageURL} />
            </label>
            <ButtonsLayout>
              <DefaultButton buttonType="secondary" size="medium" onClick={() => changeImageHandler()}>Change</DefaultButton>
              <DefaultButton buttonType="thirdly" size="medium" onClick={() => setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal)}>
                Cancel
              </DefaultButton>
            </ButtonsLayout>
          </CustomForm>
        </ChangePofileImageLayout>

      </ModalBox>
    </>
  );
}

export default ShareModal;
