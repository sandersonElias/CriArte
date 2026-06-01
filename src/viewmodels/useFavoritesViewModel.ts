import { useLocalSet } from '../hooks/useLocalSet';

const FAV_KEY = 'cri.favs';

export function useFavoritesViewModel() {
  const { items, toggle, has, count } = useLocalSet(FAV_KEY);
  return { favs: items, toggleFav: toggle, isFav: has, favCount: count };
}
