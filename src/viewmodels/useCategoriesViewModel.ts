import { useState, useEffect } from 'react';
import { subscribeCollection } from '../services/firestoreService';
import type { FSCategory } from '../models/FirestoreModels';

export function useCategoriesViewModel() {
  const [categories, setCategories] = useState<FSCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeCollection<FSCategory>(
      'categories',
      (docs) => {
        setCategories(docs.sort((a, b) => a.order - b.order));
        setLoading(false);
      },
      'order',
    );
    return unsub;
  }, []);

  return { categories, loading };
}
