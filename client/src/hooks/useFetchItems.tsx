import { nowFetchingState, nowItemsListState } from '@src/recoil/atoms/main-section-scroll';
import { useEffect } from 'react';
import { Resetter, useRecoilState, useResetRecoilState } from 'recoil';

const useFetchItems = <T extends {}>(apiPath : string): [T[], Resetter] => {
  const [nowItemsList, setNowItemsList] = useRecoilState(nowItemsListState);
  const [nowFetching, setNowFetching] = useRecoilState(nowFetchingState);
  const resetItemList = useResetRecoilState(nowItemsListState);

  useEffect(() => () => resetItemList(), []);

  useEffect(() => {
    if (nowFetching) {
      setNowFetching(false);
    } else {
      const fetchItems = async () => {
        try {
          const newItemsList = await fetch(`${process.env.REACT_APP_API_URL}/api${apiPath}?count=${nowItemsList.length}`)
            .then((res) => res.json())
            .then((json) => json.items);
          setNowItemsList((nowItemsLists) => [...nowItemsLists, ...newItemsList]);
        } catch (e) {
          console.log(e);
        }
      };
      fetchItems();
    }
  }, [nowFetching]);

  return [nowItemsList, resetItemList];
};

export default useFetchItems;
