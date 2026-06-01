import type { Product } from './Product';
import type { Testimonial } from './Testimonial';
import type { FaqItem } from './FaqItem';

export const PRODUCTS: Product[] = [
  {
    id: 'cristaleira-cordilheira',
    cat: 'mobiliario',
    catLabel: 'Mobiliário · Imbuia',
    wood: 'imbuia',
    name: 'Cristaleira Cordilheira',
    price: 'R$ 7.400',
    priceNote: 'até 10× sem juros',
    tag: 'Edição limitada',
    tagVariant: 'yellow',
    placeholder: 'Cristaleira',
  },
  {
    id: 'oratorio-mantiqueira',
    cat: 'sagrada',
    catLabel: 'Sagrada · Cedro',
    wood: 'cedro',
    name: 'Oratório Mantiqueira',
    price: 'R$ 3.840',
    priceNote: 'até 10× sem juros',
    tag: 'Sob encomenda',
    tagVariant: 'green',
    placeholder: 'Oratório',
  },
  {
    id: 'porta-vinhos-vale',
    cat: 'decoracao',
    catLabel: 'Decoração · Itaúba',
    wood: 'itauba',
    name: 'Porta-vinhos Vale',
    price: 'R$ 220',
    priceNote: 'à vista no Pix',
    tag: 'Novo',
    tagVariant: 'yellow',
    placeholder: 'Porta-vinhos',
  },
  {
    id: 'cruz-serra-pequena',
    cat: 'sagrada',
    catLabel: 'Sagrada · Peroba',
    wood: 'peroba',
    name: 'Cruz Serra Pequena',
    price: 'R$ 380',
    priceNote: 'até 4× sem juros',
    placeholder: 'Cruz',
  },
  {
    id: 'banco-sertao',
    cat: 'mobiliario',
    catLabel: 'Mobiliário · Imbuia',
    wood: 'imbuia',
    name: 'Banco Sertão',
    price: 'R$ 1.260',
    priceNote: 'até 6× sem juros',
    placeholder: 'Banco',
  },
  {
    id: 'casinha-passaros',
    cat: 'decoracao',
    catLabel: 'Decoração · Cedro',
    wood: 'cedro',
    name: 'Casinha Pássaros',
    price: 'R$ 145',
    priceNote: 'à vista no Pix',
    tag: 'Promoção',
    tagVariant: 'yellow',
    placeholder: 'Casinha',
  },
  {
    id: 'suporte-biblia-alvorada',
    cat: 'sagrada',
    catLabel: 'Sagrada · Imbuia',
    wood: 'imbuia',
    name: 'Suporte Bíblia Alvorada',
    price: 'R$ 480',
    priceNote: 'até 4× sem juros',
    placeholder: 'Suporte Bíblia',
  },
  {
    id: 'arvore-cerrado',
    cat: 'sazonal',
    catLabel: 'Sazonal · Pinus',
    wood: 'pinus',
    name: 'Árvore Cerrado',
    price: 'R$ 320',
    priceNote: 'entrega em 30 dias',
    tag: 'Pré-venda',
    tagVariant: 'yellow',
    placeholder: 'Árvore',
  },
];

