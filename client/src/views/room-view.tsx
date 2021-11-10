/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';

import RoomCard from '@styled-components/room-card';
import useFetchItems from '@src/hooks/useFetchItems';

interface User{
  _id: string,
  userName: string,
  profileUrl: string
}

interface RoomCardProps {
  _id: string,
  title: string,
  isAnonymous: boolean,
  participantsInfo: Array<User>,
}

const RoomDiv = styled.div``;

const makeRoomToCard = (room: RoomCardProps) => (
  <RoomCard
    key={room._id}
    _id={room._id}
    title={room.title}
    isAnonymous={room.isAnonymous}
    participantsInfo={room.participantsInfo}
  />
);

function RoomCardList({ roomList }: { roomList: RoomCardProps[] }) {
  return <RoomDiv>{roomList?.map(makeRoomToCard)}</RoomDiv>;
}

function RoomView() {
  const [nowItemList] = useFetchItems<RoomCardProps>('/room');

  // useEffect(() => () => resetItemList(), []);

  return <RoomCardList roomList={nowItemList} />;
}

export default RoomView;
