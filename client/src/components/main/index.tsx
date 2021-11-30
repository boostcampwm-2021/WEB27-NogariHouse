import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { HiChevronDoubleLeft } from 'react-icons/hi';

import LeftSideBar from '@components/main/left-sidebar';
import RightSideBar from '@components/main/right-sidebar';
import HeaderRouter from '@routes/header';
import MainRouter from '@routes/main';
import isOpenRoomState from '@atoms/is-open-room';
import isOpenActiveFollowingModalState from '@atoms/is-open-active-following-modal';
import useOutsideClick from '@src/hooks/useOutsideClick';
import {
  SectionLayout, ActiveFollowingLayout, MainSectionLayout, RoomLayout, ActiveFollowingFooter, CloseButton,
} from './style';

function MainView() {
  const [isOpenRoom, setIsOpenRoom] = useRecoilState(isOpenRoomState);
  const [isOpenActiveFollowingModal, setIsOpenActiveFollowingModal] = useRecoilState(isOpenActiveFollowingModalState);
  const RightSideBarLayoutRef = useRef<HTMLDivElement>(null);
  const LeftSideBarLayoutRef = useRef<HTMLDivElement>(null);

  useOutsideClick(RightSideBarLayoutRef, setIsOpenRoom);
  useOutsideClick(LeftSideBarLayoutRef, setIsOpenActiveFollowingModal);

  return (
    <>
      <HeaderRouter />
      <SectionLayout>
        <ActiveFollowingLayout state={isOpenActiveFollowingModal} ref={LeftSideBarLayoutRef}>
          <LeftSideBar />
          <ActiveFollowingFooter>
            <CloseButton onClick={() => setIsOpenActiveFollowingModal(false)}>
              <HiChevronDoubleLeft size="35" />
            </CloseButton>
          </ActiveFollowingFooter>
        </ActiveFollowingLayout>
        <MainSectionLayout>
          <MainRouter />
        </MainSectionLayout>
        <RoomLayout state={isOpenRoom} ref={RightSideBarLayoutRef}>
          <RightSideBar />
        </RoomLayout>
      </SectionLayout>
    </>
  );
}

export default MainView;
