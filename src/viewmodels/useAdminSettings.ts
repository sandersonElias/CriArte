import { useState, useEffect, useCallback } from 'react';
import {
  subscribeDocument,
  upsertDocument,
} from '../services/firestoreService';
import type { FSSettings } from '../models/FirestoreModels';

const DEFAULTS: Omit<FSSettings, 'id' | 'createdAt' | 'updatedAt'> = {
  announceText:
    'Frete monitorado para todo o Brasil · 10× sem juros · Ateliê aberto às quartas',
  announceActive: true,
  waNumber: '5511999990000',
  heroChip: 'Coleção inverno · disponível agora',
  heroTitle: 'Peças em madeira que duram gerações.',
  heroLede:
    'Mobiliário, decoração e arte sacra feitos à mão em ateliê próprio.',
  instagramHandle: '@criartes_cl',
  contactEmail: 'atelie@criartes.cl',
  contactPhone: '+55 11 9 9999-0000',
  contactHours: 'Seg–Sex · 9h às 18h',
};

export function useAdminSettings() {
  const [form, setForm] = useState({ ...DEFAULTS });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // O documento de configurações tem sempre id = "global"
  useEffect(() => {
    const unsub = subscribeDocument<FSSettings>('settings', 'global', (doc) => {
      if (doc) {
        const { id, createdAt, updatedAt, ...rest } = doc;
        setForm({ ...DEFAULTS, ...rest });
      }
      setLoading(false);
    });
    return unsub;
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
      setBusy(true);
      setError(null);
      setSaved(false);
      try {
        await upsertDocument<FSSettings>('settings', 'global', form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch {
        setError('Erro ao salvar configurações.');
      } finally {
        setBusy(false);
      }
    },
    [form],
  );

  return { form, loading, busy, saved, error, handleChange, handleSave };
}
