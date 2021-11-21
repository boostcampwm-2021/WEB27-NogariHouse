import { nowCountState, nowFetchingState, nowItemsListState } from '@src/recoil/atoms/main-section-scroll';
import { useEffect, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const useFetchItems = <T extends {}>(apiPath : string, nowItemType: string)
: [T[], string] => {
  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const nowItemTypeRef = useRef<string>('');
  const [nowCount, setNowCount] = useRecoilState(nowCountState);

  useEffect(() => {
    resetItemList();
    setNowCount(0);
    setNowFetching(true);

    return () => {
      resetItemList();
      setNowCount(0);
    };
  }, []);

  useEffect(() => {
    if (nowFetching) {
      const fetchItems = async () => {
        try {
          const newItemsList = await fetch(`${process.env.REACT_APP_API_URL}/api${apiPath}?count=${nowCount}`)
            .then((res) => res.json())
            .then((json) => json.items);
          setNowItemsList([...nowItemsList, ...newItemsList]);
          nowItemTypeRef.current = nowItemType;
          setNowCount((count) => count + Math.min(newItemsList.length, 10));
          setNowFetching(false);
        } catch (e) {
          console.log(e);
        }
      };
      fetchItems();
    }
  }, [nowFetching]);

  return [nowItemsList, nowItemTypeRef.current];
};

export default useFetchItems;
