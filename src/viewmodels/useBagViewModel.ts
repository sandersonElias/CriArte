import { useLocalSet } from '../hooks/useLocalSet';

const BAG_KEY = 'cri.bag';

export function useBagViewModel() {
  const { add, count } = useLocalSet(BAG_KEY);
  return { addToBag: add, bagCount: count };
}
