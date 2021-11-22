import { useRecoilValue } from 'recoil';

import {
  isOpenEventModalState, isOpenEventRegisterModalState, isOpenShareModalState, isOpenRoomModalState,
} from '@src/recoil/atoms/is-open-modal';
import EventModal from '@components/event/event-modal';
import EventRegisterModal from '@components/event/event-register-modal';
import ShareModal from '@components/profile/share-modal';
import FollowerSelectModal from '@src/components/room/follower-select-room-modal';

function BodyModal() {
  const isOpenEventModal = useRecoilValue(isOpenEventModalState);
  const isOpenEventRegisterModal = useRecoilValue(isOpenEventRegisterModalState);
  const isOpenShareModal = useRecoilValue(isOpenShareModalState);
  const isOpenRoomModal = useRecoilValue(isOpenRoomModalState);

  return (
    <>
      {isOpenEventModal && <EventModal />}
      {isOpenEventRegisterModal && <EventRegisterModal />}
      {isOpenShareModal && <ShareModal />}
      {isOpenRoomModal && <FollowerSelectModal />}
    </>
  );
}

export default BodyModal;
