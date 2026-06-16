import { useState, useEffect } from 'react';
import { subscribeDocument } from '../services/firestoreService';
import type { FSSettings } from '../models/FirestoreModels';

const DEFAULTS: FSSettings = {
  id: 'global',
  announceText:
    'Frete monitorado para todo o Brasil · 10× sem juros · <strong>Ateliê aberto às quartas</strong>',
  announceActive: true,
  waNumber: '5511999990000',
  heroChip: 'Coleção inverno · disponível agora',
  heroTitle: 'Peças em madeira que duram gerações.',
  heroLede:
    'Mobiliário, decoração e arte sacra feitos à mão em ateliê próprio. Edições limitadas, sob medida ou prontas para envio.',
  instagramHandle: '@criartes_cl',
  contactEmail: 'atelie@criartes.cl',
  contactPhone: '+55 11 9 9999-0000',
  contactHours: 'Seg–Sex · 9h às 18h',
};

export function useSettingsViewModel() {
  const [settings, setSettings] = useState<FSSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeDocument<FSSettings>('settings', 'global', (doc) => {
      if (doc) setSettings({ ...DEFAULTS, ...doc });
      setLoading(false);
    });
    return unsub;
  }, []);

  return { settings, loading };
}
