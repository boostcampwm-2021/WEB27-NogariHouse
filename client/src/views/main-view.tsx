import React from 'react';
import DefaultButton from '@styled-components/default-button';
import MainRouter from '../routes/main';

function MainView() {
  return (
    <>
      <div>side bar이다</div>
      <DefaultButton customColor="#4A6970" size="large" text="test" />
      <MainRouter />
      <div>side bar2이다</div>
    </>
  );
}

export default MainView;
