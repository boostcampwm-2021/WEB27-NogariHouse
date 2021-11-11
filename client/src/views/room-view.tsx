/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import RoomCard from '@common/room-card';
import useFetchItems from '@src/hooks/useFetchItems';
import LoadingSpinner from '@common/loading-spinner';
import roomViewType from '@atoms/room-view-type';
import roomDocumentIdState from '@atoms/room-document-id';

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

function RoomView() {
  const [nowItemList, nowItemType] = useFetchItems<RoomCardProps>('/room');
  const [loading, setLoading] = useState(true);
  const setRoomView = useSetRecoilState(roomViewType);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);

  function roomCardClickEvent(roomDocumentId: string) {
    setRoomView('inRoomView');
    setRoomDocumentId(roomDocumentId);
    // roomView
  }

  const makeRoomToCard = (room: RoomCardProps) => (
    <RoomDiv key={room._id} onClick={() => roomCardClickEvent(room._id)}>
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
