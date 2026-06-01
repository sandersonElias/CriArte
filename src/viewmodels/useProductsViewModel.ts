import { useState, useMemo, useCallback } from 'react';
import { PRODUCTS, FILTERS } from '../models/seedData';
import type { Product, ProductCategory } from '../models/Product';

export type FilterKey = 'all' | ProductCategory;

export function useProductsViewModel() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const visibleProducts = useMemo<Product[]>(
    () =>
      PRODUCTS.filter((p) => activeFilter === 'all' || p.cat === activeFilter),
    [activeFilter],
  );

  const selectFilter = useCallback((key: FilterKey) => {
    setActiveFilter(key);
  }, []);

  return { activeFilter, visibleProducts, selectFilter, FILTERS };
}
