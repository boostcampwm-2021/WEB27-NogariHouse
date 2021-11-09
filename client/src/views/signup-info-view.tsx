/* eslint-disable max-len */
import React, {
  MouseEvent, useCallback, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

import SignHeader from '@components/sign-header';
import SignTitle from '@components/styled-components/sign-title';
import SignBody from '@components/styled-components/sign-body';
import DefaultButton from '@components/styled-components/default-button';
import { CustomInputBox, CustomInputBar } from '@styled-components/custom-inputbar';
import InterestItem from '@styled-components/interest-item';

const InterestItemWarapper = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  div {
    margin-right: 5%;
    margin-bottom: 5%;
  }
  margin-top: 5%;
  margin-right: -5%;
`;

function SignupInfoView() {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputFullNameRef = useRef<HTMLInputElement>(null);
  const inputIdRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInputBarView, setIsInputBarView] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const selectedItems = new Set();
  const userInput = useRef<{ id: string, password: string, name: string}>({ id: '', password: '', name: '' });

  const inputOnChange = useCallback(() => {
    if (inputPasswordRef.current?.value && inputFullNameRef.current?.value && inputIdRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const onClickInterestItem = (e: MouseEvent) => {
    const interestName = e.currentTarget?.textContent?.slice(2);
    if (typeof interestName === 'string') selectedItems.add(interestName);
  };

  const onClickInputViewNextButton = () => {
    userInput.current.id = inputIdRef.current?.value as string;
    userInput.current.password = inputPasswordRef.current?.value as string;
    userInput.current.name = inputFullNameRef.current?.value as string;
    setIsInputBarView(false);
  };

  const onClickInterestViewNextButton = () => {
    const postSignupUserInfoConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginType: 'normal',
        userId: userInput.current.id,
        password: userInput.current.password,
        userName: userInput.current.name,
        userEmail: (location.state as {email: string}).email,
        interesting: Array.from(selectedItems),
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/user/signup/userInfo`, postSignupUserInfoConfig)
      .then((res) => res.json())
      .then(() => { history.replace('/'); });
  };

  return (
    <>
      <SignHeader />
      <SignBody>
        {isInputBarView ? (
          <>
            <CustomInputBox>
              <SignTitle title="what’s your password?" />
              <CustomInputBar key="password" ref={inputPasswordRef} onChange={inputOnChange} type="text" placeholder="Password" />
              <SignTitle title="what’s your full name?" />
              <CustomInputBar key="fullName" ref={inputFullNameRef} onChange={inputOnChange} type="text" placeholder="Full name" />
              <SignTitle title="what’s your id?" />
              <CustomInputBar key="id" ref={inputIdRef} onChange={inputOnChange} type="text" placeholder="Nick name" />
            </CustomInputBox>
            <DefaultButton buttonType="secondary" size="medium" onClick={() => { onClickInputViewNextButton(); }} isDisabled={isDisabled}>
              NEXT
            </DefaultButton>
          </>
        ) : (
          <>
            <CustomInputBox>
              <SignTitle title="what’s your interests?" />
              <InterestItemWarapper>
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
                <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
              </InterestItemWarapper>
            </CustomInputBox>
            <DefaultButton buttonType="secondary" size="medium" onClick={() => { onClickInterestViewNextButton(); }} isDisabled={isDisabled}>
              NEXT
            </DefaultButton>
          </>
        )}
      </SignBody>
    </>
  );
}

export default SignupInfoView;
