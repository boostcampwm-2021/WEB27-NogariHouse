/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

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
  width: 200px;
  height: 200px;
  min-height: 200px;
  object-fit: contain;
  margin: 20px;
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

// const ImageLabel = styled.label`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #9AACA1;
//     border-radius: 30px;
//     font-size: 20px;
//     font-family: Nunito;
//     color: #FFF;
//     width: 100px;
//     height: 40px;

// `;

// const HiddenInput = styled.input`
//   width: 0;
//   height: 0;
//   padding: 0;
//   overflow: hidden;
//   border: 0;
// `;

const ButtonsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
`;

function ShareModal() {
  const [isOpenChangeProfileImageModal,
    setIsOpenChangeProfileImageModalState] = useRecoilState(isOpenChangeProfileImageModalState);
  const user = useRecoilValue(userState);
  const [previewImageURL, setPreviewImageURL] = useState(user.profileUrl);
  const [potentialProfileImage, setPotentialProfileImage] = useState<any>(null);

  const inputOnChange = (e : any) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setPreviewImageURL(imageUrl);
      setPotentialProfileImage(imageFile);
      console.log(imageFile);
    }
  };

  const changeImageHandler = async () => {
    if (potentialProfileImage) {
      const datas = new FormData();
      datas.append('image', potentialProfileImage, potentialProfileImage.name);
      await changeProfileImage(user.userDocumentId, datas);
    }
  };

  return (
    <>
      <BackgroundWrapper
        onClick={() => setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal)}
      />
      <ModalBox>
        <ChangePofileImageLayout>
          <PreviewProfileImage src={previewImageURL} />
          <CustomForm action="/uploadFileWithOriginalFilename" method="post">
            <input type="file" id="image-file" accept="image/gif, image/jpeg, image/png" onChange={inputOnChange} />
            <ButtonsLayout>
              <DefaultButton buttonType="secondary" size="medium" onClick={() => changeImageHandler()}>
                Change
              </DefaultButton>
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
