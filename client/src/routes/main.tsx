/* eslint-disable import/no-unresolved */
import React from 'react';
import { Switch } from 'react-router-dom';

import ActivityView from '@components/activity';
import ChatRoomDetailView from '@views/chat-room-detail-view';
import ChatRoomsNewView from '@views/chat-rooms-new-view';
import ChatRoomsView from '@views/chat-rooms-view';
import EventView from '@components/event';
import FollowersView from '@views/followers-view';
import FollowingView from '@views/following-view';
import InviteView from '@components/invite';
import ProfileSettingView from '@views/profile-settings-view';
import ProfileView from '@views/profile-view';
import SearchView from '@components/search';
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
      <PrivateRoute exact path="/settings" component={ProfileSettingView} />
      <PrivateRoute exact path="/profile/:id" component={ProfileView} />
    </Switch>
  );
}

export default MainRouter;
