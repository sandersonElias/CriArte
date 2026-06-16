import { createContext, useContext, type FC, type ReactNode } from 'react';
import { useRouter, type Route } from '../hooks/useRouter';

interface RouterContextValue {
  route: Route;
  navigate: (path: string) => void;
  goHome: () => void;
  goProduct: (id: string) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

export function useRouterContext(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx)
    throw new Error('useRouterContext deve estar dentro de <RouterProvider>');
  return ctx;
}
