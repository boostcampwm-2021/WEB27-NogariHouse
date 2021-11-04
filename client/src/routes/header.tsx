import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ActivityHeader from '@components/activity-header';
import DefaultHeader from '@components/default-header';
import EventHeader from '@components/event-header';
import InviteHeader from '@components/invite-header';
import RecentSearchHeader from '@components/recent-search-header';
import SearchHeader from '@components/search-header';

function HeaderRouter() {
  return (
    <Switch>
      <Route exact path="/" component={DefaultHeader} />
      <Route exact path="/search" component={SearchHeader} />
      <Route exact path="/search/recent" component={RecentSearchHeader} />
      <Route exact path="/activity" component={ActivityHeader} />
      <Route exact path="/event" component={EventHeader} />
      <Route exact path="/invite" component={InviteHeader} />
      <Route path="/" component={DefaultHeader} />
    </Switch>
  );
}

export default HeaderRouter;
