import type { FC } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useProductsViewModel } from '../../viewmodels/useProductsViewModel';
import { useCartContext } from '../../contexts/CartContext';
import type { FilterKey } from '../../viewmodels/useProductsViewModel';

export const ProductsSection: FC = () => {
  const { activeFilter, visibleProducts, selectFilter, FILTERS, loading } =
    useProductsViewModel();
  const { cart, favorites, handleAddToCart } = useCartContext();

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
          Ver todas as peças →
        </a>
      </div>

      {/* Filtros */}
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
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="prods-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="prod-card prod-card--skeleton" />
          ))}
        </div>
      ) : (
        <div className="prods-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFav={favorites.isFav(product.id)}
              inCart={cart.hasItem(product.id)}
              onFav={() => favorites.toggleFav(product)}
              onBag={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
