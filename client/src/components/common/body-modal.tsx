import { useRecoilValue } from 'recoil';

import {
  isOpenEventModalState,
  isOpenEventRegisterModalState,
  isOpenRoomModalState,
  isOpenChangeProfileImageModalState,
} from '@src/recoil/atoms/is-open-modal';
import EventModal from '@components/event/modal';
import EventRegisterModal from '@components/event/register-modal';
import FollowerSelectModal from '@components/room/modal/follower-select';
import ChangeProfileImageModal from '@components/profile/modal/change-profile-image';

function BodyModal() {
  const isOpenEventModal = useRecoilValue(isOpenEventModalState);
  const isOpenEventRegisterModal = useRecoilValue(isOpenEventRegisterModalState);
  const isOpenRoomModal = useRecoilValue(isOpenRoomModalState);
  const isOpenChangeProfileImageModal = useRecoilValue(isOpenChangeProfileImageModalState);

  return (
    <>
      {isOpenEventModal && <EventModal />}
      {isOpenEventRegisterModal && <EventRegisterModal />}
      {isOpenRoomModal && <FollowerSelectModal />}
      {isOpenChangeProfileImageModal && <ChangeProfileImageModal />}
    </>
  );
}

export default BodyModal;
