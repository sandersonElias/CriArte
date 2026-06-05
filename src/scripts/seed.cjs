const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ─── Verifica se a chave existe ───────────────────────────────────────────────
const keyPath = path.resolve(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(keyPath)) {
  console.error(`
❌  Arquivo não encontrado: scripts/serviceAccountKey.json

Para gerar:
  1. Firebase Console → Configurações ⚙ → Contas de serviço
  2. Clique em "Gerar nova chave privada"
  3. Salve o arquivo como scripts/serviceAccountKey.json
`);
  process.exit(1);
}

// ─── Inicializa o Firebase Admin ──────────────────────────────────────────────
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const now = admin.firestore.FieldValue.serverTimestamp();

// ─── Helper ───────────────────────────────────────────────────────────────────
async function seed(collectionName, docs) {
  console.log(
    `\n📦  Inserindo ${docs.length} documento(s) em "${collectionName}"...`,
  );
  const col = db.collection(collectionName);
  for (const { id, ...data } of docs) {
    const ref = id ? col.doc(id) : col.doc();
    await ref.set({ ...data, createdAt: now, updatedAt: now });
    const label = data.name ?? data.q ?? id ?? ref.id;
    console.log(`  ✓  ${label}`);
  }
}

// ─── Settings ─────────────────────────────────────────────────────────────────
async function seedSettings() {
  console.log('\n⚙️   Inserindo configurações globais (settings/global)...');
  await db.collection('settings').doc('global').set({
    announceText:
      'Frete monitorado para todo o Brasil · 10× sem juros · <strong>Ateliê aberto às quartas</strong>',
    announceActive: true,
    waNumber: '5511999990000',
    heroChip: 'Coleção outono · disponível agora',
    heroTitle: 'Peças em madeira que duram gerações.',
    heroLede:
      'Mobiliário, decoração e arte sacra feitos à mão em ateliê próprio. Edições limitadas, sob medida ou prontas para envio.',
    instagramHandle: '@criartes_cl',
    contactEmail: 'atelie@criartes.cl',
    contactPhone: '+55 11 9 9999-0000',
    contactHours: 'Seg–Sex · 9h às 18h',
    createdAt: now,
    updatedAt: now,
  });
  console.log('  ✓  settings/global');
}

