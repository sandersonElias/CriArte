import { useRouterContext } from '../contexts/RouterContext';
import { scrollToId } from '../utils/whatsapp';
import { waLink } from '../utils/whatsapp';

export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'cats', label: 'Coleções' },
  { id: 'prods', label: 'Catálogo' },
  { id: 'custom', label: 'Sob medida' },
  { id: 'test', label: 'Avaliações' },
  { id: 'faq', label: 'Dúvidas' },
];

export function useNavViewModel() {
  const { route, goHome } = useRouterContext();

  const handleNavClick = (id: string) => {
    if (route.name !== 'home') {
      goHome();
      setTimeout(() => scrollToId(id), 300);
    } else {
      scrollToId(id);
    }
  };

  const handleLogoClick = () => {
    if (route.name !== 'home') {
      goHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const orderWaLink = waLink(
    'Olá! Vim pela Vitrine da CRI Artes e quero encomendar uma peça.',
  );

  return { handleNavClick, handleLogoClick, orderWaLink, NAV_LINKS };
}
