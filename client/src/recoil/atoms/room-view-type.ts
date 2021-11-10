import { atom } from 'recoil';

export type TView = 'createRoomView' | 'closedSelectorView' | 'inRoomView';

export default atom<TView>({
  key: 'roomTypeState', // 해당 atom의 고유 key
  default: 'createRoomView', // 기본값
});
