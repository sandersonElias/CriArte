import { useState, useEffect, useMemo, useCallback } from 'react';
import { subscribeCollection } from '../services/firestoreService';
import type { FSProduct } from '../models/FirestoreModels';
import type { Product, ProductCategory } from '../models/Product';

export type FilterKey = 'all' | ProductCategory;

function toProduct(p: FSProduct): Product {
  return {
    id: p.id,
    cat: p.cat,
    catLabel: p.catLabel,
    wood: p.wood,
    name: p.name,
    price: p.price,
    priceNote: p.priceNote,
    tag: p.tag,
    tagVariant: p.tagVariant,
    placeholder: p.name,
    imageUrl: p.imageUrl || undefined, // URL real do Storage
  };
}

export function useProductsViewModel() {
  const [raw, setRaw] = useState<FSProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Escuta apenas produtos ativos, em tempo real
  useEffect(() => {
    const unsub = subscribeCollection<FSProduct>(
      'products',
      (docs) => {
        setRaw(docs.filter((p) => p.active).sort((a, b) => a.order - b.order));
        setLoading(false);
      },
      'order',
    );
    return unsub;
  }, []);

  const FILTERS = useMemo(() => {
    const counts: Record<string, number> = { all: raw.length };
    raw.forEach((p) => {
      counts[p.cat] = (counts[p.cat] ?? 0) + 1;
    });
    return [
      { key: 'all', label: 'Todas', count: counts.all ?? 0 },
      { key: 'mobiliario', label: 'Mobiliário', count: counts.mobiliario ?? 0 },
      { key: 'sagrada', label: 'Sagrada', count: counts.sagrada ?? 0 },
      { key: 'decoracao', label: 'Decoração', count: counts.decoracao ?? 0 },
      { key: 'sazonal', label: 'Sazonal', count: counts.sazonal ?? 0 },
    ];
  }, [raw]);

  const visibleProducts = useMemo<Product[]>(
    () =>
      raw
        .filter((p) => activeFilter === 'all' || p.cat === activeFilter)
        .map(toProduct),
    [raw, activeFilter],
  );

  const selectFilter = useCallback(
    (key: FilterKey) => setActiveFilter(key),
    [],
  );

  return { activeFilter, visibleProducts, selectFilter, FILTERS, loading };
}
