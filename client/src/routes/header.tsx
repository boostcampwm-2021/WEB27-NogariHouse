import React from 'react';
import { Switch } from 'react-router-dom';

import ActivityHeader from '@components/activity/header';
import DefaultHeader from '@common/default-header';
import EventHeader from '@components/event/header';
import SearchHeader from '@components/search/search-header';
import ProfileHeader from '@components/profile/profile-header';
import FollowHeader from '@components/profile/follow-header';
import PrivateRoute from '@routes/custom/private-route';

function HeaderRouter() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={DefaultHeader} />
      <PrivateRoute exact path="/search" component={SearchHeader} />
      <PrivateRoute exact path="/activity" component={ActivityHeader} />
      <PrivateRoute exact path="/event" component={EventHeader} />
      <PrivateRoute exact path="/profile/:id" component={ProfileHeader} />
      <PrivateRoute exact path="/following/:id" component={FollowHeader} />
      <PrivateRoute exact path="/followers/:id" component={FollowHeader} />
      <PrivateRoute path="/" component={DefaultHeader} />
    </Switch>
  );
}

export default HeaderRouter;
