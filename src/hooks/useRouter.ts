import { useState, useEffect, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'product'; id: string }
  | { name: 'admin' };

function parse(pathname: string): Route {
  if (pathname.startsWith('/admin')) return { name: 'admin' };
  const m = pathname.match(/^\/produto\/([^/]+)/);
  if (m) return { name: 'product', id: decodeURIComponent(m[1]) };
  return { name: 'home' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() =>
    parse(window.location.pathname),
  );

  useEffect(() => {
    const handler = () => setRoute(parse(window.location.pathname));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState(null, '', path);
    setRoute(parse(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goHome = useCallback(() => navigate('/'), [navigate]);
  const goProduct = useCallback(
    (id: string) => navigate(`/produto/${encodeURIComponent(id)}`),
    [navigate],
  );
  const goBack = useCallback(() => {
    if (window.history.length > 1) window.history.back();
    else navigate('/');
  }, [navigate]);

  return { route, navigate, goHome, goProduct, goBack };
}
