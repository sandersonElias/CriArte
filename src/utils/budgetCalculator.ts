import type { BudgetForm, BudgetResult } from '../models/Budget';

const TIPO: Record<string, number> = {
  mobiliario: 1.0,
  sagrada: 0.6,
  decoracao: 0.4,
  sazonal: 0.45,
};

const MAD: Record<string, number> = {
  imbuia: 1.0,
  cedro: 0.85,
  peroba: 0.95,
  itauba: 1.1,
  jequitiba: 0.9,
};

const ACAB: Record<string, number> = {
  cera: 1.0,
  verniz: 1.05,
  stain: 1.12,
};

const URG: Record<string, number> = {
  padrao: 1.0,
  expressa: 1.3,
};

export function calcBudget(form: BudgetForm): BudgetResult {
  const vol = (form.largura * form.profundidade * form.altura) / 1000;
  const base = vol * 9;
  const factor =
    (TIPO[form.tipo] ?? 1) *
    (MAD[form.madeira] ?? 1) *
    (ACAB[form.acabamento] ?? 1) *
    (URG[form.urgencia] ?? 1);

  const mid = Math.max(280, base * factor);
  const min = Math.round((mid * 0.85) / 50) * 50;
  const max = Math.round((mid * 1.18) / 50) * 50;

  const semBase =
    form.tipo === 'mobiliario' ? 7 : form.tipo === 'sagrada' ? 5 : 3;
  const semExtra = form.urgencia === 'expressa' ? -2 : 3;
  const prazoMin = Math.max(2, semBase);
  const prazoMax = semBase + semExtra;

  return {
    min: 'R$ ' + min.toLocaleString('pt-BR'),
    max: 'R$ ' + max.toLocaleString('pt-BR'),
    prazo: `${prazoMin}–${prazoMax} semanas`,
  };
}

export function buildBudgetWaMessage(
  form: BudgetForm,
  result: BudgetResult,
): string {
  return [
    'Olá! Quero um orçamento sob medida na CRI Artes.',
    `• Tipo: ${form.tipo}`,
    `• Madeira: ${form.madeira}`,
    `• Dimensões: ${form.largura}×${form.profundidade}×${form.altura} cm`,
    `• Acabamento: ${form.acabamento}`,
    `• Urgência: ${form.urgencia}`,
    `(Estimativa da página: ${result.min} – ${result.max})`,
  ].join('\n');
}
