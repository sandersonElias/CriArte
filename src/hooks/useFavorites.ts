import { useState, useCallback, useMemo } from 'react';
import type { Product } from '../models/Product';

const FAV_KEY = 'cri.favs.v2';

function loadFavs(): Product[] {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveFavs(items: Product[]) {
  localStorage.setItem(FAV_KEY, JSON.stringify(items));
}

export function useFavorites() {
  const [items, setItems] = useState<Product[]>(loadFavs);

  // ── Adicionar / remover (toggle) ───────────────────────────────────────────
  const toggleFav = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const next = exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
      saveFavs(next);
      return next;
    });
  }, []);

  // ── Remover por id ─────────────────────────────────────────────────────────
  const removeFav = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveFavs(next);
      return next;
    });
  }, []);

  // ── Verificar ──────────────────────────────────────────────────────────────
  const isFav = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items],
  );

  const favCount = useMemo(() => items.length, [items]);

  return { items, favCount, toggleFav, removeFav, isFav };
}
