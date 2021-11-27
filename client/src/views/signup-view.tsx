import React, { useCallback, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import toastListSelector from '@selectors/toast-list';
import SignHeader from '@components/sign/sign-header';
import { BackgroundWrapper } from '@common/modal';
import LoadingSpinner from '@common/loading-spinner';
import SignTitle from '@components/sign/sign-title';
import SignBody from '@components/sign/sign-body';
import DefaultButton from '@common/default-button';
import { CustomInputBox, CustomInputBar, CustomInputBoxLayout } from '@common/custom-inputbar';
import { testEmailValidation } from '@utils/index';
import { postCheckMail } from '@src/api';

const CustomBackgroundWrapper = styled(BackgroundWrapper)`
  opacity: 0.4;
`;

function SignUpView() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputVerificationRef = useRef<HTMLInputElement>(null);
  const verificationNumberRef = useRef<string>();
  const setToastList = useSetRecoilState(toastListSelector);
  const [isEmailInputView, setIsEmailInputView] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailState = useRef<string>();
  const history = useHistory();

  const setVerificationNumber = useCallback((inputVerificationNumber: string) => {
    verificationNumberRef.current = inputVerificationNumber;
  }, []);

  const inputOnChange = useCallback(() => {
    if (inputEmailRef.current?.value
      || inputVerificationRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const fetchPostMail = async (inputEmailValue: string) => {
    const { isUnique, verificationNumber } = await postCheckMail({ email: inputEmailValue }) as { isUnique: boolean, verificationNumber: string };
    if (isUnique) {
      setVerificationNumber(verificationNumber);
      emailState.current = inputEmailValue;
      setLoading(false);
      setIsDisabled(true);
      setIsEmailInputView(false);
    } else {
      setLoading(false);
      setToastList({
        type: 'warning',
        title: '로그인 에러',
        description: '이미 존재하는 이메일입니다',
      });
    }
  };

  const onClickEmailNextButton = () => {
    const inputEmailValue = inputEmailRef.current?.value as string;

    if (testEmailValidation(inputEmailValue)) {
      setLoading(true);
      fetchPostMail(inputEmailValue);
    } else {
      setToastList({
        type: 'warning',
        title: '로그인 에러',
        description: '올바른 이메일을 입력해주세요',
      });
    }
  };

  const onClickVerificationNextButton = () => {
    const inputVerificationValue = inputVerificationRef.current?.value as string;

    if (inputVerificationValue === (verificationNumberRef.current?.toString())) {
      history.replace('/signup/info', { email: emailState.current });
    } else {
      setToastList({
        type: 'warning',
        title: '로그인 에러',
        description: '인증번호를 확인하세요.',
      });
    }
  };

  const keyUpEnter = (e: any) => {
    if (!isDisabled && e.key === 'Enter') {
      if (isEmailInputView) onClickEmailNextButton();
      else onClickVerificationNextButton();
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
        <CustomInputBox onKeyUp={(e) => keyUpEnter(e)}>
          <CustomInputBoxLayout>
            {isEmailInputView
              ? (
                <CustomInputBar
                  key="text"
                  ref={inputEmailRef}
                  onChange={inputOnChange}
                  type="text"
                  placeholder="E-mail Address"
                />
              )
              : (
                <CustomInputBar
                  key="verification"
                  ref={inputVerificationRef}
                  onChange={inputOnChange}
                  type="verification"
                  placeholder="Verification code"
                />
              )}
          </CustomInputBoxLayout>
        </CustomInputBox>
        <DefaultButton
          buttonType="secondary"
          size="medium"
          onClick={isEmailInputView ? onClickEmailNextButton : onClickVerificationNextButton}
          isDisabled={isDisabled}
        >
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignUpView;
