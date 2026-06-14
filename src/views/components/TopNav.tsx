import { useState, type FC } from 'react';
import { useNavViewModel } from '../../viewmodels/useNavViewModel';
import { useCartContext } from '../../contexts/CartContext';
import { useSearchViewModel } from '../../viewmodels/useSearchViewModel';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';

export const TopNav: FC = () => {
  const { handleNavClick, handleLogoClick, orderWaLink, NAV_LINKS } =
    useNavViewModel();
  const { cart, favorites, openCart, openFavorites } = useCartContext();
  const search = useSearchViewModel();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner">
          {/* Brand */}
          <div
            className="brand"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
          >
            <div className="brand__mark">CRI</div>
            <div>
              <div className="brand__name">CRI Artes</div>
              <div className="brand__sub">Artes em madeira</div>
            </div>
          </div>

          {/* Links desktop */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(id);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Ações direita */}
          <div className="nav-r">
            {/* Busca */}
            <button
              className="icon-btn"
              aria-label="Buscar produtos"
              onClick={search.openSearch}
            >
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
            </button>

            {/* Favoritos */}
            <button
              className="icon-btn"
              aria-label={`Favoritos (${favorites.favCount})`}
              onClick={openFavorites}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width={16}
                height={16}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favorites.favCount > 0 && (
                <span className="badge">{favorites.favCount}</span>
              )}
            </button>

            {/* Carrinho */}
            <button
              className="icon-btn"
              aria-label={`Carrinho (${cart.totalItems})`}
              onClick={openCart}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width={16}
                height={16}
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cart.totalItems > 0 && (
                <span className="badge">{cart.totalItems}</span>
              )}
            </button>

            {/* Encomendar — só desktop */}
            <a
              className="btn btn--yellow nav-r__cta-desktop"
              href={orderWaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Encomendar
            </a>

            {/* Hamburguer — só mobile */}
            <button
              className="nav-burger"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width={20}
                  height={20}
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width={20}
                  height={20}
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de busca */}
      <SearchModal
        open={search.open}
        onClose={search.closeSearch}
        query={search.query}
        inputRef={search.inputRef}
        groups={search.groups}
        isEmpty={search.isEmpty}
        showResults={search.showResults}
        totalResults={search.totalResults}
        handleQuery={search.handleQuery}
      />

      {/* Menu mobile */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenSearch={search.openSearch}
      />
    </>
  );
};
