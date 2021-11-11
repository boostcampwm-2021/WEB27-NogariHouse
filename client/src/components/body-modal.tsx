import { useRecoilValue } from 'recoil';

import { isOpenEventModalState } from '@src/recoil/atoms/is-open-modal';
import EventModal from './event-modal';

function BodyModal() {
  const isOpenEventModal = useRecoilValue(isOpenEventModalState);

  return (
    <>
      {isOpenEventModal && <EventModal />}
    </>
  );
}

export default BodyModal;
