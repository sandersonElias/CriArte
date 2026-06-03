import { useState, useEffect, useCallback, type FC } from 'react';
import {
  subscribeCollection,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../../services/firestoreService';
import type { FSCategory } from '../../models/FirestoreModels';

const EMPTY: Omit<FSCategory, 'id' | 'createdAt' | 'updatedAt'> = {
  key: '',
  name: '',
  count: 0,
  placeholder: '',
  order: 0,
};

export const CategoriesTab: FC = () => {
  const [items, setItems] = useState<FSCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FSCategory | null | undefined>(
    undefined,
  );
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCollection<FSCategory>(
      'categories',
      (docs) => {
        setItems(docs.sort((a, b) => a.order - b.order));
        setLoading(false);
      },
      'order',
    );
    return unsub;
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY, order: items.length });
    setError(null);
  };
  const openEdit = (c: FSCategory) => {
    setEditing(c);
    const { id, createdAt, updatedAt, ...rest } = c;
    setForm(rest as typeof EMPTY);
    setError(null);
  };
  const closeForm = () => {
    setEditing(undefined);
    setError(null);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }, []);

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name.trim() || !form.key.trim()) {
        setError('Nome e chave são obrigatórios.');
        return;
      }
      setBusy(true);
      setError(null);
      try {
        if (editing) {
          await updateDocument<FSCategory>('categories', editing.id, form);
        } else {
          await createDocument<FSCategory>('categories', form);
        }
        closeForm();
      } catch {
        setError('Erro ao salvar.');
      } finally {
        setBusy(false);
      }
    },
    [editing, form],
  );

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Excluir esta categoria?')) return;
    await deleteDocument('categories', id);
  }, []);

  return (
    <div>
      <div className="adm-toolbar">
        <span className="adm-toolbar__count">{items.length} categorias</span>
        <button className="adm-btn adm-btn--primary" onClick={openNew}>
          <i className="ti ti-plus" aria-hidden="true" /> Nova categoria
        </button>
      </div>

      {loading ? (
        <div className="adm-loading">Carregando…</div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Chave</th>
                <th>Contagem</th>
                <th>Placeholder</th>
                <th>Ordem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id}>
                  <td className="adm-table__primary">{c.name}</td>
                  <td>
                    <code>{c.key}</code>
                  </td>
                  <td>{c.count}</td>
                  <td>{c.placeholder}</td>
                  <td>{c.order}</td>
                  <td className="adm-table__actions">
                    <button
                      className="adm-btn adm-btn--ghost adm-btn--sm"
                      onClick={() => openEdit(c)}
                    >
                      <i className="ti ti-edit" aria-hidden="true" />
                    </button>
                    <button
                      className="adm-btn adm-btn--danger adm-btn--sm"
                      onClick={() => handleDelete(c.id)}
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

      {/* Modal */}
      {editing !== undefined && (
        <div
          className="adm-modal-bg"
          onClick={(e) => e.target === e.currentTarget && closeForm()}
        >
          <div className="adm-modal">
            <div className="adm-modal__head">
              <h3>{editing ? 'Editar categoria' : 'Nova categoria'}</h3>
              <button
                className="adm-modal__close"
                onClick={closeForm}
                aria-label="Fechar"
              >
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="adm-modal__body">
              <div className="adm-grid-2">
                <div className="adm-field">
                  <label>Nome *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="adm-field">
                  <label>Chave (slug) *</label>
                  <input
                    name="key"
                    value={form.key}
                    onChange={handleChange}
                    placeholder="mobiliario"
                    required
                  />
                </div>
                <div className="adm-field">
                  <label>Contagem de peças</label>
                  <input
                    type="number"
                    name="count"
                    value={form.count}
                    onChange={handleChange}
                    min={0}
                  />
                </div>
                <div className="adm-field">
                  <label>Texto placeholder</label>
                  <input
                    name="placeholder"
                    value={form.placeholder}
                    onChange={handleChange}
                    placeholder="Coleção Mobiliário"
                  />
                </div>
                <div className="adm-field">
                  <label>Ordem</label>
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    min={0}
                  />
                </div>
              </div>

              {error && <div className="adm-error">{error}</div>}

              <div className="adm-modal__foot">
                <button
                  type="button"
                  className="adm-btn adm-btn--ghost"
                  onClick={closeForm}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="adm-btn adm-btn--primary"
                  disabled={busy}
                >
                  {busy ? 'Salvando…' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
