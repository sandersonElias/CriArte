import { useState, useEffect, useCallback } from 'react';
import {
  subscribeCollection,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../services/firestoreService';
import type { FSTestimonial } from '../models/FirestoreModels';

const EMPTY: Omit<FSTestimonial, 'id' | 'createdAt' | 'updatedAt'> = {
  initials: '',
  name: '',
  location: '',
  text: '',
  rating: 5,
  active: true,
  order: 0,
};

export function useAdminTestimonials() {
  const [items, setItems] = useState<FSTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FSTestimonial | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCollection<FSTestimonial>(
      'testimonials',
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

  const openEdit = useCallback((t: FSTestimonial) => {
    setEditing(t);
    const { id, createdAt, updatedAt, ...rest } = t;
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
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value, type } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : type === 'number'
              ? Number(value)
              : value,
      }));
    },
    [],
  );

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name.trim() || !form.text.trim()) {
        setError('Nome e texto são obrigatórios.');
        return;
      }
      setBusy(true);
      setError(null);
      try {
        if (editing) {
          await updateDocument<FSTestimonial>('testimonials', editing.id, form);
        } else {
          await createDocument<FSTestimonial>('testimonials', form);
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
    if (!confirm('Excluir este depoimento?')) return;
    await deleteDocument('testimonials', id);
  }, []);

  const handleToggleActive = useCallback(async (t: FSTestimonial) => {
    await updateDocument<FSTestimonial>('testimonials', t.id, {
      active: !t.active,
    });
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
