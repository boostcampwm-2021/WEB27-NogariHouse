import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { nowFetchingState } from '@atoms/main-section-scroll';

const useItemFecthObserver = (loading: boolean) => {
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const targetRef = useRef<HTMLDivElement>(null);

  const onIntersect = async (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !nowFetching) {
      setNowFetching(true);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(targetRef.current);
    }
    return () => observer?.disconnect();
  }, [targetRef.current, loading]);

  return [targetRef];
};

export default useItemFecthObserver;
