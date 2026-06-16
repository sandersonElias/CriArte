export function parsePriceBRL(price: string): number {
  const clean = price
    .replace(/R\$\s*/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();
  return parseFloat(clean) || 0;
}

export function formatPriceBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
