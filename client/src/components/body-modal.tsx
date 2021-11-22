import { useRecoilValue } from 'recoil';

import {
<<<<<<< HEAD
  isOpenEventModalState, isOpenEventRegisterModalState, isOpenShareModalState, isOpenRoomModalState,
=======
  isOpenEventModalState,
  isOpenEventRegisterModalState,
  isOpenShareModalState,
  isOpenChangeProfileImageModalState,
>>>>>>> f67bb11 (✨프로필 페이지의 이미지 클릭시 changeImageModal 을 열도록 구현)
} from '@src/recoil/atoms/is-open-modal';
import EventModal from '@components/event/event-modal';
import EventRegisterModal from '@components/event/event-register-modal';
import ShareModal from '@components/profile/share-modal';
<<<<<<< HEAD
import FollowerSelectModal from '@src/components/room/follower-select-room-modal';
=======
import ChangeProfileImageModal from '@components/profile/change-profile-image-modal';
>>>>>>> f67bb11 (✨프로필 페이지의 이미지 클릭시 changeImageModal 을 열도록 구현)

function BodyModal() {
  const isOpenEventModal = useRecoilValue(isOpenEventModalState);
  const isOpenEventRegisterModal = useRecoilValue(isOpenEventRegisterModalState);
  const isOpenShareModal = useRecoilValue(isOpenShareModalState);
<<<<<<< HEAD
  const isOpenRoomModal = useRecoilValue(isOpenRoomModalState);
=======
  const isOpenChangeProfileImageModal = useRecoilValue(isOpenChangeProfileImageModalState);
>>>>>>> f67bb11 (✨프로필 페이지의 이미지 클릭시 changeImageModal 을 열도록 구현)

  return (
    <>
      {isOpenEventModal && <EventModal />}
      {isOpenEventRegisterModal && <EventRegisterModal />}
      {isOpenShareModal && <ShareModal />}
<<<<<<< HEAD
      {isOpenRoomModal && <FollowerSelectModal />}
=======
      {isOpenChangeProfileImageModal && <ChangeProfileImageModal />}
>>>>>>> f67bb11 (✨프로필 페이지의 이미지 클릭시 changeImageModal 을 열도록 구현)
    </>
  );
}

export default BodyModal;
