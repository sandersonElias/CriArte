import { useState, useMemo, useCallback } from 'react';
import { calcBudget, buildBudgetWaMessage } from '../utils/budgetCalculator';
import { waLink } from '../utils/whatsapp';
import type { BudgetForm } from '../models/Bugget';

const DEFAULT_FORM: BudgetForm = {
  tipo: 'mobiliario',
  madeira: 'imbuia',
  largura: 140,
  profundidade: 45,
  altura: 180,
  acabamento: 'cera',
  urgencia: 'padrao',
};

export function useBudgetViewModel() {
  const [form, setForm] = useState<BudgetForm>(DEFAULT_FORM);

  const result = useMemo(() => calcBudget(form), [form]);

  const updateField = useCallback(
    <K extends keyof BudgetForm>(key: K, value: BudgetForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      updateField(
        name as keyof BudgetForm,
        type === 'number' ? Number(value) : value,
      );
    },
    [updateField],
  );

  const submitToWhatsApp = useCallback(() => {
    const msg = buildBudgetWaMessage(form, result);
    window.open(waLink(msg), '_blank');
  }, [form, result]);

  return { form, result, handleChange, submitToWhatsApp };
}
