import { nowFetchingState, nowItemsListState } from '@src/recoil/atoms/main-section-scroll';
import { useEffect, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const useFetchItems = <T extends {}>(apiPath : string): [T[], string] => {
  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const resetItemList = useResetRecoilState(nowItemsListState);
  const nowItemType = useRef('');

  useEffect(() => () => resetItemList(), []);

  useEffect(() => {
    resetItemList();
    setNowFetching(true);
  }, []);

  useEffect(() => {
    if (nowFetching) {
      const fetchItems = async () => {
        nowItemType.current = apiPath.slice(1);
        try {
          const newItemsList = await fetch(`${process.env.REACT_APP_API_URL}/api${apiPath}?count=${nowItemsList.length}`)
            .then((res) => res.json())
            .then((json) => json.items);
          setNowItemsList([...nowItemsList, ...newItemsList]);
        } catch (e) {
          console.log(e);
        }
      };
      fetchItems();
      setTimeout(() => setNowFetching(false), 100);
    }
  }, [nowFetching]);

  return [nowItemsList, nowItemType.current];
};

export default useFetchItems;
