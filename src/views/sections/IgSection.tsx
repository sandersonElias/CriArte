import type { FC } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { IG_POSTS } from '../../models/seedData';

export const IgSection: FC = () => (
  <section className="ig-section" data-reveal>
    <div className="sec-head">
      <div>
        <div className="sec-head__meta">— @criartes_cl</div>
        <h2 className="sec-head__title">
          Dia a dia do <span className="y">ateliê</span>.
        </h2>
      </div>
      <a
        className="sec-head__link"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        Seguir no Instagram →
      </a>
    </div>

    <div className="ig-grid">
      {IG_POSTS.map((label) => (
        <div className="ig-tile" key={label} aria-label={`Post: ${label}`}>
          <ImageSlot placeholder={`Post ${label}`} />
        </div>
      ))}
    </div>
  </section>
);
