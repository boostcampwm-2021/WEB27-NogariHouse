/* eslint-disable import/no-unresolved */
import React from 'react';
import { Switch } from 'react-router-dom';

import ActivityView from '@views/activity-view';
import ChatRoomDetailView from '@views/chat-room-detail-view';
import ChatRoomsNewView from '@views/chat-rooms-new-view';
import ChatRoomsView from '@views/chat-rooms-view';
import EventView from '@views/event-view';
import FollowersView from '@views/followers-view';
import FollowingView from '@views/following-view';
import InviteView from '@views/invite-view';
import ProfileSettingView from '@views/profile-settings-view';
import ProfileView from '@views/profile-view';
import RecentSearchView from '@views/recent-search-view';
import SearchView from '@src/views/search-view';
import RoomView from '@src/views/room-view';
import PrivateRoute from '@routes/custom/private-route';

function MainRouter() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={RoomView} />
      <PrivateRoute exact path="/activity" component={ActivityView} />
      <PrivateRoute exact path="/chat-rooms" component={ChatRoomsView} />
      <PrivateRoute exact path="/chat-rooms/new" component={ChatRoomsNewView} />
      <PrivateRoute exact path="/chat-rooms/:chatDocumentId" component={ChatRoomDetailView} />
      <PrivateRoute exact path="/event" component={EventView} />
      <PrivateRoute exact path="/followers/:id" component={FollowersView} />
      <PrivateRoute exact path="/following/:id" component={FollowingView} />
      <PrivateRoute exact path="/invite" component={InviteView} />
      <PrivateRoute exact path="/search" component={SearchView} />
      <PrivateRoute exact path="/search/recent" component={RecentSearchView} />
      <PrivateRoute exact path="/settings" component={ProfileSettingView} />
      <PrivateRoute exact path="/profile/:id" component={ProfileView} />
    </Switch>
  );
}

export default MainRouter;
