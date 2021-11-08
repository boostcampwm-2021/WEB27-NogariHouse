/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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

function SignInView() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [cookies, setCookie] = useCookies(['jwt']);
  const history = useHistory();

  const inputOnChange = () => {
    if (inputEmailRef.current?.value
      && inputPasswordRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const checkSigninResponse = (json : {result: boolean, msg?: string, jwt?:string}) => {
    if (json.result) {
      setCookie('jwt', json.jwt);
      history.replace('/');
    } else {
      alert('로그인 정보를 확인하세요.');
    }
  };

  const signIn = () => {
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

    }).then((res) => res.json())
      .then(checkSigninResponse)
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
        <DefaultButton buttonType="secondary" size="medium" onClick={() => { signIn(); }} isDisabled={isDisabled}>
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignInView;
