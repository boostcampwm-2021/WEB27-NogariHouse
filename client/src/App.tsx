import React from 'react';

import Router from '@routes/index';
import BodyModal from '@components/body-modal';
import Toast from '@components/common/toast';

function App() {
  return (
    <>
      <Router />
      <BodyModal />
      <Toast />
    </>
  );
}

export default App;
