import type { FC } from 'react';
import { useCartContext } from '../../contexts/CartContext';

export const CartDrawer: FC = () => {
  const { cart, closeDrawer, activeDrawer } = useCartContext();
  const open = activeDrawer === 'cart';

  const handleWhatsApp = () => {
    const msg = cart.buildWhatsAppMessage();
    // waNumber vem do Firestore via settings — aqui usamos variável de ambiente como fallback
    const number = import.meta.env.VITE_WA_NUMBER ?? '5511999990000';
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
      '_blank',
    );
  };

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
        aria-label="Carrinho"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabeçalho */}
        <div className="drawer__head">
          <div className="drawer__title">
            <i className="ti ti-shopping-bag" aria-hidden="true" />
            Carrinho
            {cart.totalItems > 0 && (
              <span className="drawer__count">{cart.totalItems}</span>
            )}
          </div>
          <button
            className="drawer__close"
            onClick={closeDrawer}
            aria-label="Fechar carrinho"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="drawer__body">
          {cart.items.length === 0 ? (
            <div className="drawer__empty">
              <i className="ti ti-shopping-bag" aria-hidden="true" />
              <p>Seu carrinho está vazio.</p>
              <button className="btn btn--yellow" onClick={closeDrawer}>
                Ver produtos
              </button>
            </div>
          ) : (
            <ul className="cart-list">
              {cart.items.map((item) => (
                <li className="cart-item" key={item.id}>
                  {/* Imagem */}
                  <div className="cart-item__img">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div className="cart-item__img-placeholder">
                        <i className="ti ti-photo" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    <div className="cart-item__cat">{item.catLabel}</div>
                    <div className="cart-item__price">{item.price}</div>

                    {/* Quantidade */}
                    <div className="cart-item__qty">
                      <button
                        className="qty-btn"
                        onClick={() => cart.decrementItem(item.id)}
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => cart.incrementItem(item.id)}
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remover */}
                  <button
                    className="cart-item__remove"
                    onClick={() => cart.removeItem(item.id)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <i className="ti ti-trash" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé com subtotal */}
        {cart.items.length > 0 && (
          <div className="drawer__foot">
            <div className="cart-subtotal">
              <span>Subtotal estimado</span>
              <span className="cart-subtotal__value">
                {cart.subtotalFormatted}
              </span>
            </div>
            <p className="cart-note">
              Valor sujeito a confirmação. Frete calculado pelo atendimento.
            </p>
            <button
              className="btn btn--yellow drawer__cta"
              onClick={handleWhatsApp}
            >
              <i className="ti ti-brand-whatsapp" aria-hidden="true" />
              Finalizar pelo WhatsApp
            </button>
            <button className="drawer__clear" onClick={cart.clearCart}>
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
