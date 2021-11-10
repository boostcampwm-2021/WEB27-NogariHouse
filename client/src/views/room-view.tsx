/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import RoomCard from '@styled-components/room-card';
import useFetchItems from '@src/hooks/useFetchItems';
import LoadingSpinner from '@styled-components/loading-spinner';

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

const RoomDiv = styled.div`
 div + div {
   margin-bottom: 10px;
 }
`;

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
  const [nowItemList, nowItemType] = useFetchItems<RoomCardProps>('/room');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nowItemList && nowItemType === 'room') {
      setLoading(false);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return <RoomCardList roomList={nowItemList} />;
}

export default RoomView;
