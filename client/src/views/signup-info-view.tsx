import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useHistory, useLocation } from 'react-router-dom';

import toastListSelector from '@selectors/toast-list';
import SignHeader from '@components/sign/sign-header';
import SignTitle from '@components/sign/sign-title';
import SignBody from '@components/sign/sign-body';
import DefaultButton from '@common/default-button';
import { CustomInputBox, CustomInputBar } from '@common/custom-inputbar';
import { postSignUpUserInfo } from '@src/api';

const CustomInfoInputBar = styled(CustomInputBar)`
  font-size: min(5vw, 30px);
  width: 70%;
`;

const Padding = styled.div`
  padding: 20px;
`;

function SignupInfoView() {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputPasswordCheckRef = useRef<HTMLInputElement>(null);
  const inputFullNameRef = useRef<HTMLInputElement>(null);
  const inputIdRef = useRef<HTMLInputElement>(null);
  const setToastList = useSetRecoilState(toastListSelector);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const inputOnChange = useCallback(() => {
    if (inputPasswordRef.current?.value && inputPasswordCheckRef.current?.value && inputFullNameRef.current?.value && inputIdRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const checkPassword = () => inputPasswordRef.current?.value === inputPasswordCheckRef.current?.value;

  const onClickNextButton = () => {
    if (checkPassword()) {
      const userInfo = {
        loginType: 'normal',
        userId: inputIdRef.current?.value as string,
        password: inputPasswordRef.current?.value as string,
        userName: inputFullNameRef.current?.value as string,
        userEmail: (location.state as {email: string}).email,
      };

      postSignUpUserInfo(userInfo)
        .then(() => { history.replace('/'); });
    } else {
      setToastList({
        type: 'warning',
        title: '로그인 에러',
        description: '비밀번호를 확인해주세요',
      });
    }
  };

  const keyUpEnter = (e: any) => {
    if (!isDisabled && e.key === 'Enter') {
      onClickNextButton();
    }
  };

  return (
    <>
      <SignHeader />
      <SignBody onKeyUp={(e) => keyUpEnter(e)}>
        <CustomInputBox>
          <SignTitle title="what’s your password?" />
          <CustomInfoInputBar key="password" ref={inputPasswordRef} onChange={inputOnChange} type="password" placeholder="Password" />
          <CustomInfoInputBar key="passwordCheck" ref={inputPasswordCheckRef} onChange={inputOnChange} type="password" placeholder="Password Check" />
          <SignTitle title="what’s your full name?" />
          <CustomInfoInputBar key="fullName" ref={inputFullNameRef} onChange={inputOnChange} type="text" placeholder="Full name" />
          <SignTitle title="what’s your id?" />
          <CustomInfoInputBar key="id" ref={inputIdRef} onChange={inputOnChange} type="text" placeholder="Nick name" />
          <DefaultButton buttonType="secondary" size="medium" onClick={onClickNextButton} isDisabled={isDisabled}>NEXT</DefaultButton>
          <Padding />
        </CustomInputBox>
      </SignBody>
    </>
  );
}

export default SignupInfoView;