export const TESTIMONIALS: Testimonial[][] = [
  [
    {
      initials: 'MB',
      name: 'Marina B.',
      location: 'Curitiba · cristaleira',
      text: 'Encomendei uma cristaleira pra herdar. Chegou com a história da madeira anotada atrás. É outra coisa — chega a emocionar.',
    },
    {
      initials: 'LA',
      name: 'Lucas e Ana',
      location: 'São Paulo · aparador',
      text: 'Acompanhei o processo todo no WhatsApp. Em oito semanas a peça estava em casa, encaixada milimetricamente. Vale cada centavo.',
    },
    {
      initials: 'RP',
      name: 'Pe. Roberto',
      location: 'Belo Horizonte · sagrada',
      text: 'Já encomendei sete cruzes em datas especiais da família. A consistência da qualidade é o que mais me impressiona.',
    },
  ],
  [
    {
      initials: 'CG',
      name: 'Camila G.',
      location: 'São Paulo · porta-vinhos',
      text: 'O porta-vinhos virou o centro de qualquer jantar em casa. Recebi com um livreto explicando a origem da madeira. Detalhe absurdo.',
    },
    {
      initials: 'FT',
      name: 'Felipe T.',
      location: 'Florianópolis · aparador',
      text: 'Encomenda sob medida pra cozinha. Sete semanas de prazo, entregou em seis. Ferragens de primeira, encaixe perfeito.',
    },
    {
      initials: 'RB',
      name: 'Renata B.',
      location: 'Goiânia · banco autoral',
      text: 'Mandei uma foto do tronco que tinha no quintal e a Cris fez um banco. Levou tempo, mas a peça é única no mundo.',
    },
  ],
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Qual o prazo médio de produção?',
    a: 'Entre 4 e 12 semanas, dependendo da peça. Mobiliário grande tende a 8-10 semanas; peças menores em 4-6. Para pronta-entrega, veja a seção "disponíveis agora".',
  },
  {
    q: 'Como funciona a encomenda sob medida?',
    a: 'Você conta a ideia, a gente envia uma proposta em 48h com cronograma e estimativa. Aprovado o desenho e o cronograma, iniciamos a produção. Pagamento em duas parcelas — 50% na aprovação, 50% antes da entrega.',
  },
  {
    q: 'Vocês entregam em todo o Brasil?',
    a: 'Sim. Trabalhamos com transportadora dedicada e seguro total. Para São Paulo capital, fazemos entrega monitorada com a nossa equipe.',
  },
  {
    q: 'Que madeiras vocês trabalham?',
    a: 'Principalmente imbuia, cedro, peroba-rosa, jequitibá e itaúba. Todas com origem certificada ou de reaproveitamento. Para encomendas específicas, podemos buscar outras espécies.',
  },
  {
    q: 'Há garantia?',
    a: 'Sim, garantia vitalícia contra defeitos de marcenaria e manutenção sem custo. O cuidado com madeira viva nós ensinamos junto com a peça.',
  },
];

export const CATEGORIES = [
  {
    key: 'mobiliario',
    name: 'Mobiliário',
    count: 28,
    placeholder: 'Coleção Mobiliário',
  },
  {
    key: 'sagrada',
    name: 'Sagrada',
    count: 42,
    placeholder: 'Coleção Sagrada',
  },
  {
    key: 'decoracao',
    name: 'Decoração',
    count: 63,
    placeholder: 'Coleção Decoração',
  },
  {
    key: 'sazonal',
    name: 'Sazonal',
    count: 19,
    placeholder: 'Coleção Sazonal',
  },
] as const;

export const FILTERS = [
  { key: 'all', label: 'Todas', count: 152 },
  { key: 'mobiliario', label: 'Mobiliário', count: 28 },
  { key: 'sagrada', label: 'Sagrada', count: 42 },
  { key: 'decoracao', label: 'Decoração', count: 63 },
  { key: 'sazonal', label: 'Sazonal', count: 19 },
] as const;

export const TRUST_ITEMS = [
  { ico: '✦', t: 'Feito à mão', d: 'No ateliê de Mairiporã, SP' },
  { ico: '⊕', t: 'Frete monitorado', d: 'Embalagem e transporte assistido' },
  { ico: '∞', t: 'Garantia vitalícia', d: 'Manutenção sem custo' },
  { ico: '◑', t: '10× sem juros', d: 'Cartão ou Pix com 5% off' },
] as const;

export const IG_POSTS = [
  'Textura',
  'Mãos',
  'Cristaleira',
  'Ateliê',
  'Casinha',
  'Oratório',
] as const;
