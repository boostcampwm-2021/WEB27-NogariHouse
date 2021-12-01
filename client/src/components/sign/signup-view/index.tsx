import React, { useCallback, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import toastListSelector from '@selectors/toast-list';
import LoadingSpinner from '@styles/loading-spinner';
import DefaultButton from '@common/default-button';
import SignHeader from '@components/sign/common/sign-header';
import SignTitle from '@components/sign/common/sign-title';
import { SignBody } from '@components/sign/common/style';
import { CustomInputBox, CustomInputBar, CustomInputBoxLayout } from '@styles/custom-inputbar';
import { testEmailValidation } from '@utils/index';
import { postCheckMail } from '@api/user';
import toastMessage from '@src/constants/toast-message';
import CustomBackgroundWrapper from './style';

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
      setToastList(toastMessage.signupWarning('emailExist'));
    }
  };

  const onClickEmailNextButton = () => {
    const inputEmailValue = inputEmailRef.current?.value as string;

    if (testEmailValidation(inputEmailValue)) {
      setLoading(true);
      fetchPostMail(inputEmailValue);
    } else {
      setToastList(toastMessage.signupWarning('emailValidation'));
    }
  };

  const onClickVerificationNextButton = () => {
    const inputVerificationValue = inputVerificationRef.current?.value as string;

    if (inputVerificationValue === (verificationNumberRef.current?.toString())) {
      history.replace('/signup/info', { email: emailState.current });
    } else {
      setToastList(toastMessage.signupWarning('verification'));
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
