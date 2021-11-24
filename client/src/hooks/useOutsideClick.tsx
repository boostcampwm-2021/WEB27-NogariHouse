import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import isOpenRoomState from '@atoms/is-open-room';

const useOutsideClick = (ref: any) => {
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);

  useEffect(() => {
    function handleClickOutside(event:any):void {
      if (ref.current && !ref.current.contains(event.target as Node)
        && !event.target.closest('.open-room-button')) {
        setIsOpenRoom(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideClick;
