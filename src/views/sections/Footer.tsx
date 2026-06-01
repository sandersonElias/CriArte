import type { FC } from 'react';
import { useNewsletterViewModel } from '../../viewmodels/useNewsletterViewModel';
import { scrollToId } from '../../utils/whatsapp';

const CATALOG_LINKS = ['Mobiliário', 'Sagrada', 'Decoração', 'Sazonal'];
const ATELIER_LINKS: [string, string][] = [
  ['custom', 'Sob medida'],
  ['test', 'Avaliações'],
  ['faq', 'Perguntas'],
  ['#', 'Política de envio'],
  ['#', 'Cuidados com a peça'],
];

export const Footer: FC = () => {
  const { email, setEmail, subscribed, handleSubmit } =
    useNewsletterViewModel();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          {/* Brand col */}
          <div className="foot-col">
            <div className="big-mark">
              CRI <em>Artes</em>
            </div>
            <p style={{ marginTop: 14, maxWidth: '34ch' }}>
              Marcenaria autoral · Mairiporã, SP · Atendemos todo o Brasil.
            </p>

            <form className="news-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="E-mail para newsletter"
              />
              <button
                type="submit"
                style={
                  subscribed ? { background: 'var(--green-600)' } : undefined
                }
              >
                {subscribed ? 'Inscrito ✓' : 'Inscrever'}
              </button>
            </form>
            <p style={{ fontSize: 12, marginTop: 8, color: '#8a8770' }}>
              Receba lançamentos das coleções, primeiro.
            </p>
          </div>

          {/* Catalog col */}
          <div className="foot-col">
            <h5>Catálogo</h5>
            <ul>
              {CATALOG_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#cats"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId('cats');
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier col */}
          <div className="foot-col">
            <h5>Ateliê</h5>
            <ul>
              {ATELIER_LINKS.map(([id, label]) => (
                <li key={label}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      if (id !== '#') {
                        e.preventDefault();
                        scrollToId(id);
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="foot-col">
            <h5>Contato</h5>
            <ul>
              <li>+55 11 9 9999-0000</li>
              <li>atelie@criartes.cl</li>
              <li>Seg–Sex · 9h às 18h</li>
              <li>
                <a href="#">Instagram · @criartes_cl</a>
              </li>
              <li>
                <a href="#">Pinterest</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <span>© 2026 CRI Artes · CNPJ 00.000.000/0001-00</span>
          <span>v03 — Vitrine</span>
        </div>
      </div>
    </footer>
  );
};
