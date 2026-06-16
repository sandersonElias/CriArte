import type { FC } from 'react';
import { useSearchViewModel } from '../../viewmodels/useSearchViewModel';
import { useCartContext } from '../../contexts/CartContext';
import { useRouterContext } from '../../contexts/RouterContext';
import { ImageSlot } from './ImageSlot';
import type { Product } from '../../models/Product';

// ─── Ícones inline ────────────────────────────────────────────────────────────
const IconSearch = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width={20}
    height={20}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" />
  </svg>
);
const IconX = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width={16}
    height={16}
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconBag = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width={14}
    height={14}
    aria-hidden="true"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const IconArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width={14}
    height={14}
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// ─── Realça texto encontrado ──────────────────────────────────────────────────
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="search-mark">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  open: boolean;
  onClose: () => void;
  query: string;
  inputRef: React.RefObject<HTMLInputElement>;
  groups: ReturnType<typeof useSearchViewModel>['groups'];
  isEmpty: boolean;
  showResults: boolean;
  totalResults: number;
  handleQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export const SearchModal: FC<Props> = ({
  open,
  onClose,
  query,
  inputRef,
  groups,
  isEmpty,
  showResults,
  totalResults,
  handleQuery,
}) => {
  const { handleAddToCart } = useCartContext();
  const { goProduct } = useRouterContext();

  // Navega para a página do produto e fecha o modal
  const handleGoProduct = (product: Product) => {
    onClose();
    goProduct(product.id);
  };

  // Adiciona ao carrinho sem fechar o modal
  const handleAdd = (product: Product) => {
    handleAddToCart(product);
  };

  if (!open) return null;

  return (
    <div
      className="search-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar produtos"
    >
      <div className="search-modal">
        {/* Input ─────────────────────────────────────────────────────────────── */}
        <div className="search-input-wrap">
          <span className="search-input-icon">
            <IconSearch />
          </span>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Buscar por nome, madeira ou categoria…"
            value={query}
            onChange={handleQuery}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => {
                handleQuery({
                  target: { value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
                inputRef.current?.focus();
              }}
              aria-label="Limpar busca"
            >
              <IconX />
            </button>
          )}
          <button
            className="search-close-btn"
            onClick={onClose}
            aria-label="Fechar busca"
          >
            ESC
          </button>
        </div>

        {/* Corpo ──────────────────────────────────────────────────────────────── */}
        <div className="search-body">
          {/* Dicas iniciais */}
          {!showResults && (
            <div className="search-tips">
              <p className="search-tips__title">Sugestões de busca</p>
              <div className="search-chips">
                {[
                  'Imbuia',
                  'Mobiliário',
                  'Sagrada',
                  'Cedro',
                  'Decoração',
                  'Sazonal',
                ].map((tip) => (
                  <button
                    key={tip}
                    className="search-chip"
                    onClick={() =>
                      handleQuery({
                        target: { value: tip },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nenhum resultado */}
          {isEmpty && (
            <div className="search-empty">
              <IconSearch />
              <p>
                Nenhum produto encontrado para <strong>"{query}"</strong>
              </p>
              <span>
                Tente buscar por nome, madeira (ex: Imbuia) ou categoria
              </span>
            </div>
          )}

          {/* Resultados agrupados */}
          {showResults && !isEmpty && (
            <>
              <p className="search-count">
                {totalResults}{' '}
                {totalResults === 1
                  ? 'produto encontrado'
                  : 'produtos encontrados'}
              </p>

              {groups.map((group) => (
                <div key={group.label} className="search-group">
                  <div className="search-group__label">{group.label}</div>
                  <ul className="search-results">
                    {group.products.map((product) => (
                      <li key={product.id} className="search-result">
                        {/* Imagem — clica e vai para a página */}
                        <div
                          className="search-result__img"
                          onClick={() => handleGoProduct(product)}
                          style={{ cursor: 'pointer' }}
                        >
                          <ImageSlot
                            imageUrl={product.imageUrl}
                            placeholder={product.placeholder}
                            alt={product.name}
                          />
                        </div>

                        {/* Info — clica e vai para a página */}
                        <div
                          className="search-result__info"
                          onClick={() => handleGoProduct(product)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="search-result__name">
                            <Highlight text={product.name} query={query} />
                          </div>
                          <div className="search-result__meta">
                            <span>
                              <Highlight
                                text={product.catLabel}
                                query={query}
                              />
                            </span>
                            {product.wood && (
                              <>
                                <span className="search-result__dot">·</span>
                                <span>
                                  <Highlight
                                    text={product.wood}
                                    query={query}
                                  />
                                </span>
                              </>
                            )}
                          </div>
                          <div className="search-result__price">
                            {product.price}
                          </div>
                        </div>

                        {/* Ações: ver página + adicionar ao carrinho */}
                        <div className="search-result__btns">
                          <button
                            className="search-result__view"
                            onClick={() => handleGoProduct(product)}
                            aria-label={`Ver ${product.name}`}
                            title="Ver produto"
                          >
                            <IconArrow />
                          </button>
                          <button
                            className="search-result__add"
                            onClick={() => handleAdd(product)}
                            aria-label={`Adicionar ${product.name} ao carrinho`}
                            title="Adicionar ao carrinho"
                          >
                            <IconBag />
                            <span>Adicionar</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
