import { atom } from 'recoil';

export interface IToast {
    id: number,
    type: 'success' | 'danger' | 'info' | 'warning',
    title: string,
    description: string,
}

export default atom<IToast[]>({
  key: 'toastListState', // 해당 atom의 고유 key
  default: [],
});
