import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from '@styles/global-styles';
import { RecoilRoot } from 'recoil';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
