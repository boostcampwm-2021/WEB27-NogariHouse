import { selector } from 'recoil';
import toastList, { IToast } from '@atoms/toast-list';
import { deepCopy } from '@src/utils';

const toastListSelector = selector({
  key: 'toastListSelector',
  get: ({ get }) => {
    const newToastList = deepCopy(get(toastList));
    return newToastList;
  },
  set: ({ set, get }, toastListItem) => {
    const newToastList = deepCopy(get(toastList));
    const item = toastListItem as IToast;
    item.id = newToastList.length;
    newToastList.push(item);
    set(toastList, newToastList);
  },
});

export default toastListSelector;
