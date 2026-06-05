import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

// Estilos
import './styles/global.css';
import './styles/admin.css';

// Hooks de infra (site público)
import { useScrollReveal } from './hooks/useScrollReveal';
import { useToast } from './hooks/useToast';

// ViewModels de estado global (site público)
import { useFavoritesViewModel } from './viewmodels/useFavoritesViewModel';
import { useBagViewModel } from './viewmodels/useBagViewModel';

// Componentes do site público
import { AnnouncerBar } from './views/components/AnnouncerBar';
import { TopNav } from './views/components/TopNav';
import { Toast } from './views/components/Toast';
import { WhatsAppFloat } from './views/components/WhatsAppFloat';
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

// Admin
import { LoginPage } from './views/admin/LoginPage';
import { AdminPage } from './views/admin/AdminPage';

// ─── Detecta se a rota é /admin ───────────────────────────────────────────────
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

  const { toast, show: showToast } = useToast();
  const { favs, toggleFav, favCount } = useFavoritesViewModel();
  const { addToBag, bagCount } = useBagViewModel();

  const handleAddToBag = (id: string) => {
    addToBag(id);
    showToast('Adicionado à sua seleção');
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  return (
    <>
      <AnnouncerBar />
      <TopNav bagCount={bagCount} favCount={favCount} />
      <main id="top">
        <div className="wrap">
          <HeroSection />
        </div>
        <TrustStrip />
        <div className="wrap">
          <CategoriesSection />
          <ProductsSection
            favs={favs}
            onFav={toggleFav}
            onBag={handleAddToBag}
          />
          <CustomSection />
          <BudgetSection />
          <TestimonialsSection />
          <IgSection />
          <FaqSection />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
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
      {isAdminRoute() ? <AdminGuard /> : <PublicSite />}
    </AuthProvider>
  );
}
