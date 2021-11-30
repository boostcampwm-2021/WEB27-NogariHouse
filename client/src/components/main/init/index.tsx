import React from 'react';
import { Link } from 'react-router-dom';

import DefaultButton from '@common/default-button';
import LargeLogo from './large-logo';
import { MainLayout, ButtonLayout } from './style';

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
