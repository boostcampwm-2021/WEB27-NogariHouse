import React from 'react';
import {
  BrowserRouter, Switch, Redirect, Route,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import userState from '@atoms/user';
import MainView from '@components/main';
import SigninView from '@components/sign/signin-view';
import SignupView from '@components/sign/signup-view';
import SignupInfoView from '@components/sign/signup-info-view';
import MainInitView from '@components/main/init';
import PublicRoute from '@routes/custom/public-route';
import PrivateRoute from '@routes/custom/private-route';

function IndexRouter() {
  const user = useRecoilValue(userState);
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/signin" component={SigninView} />
        <PublicRoute exact path="/signup" component={SignupView} />
        <PublicRoute exact path="/signup/info" component={SignupInfoView} />
        {user.isLoggedIn ? <PrivateRoute path="/" component={MainView} /> : <Route exact path="/" component={MainInitView} /> }
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default IndexRouter;
