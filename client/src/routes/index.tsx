import React from 'react';
import {
  BrowserRouter, Switch, Redirect, Route,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import userState from '@atoms/user';
import MainView from '@views/main-view';
import SigninView from '@views/signin-view';
import SignupView from '@views/signup-view';
import SignupInfoView from '@views/signup-info-view';
import MainInitView from '@src/views/main-init-view';
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
