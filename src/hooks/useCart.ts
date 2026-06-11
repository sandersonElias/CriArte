import { useState, useCallback, useMemo } from 'react';
import type { CartItem } from '../models/CartItem';
import type { Product } from '../models/Product';
import { parsePriceBRL, formatPriceBRL } from '../utils/parsePriceBRL';

const CART_KEY = 'cri.cart';

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const persist = useCallback((next: CartItem[]) => {
    saveCart(next);
    setItems(next);
  }, []);

  // ── Adicionar produto ──────────────────────────────────────────────────────
  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const next = existing
        ? prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              priceValue: parsePriceBRL(product.price),
              imageUrl: product.imageUrl,
              catLabel: product.catLabel,
              quantity: 1,
            },
          ];
      saveCart(next);
      return next;
    });
  }, []);

  // ── Remover produto ────────────────────────────────────────────────────────
  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveCart(next);
      return next;
    });
  }, []);

  // ── Alterar quantidade ─────────────────────────────────────────────────────
  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, quantity } : i));
      saveCart(next);
      return next;
    });
  }, []);

  const incrementItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      saveCart(next);
      return next;
    });
  }, []);

  const decrementItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
      saveCart(next);
      return next;
    });
  }, []);

  // ── Limpar carrinho ────────────────────────────────────────────────────────
  const clearCart = useCallback(() => persist([]), [persist]);

  // ── Derivações ─────────────────────────────────────────────────────────────
  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.priceValue * i.quantity, 0),
    [items],
  );

  const subtotalFormatted = useMemo(() => formatPriceBRL(subtotal), [subtotal]);

  const hasItem = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items],
  );

  // ── Mensagem para WhatsApp ─────────────────────────────────────────────────
  const buildWhatsAppMessage = useCallback(() => {
    const lines = [
      'Olá! Tenho interesse nos seguintes produtos da CRI Artes:',
      '',
      ...items.map(
        (i) => `• ${i.name} (${i.catLabel}) — ${i.quantity}× ${i.price}`,
      ),
      '',
      `Total estimado: ${subtotalFormatted}`,
      '',
      'Poderia me passar mais informações sobre prazo e disponibilidade?',
    ];
    return lines.join('\n');
  }, [items, subtotalFormatted]);

  return {
    items,
    totalItems,
    subtotal,
    subtotalFormatted,
    addItem,
    removeItem,
    setQuantity,
    incrementItem,
    decrementItem,
    clearCart,
    hasItem,
    buildWhatsAppMessage,
  };
}
