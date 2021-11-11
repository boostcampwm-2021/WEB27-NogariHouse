import { nowFetchingState, nowItemsListState } from '@src/recoil/atoms/main-section-scroll';
import { useEffect, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const useFetchItems = <T extends {}>(apiPath : string, nowItemType: string): [T[], string] => {
  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const nowItemTypeRef = useRef<string>('');

  useEffect(() => {
    resetItemList();
    setNowFetching(true);

    return () => resetItemList();
  }, []);

  useEffect(() => {
    if (nowFetching) {
      const fetchItems = async () => {
        try {
          const newItemsList = await fetch(`${process.env.REACT_APP_API_URL}/api${apiPath}?count=${nowItemsList.length}`)
            .then((res) => res.json())
            .then((json) => json.items);
          setNowItemsList([...nowItemsList, ...newItemsList]);
          nowItemTypeRef.current = nowItemType;
        } catch (e) {
          console.log(e);
        }
      };
      fetchItems();
      setTimeout(() => setNowFetching(false), 100);
    }
  }, [nowFetching]);

  return [nowItemsList, nowItemTypeRef.current];
};

export default useFetchItems;
