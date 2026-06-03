import { useState, type FC, type ReactNode } from 'react';
import { useAdminAuth } from '../../viewmodels/useAdminAuth';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'testimonials'
  | 'faq'
  | 'settings';

interface Props {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: ReactNode;
}

const NAV: { key: AdminTab; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Visão geral', icon: 'ti-layout-dashboard' },
  { key: 'products', label: 'Produtos', icon: 'ti-package' },
  { key: 'categories', label: 'Categorias', icon: 'ti-category' },
  { key: 'testimonials', label: 'Depoimentos', icon: 'ti-quote' },
  { key: 'faq', label: 'FAQ', icon: 'ti-help-circle' },
  { key: 'settings', label: 'Configurações', icon: 'ti-settings' },
];

export const AdminLayout: FC<Props> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  const { user, handleLogout } = useAdminAuth();
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="adm-shell">
      {/* Sidebar */}
      <aside className={`adm-side${sideOpen ? ' adm-side--open' : ''}`}>
        <div className="adm-side__brand">
          <div className="adm-side__mark">CRI</div>
          <div>
            <div className="adm-side__name">CRI Artes</div>
            <div className="adm-side__sub">Admin</div>
          </div>
        </div>

        <nav className="adm-nav">
          {NAV.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`adm-nav__item${activeTab === key ? ' adm-nav__item--active' : ''}`}
              onClick={() => {
                onTabChange(key);
                setSideOpen(false);
              }}
            >
              <i className={`ti ${icon}`} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <div className="adm-side__foot">
          <div className="adm-side__user">
            <i className="ti ti-user-circle" aria-hidden="true" />
            <span>{user?.email}</span>
          </div>
          <button
            className="adm-btn adm-btn--ghost adm-btn--sm"
            onClick={handleLogout}
          >
            <i className="ti ti-logout" aria-hidden="true" />
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sideOpen && (
        <div
          className="adm-overlay"
          onClick={() => setSideOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main */}
      <div className="adm-main">
        <header className="adm-header">
          <button
            className="adm-header__burger"
            aria-label="Abrir menu"
            onClick={() => setSideOpen((o) => !o)}
          >
            <i className="ti ti-menu-2" aria-hidden="true" />
          </button>
          <h2 className="adm-header__title">
            {NAV.find((n) => n.key === activeTab)?.label}
          </h2>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-btn adm-btn--ghost adm-btn--sm"
          >
            <i className="ti ti-external-link" aria-hidden="true" />
            Ver site
          </a>
        </header>

        <main className="adm-content">{children}</main>
      </div>
    </div>
  );
};
