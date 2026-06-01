import type { FC } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { waLink, scrollToId } from '../../utils/whatsapp';

export const HeroSection: FC = () => (
  <section className="hero" data-reveal>
    <div className="hero__grid">
      {/* Left panel */}
      <div className="hero__left">
        <span className="hero__chip">
          <span className="pulse" aria-hidden="true" />
          Coleção inverno · disponível agora
        </span>

        <h1 className="hero__title">
          Peças em <span className="y">madeira</span> que duram gerações.
        </h1>

        <p className="hero__lede">
          Mobiliário, decoração e arte sacra feitos à mão em ateliê próprio.
          Edições limitadas, sob medida ou prontas para envio.
        </p>

        <div className="hero__actions">
          <a
            className="btn btn--yellow"
            href="#prods"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('prods');
            }}
          >
            Ver catálogo →
          </a>
          <a
            className="btn btn--ghost-light"
            href="#custom"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('custom');
            }}
          >
            Encomendar peça
          </a>
        </div>

        <div className="hero__stats">
          {[
            { n: '340+', l: 'peças\nentregues' },
            { n: '4.9', l: '★ média\ndo cliente' },
            { n: '7', l: 'anos\nde ateliê' },
          ].map(({ n, l }) => (
            <div key={n}>
              <div className="hero__stat-n">{n}</div>
              <div className="hero__stat-l" style={{ whiteSpace: 'pre-line' }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — cards */}
      <div className="hero__right">
        <div className="hero-card hero-card--featured">
          <ImageSlot placeholder="Cristaleira Cordilheira" />
          <div className="tag">Destaque</div>
          <div className="hero-card__info">
            <div>
              <div className="hero-card__name">Cristaleira Cordilheira</div>
              <div className="hero-card__cat">Mobiliário · Imbuia</div>
            </div>
            <div className="hero-card__price">R$ 7.400</div>
          </div>
        </div>

        <div className="hero-card">
          <ImageSlot placeholder="Cruz Serra" />
          <div className="hero-card__info">
            <div>
              <div className="hero-card__name">Cruz Serra</div>
              <div className="hero-card__cat">Sagrada</div>
            </div>
            <div className="hero-card__price">R$ 380</div>
          </div>
        </div>

        <div className="hero-card">
          <ImageSlot placeholder="Porta-vinhos Vale" />
          <div className="tag tag--yellow">Novo</div>
          <div className="hero-card__info">
            <div>
              <div className="hero-card__name">Porta-vinhos Vale</div>
              <div className="hero-card__cat">Decoração</div>
            </div>
            <div className="hero-card__price">R$ 220</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
