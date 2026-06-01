import type { FC } from 'react';
import { useNavViewModel } from '../../viewmodels/useNavViewModel';

interface Props {
  bagCount: number;
  favCount: number;
}

export const TopNav: FC<Props> = ({ bagCount, favCount }) => {
  const { handleNavClick, handleLogoClick, orderWaLink, NAV_LINKS } =
    useNavViewModel();

  return (
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

        {/* Links */}
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

        {/* Actions */}
        <div className="nav-r">
          <button className="icon-btn" aria-label="Buscar">
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

          <button className="icon-btn" aria-label="Favoritos">
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
            {favCount > 0 && <span className="badge">{favCount}</span>}
          </button>

          <button className="icon-btn" aria-label="Sacola">
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
            {bagCount > 0 && <span className="badge">{bagCount}</span>}
          </button>

          <a
            className="btn btn--yellow"
            href={orderWaLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Encomendar
          </a>
        </div>
      </div>
    </nav>
  );
};
