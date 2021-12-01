import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { postSignIn, getSignInGuest } from '@api/user';
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
  const [allowGuest, setAllowGuest] = useState(false);
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

  const checkGuestResponse = (json :
    {ok: boolean,
      accessToken?:string,
    }) => {
    if (json.ok) {
      setAccessToken(json.accessToken as string);
      history.go(0);
    } else {
      setToastList({
        type: 'warning',
        title: '로그인 에러',
        description: '게스트 이용이 지연되고 있습니다. 다시 시도해주세요',
      });
    }
  };

  const allowGuestChange = (email: string) => {
    if (email === `${process.env.REACT_APP_ALLOW_GUEST_STRING}`) {
      fetch(`${process.env.REACT_APP_API_URL}/api/user/easterEgg/guest?change=true`).then(() => setAllowGuest((now) => !now));
    }
  };

  const signIn = () => {
    const loginInfo = {
      email: inputEmailRef.current?.value,
      password: inputPasswordRef.current?.value,
    };

    allowGuestChange(loginInfo.email as string);

    postSignIn(loginInfo)
      .then((json) => json && checkSigninResponse(json))
      .catch((err) => console.error(err));
  };

  const signInGuest = () => {
    getSignInGuest()
      .then((json) => json && checkGuestResponse(json))
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

  useEffect(() => {
    const allowGuestFetch = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/easterEgg/guest`);
      const json = await res.json();
      setAllowGuest(json.allowGuest);
    };
    allowGuestFetch();
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
        {allowGuest && (
        <DefaultButton buttonType="secondary" size="medium" onClick={signInGuest} isDisabled={false}>
          Guest MODE
        </DefaultButton>
        )}
      </SignBody>
    </>
  );
}

export default SignInView;
