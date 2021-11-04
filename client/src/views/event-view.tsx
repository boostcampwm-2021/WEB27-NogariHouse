/* eslint-disable*/
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { nowFetchingState, nowItemsListState } from '@atoms/main-section-scroll'
import EventCard from '@styled-components/event-card';

interface EventUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface EventCardProps {
  key? : string,
  time: string,
  title: string,
  users: EventUser[],
  description: string,
}


const makeEventToCard = (event: EventCardProps) => (
  <EventCard key={event.key} time={event.time} title={event.title} users={event.users} description={event.description} />
);

function EventCardList({ eventList }: { eventList: EventCardProps[] }) {
  return <>{eventList?.map(makeEventToCard)}</>;
}

import EventRegisterModal from '@components/event-register-modal';

function EventView() {
  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState)
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState)
  console.log('render')

  useEffect(() => {
    console.log('nowFetchting')
    if(nowFetching) {
      setNowFetching(false);
    }
    else {
      console.log("fetch")
      const fetchItems = async() => {
        try{
          const newItemsList = await fetch(`http://localhost:3000/api/event?count=${nowItemsList.length}`).then(res => res.json()).then(json => json.items);
          setNowItemsList((nowItemsList) => [...nowItemsList,...newItemsList]);
        }
        catch(e){
          console.log(e);
        }
      }
      fetchItems();
    }
  },[nowFetching])

  return (<><EventCardList eventList={nowItemsList} /><EventRegisterModal /></>);
}

export default EventView;
