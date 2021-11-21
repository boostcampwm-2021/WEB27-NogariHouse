import { atom } from 'recoil';

export type TView = 'createRoomView' | 'closedSelectorView' | 'inRoomView' | 'NotFoundRoom';

export default atom<TView>({
  key: 'roomViewTypeState', // 해당 atom의 고유 key
  default: 'createRoomView', // 기본값
});
