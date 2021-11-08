/* eslint-disable max-len */
import React, {
  MouseEvent, useCallback, useRef, useState,
} from 'react';

import SignHeader from '@components/sign-header';
import SignTitle from '@components/styled-components/sign-title';
import SignBody from '@components/styled-components/sign-body';
import DefaultButton from '@components/styled-components/default-button';
import { CustomInputBox, CustomInputBar } from '@styled-components/custom-inputbar';
import InterestItem from '@styled-components/interest-item';

function SignupInfoView() {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputFullNameRef = useRef<HTMLInputElement>(null);
  const inputNickNameRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInputBarView, setIsInputBarView] = useState(true);
  const selectedItems = useRef<Set<string>>(new Set());

  const inputOnChange = useCallback(() => {
    if (inputPasswordRef.current?.value && inputFullNameRef.current?.value && inputNickNameRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const onClickInterestItem = (e: MouseEvent) => {
    const interestName = e.currentTarget?.textContent?.slice(2);
    if (typeof interestName === 'string') selectedItems.current.add(interestName);
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
              <SignTitle title="what’s your nickname?" />
              <CustomInputBar key="nickName" ref={inputNickNameRef} onChange={inputOnChange} type="text" placeholder="Nick name" />
            </CustomInputBox>
            <DefaultButton buttonType="secondary" size="medium" onClick={() => { setIsInputBarView(false); }} isDisabled={isDisabled}>
              NEXT
            </DefaultButton>
          </>
        ) : (
          <>
            <CustomInputBox>
              <SignTitle title="what’s your interests?" />
              <InterestItem onClick={onClickInterestItem} text="🐟노가리" />
            </CustomInputBox>
          </>
        )}
      </SignBody>
    </>
  );
}

export default SignupInfoView;
