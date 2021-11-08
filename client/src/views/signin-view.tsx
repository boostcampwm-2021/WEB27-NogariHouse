import React from 'react';
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
  height: 90px;
  &:focus {outline:none;}
  margin: 10px;
  font-size: 30px;
  padding: 0 30px;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 #D6D6D6;
`;

function SignInView() {
  return (
    <>
      <SignHeader />
      <SignBody>
        <SignTitle title="sign in with user email" />
        <CustomInputBox>
          <CustomInput type="text" placeholder="E-mail Address" />
          <CustomInput type="password" placeholder="Password" />
        </CustomInputBox>
        <DefaultButton buttonType="secondary" size="large">
          NEXT
        </DefaultButton>
      </SignBody>
    </>
  );
}

export default SignInView;
