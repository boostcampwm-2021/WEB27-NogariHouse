import { atom } from 'recoil';

export const isOpenEventRegisterModalState = atom<boolean>({
  key: 'isOpenEventRegisterModalState', // 해당 atom의 고유 key
  default: false, // 기본값
});

export const isOpenEventModalState = atom<boolean>({
  key: 'isOpenEventModalState',
  default: false,
});

export const isOpenShareModalState = atom<boolean>({
  key: 'isOpenShareModalState',
  default: false,
});
