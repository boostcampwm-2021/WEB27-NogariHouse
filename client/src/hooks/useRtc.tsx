/* eslint-disable max-len */
import {
  MutableRefObject, RefObject, useCallback, useRef,
} from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useLocalStream = (): [MutableRefObject<MediaStream | null>, RefObject<HTMLVideoElement | null>, () => Promise<void>] => {
  const myStream = useRef<MediaStream | null>(null);
  const myVideo = useRef<HTMLVideoElement | null>(null);

  const getLocalStream = useCallback(async () => {
    try {
      myStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (myVideo.current) myVideo.current.srcObject = myStream.current;
    } catch (e) {
      console.error(e);
    }
  }, []);

  return [myStream, myVideo, getLocalStream];
};
