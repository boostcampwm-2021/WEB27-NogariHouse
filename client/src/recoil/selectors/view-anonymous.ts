import { selector } from 'recoil';
import anonymous from '@atoms/anonymous';
import roomView from '@atoms/room-view-type';

const viewAnonymousSelector = selector({
  key: 'viewAnonymous',
  get: ({ get }) => {
    const isAnonymous = get(anonymous);
    const roomViewName = get(roomView);
    return { view: roomViewName, isAnonymous };
  },
  set: ({ set }, isAnonymous) => {
    if (isAnonymous === 'unknown') {
      set(anonymous, true);
    } else {
      set(anonymous, false);
    }

    set(roomView, 'inRoomView');
  },
});

export default viewAnonymousSelector;
