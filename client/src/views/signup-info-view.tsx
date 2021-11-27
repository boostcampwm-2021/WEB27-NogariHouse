import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useHistory, useLocation } from 'react-router-dom';

import toastListSelector from '@selectors/toast-list';
import SignHeader from '@components/sign/sign-header';
import SignTitle from '@components/sign/sign-title';
import SignBody from '@components/sign/sign-body';
import DefaultButton from '@common/default-button';
import {
  CustomInputBox, CustomInputBar, InputLayout, CustomInputBoxLayout,
} from '@common/custom-inputbar';
import { postSignUpUserInfo, getUserExistenceByUserId } from '@src/api';

const CustomInfoInputBar = styled(CustomInputBar)`
  font-size: min(5vw, 30px);
  width: 70%;
`;

function SignupInfoView() {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputPasswordCheckRef = useRef<HTMLInputElement>(null);
  const inputFullNameRef = useRef<HTMLInputElement>(null);
  const inputIdRef = useRef<HTMLInputElement>(null);

  const setToastList = useSetRecoilState(toastListSelector);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const inputOnChange = useCallback(() => {
    if (inputPasswordRef.current?.value && inputPasswordCheckRef.current?.value && inputFullNameRef.current?.value && inputIdRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const checkPasswordValidity = () => inputPasswordRef.current?.value.length as number >= 6
    && inputPasswordRef.current?.value.length as number <= 16;
  const checkPassword = () => inputPasswordRef.current?.value === inputPasswordCheckRef.current?.value;
  const checkUserId = async () => {
    const result = await getUserExistenceByUserId(inputIdRef.current?.value as string);
    return result;
  };

  const onClickNextButton = async () => {
    if (!checkPasswordValidity()) {
      setToastList({
        type: 'warning',
        title: '비밀번호 에러',
        description: '비밀번호는 6자 이상 16자 이하입니다.',
      });

      return;
    }

    if (!checkPassword()) {
      setToastList({
        type: 'warning',
        title: '비밀번호 일치 에러',
        description: '비밀번호가 일치하지 않습니다.',
      });

      return;
    }

    const isExistedId = await checkUserId();

    if (isExistedId) {
      setToastList({
        type: 'warning',
        title: '아이디 중복 에러',
        description: '이미 존재하는 아이디입니다.',
      });

      return;
    }

    const userInfo = {
      loginType: 'normal',
      userId: inputIdRef.current?.value as string,
      password: inputPasswordRef.current?.value as string,
      userName: inputFullNameRef.current?.value as string,
      userEmail: (location.state as {email: string}).email,
    };

    postSignUpUserInfo(userInfo)
      .then(() => { history.replace('/'); });
  };

  const keyUpEnter = (e: any) => {
    if (!isDisabled && e.key === 'Enter') {
      onClickNextButton();
    }
  };

  return (
    <>
      <SignHeader />
      <SignBody>
        <InputLayout>
          <CustomInputBox onKeyUp={(e) => keyUpEnter(e)}>
            <CustomInputBoxLayout>
              <SignTitle title="what’s your password?" />
              <CustomInfoInputBar key="password" ref={inputPasswordRef} onChange={inputOnChange} type="password" placeholder="Password" />
              <CustomInfoInputBar
                key="passwordCheck"
                ref={inputPasswordCheckRef}
                onChange={inputOnChange}
                type="password"
                placeholder="Password Check"
              />
            </CustomInputBoxLayout>
            <CustomInputBoxLayout>
              <SignTitle title="what’s your full name?" />
              <CustomInfoInputBar key="fullName" ref={inputFullNameRef} onChange={inputOnChange} type="text" placeholder="Full name" />
            </CustomInputBoxLayout>
            <CustomInputBoxLayout>
              <SignTitle title="what’s your id?" />
              <CustomInfoInputBar key="id" ref={inputIdRef} onChange={inputOnChange} type="text" placeholder="Nick name" />
            </CustomInputBoxLayout>
          </CustomInputBox>
          <DefaultButton buttonType="secondary" size="medium" onClick={onClickNextButton} isDisabled={isDisabled}>NEXT</DefaultButton>
        </InputLayout>
      </SignBody>
    </>
  );
}

export default SignupInfoView;
