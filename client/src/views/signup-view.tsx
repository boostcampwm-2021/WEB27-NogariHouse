/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import SignHeader from '@components/sign/sign-header';
import { BackgroundWrapper } from '@common/modal';
import LoadingSpinner from '@common/loading-spinner';
import SignTitle from '@components/sign/sign-title';
import SignBody from '@components/sign/sign-body';
import DefaultButton from '@common/default-button';
import { CustomInputBox, CustomInputBar } from '@common/custom-inputbar';
import { testEmailValidation } from '@utils/index';
import { postCheckMail } from '@src/api';

const CustomBackgroundWrapper = styled(BackgroundWrapper)`
  opacity: 0.4;
`;

function SignUpView() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputVerificationRef = useRef<HTMLInputElement>(null);
  const verificationNumber = useRef<number>();
  const [isEmailInputView, setIsEmailInputView] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailState = useRef<string>();
  const history = useHistory();

  const setVerificationNumber = useCallback((number: number) => {
    verificationNumber.current = number;
  }, []);

  const inputOnChange = useCallback(() => {
    if (inputEmailRef.current?.value
      || inputVerificationRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const onClickEmailNextButton = () => {
    const inputEmailValue = inputEmailRef.current?.value as string;

    if (testEmailValidation(inputEmailValue)) {
      setLoading(true);

      const postSignupMailConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: inputEmailValue }),
      };

      postCheckMail({ email: inputEmailValue })
        .then((json: any) => json.verificationNumber)
        .then(setVerificationNumber)
        .then(() => {
          emailState.current = inputEmailValue;
          setLoading(false);
          setIsDisabled(true);
          setIsEmailInputView(false);
        });
    } else {
      alert('올바른 이메일을 입력해주세요');
    }
  };

  const onClickVerificationNextButton = () => {
    const inputVerificationValue = inputVerificationRef.current?.value as string;

    if (inputVerificationValue === (verificationNumber.current?.toString())) {
      history.replace('/signup/info', { email: emailState.current });
    } else {
      alert('인증번호를 확인하세요.');
    }
  };

  return (
    <>
      {loading && <CustomBackgroundWrapper><LoadingSpinner /></CustomBackgroundWrapper>}
      <SignHeader />
      <SignBody>
        {isEmailInputView
          ? <SignTitle title="sign up with user email" />
          : <SignTitle title="enter the verification code" />}
        <CustomInputBox>
          {isEmailInputView
            ? <CustomInputBar key="text" ref={inputEmailRef} onChange={inputOnChange} type="text" placeholder="E-mail Address" />
            : <CustomInputBar key="verification" ref={inputVerificationRef} onChange={inputOnChange} type="verification" placeholder="Verification code" />}
        </CustomInputBox>
        <DefaultButton buttonType="secondary" size="medium" onClick={isEmailInputView ? onClickEmailNextButton : onClickVerificationNextButton} isDisabled={isDisabled}>
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignUpView;
