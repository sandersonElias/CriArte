import { useEffect } from 'react';

// Estilos
import './styles/global.css';

// Hooks de infra
import { useScrollReveal } from './hooks/useScrollReveal';
import { useToast } from './hooks/useToast';

// ViewModels de estado global
import { useFavoritesViewModel } from './viewmodels/useFavoritesViewModel';
import { useBagViewModel } from './viewmodels/useBagViewModel';

// Componentes compartilhados
import { AnnouncerBar } from './views/components/AnnouncerBar';
import { TopNav } from './views/components/TopNav';
import { Toast } from './views/components/Toast';
import { WhatsAppFloat } from './views/components/WhatsAppFloat';

// Seções da página
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

export default function App() {
  // ── Infra ──────────────────────────────────────────────
  useScrollReveal();

  const { toast, show: showToast } = useToast();

  // ── Estado global de sacola e favoritos ───────────────
  const { favs, toggleFav, favCount } = useFavoritesViewModel();
  const { addToBag, bagCount } = useBagViewModel();

  // ── Ação: adicionar à sacola com feedback toast ───────
  const handleAddToBag = (id: string) => {
    addToBag(id);
    showToast('Adicionado à sua seleção');
  };

  // ── Fontes (Google Fonts) ─────────────────────────────
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
      {/* ── Faixa de anúncio ─────────────────────────── */}
      <AnnouncerBar />

      {/* ── Navegação fixa ───────────────────────────── */}
      <TopNav bagCount={bagCount} favCount={favCount} />

      {/* ── Conteúdo principal ───────────────────────── */}
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

      {/* ── Rodapé ───────────────────────────────────── */}
      <Footer />

      {/* ── Flutuantes globais ───────────────────────── */}
      <WhatsAppFloat />
      <Toast text={toast.text} visible={toast.visible} />
    </>
  );
}
