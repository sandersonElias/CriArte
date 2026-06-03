import { useState, useEffect, useCallback } from 'react';
import {
  subscribeCollection,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../services/firestoreService';
import type { FSFaqItem } from '../models/FirestoreModels';

const EMPTY: Omit<FSFaqItem, 'id' | 'createdAt' | 'updatedAt'> = {
  q: '',
  a: '',
  active: true,
  order: 0,
};

export function useAdminFaq() {
  const [items, setItems] = useState<FSFaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FSFaqItem | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCollection<FSFaqItem>(
      'faq',
      (docs) => {
        setItems(docs.sort((a, b) => a.order - b.order));
        setLoading(false);
      },
      'order',
    );
    return unsub;
  }, []);

  const openNew = useCallback(() => {
    setEditing(null);
    setForm({ ...EMPTY, order: items.length });
    setError(null);
    setModalOpen(true);
  }, [items.length]);

  const openEdit = useCallback((f: FSFaqItem) => {
    setEditing(f);
    const { id, createdAt, updatedAt, ...rest } = f;
    void id;
    void createdAt;
    void updatedAt;
    setForm(rest as typeof EMPTY);
    setError(null);
    setModalOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setModalOpen(false);
    setEditing(null);
    setError(null);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    [],
  );

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.q.trim() || !form.a.trim()) {
        setError('Pergunta e resposta são obrigatórias.');
        return;
      }
      setBusy(true);
      setError(null);
      try {
        if (editing) {
          await updateDocument<FSFaqItem>('faq', editing.id, form);
        } else {
          await createDocument<FSFaqItem>('faq', form);
        }
        closeForm();
      } catch {
        setError('Erro ao salvar.');
      } finally {
        setBusy(false);
      }
    },
    [editing, form, closeForm],
  );

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Excluir esta pergunta?')) return;
    await deleteDocument('faq', id);
  }, []);

  const handleToggleActive = useCallback(async (f: FSFaqItem) => {
    await updateDocument<FSFaqItem>('faq', f.id, { active: !f.active });
  }, []);

  return {
    items,
    loading,
    modalOpen,
    editing,
    form,
    busy,
    error,
    openNew,
    openEdit,
    closeForm,
    handleChange,
    handleSave,
    handleDelete,
    handleToggleActive,
  };
}
