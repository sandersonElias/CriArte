import type React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <nav className="top">
      <div className="nav-inner">
        <a className="brand" href="#top">
          <div className="lmark">CRI</div>
          <div>
            <div className="b-name">CRI Artes</div>
            <div className="b-sub">Artes em madeira</div>
          </div>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#cats">Coleções</a>
          </li>
          <li>
            <a href="#prods" className="active">
              Catálogo
            </a>
          </li>
          <li>
            <a href="#custom">Sob medida</a>
          </li>
          <li>
            <a href="sobre.html">Sobre</a>
          </li>
          <li>
            <a href="#test">Avaliações</a>
          </li>
          <li>
            <a href="#faq">Dúvidas</a>
          </li>
        </ul>
        <div className="nav-r">
          <button className="icon-btn" aria-label="Buscar">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
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
              stroke-width="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Sacola">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="bag-badge" data-bag-count>
              0
            </span>
          </button>
          <a
            className="btn yellow"
            data-wa
            data-wa-msg="Olá! Vim pela Vitrine da CRI Artes e quero encomendar uma peça."
          >
            Encomendar
          </a>
        </div>
      </div>
    </nav>
  );
};
