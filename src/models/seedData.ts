/**
 * models/seedData.ts
 *
 * Dados ESTÁTICOS do site — não vêm do Firestore.
 *
 * O que foi removido daqui e por quê:
 *   PRODUCTS     → Firestore (coleção "products")     — gerenciado no admin
 *   TESTIMONIALS → Firestore (coleção "testimonials") — gerenciado no admin
 *   FAQ_ITEMS    → Firestore (coleção "faq")          — gerenciado no admin
 *   CATEGORIES   → Firestore (coleção "categories")   — gerenciado no admin
 *   FILTERS      → derivado dos produtos em tempo real (useProductsViewModel)
 */

// ─── Trust strip — fixo no layout, não varia por cliente ─────────────────────
export const TRUST_ITEMS = [
  { ico: '✦', t: 'Feito à mão', d: 'No ateliê de Mairiporã, SP' },
  { ico: '⊕', t: 'Frete monitorado', d: 'Embalagem e transporte assistido' },
  { ico: '∞', t: 'Garantia vitalícia', d: 'Manutenção sem custo' },
  { ico: '◑', t: '10× sem juros', d: 'Cartão ou Pix com 5% off' },
] as const;

// ─── Grid do Instagram — posts fixos até integração real ─────────────────────
export const IG_POSTS = [
  'Textura',
  'Mãos',
  'Cristaleira',
  'Ateliê',
  'Casinha',
  'Oratório',
] as const;
