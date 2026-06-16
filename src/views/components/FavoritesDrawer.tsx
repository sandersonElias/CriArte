import type { FC } from 'react';
import { useCartContext } from '../../contexts/CartContext';

export const FavoritesDrawer: FC = () => {
  const { favorites, moveToCart, closeDrawer, activeDrawer } = useCartContext();

  const open = activeDrawer === 'favorites';

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay${open ? ' drawer-overlay--visible' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Painel */}
      <aside
        className={`drawer${open ? ' drawer--open' : ''}`}
        aria-label="Favoritos"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabeçalho */}
        <div className="drawer__head">
          <div className="drawer__title">
            <i className="ti ti-heart" aria-hidden="true" />
            Favoritos
            {favorites.favCount > 0 && (
              <span className="drawer__count">{favorites.favCount}</span>
            )}
          </div>
          <button
            className="drawer__close"
            onClick={closeDrawer}
            aria-label="Fechar favoritos"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="drawer__body">
          {favorites.items.length === 0 ? (
            <div className="drawer__empty">
              <i className="ti ti-heart" aria-hidden="true" />
              <p>Nenhum produto favoritado ainda.</p>
              <button className="btn btn--yellow" onClick={closeDrawer}>
                Ver produtos
              </button>
            </div>
          ) : (
            <ul className="cart-list">
              {favorites.items.map((product) => (
                <li className="cart-item" key={product.id}>
                  {/* Imagem */}
                  <div className="cart-item__img">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="cart-item__img-placeholder">
                        <i className="ti ti-photo" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="cart-item__info">
                    <div className="cart-item__name">{product.name}</div>
                    <div className="cart-item__cat">{product.catLabel}</div>
                    <div className="cart-item__price">{product.price}</div>

                    {/* Ação: mover para o carrinho */}
                    <button
                      className="fav-item__add"
                      onClick={() => moveToCart(product)}
                    >
                      <i
                        className="ti ti-shopping-bag-plus"
                        aria-hidden="true"
                      />
                      Adicionar ao carrinho
                    </button>
                  </div>

                  {/* Remover dos favoritos */}
                  <button
                    className="cart-item__remove"
                    onClick={() => favorites.removeFav(product.id)}
                    aria-label={`Remover ${product.name} dos favoritos`}
                  >
                    <i className="ti ti-heart-off" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé */}
        {favorites.items.length > 0 && (
          <div className="drawer__foot">
            <p className="cart-note">
              Clique em "Adicionar ao carrinho" para enviar um item para sua
              seleção.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
