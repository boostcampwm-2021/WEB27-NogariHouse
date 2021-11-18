import { useRecoilValue } from 'recoil';

import { isOpenEventModalState, isOpenEventRegisterModalState, isOpenShareModalState } from '@src/recoil/atoms/is-open-modal';
import EventModal from '@components/event/event-modal';
import EventRegisterModal from '@components/event/event-register-modal';
import ShareModal from '@components/profile/share-modal';

function BodyModal() {
  const isOpenEventModal = useRecoilValue(isOpenEventModalState);
  const isOpenEventRegisterModal = useRecoilValue(isOpenEventRegisterModalState);
  const isOpenShareModal = useRecoilValue(isOpenShareModalState);

  return (
    <>
      {isOpenEventModal && <EventModal />}
      {isOpenEventRegisterModal && <EventRegisterModal />}
      {isOpenShareModal && <ShareModal />}
    </>
  );
}

export default BodyModal;
