import {
  createContext,
  useContext,
  useState,
  useCallback,
  type FC,
  type ReactNode,
} from 'react';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import type { Product } from '../models/Product';

// ─── Tipos ───────────────────────────────────────────────────────────────────
export type DrawerType = 'cart' | 'favorites' | null;

interface CartContextValue {
  // Carrinho
  cart: ReturnType<typeof useCart>;

  // Favoritos
  favorites: ReturnType<typeof useFavorites>;

  // Drawer
  activeDrawer: DrawerType;
  openCart: () => void;
  openFavorites: () => void;
  closeDrawer: () => void;

  // Ação combinada: adicionar ao carrinho a partir de qualquer lugar
  handleAddToCart: (product: Product) => void;

  // Ação combinada: mover favorito para o carrinho
  moveToCart: (product: Product) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useCart();
  const favorites = useFavorites();

  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);

  const openCart = useCallback(() => setActiveDrawer('cart'), []);
  const openFavorites = useCallback(() => setActiveDrawer('favorites'), []);
  const closeDrawer = useCallback(() => setActiveDrawer(null), []);

  // Adiciona ao carrinho e abre o drawer de carrinho
  const handleAddToCart = useCallback(
    (product: Product) => {
      cart.addItem(product);
      setActiveDrawer('cart');
    },
    [cart],
  );

  // Move um favorito para o carrinho (adiciona + não remove dos favs)
  const moveToCart = useCallback(
    (product: Product) => {
      cart.addItem(product);
      setActiveDrawer('cart');
    },
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        activeDrawer,
        openCart,
        openFavorites,
        closeDrawer,
        handleAddToCart,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error('useCartContext deve ser usado dentro de <CartProvider>');
  return ctx;
}
