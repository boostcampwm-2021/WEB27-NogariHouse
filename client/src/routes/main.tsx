/* eslint-disable import/no-unresolved */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
import SearchView from '@src/views/search-view';
import RoomView from '@src/views/room-view';

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/" component={RoomView} />
      <Route exact path="/activity" component={ActivityView} />
      <Route exact path="/chat-rooms" component={ChatRoomsView} />
      <Route exact path="/chat-rooms/new" component={ChatRoomsNewView} />
      <Route exact path="/chat-rooms/:chatDocumentId" component={ChatRoomDetailView} />
      <Route exact path="/event" component={EventView} />
      <Route exact path="/followers/:id" component={FollowersView} />
      <Route exact path="/following/:id" component={FollowingView} />
      <Route exact path="/invite" component={InviteView} />
      <Route exact path="/search" component={SearchView} />
      <Route exact path="/settings" component={ProfileSettingView} />
      <Route exact path="/profile/:id" component={ProfileView} />
    </Switch>
  );
}

export default MainRouter;
