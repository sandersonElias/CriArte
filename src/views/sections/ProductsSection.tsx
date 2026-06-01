import type { FC } from 'react';
import { ProductCard } from '../components/ProductCard';
import {
  useProductsViewModel,
  type FilterKey,
} from '../../viewmodels/useProductsViewModel';

interface Props {
  favs: string[];
  onFav: (id: string) => void;
  onBag: (id: string) => void;
}

export const ProductsSection: FC<Props> = ({ favs, onFav, onBag }) => {
  const { activeFilter, visibleProducts, selectFilter, FILTERS } =
    useProductsViewModel();

  return (
    <section className="products-section" id="prods" data-reveal>
      <div className="sec-head">
        <div>
          <div className="sec-head__meta">— Em destaque</div>
          <h2 className="sec-head__title">
            Peças <span className="y">disponíveis</span> agora.
          </h2>
        </div>
        <a className="sec-head__link" href="#">
          Ver todas as 152 peças →
        </a>
      </div>

      {/* Filter chips */}
      <div
        className="filters"
        role="tablist"
        aria-label="Filtrar por categoria"
      >
        {FILTERS.map(({ key, label, count }) => (
          <div
            key={key}
            role="tab"
            aria-selected={activeFilter === key}
            className={`chip${activeFilter === key ? ' chip--active' : ''}`}
            onClick={() => selectFilter(key as FilterKey)}
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' && selectFilter(key as FilterKey)
            }
          >
            {label}
            <span className="chip__count">{count}</span>
          </div>
        ))}

        <div className="filters__right">
          Ordenar por
          <select aria-label="Ordenação">
            <option>Mais recentes</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
            <option>Mais pedidos</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="prods-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFav={favs.includes(product.id)}
            onFav={onFav}
            onBag={onBag}
          />
        ))}
      </div>
    </section>
  );
};
