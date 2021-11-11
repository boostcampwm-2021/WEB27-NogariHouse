/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import RoomCard from '@common/room-card';
import useFetchItems from '@src/hooks/useFetchItems';
import LoadingSpinner from '@common/loading-spinner';

interface Participants{
  _id: string,
  userName: string,
  profileUrl: string
}

interface RoomCardProps {
  _id: string,
  title: string,
  isAnonymous: boolean,
  participantsInfo: Array<Participants>,
}

const RoomDiv = styled.div`
  margin-bottom: 20px;
`;

const makeRoomToCard = (room: RoomCardProps) => (
  <RoomDiv>
    <RoomCard
      key={room._id}
      _id={room._id}
      title={room.title}
      isAnonymous={room.isAnonymous}
      participantsInfo={room.participantsInfo}
    />
  </RoomDiv>
);

function RoomCardList({ roomList }: { roomList: RoomCardProps[] }) {
  return <>{roomList?.map(makeRoomToCard)}</>;
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
