import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

import { useSettingsViewModel } from './viewmodels/useSettingsViewModel';

// ─── Estilos ──────────────────────────────────────────────────────────────────
import './styles/site/index.css';
import './styles/admin/index.css';

// ─── Hooks de infra ───────────────────────────────────────────────────────────
import { useScrollReveal } from './hooks/useScrollReveal';
import { useToast } from './hooks/useToast';

// ─── Componentes do site público ─────────────────────────────────────────────
import { AnnouncerBar } from './views/components/AnnouncerBar';
import { TopNav } from './views/components/TopNav';
import { Toast } from './views/components/Toast';
import { WhatsAppFloat } from './views/components/WhatsAppFloat';
import { CartDrawer } from './views/components/CartDrawer';
import { FavoritesDrawer } from './views/components/FavoritesDrawer';
import { HeroSection } from './views/sections/HeroSection';
import { TrustStrip } from './views/sections/TrustStrip';
import { CategoriesSection } from './views/sections/CategoriesSection';
import { ProductsSection } from './views/sections/ProductsSection';
import { CustomSection } from './views/sections/CustomSection';
import { BudgetSection } from './views/sections/BudgetSection';
import { TestimonialsSection } from './views/sections/TestimonialsSection';
import { IgSection } from './views/sections/IgSection';
import { FaqSection } from './views/sections/FaqSection';
import { Footer } from './views/sections/Footer';
import { CartProvider } from './contexts/CartContext';

// ─── Admin ────────────────────────────────────────────────────────────────────
import { LoginPage } from './views/admin/LoginPage';
import { AdminPage } from './views/admin/AdminPage';

// ─── Detecta rota /admin ──────────────────────────────────────────────────────
const isAdminRoute = () => window.location.pathname.startsWith('/admin');

// ─── Proteção de rota ─────────────────────────────────────────────────────────
function AdminGuard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#0f2811',
        }}
      >
        <div
          style={{
            color: '#e8c547',
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
          }}
        >
          Verificando sessão…
        </div>
      </div>
    );
  }

  return user ? <AdminPage /> : <LoginPage />;
}

// ─── Site público ─────────────────────────────────────────────────────────────
function PublicSite() {
  useScrollReveal();

  const { settings } = useSettingsViewModel();
  const { toast, show: showToast } = useToast();

  return (
    <>
      <AnnouncerBar settings={settings} />
      <TopNav />

      <main id="top">
        <div className="wrap">
          <HeroSection settings={settings} />
        </div>

        <TrustStrip />

        <div className="wrap">
          <CategoriesSection />
          <ProductsSection />
          <CustomSection />
          <BudgetSection />
          <TestimonialsSection />
          <IgSection />
          <FaqSection />
        </div>
      </main>

      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />

      {/* Drawers — ficam fora do fluxo, sempre montados */}
      <CartDrawer />
      <FavoritesDrawer />

      <Toast text={toast.text} visible={toast.visible} />
    </>
  );
}

// ─── Raiz ─────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css';
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  return (
    <AuthProvider>
      {isAdminRoute() ? (
        <AdminGuard />
      ) : (
        // CartProvider envolve só o site público
        <CartProvider>
          <PublicSite />
        </CartProvider>
      )}
    </AuthProvider>
  );
}
