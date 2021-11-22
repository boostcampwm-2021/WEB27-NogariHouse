import { atom } from 'recoil';

export const nowFetchingState = atom<boolean>({
  key: 'nowFetchingState', // 해당 atom의 고유 key
  default: false, // true : scroll 바가 데이터를 받아올 정도로 내려옴
});

export const nowItemsListState = atom<any[]>({ // any대신 item들의 타입이 들어가야함
  key: 'nowItemsCountState',
  default: [],
});

export const nowCountState = atom<number>({
  key: 'nowCountState',
  default: 0,
});
