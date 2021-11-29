import { useEffect } from 'react';

const useOutsideClick = (ref: any, changeState: Function) => {
  useEffect(() => {
    function handleClickOutside(event:any):void {
      if (ref.current && !ref.current.contains(event.target as Node)
        && !event.target.closest('.open-room-button')) {
        changeState(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideClick;
