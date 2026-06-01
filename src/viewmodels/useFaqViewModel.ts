import { useState, useCallback } from 'react';
import { FAQ_ITEMS } from '../models/seedData';

export function useFaqViewModel() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return { items: FAQ_ITEMS, openIndex, toggle };
}
