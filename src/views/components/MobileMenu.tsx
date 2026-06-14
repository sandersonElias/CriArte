import type { FC } from 'react';
import { useCartContext } from '../../contexts/CartContext';
import { useNavViewModel } from '../../viewmodels/useNavViewModel';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileMenu: FC<Props> = ({ open, onClose, onOpenSearch }) => {
  const { handleNavClick, orderWaLink, NAV_LINKS } = useNavViewModel();
  const { cart, favorites, openCart, openFavorites } = useCartContext();

  const handleLink = (id: string) => {
    handleNavClick(id);
    onClose();
  };
  const handleCart = () => {
    onClose();
    openCart();
  };
  const handleFavs = () => {
    onClose();
    openFavorites();
  };
  const handleSearch = () => {
    onClose();
    onOpenSearch();
  };

  return (
    <>
      <div
        className={`mob-overlay${open ? ' mob-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`mob-menu${open ? ' mob-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Cabeçalho */}
        <div className="mob-menu__head">
          <div className="brand">
            <div className="brand__mark">CRI</div>
            <div>
              <div className="brand__name">CRI Artes</div>
              <div className="brand__sub">Artes em madeira</div>
            </div>
          </div>
          <button
            className="mob-menu__close"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width={18}
              height={18}
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Campo de busca rápida */}
        <div className="mob-menu__search">
          <button className="mob-search-btn" onClick={handleSearch}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width={16}
              height={16}
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            Buscar produtos…
          </button>
        </div>

        {/* Links de navegação */}
        <nav className="mob-menu__nav">
          <ul>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="mob-menu__link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink(id);
                  }}
                >
                  {label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width={16}
                    height={16}
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mob-menu__divider" />

        {/* Favoritos e Carrinho */}
        <div className="mob-menu__actions">
          <button className="mob-menu__action" onClick={handleFavs}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width={20}
              height={20}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Favoritos</span>
            {favorites.favCount > 0 && (
              <span className="mob-menu__badge">{favorites.favCount}</span>
            )}
          </button>

          <button className="mob-menu__action" onClick={handleCart}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width={20}
              height={20}
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Carrinho</span>
            {cart.totalItems > 0 && (
              <span className="mob-menu__badge">{cart.totalItems}</span>
            )}
          </button>
        </div>

        <div className="mob-menu__divider" />

        {/* CTA */}
        <div className="mob-menu__cta">
          <a
            className="btn btn--yellow"
            href={orderWaLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
          >
            Encomendar pelo WhatsApp
          </a>
          <p className="mob-menu__hint">
            Respondemos em até 48h com proposta detalhada
          </p>
        </div>
      </div>
    </>
  );
};
