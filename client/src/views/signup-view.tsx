/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import SignHeader from '@src/components/sign-header';
import SignTitle from '@src/components/styled-components/sign-title';
import SignBody from '@src/components/styled-components/sign-body';
import DefaultButton from '@src/components/styled-components/default-button';
import { CustomInputBox, CustomInputBar } from '@styled-components/custom-inputbar';

function SignUpView() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputVerificationRef = useRef<HTMLInputElement>(null);
  const [isEmailInputView, setIsEmailInputView] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const inputOnChange = useCallback(() => {
    if (inputEmailRef.current?.value
      || inputVerificationRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const onClickEmailNextButton = () => {
    setIsDisabled(true);
    setIsEmailInputView(false);
  };

  const onClickVerificationNextButton = () => {
    history.replace('/signup/info');
  };

  return (
    <>
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
        <DefaultButton buttonType="secondary" size="medium" onClick={() => { if (isEmailInputView) onClickEmailNextButton(); else onClickVerificationNextButton(); }} isDisabled={isDisabled}>
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignUpView;
