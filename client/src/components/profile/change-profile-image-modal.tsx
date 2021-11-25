/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import toastListSelector from '@selectors/toast-list';
import { isOpenChangeProfileImageModalState } from '@atoms/is-open-modal';
import { ModalBox, BackgroundWrapper } from '@common/modal';
import userState from '@atoms/user';
import DefaultButton from '@common/default-button';
import { changeProfileImage } from '@src/api';

const ChangePofileImageLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewProfileImage = styled.img`
  width: 150px;
  height: 150px;
  min-height: 150px;
  object-fit: cover;
  border-radius: 30px;
  border: 0.1px solid #b8b8b8;

  &:hover{
    cursor: pointer;
  };
`;

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const ButtonsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
`;

const CustomInput = styled.input`
  display: none;

  & + label {
      width: 200x;
      height: 200px;
      cursor: pointer;
  }
`;

function ShareModal() {
  const [isOpenChangeProfileImageModal,
    setIsOpenChangeProfileImageModalState] = useRecoilState(isOpenChangeProfileImageModalState);
  const [user, setUser] = useRecoilState(userState);
  const setToastList = useSetRecoilState(toastListSelector);
  const [previewImageURL, setPreviewImageURL] = useState(user.profileUrl);
  const [potentialProfileImage, setPotentialProfileImage] = useState<any>(null);

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
      // eslint-disable-next-line max-len
      const response = await changeProfileImage(user.userDocumentId, formData) as any;
      const { newProfileUrl } = response;
      setUser({ ...user, profileUrl: newProfileUrl });
      setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal);
      setToastList({
        type: 'success',
        title: '프로필 설정',
        description: '지정한 이미지로 변경이 완료됐습니다',
      });
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
