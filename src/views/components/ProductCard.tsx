import type { FC } from 'react';
import type { Product } from '../../models/Product';
import { ImageSlot } from './ImageSlot';

interface Props {
  product: Product;
  isFav: boolean;
  onFav: (id: string) => void;
  onBag: (id: string) => void;
}

export const ProductCard: FC<Props> = ({ product, isFav, onFav, onBag }) => {
  const { id, catLabel, name, price, priceNote, tag, tagVariant, placeholder } =
    product;

  return (
    <article className="prod-card">
      <div className="prod-card__pic">
        <ImageSlot placeholder={placeholder} />

        {tag && (
          <div
            className={`prod-card__tag${
              tagVariant === 'yellow' ? ' prod-card__tag--yellow' : ''
            }`}
          >
            {tag}
          </div>
        )}

        <button
          className={`prod-card__heart${isFav ? ' prod-card__heart--active' : ''}`}
          aria-label={`${isFav ? 'Remover dos' : 'Adicionar aos'} favoritos: ${name}`}
          onClick={() => onFav(id)}
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
          <button
            className="prod-card__add"
            aria-label={`Adicionar ${name} à sacola`}
            onClick={() => onBag(id)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};
