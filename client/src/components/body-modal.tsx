import { useRecoilValue } from 'recoil';

import { isOpenEventModalState, isOpenEventRegisterModalState } from '@src/recoil/atoms/is-open-modal';
import EventModal from '@components/event/event-modal';
import EventRegisterModal from '@components/event/event-register-modal';

function BodyModal() {
  const isOpenEventModal = useRecoilValue(isOpenEventModalState);
  const isOpenEventRegisterModal = useRecoilValue(isOpenEventRegisterModalState);

  return (
    <>
      {isOpenEventModal && <EventModal />}
      {isOpenEventRegisterModal && <EventRegisterModal />}
    </>
  );
}

export default BodyModal;
