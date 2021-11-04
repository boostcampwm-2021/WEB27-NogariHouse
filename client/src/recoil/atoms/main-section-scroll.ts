import { atom } from 'recoil';

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

export const nowFetchingState = atom<boolean>({
  key: 'nowFetchingState', // 해당 atom의 고유 key
  default: false, // true : scroll 바가 데이터를 받아올 정도로 내려옴
});

export const nowItemsListState = atom<Array<EventCardProps>>({
  key: 'nowItemsCountState',
  default: [],
});
