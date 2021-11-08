import React, { useRef, useState } from 'react';
import styled from 'styled-components';
// import { Redirect } from 'react-router-dom';

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
  height: 90px;
  &:focus {outline:none;}
  margin: 10px;
  font-size: 30px;
  padding: 0 30px;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 #D6D6D6;
`;

function SignInView() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const inputOnChange = () => {
    if (inputEmailRef.current?.value
      && inputPasswordRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const signIn = (): void => {
    const loginInfo = {
      email: inputEmailRef.current?.value,
      password: inputPasswordRef.current?.value,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/user/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),

    }).then((res) => console.log(res.body))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <SignHeader />
      <SignBody>
        <SignTitle title="sign in with user email" />
        <CustomInputBox>
          <CustomInput ref={inputEmailRef} onChange={inputOnChange} type="text" placeholder="E-mail Address" />
          <CustomInput ref={inputPasswordRef} onChange={inputOnChange} type="password" placeholder="Password" />
        </CustomInputBox>
        <DefaultButton buttonType="secondary" size="large" onClick={() => { signIn(); }} isDisabled={isDisabled}>
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignInView;
