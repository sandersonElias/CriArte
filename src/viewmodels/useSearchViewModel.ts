import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { subscribeCollection } from '../services/firestoreService';
import type { FSProduct } from '../models/FirestoreModels';
import type { Product } from '../models/Product';

// ─── Normaliza string: remove acentos e converte para minúsculas ──────────────
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// ─── Converte FSProduct → Product ─────────────────────────────────────────────
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
    imageUrl: p.imageUrl || undefined,
  };
}

export interface SearchGroup {
  label: string;
  products: Product[];
}

const CAT_LABELS: Record<string, string> = {
  mobiliario: 'Mobiliário',
  sagrada: 'Sagrada',
  decoracao: 'Decoração',
  sazonal: 'Sazonal',
};

export function useSearchViewModel() {
  const [raw, setRaw] = useState<FSProduct[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsub = subscribeCollection<FSProduct>(
      'products',
      (docs) => {
        setRaw(docs.filter((p) => p.active).sort((a, b) => a.order - b.order));
      },
      'order',
    );
    return unsub;
  }, []);

  // Debounce: espera 150ms após o usuário parar de digitar
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 150);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  // Foca o input quando o modal abre
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [open]);

  // Fechar com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // ── Lógica de busca ──────────────────────────────────────────────────────────
  const results = useMemo<Product[]>(() => {
    const q = normalize(debouncedQuery.trim());
    if (q.length < 2) return [];

    return raw
      .filter((p) => {
        const inName = normalize(p.name).includes(q);
        const inWood = normalize(p.wood).includes(q);
        const inCat = normalize(p.cat).includes(q);
        const inCatLabel = normalize(p.catLabel).includes(q);
        return inName || inWood || inCat || inCatLabel;
      })
      .map(toProduct);
  }, [raw, debouncedQuery]);

  // Agrupa resultados por categoria
  const groups = useMemo<SearchGroup[]>(() => {
    const map = new Map<string, Product[]>();
    results.forEach((p) => {
      const list = map.get(p.cat) ?? [];
      list.push(p);
      map.set(p.cat, list);
    });
    return Array.from(map.entries()).map(([cat, products]) => ({
      label: CAT_LABELS[cat] ?? cat,
      products,
    }));
  }, [results]);

  const isEmpty = debouncedQuery.trim().length >= 2 && results.length === 0;
  const showResults = debouncedQuery.trim().length >= 2;
  const totalResults = results.length;

  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);
  const handleQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return {
    open,
    query,
    inputRef,
    groups,
    isEmpty,
    showResults,
    totalResults,
    openSearch,
    closeSearch,
    handleQuery,
  };
}
