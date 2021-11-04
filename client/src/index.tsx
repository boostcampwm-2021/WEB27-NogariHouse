import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyle from '@styles/global-styles';
import App from './App';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
