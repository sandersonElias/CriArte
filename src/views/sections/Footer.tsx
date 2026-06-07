import type { FC } from 'react';
import { useNewsletterViewModel } from '../../viewmodels/useNewsletterViewModel';
import { scrollToId } from '../../utils/whatsapp';
import type { FSSettings } from '../../models/FirestoreModels';

interface Props {
  settings: FSSettings;
}

const CATALOG_LINKS = ['Mobiliário', 'Sagrada', 'Decoração', 'Sazonal'];

const ATELIER_LINKS: [string, string][] = [
  ['custom', 'Sob medida'],
  ['test', 'Avaliações'],
  ['faq', 'Perguntas'],
  ['#', 'Política de envio'],
  ['#', 'Cuidados com a peça'],
];

export const Footer: FC<Props> = ({ settings }) => {
  const { email, setEmail, subscribed, handleSubmit } =
    useNewsletterViewModel();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          {/* Brand + newsletter */}
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

          {/* Catálogo */}
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

          {/* Ateliê */}
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

          {/* Contato — dados do Firestore */}
          <div className="foot-col">
            <h5>Contato</h5>
            <ul>
              <li>{settings.contactPhone}</li>
              <li>{settings.contactEmail}</li>
              <li>{settings.contactHours}</li>
              <li>
                <a
                  href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram · {settings.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <span>© {new Date().getFullYear()} CRI Artes</span>
          <span>v03 — Vitrine</span>
        </div>
      </div>
    </footer>
  );
};
