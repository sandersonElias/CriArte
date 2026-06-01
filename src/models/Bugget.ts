export interface BudgetForm {
  tipo: string;
  madeira: string;
  largura: number;
  profundidade: number;
  altura: number;
  acabamento: string;
  urgencia: string;
}

export interface BudgetResult {
  min: string;
  max: string;
  prazo: string;
}
