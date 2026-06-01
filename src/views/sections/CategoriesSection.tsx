import type { FC } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { CATEGORIES } from '../../models/seedData';

export const CategoriesSection: FC = () => (
  <section className="cats-section" id="cats" data-reveal>
    <div className="sec-head">
      <div>
        <div className="sec-head__meta">— Coleções</div>
        <h2 className="sec-head__title">
          Quatro <span className="y">famílias</span> de peças.
        </h2>
      </div>
      <p className="sec-head__body">
        Cada coleção tem prazo, materiais e faixa de preço próprios. Navegue por
        aquela que mais combina com seu projeto.
      </p>
    </div>

    <div className="cats-grid">
      {CATEGORIES.map(({ key, name, count, placeholder }) => (
        <div className="cat-card" key={key}>
          <ImageSlot placeholder={placeholder} />
          <div className="cat-card__overlay">
            <div className="cat-card__name">{name}</div>
            <div className="cat-card__count">{count} peças</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
