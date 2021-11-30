/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import toastListSelector from '@selectors/toast-list';
import SignHeader from '@components/sign/sign-header';
import SignTitle from '@components/sign/sign-title';
import SignBody from '@components/sign/sign-body';
import DefaultButton from '@common/default-button';
import { CustomInputBox, CustomInputBar } from '@common/custom-inputbar';
import { postSignIn } from '@api/user';

function SignInView() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const setToastList = useSetRecoilState(toastListSelector);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const history = useHistory();

  const inputOnChange = () => {
    if (inputEmailRef.current?.value
      && inputPasswordRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const checkSigninResponse = (json :
    {result: boolean,
      msg?: string,
      accessToken?:string,
    }) => {
    if (json.result) {
      setCookie('accessToken', json.accessToken);
      history.go(0);
    } else {
      setToastList({
        type: 'warning',
        title: '로그인 에러',
        description: '로그인 정보를 확인하세요',
      });
    }
  };

  const signIn = () => {
    const loginInfo = {
      email: inputEmailRef.current?.value,
      password: inputPasswordRef.current?.value,
    };

    postSignIn(loginInfo)
      .then((json) => json && checkSigninResponse(json))
      .catch((err) => console.error(err));
  };

  const keyUpEnter = (e: any) => {
    if (inputEmailRef.current?.value
      && inputPasswordRef.current?.value
      && e.key === 'Enter') {
      signIn();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', keyUpEnter);
    return () => {
      document.removeEventListener('keyup', keyUpEnter);
    };
  }, []);

  return (
    <>
      <SignHeader />
      <SignBody>
        <SignTitle title="sign in with user email" />
        <CustomInputBox>
          <CustomInputBar ref={inputEmailRef} onChange={inputOnChange} type="text" placeholder="E-mail Address" />
          <CustomInputBar ref={inputPasswordRef} onChange={inputOnChange} type="password" placeholder="Password" />
        </CustomInputBox>
        <DefaultButton buttonType="secondary" size="medium" onClick={signIn} isDisabled={isDisabled}>
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignInView;
