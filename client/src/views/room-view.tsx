import React from 'react';
import styled from 'styled-components';

import RoomCard from '@styled-components/room-card';

interface User{
  userName: string,
  profileURL: string
}

interface RoomCardProps {
  title: string,
  users: Array<User>,
  key: string | number,
}

const RoomDiv = styled.div``;

const makeRoomToCard = (room: RoomCardProps) => (
  <RoomCard
    key={room.key}
    title={room.title}
    users={room.users}
  />
);

function RoomCardList({ roomList }: { roomList: RoomCardProps[] }) {
  return <RoomDiv>{roomList?.map(makeRoomToCard)}</RoomDiv>;
}

function RoomView() {
  return <RoomCardList roomList={[{ key: 1, title: 'test', users: [{ userName: 'test', profileURL: 'test' }] }]} />;
}

export default RoomView;
