import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ActivityHeader from '@components/activity-header';
import DefaultHeader from '@common/default-header';
import EventHeader from '@components/event/event-header';
import InviteHeader from '@components/invite-header';
import RecentSearchHeader from '@components/search/recent-search-header';
import SearchHeader from '@components/search/search-header';
import ProfileHeader from '@components/profile/profile-header';
import FollowingHeader from '@components/profile/following-header';
import FollowersHeader from '@components/profile/followers-header';

function HeaderRouter() {
  return (
    <Switch>
      <Route exact path="/" component={DefaultHeader} />
      <Route exact path="/search" component={SearchHeader} />
      <Route exact path="/search/recent" component={RecentSearchHeader} />
      <Route exact path="/activity" component={ActivityHeader} />
      <Route exact path="/event" component={EventHeader} />
      <Route exact path="/invite" component={InviteHeader} />
      <Route exact path="/profile/:id" component={ProfileHeader} />
      <Route exact path="/following/:id" component={FollowingHeader} />
      <Route exact path="/followers/:id" component={FollowersHeader} />
      <Route path="/" component={DefaultHeader} />
    </Switch>
  );
}

export default HeaderRouter;
