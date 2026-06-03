import { useState, useEffect, useCallback } from 'react';
import { subscribeCollection } from '../services/firestoreService';
import type { FSFaqItem } from '../models/FirestoreModels';

export function useFaqViewModel() {
  const [items, setItems] = useState<FSFaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsub = subscribeCollection<FSFaqItem>(
      'faq',
      (docs) => {
        setItems(
          docs.filter((f) => f.active).sort((a, b) => a.order - b.order),
        );
      },
      'order',
    );
    return unsub;
  }, []);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return { items, openIndex, toggle };
}
