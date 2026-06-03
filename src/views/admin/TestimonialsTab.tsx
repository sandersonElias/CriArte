import type { FC } from 'react';
import { useAdminTestimonials } from '../../viewmodels/useAdminTestimonials';

export const TestimonialsTab: FC = () => {
  const vm = useAdminTestimonials();

  return (
    <div>
      <div className="adm-toolbar">
        <span className="adm-toolbar__count">
          {vm.items.length} depoimentos
        </span>
        <button className="adm-btn adm-btn--primary" onClick={vm.openNew}>
          <i className="ti ti-plus" aria-hidden="true" /> Novo depoimento
        </button>
      </div>

      {vm.loading ? (
        <div className="adm-loading">Carregando…</div>
      ) : vm.items.length === 0 ? (
        <div className="adm-empty">
          <i className="ti ti-quote" aria-hidden="true" />
          <p>Nenhum depoimento cadastrado ainda.</p>
          <button className="adm-btn adm-btn--primary" onClick={vm.openNew}>
            Cadastrar primeiro depoimento
          </button>
        </div>
      ) : (
        <div className="adm-cards">
          {vm.items.map((t) => (
            <div
              key={t.id}
              className={`adm-tcard${!t.active ? ' adm-tcard--muted' : ''}`}
            >
              <div className="adm-tcard__head">
                <div className="adm-tcard__avatar">{t.initials}</div>
                <div>
                  <div className="adm-tcard__name">{t.name}</div>
                  <div className="adm-tcard__loc">{t.location}</div>
                </div>
                <div className="adm-tcard__actions">
                  <button
                    className={`adm-toggle${t.active ? ' adm-toggle--on' : ''}`}
                    onClick={() => vm.handleToggleActive(t)}
                    aria-label={t.active ? 'Desativar' : 'Ativar'}
                  />
                  <button
                    className="adm-btn adm-btn--ghost adm-btn--sm"
                    onClick={() => vm.openEdit(t)}
                  >
                    <i className="ti ti-edit" aria-hidden="true" />
                  </button>
                  <button
                    className="adm-btn adm-btn--danger adm-btn--sm"
                    onClick={() => vm.handleDelete(t.id)}
                  >
                    <i className="ti ti-trash" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="adm-tcard__stars">
                {'★'.repeat(t.rating)}
                {'☆'.repeat(5 - t.rating)}
              </div>
              <p className="adm-tcard__text">"{t.text}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal — só renderiza quando modalOpen = true */}
      {vm.modalOpen && (
        <div
          className="adm-modal-bg"
          onClick={(e) => e.target === e.currentTarget && vm.closeForm()}
        >
          <div className="adm-modal">
            <div className="adm-modal__head">
              <h3>{vm.editing ? 'Editar depoimento' : 'Novo depoimento'}</h3>
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
                  <label>Iniciais (ex: MB)</label>
                  <input
                    name="initials"
                    maxLength={3}
                    value={vm.form.initials}
                    onChange={vm.handleChange}
                  />
                </div>
                <div className="adm-field">
                  <label>Localização / peça</label>
                  <input
                    name="location"
                    value={vm.form.location}
                    onChange={vm.handleChange}
                    placeholder="São Paulo · cristaleira"
                  />
                </div>
                <div className="adm-field">
                  <label>Nota (1–5)</label>
                  <input
                    type="number"
                    name="rating"
                    min={1}
                    max={5}
                    value={vm.form.rating}
                    onChange={vm.handleChange}
                  />
                </div>
                <div className="adm-field adm-field--full">
                  <label>Texto do depoimento *</label>
                  <textarea
                    name="text"
                    rows={4}
                    value={vm.form.text}
                    onChange={vm.handleChange}
                    required
                  />
                </div>
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
