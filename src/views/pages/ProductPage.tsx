import type { FC } from 'react';
import { useProductPageViewModel } from '../../viewmodels/useProductPageViewModel';
import { useCartContext } from '../../contexts/CartContext';
import { useRouterContext } from '../../contexts/RouterContext';
import { ImageSlot } from '../components/ImageSlot';
import { ProductCard } from '../components/ProductCard';
import type { FSSettings } from '../../models/FirestoreModels';

interface Props {
  productId: string;
  settings: FSSettings;
}

export const ProductPage: FC<Props> = ({ productId, settings }) => {
  const { product, related, loading, notFound } =
    useProductPageViewModel(productId);
  const { cart, favorites, handleAddToCart } = useCartContext();
  const { goBack, goHome } = useRouterContext();

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="wrap">
        <div className="prod-page__loading">
          <div className="prod-page__skeleton-img" />
          <div className="prod-page__skeleton-body">
            <div className="skel skel--title" />
            <div className="skel skel--line" />
            <div className="skel skel--line skel--short" />
            <div className="skel skel--price" />
            <div className="skel skel--btn" />
          </div>
        </div>
      </div>
    );
  }

  // ── Não encontrado ───────────────────────────────────────────────────────────
  if (notFound || !product) {
    return (
      <div className="prod-page__not-found">
        <div className="prod-page__nf-inner">
          <div className="prod-page__nf-icon">🌿</div>
          <h2>Produto não encontrado</h2>
          <p>
            Este produto pode ter sido removido ou estar temporariamente
            indisponível.
          </p>
          <button className="btn btn--yellow" onClick={goHome}>
            Ver catálogo completo
          </button>
        </div>
      </div>
    );
  }

  const inCart = cart.hasItem(product.id);
  const isFav = favorites.isFav(product.id);

  const waMsg = [
    `Olá! Tenho interesse no produto "${product.name}" (${product.catLabel}).`,
    `Preço exibido: ${product.price}`,
    'Poderia me passar mais informações sobre prazo, disponibilidade e frete?',
  ].join('\n');
  const waUrl = `https://wa.me/${settings.waNumber}?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="prod-page">
      <div className="wrap">
        {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
        <nav className="prod-page__breadcrumb" aria-label="Navegação">
          <button onClick={goHome} className="prod-page__bc-link">
            Início
          </button>
          <span className="prod-page__bc-sep">›</span>
          <button
            onClick={() => {
              goHome();
              setTimeout(
                () =>
                  document
                    .getElementById('prods')
                    ?.scrollIntoView({ behavior: 'smooth' }),
                150,
              );
            }}
            className="prod-page__bc-link"
          >
            Catálogo
          </button>
          <span className="prod-page__bc-sep">›</span>
          <span className="prod-page__bc-current">{product.catLabel}</span>
        </nav>

        {/* ── Grid principal ─────────────────────────────────────────────────── */}
        <div className="prod-page__grid">
          {/* Imagem */}
          <div className="prod-page__gallery">
            <div className="prod-page__img-main">
              <ImageSlot
                imageUrl={product.imageUrl}
                placeholder={product.placeholder}
                alt={product.name}
              />
              {product.tag && (
                <div className={`tag tag--${product.tagVariant ?? 'yellow'}`}>
                  {product.tag}
                </div>
              )}
            </div>
          </div>

          {/* Informações */}
          <div className="prod-page__info">
            <div className="prod-page__meta">
              <span className="prod-page__cat">{product.catLabel}</span>
              {product.wood && (
                <>
                  <span className="prod-page__meta-dot">·</span>
                  <span className="prod-page__wood">{product.wood}</span>
                </>
              )}
            </div>

            <h1 className="prod-page__name">{product.name}</h1>

            <div className="prod-page__price-block">
              <div className="prod-page__price">{product.price}</div>
              <div className="prod-page__price-note">{product.priceNote}</div>
            </div>

            {/* Ações */}
            <div className="prod-page__actions">
              <button
                className={`btn btn--yellow prod-page__add${inCart ? ' prod-page__add--in-cart' : ''}`}
                onClick={() => handleAddToCart(product)}
              >
                {inCart ? (
                  <>✓ Adicionado ao carrinho</>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width={18}
                      height={18}
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Adicionar ao carrinho
                  </>
                )}
              </button>

              <button
                className={`prod-page__fav${isFav ? ' prod-page__fav--active' : ''}`}
                onClick={() => favorites.toggleFav(product)}
                aria-label={
                  isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
                }
              >
                {isFav ? '♥' : '♡'}
              </button>
            </div>

            {/* WhatsApp */}
            <a
              className="prod-page__wa"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width={18}
                height={18}
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Encomendar ou tirar dúvidas pelo WhatsApp
            </a>

            {/* Detalhes */}
            <div className="prod-page__details">
              {[
                {
                  ico: '🪵',
                  label: 'Madeira',
                  value: product.wood || 'A definir na encomenda',
                },
                {
                  ico: '⏱',
                  label: 'Prazo de produção',
                  value: '4 a 12 semanas conforme o projeto',
                },
                {
                  ico: '∞',
                  label: 'Garantia',
                  value: 'Vitalícia contra defeitos de marcenaria',
                },
                {
                  ico: '📦',
                  label: 'Entrega',
                  value: 'Todo o Brasil via transportadora dedicada',
                },
              ].map(({ ico, label, value }) => (
                <div key={label} className="prod-page__detail">
                  <div className="prod-page__detail-ico">{ico}</div>
                  <div>
                    <div className="prod-page__detail-label">{label}</div>
                    <div className="prod-page__detail-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Relacionados ─────────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="prod-page__related">
            <div className="sec-head">
              <div>
                <div className="sec-head__meta">— Da mesma coleção</div>
                <h2 className="sec-head__title">
                  Você também pode <span className="y">gostar</span>.
                </h2>
              </div>
            </div>
            <div className="prods-grid">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFav={favorites.isFav(p.id)}
                  inCart={cart.hasItem(p.id)}
                  onFav={() => favorites.toggleFav(p)}
                  onBag={() => handleAddToCart(p)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Voltar ─────────────────────────────────────────────────────────── */}
        <div className="prod-page__back">
          <button className="prod-page__back-btn" onClick={goBack}>
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
