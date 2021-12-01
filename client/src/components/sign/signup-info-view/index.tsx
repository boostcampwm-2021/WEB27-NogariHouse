import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useHistory, useLocation } from 'react-router-dom';

import toastListSelector from '@selectors/toast-list';
import SignHeader from '@components/sign/common/sign-header';
import SignTitle from '@components/sign/common/sign-title';
import { SignBody } from '@components/sign/common/style';
import DefaultButton from '@common/default-button';
import {
  CustomInputBox, CustomInputBar, InputLayout, CustomInputBoxLayout,
} from '@styles/custom-inputbar';
import { postSignUpUserInfo, getUserExistenceByUserId } from '@api/user';
import toastMessage from '@src/constants/toast-message';

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
  const checkUserIdLength = () => inputIdRef.current?.value.length as number >= 2
    && inputIdRef.current?.value.length as number <= 12;
  const checkUserIdIsExisted = async () => {
    const result = await getUserExistenceByUserId(inputIdRef.current?.value as string);
    return result;
  };
  const checkUserName = () => inputFullNameRef.current?.value.length as number >= 2
    && inputFullNameRef.current?.value.length as number <= 12;

  const checkValidation = async () => {
    if (!checkPasswordValidity()) {
      setToastList(toastMessage.signupInfoWarning('passLength'));

      return false;
    }

    if (!checkPassword()) {
      setToastList(toastMessage.signupInfoWarning('passMatching'));

      return false;
    }

    if (!checkUserName()) {
      setToastList({
        type: 'warning',
        title: '이름 길이 제한',
        description: '이름은 2자 이상 12자 이하입니다.',
      });

      return false;
    }

    if (!checkUserIdLength()) {
      setToastList({
        type: 'warning',
        title: '아이디 길이 제한',
        description: '아이디는 2자 이상 12자 이하입니다.',
      });

      return false;
    }

    const isExistedId = await checkUserIdIsExisted();

    if (isExistedId) {
      setToastList(toastMessage.signupInfoWarning('idExist'));

      return false;
    }

    return true;
  };

  const onClickNextButton = async () => {
    const isValidated = await checkValidation();
    if (!isValidated) return;

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
