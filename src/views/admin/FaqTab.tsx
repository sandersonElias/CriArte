import type { FC } from 'react';
import { useAdminFaq } from '../../viewmodels/useAdminFaq';

export const FaqTab: FC = () => {
  const vm = useAdminFaq();

  return (
    <div>
      <div className="adm-toolbar">
        <span className="adm-toolbar__count">{vm.items.length} perguntas</span>
        <button className="adm-btn adm-btn--primary" onClick={vm.openNew}>
          <i className="ti ti-plus" aria-hidden="true" /> Nova pergunta
        </button>
      </div>

      {vm.loading ? (
        <div className="adm-loading">Carregando…</div>
      ) : (
        <div className="adm-faq-list">
          {vm.items.map((f, i) => (
            <div
              key={f.id}
              className={`adm-faq-item${!f.active ? ' adm-faq-item--muted' : ''}`}
            >
              <div className="adm-faq-item__num">{i + 1}</div>
              <div className="adm-faq-item__body">
                <div className="adm-faq-item__q">{f.q}</div>
                <div className="adm-faq-item__a">{f.a}</div>
              </div>
              <div className="adm-faq-item__actions">
                <button
                  className={`adm-toggle${f.active ? ' adm-toggle--on' : ''}`}
                  onClick={() => vm.handleToggleActive(f)}
                  aria-label={f.active ? 'Desativar' : 'Ativar'}
                />
                <button
                  className="adm-btn adm-btn--ghost adm-btn--sm"
                  onClick={() => vm.openEdit(f)}
                >
                  <i className="ti ti-edit" aria-hidden="true" />
                </button>
                <button
                  className="adm-btn adm-btn--danger adm-btn--sm"
                  onClick={() => vm.handleDelete(f.id)}
                >
                  <i className="ti ti-trash" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {vm.editing !== undefined && (
        <div
          className="adm-modal-bg"
          onClick={(e) => e.target === e.currentTarget && vm.closeForm()}
        >
          <div className="adm-modal">
            <div className="adm-modal__head">
              <h3>{vm.editing ? 'Editar pergunta' : 'Nova pergunta'}</h3>
              <button
                className="adm-modal__close"
                onClick={vm.closeForm}
                aria-label="Fechar"
              >
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={vm.handleSave} className="adm-modal__body">
              <div className="adm-field">
                <label>Pergunta *</label>
                <input
                  name="q"
                  value={vm.form.q}
                  onChange={vm.handleChange}
                  required
                />
              </div>
              <div className="adm-field">
                <label>Resposta *</label>
                <textarea
                  name="a"
                  rows={5}
                  value={vm.form.a}
                  onChange={vm.handleChange}
                  required
                />
              </div>
              <div className="adm-grid-2">
                <div className="adm-field">
                  <label>Ordem</label>
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
                    Visível no site
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
                  {vm.busy ? 'Salvando…' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