// ─── Categories ───────────────────────────────────────────────────────────────
const categories = [
  {
    key: 'mobiliario',
    name: 'Mobiliário',
    count: 4,
    placeholder: 'Coleção Mobiliário',
    order: 0,
  },
  {
    key: 'sagrada',
    name: 'Sagrada',
    count: 3,
    placeholder: 'Coleção Sagrada',
    order: 1,
  },
  {
    key: 'decoracao',
    name: 'Decoração',
    count: 4,
    placeholder: 'Coleção Decoração',
    order: 2,
  },
  {
    key: 'sazonal',
    name: 'Sazonal',
    count: 2,
    placeholder: 'Coleção Sazonal',
    order: 3,
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────
const products = [
  // Mobiliário
  {
    name: 'Cristaleira Cordilheira',
    cat: 'mobiliario',
    catLabel: 'Mobiliário · Imbuia',
    wood: 'Imbuia',
    price: 'R$ 7.400',
    priceNote: 'até 10× sem juros',
    tag: 'Edição limitada',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 0,
  },
  {
    name: 'Aparador Serra Fina',
    cat: 'mobiliario',
    catLabel: 'Mobiliário · Cedro',
    wood: 'Cedro rosa',
    price: 'R$ 3.200',
    priceNote: 'até 8× sem juros',
    tag: '',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 1,
  },
  {
    name: 'Banco Sertão',
    cat: 'mobiliario',
    catLabel: 'Mobiliário · Imbuia',
    wood: 'Imbuia',
    price: 'R$ 1.260',
    priceNote: 'até 6× sem juros',
    tag: '',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 2,
  },
  {
    name: 'Mesa de Centro Planalto',
    cat: 'mobiliario',
    catLabel: 'Mobiliário · Peroba',
    wood: 'Peroba escura',
    price: 'R$ 2.100',
    priceNote: 'até 6× sem juros',
    tag: 'Sob encomenda',
    tagVariant: 'green',
    imageUrl: '',
    active: true,
    order: 3,
  },
  // Sagrada
  {
    name: 'Oratório Mantiqueira',
    cat: 'sagrada',
    catLabel: 'Sagrada · Cedro',
    wood: 'Cedro rosa',
    price: 'R$ 3.840',
    priceNote: 'até 10× sem juros',
    tag: 'Sob encomenda',
    tagVariant: 'green',
    imageUrl: '',
    active: true,
    order: 4,
  },
  {
    name: 'Cruz Serra Pequena',
    cat: 'sagrada',
    catLabel: 'Sagrada · Peroba',
    wood: 'Peroba escura',
    price: 'R$ 380',
    priceNote: 'até 4× sem juros',
    tag: '',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 5,
  },
  {
    name: 'Suporte Bíblia Alvorada',
    cat: 'sagrada',
    catLabel: 'Sagrada · Imbuia',
    wood: 'Imbuia',
    price: 'R$ 480',
    priceNote: 'até 4× sem juros',
    tag: '',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 6,
  },
  // Decoração
  {
    name: 'Porta-vinhos Vale',
    cat: 'decoracao',
    catLabel: 'Decoração · Itaúba',
    wood: 'Itaúba',
    price: 'R$ 220',
    priceNote: 'à vista no Pix',
    tag: 'Novo',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 7,
  },
  {
    name: 'Casinha Pássaros',
    cat: 'decoracao',
    catLabel: 'Decoração · Cedro',
    wood: 'Cedro rosa',
    price: 'R$ 145',
    priceNote: 'à vista no Pix',
    tag: 'Promoção',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 8,
  },
  {
    name: 'Bandeja Rústica Chapada',
    cat: 'decoracao',
    catLabel: 'Decoração · Jequitibá',
    wood: 'Jequitibá',
    price: 'R$ 195',
    priceNote: 'à vista no Pix',
    tag: '',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 9,
  },
  {
    name: 'Porta-retratos Duplo',
    cat: 'decoracao',
    catLabel: 'Decoração · Cedro',
    wood: 'Cedro rosa',
    price: 'R$ 98',
    priceNote: 'à vista no Pix',
    tag: 'Novo',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 10,
  },
  // Sazonal
  {
    name: 'Árvore Cerrado',
    cat: 'sazonal',
    catLabel: 'Sazonal · Pinus',
    wood: 'Pinus tratado',
    price: 'R$ 320',
    priceNote: 'entrega em 30 dias',
    tag: 'Pré-venda',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 11,
  },
  {
    name: 'Presépio Mineiro',
    cat: 'sazonal',
    catLabel: 'Sazonal · Cedro',
    wood: 'Cedro rosa',
    price: 'R$ 580',
    priceNote: 'entrega em 45 dias',
    tag: 'Pré-venda',
    tagVariant: 'yellow',
    imageUrl: '',
    active: true,
    order: 12,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    initials: 'MB',
    name: 'Marina B.',
    location: 'Curitiba · cristaleira',
    text: 'Encomendei uma cristaleira pra herdar. Chegou com a história da madeira anotada atrás. É outra coisa — chega a emocionar.',
    rating: 5,
    active: true,
    order: 0,
  },
  {
    initials: 'LA',
    name: 'Lucas e Ana',
    location: 'São Paulo · aparador',
    text: 'Acompanhei o processo todo no WhatsApp. Em oito semanas a peça estava em casa, encaixada milimetricamente. Vale cada centavo.',
    rating: 5,
    active: true,
    order: 1,
  },
  {
    initials: 'RP',
    name: 'Pe. Roberto',
    location: 'Belo Horizonte · sagrada',
    text: 'Já encomendei sete cruzes em datas especiais da família. A consistência da qualidade é o que mais me impressiona.',
    rating: 5,
    active: true,
    order: 2,
  },
  {
    initials: 'CG',
    name: 'Camila G.',
    location: 'São Paulo · porta-vinhos',
    text: 'O porta-vinhos virou o centro de qualquer jantar em casa. Recebi com um livreto explicando a origem da madeira. Detalhe absurdo.',
    rating: 5,
    active: true,
    order: 3,
  },
  {
    initials: 'FT',
    name: 'Felipe T.',
    location: 'Florianópolis · aparador',
    text: 'Encomenda sob medida pra cozinha. Sete semanas de prazo, entregou em seis. Ferragens de primeira, encaixe perfeito.',
    rating: 5,
    active: true,
    order: 4,
  },
  {
    initials: 'RB',
    name: 'Renata B.',
    location: 'Goiânia · banco autoral',
    text: 'Mandei uma foto do tronco que tinha no quintal e a Cris fez um banco. Levou tempo, mas a peça é única no mundo.',
    rating: 5,
    active: true,
    order: 5,
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faq = [
  {
    q: 'Qual o prazo médio de produção?',
    a: 'Entre 4 e 12 semanas, dependendo da peça. Mobiliário grande tende a 8-10 semanas; peças menores em 4-6.',
    active: true,
    order: 0,
  },
  {
    q: 'Como funciona a encomenda sob medida?',
    a: 'Você conta a ideia, a gente envia uma proposta em 48h com cronograma e estimativa. Pagamento em duas parcelas: 50% na aprovação, 50% antes da entrega.',
    active: true,
    order: 1,
  },
  {
    q: 'Vocês entregam em todo o Brasil?',
    a: 'Sim. Trabalhamos com transportadora dedicada e seguro total. Para São Paulo capital, fazemos entrega monitorada com a nossa equipe.',
    active: true,
    order: 2,
  },
  {
    q: 'Que madeiras vocês trabalham?',
    a: 'Principalmente imbuia, cedro, peroba-rosa, jequitibá e itaúba. Todas com origem certificada ou de reaproveitamento.',
    active: true,
    order: 3,
  },
  {
    q: 'Há garantia?',
    a: 'Sim, garantia vitalícia contra defeitos de marcenaria e manutenção sem custo. O cuidado com madeira viva nós ensinamos junto com a peça.',
    active: true,
    order: 4,
  },
];

// ─── Execução ─────────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱  Iniciando seed do Firestore — CRI Artes\n');

  await seedSettings();
  await seed('categories', categories);
  await seed('products', products);
  await seed('testimonials', testimonials);
  await seed('faq', faq);

  console.log('\n✅  Seed concluído com sucesso!');
  console.log('    Acesse o Firebase Console → Firestore para conferir.\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌  Erro no seed:', err);
  process.exit(1);
});
