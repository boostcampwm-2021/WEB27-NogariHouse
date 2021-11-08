/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import SignHeader from '@src/components/sign-header';
import SignTitle from '@src/components/styled-components/sign-title';
import SignBody from '@src/components/styled-components/sign-body';
import DefaultButton from '@src/components/styled-components/default-button';

const CustomInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin: 20px;
`;

const CustomInput = styled.input`
  border: none;
  background-color: #FFFFFF;
  width: 100%;
  height: 60px;
  &:focus {outline:none;}
  margin: 10px;
  font-size: 30px;
  padding: 0 30px;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 #D6D6D6;
`;

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
            ? <CustomInput key="text" ref={inputEmailRef} onChange={inputOnChange} type="text" placeholder="E-mail Address" />
            : <CustomInput key="verification" ref={inputVerificationRef} onChange={inputOnChange} type="verification" placeholder="Verification code" />}
        </CustomInputBox>
        <DefaultButton buttonType="secondary" size="medium" onClick={() => { if (isEmailInputView) onClickEmailNextButton(); else onClickVerificationNextButton(); }} isDisabled={isDisabled}>
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignUpView;
