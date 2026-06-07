import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { useSettingsViewModel } from './viewmodels/useSettingsViewModel';

// ─── Estilos (fragmentados) ───────────────────────────────────────────────────
import './styles/site/index.css';
import './styles/admin/index.css';

// ─── Hooks de infra (site público) ───────────────────────────────────────────
import { useScrollReveal } from './hooks/useScrollReveal';
import { useToast } from './hooks/useToast';

// ─── ViewModels de estado global (site público) ───────────────────────────────
import { useFavoritesViewModel } from './viewmodels/useFavoritesViewModel';
import { useBagViewModel } from './viewmodels/useBagViewModel';

// ─── Componentes do site público ─────────────────────────────────────────────
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

// ─── Admin ────────────────────────────────────────────────────────────────────
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

  // Dados dinâmicos do Firestore (announce bar, hero, contato, WhatsApp)
  const { settings } = useSettingsViewModel();

  const { toast, show: showToast } = useToast();
  const { favs, toggleFav, favCount } = useFavoritesViewModel();
  const { addToBag, bagCount } = useBagViewModel();

  const handleAddToBag = (id: string) => {
    addToBag(id);
    showToast('Adicionado à sua seleção');
  };

  return (
    <>
      {/* Announce bar — texto vem do Firestore */}
      <AnnouncerBar settings={settings} />

      <TopNav bagCount={bagCount} favCount={favCount} />

      <main id="top">
        <div className="wrap">
          {/* Hero — chip, título e lede vêm do Firestore */}
          <HeroSection settings={settings} />
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

      {/* Rodapé — contato e Instagram vêm do Firestore */}
      <Footer settings={settings} />

      {/* Botão flutuante — número do WhatsApp vem do Firestore */}
      <WhatsAppFloat settings={settings} />

      <Toast text={toast.text} visible={toast.visible} />
    </>
  );
}

// ─── Raiz ─────────────────────────────────────────────────────────────────────
export default function App() {
  // Carrega ícones Tabler (usados no painel admin)
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
