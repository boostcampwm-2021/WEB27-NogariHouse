import { MouseEvent, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { isOpenEventModalState } from '@src/recoil/atoms/is-open-modal';

const useSetEventModal = () => {
  const setIsOpenEventModal = useSetRecoilState(isOpenEventModalState);

  const setEventModal = useCallback((e: MouseEvent) => {
    setIsOpenEventModal(true);
    console.log(e.currentTarget);
  }, []);

  return setEventModal;
};

export default useSetEventModal;
