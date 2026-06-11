import type { FC } from 'react';
import type { Product } from '../../models/Product';
import { ImageSlot } from './ImageSlot';

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
  const {
    catLabel,
    name,
    price,
    priceNote,
    tag,
    tagVariant,
    placeholder,
    imageUrl,
  } = product;

  return (
    <article className="prod-card">
      <div className="prod-card__pic">
        <ImageSlot imageUrl={imageUrl} placeholder={placeholder} alt={name} />

        {tag && (
          <div
            className={`prod-card__tag${tagVariant === 'yellow' ? ' prod-card__tag--yellow' : ''}`}
          >
            {tag}
          </div>
        )}

        {/* Favorito */}
        <button
          className={`prod-card__heart${isFav ? ' prod-card__heart--active' : ''}`}
          aria-label={`${isFav ? 'Remover dos' : 'Adicionar aos'} favoritos: ${name}`}
          onClick={onFav}
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
          {/* Adicionar ao carrinho */}
          <button
            className={`prod-card__add${inCart ? ' prod-card__add--in-cart' : ''}`}
            aria-label={
              inCart
                ? `${name} já está no carrinho`
                : `Adicionar ${name} ao carrinho`
            }
            onClick={onBag}
            title={
              inCart
                ? 'Já no carrinho — clique para adicionar mais'
                : 'Adicionar ao carrinho'
            }
          >
            {inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    </article>
  );
};
