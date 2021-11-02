import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './assets/styles/global-styles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
