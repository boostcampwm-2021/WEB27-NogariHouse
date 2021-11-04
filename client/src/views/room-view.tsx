import React from 'react';
import RoomCard from '@styled-components/room-card';

function RoomView() {
  return <RoomCard title="test" users={[{ userName: 'test', profileURL: 'test' }]} />;
}

export default RoomView;
