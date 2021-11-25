import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LargeLogo from '@components/sign/large-logo';
import DefaultButton from '@common/default-button';

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-height: -webkit-fill-available;
    width: 100vw;
  `;

const ButtonLayout = styled.div`
    margin-top: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `;

function MainInitView() {
  return (
    <>
      <MainLayout>
        <LargeLogo />
        <ButtonLayout>
          <Link to="/signup">
            <DefaultButton buttonType="secondary" size="medium">
              SIGN UP
            </DefaultButton>
          </Link>
          <Link to="/signin">
            <DefaultButton buttonType="thirdly" size="medium">
              SIGN IN
            </DefaultButton>
          </Link>
        </ButtonLayout>
      </MainLayout>
    </>
  );
}

export default MainInitView;
