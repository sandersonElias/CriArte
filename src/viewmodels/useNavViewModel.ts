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
  const handleNavClick = (id: string) => scrollToId(id);
  const handleLogoClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const orderWaLink = waLink(
    'Olá! Vim pela Vitrine da CRI Artes e quero encomendar uma peça.',
  );

  return { handleNavClick, handleLogoClick, orderWaLink, NAV_LINKS };
}
