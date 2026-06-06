import type { FC } from 'react';
import { useAdminProducts } from '../../viewmodels/useAdminProducts';
import { ImageUploader } from './ImageUploader';

const CAT_OPTIONS = [
  { value: 'mobiliario', label: 'Mobiliário' },
  { value: 'sagrada', label: 'Sagrada' },
  { value: 'decoracao', label: 'Decoração' },
  { value: 'sazonal', label: 'Sazonal' },
];

export const ProductsTab: FC = () => {
  const vm = useAdminProducts();

  return (
    <div>
      <div className="adm-toolbar">
        <span className="adm-toolbar__count">
          {vm.products.length} produtos
        </span>
        <button className="adm-btn adm-btn--primary" onClick={vm.openNew}>
          <i className="ti ti-plus" aria-hidden="true" /> Novo produto
        </button>
      </div>

      {vm.loading ? (
        <div className="adm-loading">Carregando…</div>
      ) : vm.products.length === 0 ? (
        <div className="adm-empty">
          <i className="ti ti-package" aria-hidden="true" />
          <p>Nenhum produto cadastrado ainda.</p>
          <button className="adm-btn adm-btn--primary" onClick={vm.openNew}>
            Cadastrar primeiro produto
          </button>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Tag</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vm.products.map((p) => (
                <tr
                  key={p.id}
                  className={!p.active ? 'adm-table__row--muted' : ''}
                >
                  <td>
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="adm-thumb"
                      />
                    ) : (
                      <div className="adm-thumb adm-thumb--empty">
                        <i className="ti ti-photo" aria-hidden="true" />
                      </div>
                    )}
                  </td>
                  <td className="adm-table__primary">{p.name}</td>
                  <td>{p.catLabel}</td>
                  <td>{p.price}</td>
                  <td>
                    {p.tag ? (
                      <span className={`adm-badge adm-badge--${p.tagVariant}`}>
                        {p.tag}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <button
                      className={`adm-toggle${p.active ? ' adm-toggle--on' : ''}`}
                      onClick={() => vm.handleToggleActive(p)}
                      aria-label={p.active ? 'Desativar' : 'Ativar'}
                    />
                  </td>
                  <td className="adm-table__actions">
                    <button
                      className="adm-btn adm-btn--ghost adm-btn--sm"
                      onClick={() => vm.openEdit(p)}
                    >
                      <i className="ti ti-edit" aria-hidden="true" />
                    </button>
                    <button
                      className="adm-btn adm-btn--danger adm-btn--sm"
                      onClick={() => vm.handleDelete(p.id)}
                    >
                      <i className="ti ti-trash" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vm.modalOpen && (
        <div
          className="adm-modal-bg"
          onClick={(e) => e.target === e.currentTarget && vm.closeForm()}
        >
          <div className="adm-modal adm-modal--wide">
            <div className="adm-modal__head">
              <h3>{vm.editing ? 'Editar produto' : 'Novo produto'}</h3>
              <button
                type="button"
                className="adm-modal__close"
                onClick={vm.closeForm}
                aria-label="Fechar"
              >
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={vm.handleSave} className="adm-modal__body">
              {/* Upload de imagem */}
              <div className="adm-field adm-field--full">
                <label>Imagem do produto</label>
                <ImageUploader
                  currentUrl={vm.form.imageUrl}
                  onSuccess={vm.handleImageUpload}
                />
              </div>

              <div className="adm-grid-2">
                <div className="adm-field">
                  <label>Nome *</label>
                  <input
                    name="name"
                    value={vm.form.name}
                    onChange={vm.handleChange}
                    required
                  />
                </div>
                <div className="adm-field">
                  <label>Preço *</label>
                  <input
                    name="price"
                    value={vm.form.price}
                    onChange={vm.handleChange}
                    placeholder="R$ 1.200"
                    required
                  />
                </div>
                <div className="adm-field">
                  <label>Nota do preço</label>
                  <input
                    name="priceNote"
                    value={vm.form.priceNote}
                    onChange={vm.handleChange}
                    placeholder="até 6× sem juros"
                  />
                </div>
                <div className="adm-field">
                  <label>Madeira</label>
                  <input
                    name="wood"
                    value={vm.form.wood}
                    onChange={vm.handleChange}
                  />
                </div>
                <div className="adm-field">
                  <label>Categoria</label>
                  <select
                    name="cat"
                    value={vm.form.cat}
                    onChange={vm.handleChange}
                  >
                    {CAT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="adm-field">
                  <label>Rótulo da categoria</label>
                  <input
                    name="catLabel"
                    value={vm.form.catLabel}
                    onChange={vm.handleChange}
                    placeholder="Mobiliário · Imbuia"
                  />
                </div>
                <div className="adm-field">
                  <label>Tag (opcional)</label>
                  <input
                    name="tag"
                    value={vm.form.tag ?? ''}
                    onChange={vm.handleChange}
                    placeholder="Novo, Promoção…"
                  />
                </div>
                <div className="adm-field">
                  <label>Cor da tag</label>
                  <select
                    name="tagVariant"
                    value={vm.form.tagVariant ?? 'yellow'}
                    onChange={vm.handleChange}
                  >
                    <option value="yellow">Amarela</option>
                    <option value="green">Verde</option>
                  </select>
                </div>
                <div className="adm-field">
                  <label>Ordem de exibição</label>
                  <input
                    type="number"
                    name="order"
                    value={vm.form.order}
                    onChange={vm.handleChange}
                    min={0}
                  />
                </div>
                <div className="adm-field adm-field--check">
                  <label>
                    <input
                      type="checkbox"
                      name="active"
                      checked={vm.form.active}
                      onChange={vm.handleChange}
                    />
                    Produto ativo (visível no site)
                  </label>
                </div>
              </div>

              {vm.error && <div className="adm-error">{vm.error}</div>}

              <div className="adm-modal__foot">
                <button
                  type="button"
                  className="adm-btn adm-btn--ghost"
                  onClick={vm.closeForm}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="adm-btn adm-btn--primary"
                  disabled={vm.busy}
                >
                  {vm.busy ? 'Salvando…' : 'Salvar produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
