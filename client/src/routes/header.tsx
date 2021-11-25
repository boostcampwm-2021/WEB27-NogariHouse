import React from 'react';
import { Switch } from 'react-router-dom';

import ActivityHeader from '@components/activity-header';
import DefaultHeader from '@common/default-header';
import EventHeader from '@components/event/event-header';
import InviteHeader from '@components/invite-header';
import RecentSearchHeader from '@components/search/recent-search-header';
import SearchHeader from '@components/search/search-header';
import ProfileHeader from '@components/profile/profile-header';
import FollowingHeader from '@components/profile/following-header';
import FollowersHeader from '@components/profile/followers-header';
import PrivateRoute from '@routes/custom/private-route';

function HeaderRouter() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={DefaultHeader} />
      <PrivateRoute exact path="/search" component={SearchHeader} />
      <PrivateRoute exact path="/search/recent" component={RecentSearchHeader} />
      <PrivateRoute exact path="/activity" component={ActivityHeader} />
      <PrivateRoute exact path="/event" component={EventHeader} />
      <PrivateRoute exact path="/invite" component={InviteHeader} />
      <PrivateRoute exact path="/profile/:id" component={ProfileHeader} />
      <PrivateRoute exact path="/following/:id" component={FollowingHeader} />
      <PrivateRoute exact path="/followers/:id" component={FollowersHeader} />
      <PrivateRoute path="/" component={DefaultHeader} />
    </Switch>
  );
}

export default HeaderRouter;
