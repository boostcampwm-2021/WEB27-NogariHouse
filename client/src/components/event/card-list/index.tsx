import React from 'react';
import styled from 'styled-components';

import EventCard from '@components/event/card';
import { makeDateToHourMinute, makeDateToMonthDate } from '@src/utils';

const EventDiv = styled.div`
 div + div {
   margin-bottom: 10px;
 }
`;

interface EventUser {
    userId: string,
    userName: string,
    profileUrl: string,
}

interface EventCardProps {
key: string,
time: string,
title: string,
participants: EventUser[],
description: string,
}

export const makeEventToCard = (event: EventCardProps) => (
  <EventCard
    key={event.key}
    time={`${makeDateToMonthDate(new Date(event.time))} ${makeDateToHourMinute(new Date(event.time))}`}
    title={event.title}
    participants={event.participants}
    description={event.description}
  />
);

export default function EventCardList({ eventList }: { eventList: EventCardProps[] }) {
  return <EventDiv>{eventList.map(makeEventToCard)}</EventDiv>;
}
