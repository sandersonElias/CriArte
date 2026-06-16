import type { FC } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import type { FSCategory } from '../../models/FirestoreModels';
import { useCategoriesViewModel } from '../../viewmodels/useCategoriesViewModel';

export const CategoriesSection: FC = () => {
  const { categories, loading } = useCategoriesViewModel();

  return (
    <section className="cats-section" id="cats" data-reveal>
      <div className="sec-head">
        <div>
          <div className="sec-head__meta">— Coleções</div>
          <h2 className="sec-head__title">
            Quatro <span className="y">famílias</span> de peças.
          </h2>
        </div>
        <p className="sec-head__body">
          Cada coleção tem prazo, materiais e faixa de preço próprios. Navegue
          por aquela que mais combina com seu projeto.
        </p>
      </div>

      {loading ? (
        <div className="cats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="cat-card cat-card--skeleton" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p style={{ color: 'var(--mute)', fontSize: 14 }}>
          Nenhuma categoria cadastrada ainda.
        </p>
      ) : (
        <div className="cats-grid">
          {categories.map((cat: FSCategory) => (
            <div className="cat-card" key={cat.id ?? cat.key}>
              <ImageSlot placeholder={cat.placeholder} />
              <div className="cat-card__overlay">
                <div className="cat-card__name">{cat.name}</div>
                <div className="cat-card__count">{cat.count} peças</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
