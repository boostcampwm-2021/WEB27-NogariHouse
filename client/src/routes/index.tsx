import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainView from '@views/main-view';
import SigninView from '@views/signin-view';
import SignupView from '@views/signup-view';
import SignupInfoView from '@views/signup-info-view';

function IndexRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SigninView} />
        <Route exact path="/signup" component={SignupView} />
        <Route exact path="/signup/info" component={SignupInfoView} />
        <Route path="/" component={MainView} />
      </Switch>
    </BrowserRouter>
  );
}

export default IndexRouter;
