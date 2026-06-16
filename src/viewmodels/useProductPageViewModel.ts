import { useState, useEffect, useMemo } from 'react';
import {
  fetchDocument,
  subscribeCollection,
} from '../services/firestoreService';
import type { FSProduct } from '../models/FirestoreModels';
import type { Product } from '../models/Product';
import { parsePriceBRL } from '../utils/parsePriceBRL';

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

export function useProductPageViewModel(productId: string) {
  const [raw, setRaw] = useState<FSProduct | null>(null);
  const [allRaw, setAllRaw] = useState<FSProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Carrega o produto pelo ID
  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchDocument<FSProduct>('products', productId).then((doc) => {
      if (!doc || !doc.active) {
        setNotFound(true);
      } else {
        setRaw(doc);
      }
      setLoading(false);
    });
  }, [productId]);

  // Escuta todos os produtos para extrair os relacionados
  useEffect(() => {
    const unsub = subscribeCollection<FSProduct>(
      'products',
      (docs) => {
        setAllRaw(docs.filter((p) => p.active));
      },
      'order',
    );
    return unsub;
  }, []);

  // Produto convertido
  const product = useMemo<Product | null>(
    () => (raw ? toProduct(raw) : null),
    [raw],
  );

  // Produtos relacionados: mesma categoria, excluindo o atual, máx 4
  const related = useMemo<Product[]>(() => {
    if (!raw) return [];
    return allRaw
      .filter((p) => p.cat === raw.cat && p.id !== productId)
      .slice(0, 4)
      .map(toProduct);
  }, [allRaw, raw, productId]);

  const priceValue = useMemo(() => (raw ? parsePriceBRL(raw.price) : 0), [raw]);

  return { product, related, loading, notFound, priceValue };
}
