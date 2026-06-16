import type { FC } from 'react';
import type { Product } from '../../models/Product';
import { ImageSlot } from './ImageSlot';
import { useRouterContext } from '../../contexts/RouterContext';

interface Props {
  product: Product;
  isFav: boolean;
  inCart: boolean;
  onFav: () => void;
  onBag: () => void;
}

export const ProductCard: FC<Props> = ({
  product,
  isFav,
  inCart,
  onFav,
  onBag,
}) => {
  const { goProduct } = useRouterContext();
  const {
    id,
    catLabel,
    name,
    price,
    priceNote,
    tag,
    tagVariant,
    placeholder,
    imageUrl,
  } = product;

  const handleCardClick = () => goProduct(id);

  const stopAndCall = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation(); // não dispara o clique do card
    fn();
  };

  return (
    <article
      className="prod-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${name}`}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="prod-card__pic">
        <ImageSlot imageUrl={imageUrl} placeholder={placeholder} alt={name} />

        {tag && (
          <div
            className={`prod-card__tag${tagVariant === 'yellow' ? ' prod-card__tag--yellow' : ''}`}
          >
            {tag}
          </div>
        )}

        {/* Favorito — stopPropagation para não navegar */}
        <button
          className={`prod-card__heart${isFav ? ' prod-card__heart--active' : ''}`}
          aria-label={`${isFav ? 'Remover dos' : 'Adicionar aos'} favoritos: ${name}`}
          onClick={stopAndCall(onFav)}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>

      <div className="prod-card__body">
        <div className="prod-card__cat">{catLabel}</div>
        <h4 className="prod-card__name">{name}</h4>
        <div className="prod-card__row">
          <div className="prod-card__price">
            {price}
            <small>{priceNote}</small>
          </div>

          {/* Adicionar ao carrinho — stopPropagation para não navegar */}
          <button
            className={`prod-card__add${inCart ? ' prod-card__add--in-cart' : ''}`}
            aria-label={
              inCart
                ? `${name} já no carrinho`
                : `Adicionar ${name} ao carrinho`
            }
            title={inCart ? 'Já no carrinho' : 'Adicionar ao carrinho'}
            onClick={stopAndCall(onBag)}
          >
            {inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    </article>
  );
};
