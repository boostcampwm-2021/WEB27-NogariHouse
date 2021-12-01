import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { postSignIn } from '@api/user';
import SignHeader from '@components/sign/common/sign-header';
import SignTitle from '@components/sign/common/sign-title';
import { SignBody } from '@components/sign/common/style';
import DefaultButton from '@common/default-button';
import toastMessage from '@constants/toast-message';
import toastListSelector from '@selectors/toast-list';
import { CustomInputBox, CustomInputBar } from '@styles/custom-inputbar';
import { setAccessToken } from '@utils/index';

function SignInView() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const setToastList = useSetRecoilState(toastListSelector);
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
      setAccessToken(json.accessToken as string);
      history.go(0);
    } else {
      setToastList(toastMessage.signInWarning());
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
