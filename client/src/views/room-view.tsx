/* eslint-disable no-underscore-dangle */
import React, {
  MouseEvent, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import roomViewType from '@atoms/room-view-type';
import roomDocumentIdState from '@atoms/room-document-id';
import { nowFetchingState } from '@atoms/main-section-scroll';
import isOpenRoomState from '@atoms/is-open-room';
import LoadingSpinner from '@common/loading-spinner';
import RoomCard from '@common/room-card';
import useFetchItems from '@hooks/useFetchItems';
import useItemFecthObserver from '@hooks/useItemFetchObserver';
import { RoomCardProps } from '@interfaces/index';

const RoomDiv = styled.div`
  div + div {
    margin-bottom: 10px;
  }
`;

const ObserverBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

export const makeRoomToCard = (room: RoomCardProps) => (
  <div className="RoomCard" key={room._id} data-id={room._id} data-anonymous={room.isAnonymous}>
    <RoomCard
      key={room._id}
      _id={room._id}
      title={room.title}
      isAnonymous={room.isAnonymous}
      participantsInfo={room.participantsInfo}
    />
  </div>
);

export function RoomCardList({ roomList, roomCardClickHandler }:
  { roomList: RoomCardProps[], roomCardClickHandler: (e: MouseEvent) => void }) {
  return <RoomDiv onClick={roomCardClickHandler}>{roomList?.map(makeRoomToCard)}</RoomDiv>;
}

function RoomView() {
  const [nowItemList, nowItemType] = useFetchItems<RoomCardProps>('/room', 'room');
  const [loading, setLoading] = useState(true);
  const nowFetching = useRecoilValue(nowFetchingState);
  const [targetRef] = useItemFecthObserver(loading);
  const setRoomView = useSetRecoilState(roomViewType);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);

  const roomCardClickHandler = (e: MouseEvent) => {
    const RoomCardDiv = (e.target as HTMLDivElement).closest('.RoomCard');
    const roomDocumentId = RoomCardDiv?.getAttribute('data-id');
    const isAnonymous = (RoomCardDiv?.getAttribute('data-anonymous') === 'true');
    if (isAnonymous) {
      setRoomView('selectModeView');
    } else {
      setRoomView('inRoomView');
    }

    setRoomDocumentId(roomDocumentId as string);
    setIsOpenRoom(true);
  };

  useEffect(() => {
    if (nowItemList && nowItemType === 'room') {
      setLoading(false);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <RoomCardList roomCardClickHandler={roomCardClickHandler} roomList={nowItemList} />
      <ObserverBlock ref={targetRef}>
        {nowFetching && <LoadingSpinner />}
      </ObserverBlock>
    </>
  );
}

export default RoomView;
