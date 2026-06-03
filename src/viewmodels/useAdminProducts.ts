import { useState, useEffect, useCallback } from 'react';
import {
  subscribeCollection,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../services/firestoreService';
import type { FSProduct } from '../models/FirestoreModels';

const EMPTY: Omit<FSProduct, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  cat: 'mobiliario',
  catLabel: 'Mobiliário',
  wood: '',
  price: '',
  priceNote: '',
  tag: '',
  tagVariant: 'yellow',
  imageUrl: '',
  active: true,
  order: 0,
};

export function useAdminProducts() {
  const [products, setProducts] = useState<FSProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FSProduct | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Escuta em tempo real
  useEffect(() => {
    const unsub = subscribeCollection<FSProduct>(
      'products',
      (docs) => {
        setProducts(docs.sort((a, b) => a.order - b.order));
        setLoading(false);
      },
      'order',
    );
    return unsub;
  }, []);

  const openNew = useCallback(() => {
    setEditing(null);
    setForm({ ...EMPTY, order: products.length });
    setError(null);
  }, [products.length]);

  const openEdit = useCallback((p: FSProduct) => {
    setEditing(p);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, ...rest } = p;
    setForm(rest as typeof EMPTY);
    setError(null);
  }, []);

  const closeForm = useCallback(() => {
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
      if (!form.name.trim() || !form.price.trim()) {
        setError('Nome e preço são obrigatórios.');
        return;
      }
      setBusy(true);
      setError(null);
      try {
        if (editing) {
          await updateDocument<FSProduct>('products', editing.id, form);
        } else {
          await createDocument<FSProduct>('products', form);
        }
        closeForm();
      } catch {
        setError('Erro ao salvar. Tente novamente.');
      } finally {
        setBusy(false);
      }
    },
    [editing, form, closeForm],
  );

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Excluir este produto?')) return;
    await deleteDocument('products', id);
  }, []);

  const handleToggleActive = useCallback(async (p: FSProduct) => {
    await updateDocument<FSProduct>('products', p.id, { active: !p.active });
  }, []);

  return {
    products,
    loading,
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
