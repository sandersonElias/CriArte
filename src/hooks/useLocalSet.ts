import { useState, useCallback } from 'react';

export function useLocalSet(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]');
    } catch {
      return [];
    }
  });

  const persist = (next: string[]) => {
    localStorage.setItem(key, JSON.stringify(next));
    setItems(next);
  };

  const toggle = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key],
  );

  const add = useCallback(
    (id: string) => {
      setItems((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key],
  );

  const has = useCallback((id: string) => items.includes(id), [items]);

  return { items, toggle, add, has, count: items.length };
}
