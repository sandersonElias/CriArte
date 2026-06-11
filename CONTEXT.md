# CRI Artes — Contexto Técnico do Projeto

> Documento de referência para desenvolvedores. Descreve arquitetura, decisões de design, fluxos de dados e responsabilidades de cada camada.

---

## 1. Visão geral

**CRI Artes** é uma vitrine digital de marcenaria artesanal com:

- **Site público** — catálogo de produtos, calculadora de orçamento, depoimentos, FAQ, carrinho e favoritos via drawer lateral.
- **Painel admin** — CRUD completo de produtos, categorias, depoimentos, FAQ e configurações globais, acessível em `/admin`.
- **Backend-as-a-Service** — Firebase Auth (login), Firestore (banco de dados em tempo real) e Cloudinary (imagens). Sem servidor próprio.
- **Deploy** — Vercel (site público + admin na mesma SPA).

---

## 2. Stack

| Camada         | Tecnologia                     |
| -------------- | ------------------------------ |
| Framework      | React 18 + TypeScript 5        |
| Build          | Vite 5                         |
| Banco de dados | Firebase Firestore             |
| Autenticação   | Firebase Auth (e-mail/senha)   |
| Imagens        | Cloudinary (unsigned upload)   |
| Deploy         | Vercel                         |
| CI/CD          | GitHub Actions                 |
| Estilos        | CSS puro (BEM), sem framework  |
| Ícones (admin) | Tabler Icons (webfont via CDN) |

---

## 3. Arquitetura MVVM

O projeto segue o padrão **Model → ViewModel → View**, com camadas de serviço e hooks de infraestrutura.

```
┌─────────────────────────────────────────────────────────────┐
│  VIEW                                                       │
│  views/components/*.tsx   views/sections/*.tsx              │
│  views/admin/*.tsx                                          │
│  Renderiza props. Sem lógica de negócio. Sem acesso direto  │
│  ao localStorage ou Firestore.                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ consome
┌─────────────────────▼───────────────────────────────────────┐
│  VIEWMODEL                                                  │
│  viewmodels/use*ViewModel.ts    viewmodels/useAdmin*.ts     │
│  Estado local + lógica de cada seção. Sem JSX.             │
│  Chama hooks e services. Expõe dados + callbacks.           │
└──────────┬──────────────────────────┬───────────────────────┘
           │ usa                      │ usa
┌──────────▼────────┐    ┌────────────▼────────────────────────┐
│  HOOKS            │    │  SERVICES                           │
│  hooks/use*.ts    │    │  services/firebase.ts               │
│  Comportamentos   │    │  services/firestoreService.ts       │
│  reutilizáveis    │    │  services/cloudinaryService.ts      │
│  sem domínio      │    │  Acesso externo (Firestore,         │
└──────────┬────────┘    │  Cloudinary, Firebase Auth)         │
           │             └────────────────────────────────────-┘
           │ lê/escreve
┌──────────▼────────────────────────────────────────────────┐
│  MODEL                                                    │
│  models/*.ts                                             │
│  Tipos TypeScript puros. Sem imports de React ou libs.   │
│  Fonte de verdade dos dados.                             │
└──────────────────────────────────────────────────────────┘
```

### Regras de fronteira (nunca violar)

| Camada              | Pode importar                  | Não pode importar               |
| ------------------- | ------------------------------ | ------------------------------- |
| `models/`           | nada                           | React, services, hooks          |
| `utils/`            | nada                           | React, services                 |
| `hooks/`            | models, utils                  | services diretamente\*          |
| `services/`         | firebase SDK                   | React, models                   |
| `viewmodels/`       | hooks, services, models, utils | JSX, CSS                        |
| `views/components/` | models, utils                  | services, Firestore             |
| `views/sections/`   | components, viewmodels         | services, Firestore diretamente |
| `contexts/`         | hooks, models                  | services diretamente            |

\*exceto `useImageUpload` que usa `cloudinaryService` — aceitável por ser infraestrutura pura.

---

## 4. Estrutura de pastas

```
src/
│
├── App.tsx                        ← Raiz: rotas, providers globais
│
├── contexts/
│   ├── AuthContext.tsx            ← Estado de autenticação Firebase
│   └── CartContext.tsx            ← Estado global: carrinho + favoritos + drawers
│
├── models/                        ← Tipos TypeScript (sem lógica)
│   ├── Budget.ts                  ← BudgetForm, BudgetResult
│   ├── CartItem.ts                ← Item do carrinho com quantidade
│   ├── FaqItem.ts                 ← Pergunta + resposta
│   ├── FirestoreModels.ts         ← FSProduct, FSCategory, FSTestimonial, FSFaqItem, FSSettings
│   ├── Product.ts                 ← Product (interface do site público)
│   ├── Testimonial.ts             ← Depoimento
│   └── seedData.ts                ← Dados estáticos de fallback
│
├── hooks/                         ← Comportamentos reutilizáveis
│   ├── useCart.ts                 ← Carrinho: add/remove/qty/subtotal/WhatsApp msg
│   ├── useFavorites.ts            ← Favoritos: toggle/remove com objeto completo
│   ├── useImageUpload.ts          ← Upload Cloudinary com preview e progresso
│   ├── useLocalSet.ts             ← Array persistido no localStorage (genérico)
│   ├── useScrollReveal.ts         ← IntersectionObserver → .is-visible
│   ├── useSlider.ts               ← Índice + autoplay do carrossel
│   └── useToast.ts                ← Notificação temporária global
│
├── services/                      ← Acesso a APIs externas
│   ├── firebase.ts                ← Inicialização: auth, db (Firestore)
│   ├── firestoreService.ts        ← CRUD genérico: fetch, subscribe, create, update, delete
│   └── cloudinaryService.ts       ← Upload de imagens via unsigned preset
│
├── utils/                         ← Funções puras e testáveis
│   ├── budgetCalculator.ts        ← calcBudget(), buildBudgetWaMessage()
│   ├── parsePriceBRL.ts           ← parsePriceBRL(), formatPriceBRL()
│   └── whatsapp.ts                ← waLink(), scrollToId()
│
├── viewmodels/
│   │
│   ├── — Site público —
│   ├── useSettingsViewModel.ts    ← Lê settings/global do Firestore (announce, hero, contato)
│   ├── useNavViewModel.ts         ← Links de nav + scroll
│   ├── useProductsViewModel.ts    ← Produtos do Firestore + filtro por categoria
│   ├── useCategoriesViewModel.ts  ← Categorias do Firestore em tempo real
│   ├── useTestimonialsViewModel.ts← Depoimentos do Firestore → slides agrupados
│   ├── useFaqViewModel.ts         ← FAQ do Firestore + accordion (índice aberto)
│   ├── useBudgetViewModel.ts      ← Formulário de orçamento + cálculo em tempo real
│   ├── useNewsletterViewModel.ts  ← Estado do formulário de newsletter
│   ├── useFavoritesViewModel.ts   ← (legacy) favoritos por ID — substituído por useFavorites
│   ├── useBagViewModel.ts         ← (legacy) sacola por ID — substituído por useCart
│   │
│   └── — Painel admin —
│       ├── useAdminAuth.ts        ← Login/logout + mensagens de erro
│       ├── useAdminProducts.ts    ← CRUD produtos + modal + upload de imagem
│       ├── useAdminTestimonials.ts← CRUD depoimentos + modal
│       ├── useAdminFaq.ts         ← CRUD FAQ + modal
│       └── useAdminSettings.ts    ← Configurações globais (settings/global)
│
├── views/
│   ├── components/                ← Componentes "burros" (só props, sem VM própria)
│   │   ├── AnnouncerBar.tsx       ← Faixa de anúncio (texto do Firestore)
│   │   ├── CartDrawer.tsx         ← Drawer lateral do carrinho
│   │   ├── FaqItem.tsx            ← Item accordion do FAQ
│   │   ├── FavoritesDrawer.tsx    ← Drawer lateral de favoritos
│   │   ├── ImageSlot.tsx          ← Imagem real (Cloudinary) ou placeholder colorido
│   │   ├── ProductCard.tsx        ← Card de produto com fav + add ao carrinho
│   │   ├── TestimonialCard.tsx    ← Card de depoimento
│   │   ├── Toast.tsx              ← Notificação flutuante
│   │   ├── TopNav.tsx             ← Navegação (abre drawers ao clicar)
│   │   └── WhatsAppFloat.tsx      ← Botão flutuante (número do Firestore)
│   │
│   ├── sections/                  ← Seções da página (consomem ViewModels)
│   │   ├── BudgetSection.tsx      ← Calculadora de orçamento
│   │   ├── CategoriesSection.tsx  ← Grid de categorias
│   │   ├── CustomSection.tsx      ← Seção "sob medida"
│   │   ├── FaqSection.tsx         ← FAQ com accordion
│   │   ├── Footer.tsx             ← Rodapé + newsletter
│   │   ├── HeroSection.tsx        ← Hero (dados do Firestore)
│   │   ├── IgSection.tsx          ← Grid do Instagram
│   │   ├── ProductsSection.tsx    ← Catálogo com filtros
│   │   ├── TestimonialsSection.tsx← Carrossel de depoimentos
│   │   └── TrustStrip.tsx         ← Faixa de diferenciais
│   │
│   └── admin/                     ← Painel administrativo
│       ├── AdminLayout.tsx        ← Shell: sidebar + header responsivo
│       ├── AdminPage.tsx          ← Orquestra as 6 abas
│       ├── CategoriesTab.tsx      ← Tabela + modal de categorias
│       ├── DashboardTab.tsx       ← Contadores em tempo real
│       ├── FaqTab.tsx             ← Lista + modal de FAQ
│       ├── ImageUploader.tsx      ← Campo de upload Cloudinary com preview
│       ├── LoginPage.tsx          ← Tela de login
│       ├── ProductsTab.tsx        ← Tabela + modal + upload de imagem
│       ├── SettingsTab.tsx        ← Configurações globais (announce, hero, WA, contato)
│       └── TestimonialsTab.tsx    ← Cards + modal de depoimentos
│
├── styles/
│   ├── site/                      ← Estilos do site público
│   │   ├── index.css              ← Ponto de entrada (@import de todos os parciais)
│   │   ├── _tokens.css            ← Variáveis CSS, reset, fontes, .wrap
│   │   ├── _utils.css             ← Reveal, pulse, botões, toast, sec-head
│   │   ├── _nav.css               ← Announce bar, TopNav
│   │   ├── _hero.css              ← Hero section, trust strip
│   │   ├── _catalog.css           ← Categorias, filtros, product cards
│   │   ├── _sections.css          ← Orçamento, depoimentos, FAQ, Instagram
│   │   ├── _footer.css            ← Rodapé, WhatsApp float
│   │   └── _drawer.css            ← Drawers laterais (carrinho + favoritos)
│   │
│   └── admin/                     ← Estilos do painel admin
│       ├── index.css              ← Ponto de entrada
│       ├── _tokens.css            ← Variáveis do admin
│       ├── _layout.css            ← Sidebar, header, shell
│       ├── _buttons.css           ← Botões, toggle, toolbar
│       ├── _table.css             ← Tabelas com table-layout: fixed
│       ├── _modal.css             ← Modal, campos de formulário
│       ├── _dashboard.css         ← Stat cards, empty/loading states
│       ├── _content.css           ← Depoimentos cards, FAQ list, settings
│       ├── _login.css             ← Tela de login
│       └── _uploader.css          ← ImageUploader (drop zone, progresso)
│
└── scripts/
    └── seed.cjs                   ← Popula o Firestore com dados de teste (Node.js)
```

---

## 5. Coleções do Firestore

### `products` — Produtos do catálogo

```ts
{
  name:           string;   // "Cristaleira Cordilheira"
  cat:            "mobiliario" | "sagrada" | "decoracao" | "sazonal";
  catLabel:       string;   // "Mobiliário · Imbuia"
  wood:           string;   // "Imbuia"
  price:          string;   // "R$ 7.400"
  priceNote:      string;   // "até 10× sem juros"
  tag?:           string;   // "Edição limitada"
  tagVariant?:    "yellow" | "green";
  imageUrl?:      string;   // URL Cloudinary
  imagePublicId?: string;   // ID Cloudinary
  active:         boolean;  // false = oculto no site
  order:          number;   // ordem de exibição
  createdAt:      Timestamp;
  updatedAt:      Timestamp;
}
```

### `categories` — Categorias da vitrine

```ts
{
  key: string; // "mobiliario" (slug usado no filtro)
  name: string; // "Mobiliário"
  count: number; // contagem exibida no card
  placeholder: string; // texto do ImageSlot sem imagem
  order: number;
}
```

### `testimonials` — Depoimentos

```ts
{
  initials: string; // "MB"
  name: string; // "Marina B."
  location: string; // "Curitiba · cristaleira"
  text: string;
  rating: number; // 1–5
  active: boolean;
  order: number;
}
```

### `faq` — Perguntas frequentes

```ts
{
  q: string; // pergunta
  a: string; // resposta
  active: boolean;
  order: number;
}
```

### `settings` (documento único: `global`) — Configurações globais

```ts
{
  announceText: string; // HTML da faixa de anúncio
  announceActive: boolean; // false = faixa oculta
  waNumber: string; // "5511999990000"
  heroChip: string; // texto do chip animado
  heroTitle: string; // título principal do hero
  heroLede: string; // subtítulo do hero
  instagramHandle: string; // "@criartes_cl"
  contactEmail: string;
  contactPhone: string;
  contactHours: string; // "Seg–Sex · 9h às 18h"
}
```

---

## 6. Contextos React

### `AuthContext`

Disponível em toda a árvore. Gerencia o estado de sessão do Firebase Auth.

```ts
{
  user: User | null; // null = não autenticado
  loading: boolean; // true enquanto verifica sessão inicial
  login: (email, password) => Promise<void>;
  logout: () => Promise<void>;
}
```

### `CartContext`

Disponível apenas no site público (não envolve o admin). Gerencia carrinho, favoritos e qual drawer está aberto.

```ts
{
  cart:             ReturnType<typeof useCart>;
  favorites:        ReturnType<typeof useFavorites>;
  activeDrawer:     'cart' | 'favorites' | null;
  openCart:         () => void;
  openFavorites:    () => void;
  closeDrawer:      () => void;
  handleAddToCart:  (product: Product) => void;  // add + abre drawer
  moveToCart:       (product: Product) => void;   // favorito → carrinho
}
```

---

## 7. Fluxos principais

### 7.1 Adicionar produto ao carrinho

```
ProductCard → onBag()
  → handleAddToCart(product)          [CartContext]
    → cart.addItem(product)           [useCart]
      → parsePriceBRL(price)          [utils]
      → setItems([...prev, item])
      → localStorage.setItem(...)
    → setActiveDrawer('cart')
      → CartDrawer renderiza com drawer--open
        → usuário ajusta qty / remove
        → "Finalizar pelo WhatsApp"
          → buildWhatsAppMessage()
          → window.open(wa.me/...)
```

### 7.2 Favoritar produto

```
ProductCard → onFav()
  → favorites.toggleFav(product)      [CartContext → useFavorites]
    → salva objeto Product completo no localStorage
    → atualiza favorites.items
      → TopNav badge atualiza
```

### 7.3 Mover favorito para o carrinho

```
FavoritesDrawer → "Adicionar ao carrinho"
  → moveToCart(product)               [CartContext]
    → cart.addItem(product)
    → setActiveDrawer('cart')
      → FavoritesDrawer fecha, CartDrawer abre
```

### 7.4 Admin salvar produto com imagem

```
ProductsTab → "Salvar produto"
  → ImageUploader → handleFileChange()
    → uploadToCloudinary(file, onProgress)  [cloudinaryService]
      → XHR → api.cloudinary.com/...
      → retorna { secureUrl, publicId }
    → handleImageUpload(url, publicId)      [useAdminProducts]
      → setForm({ ...form, imageUrl, imagePublicId })
  → handleSave(e)
    → updateDocument("products", id, form)  [firestoreService]
      → Firestore atualiza
        → subscribeCollection dispara em tempo real
          → site público recebe imageUrl → ImageSlot exibe foto
```

### 7.5 Configuração global atualizada pelo admin

```
SettingsTab → handleSave()
  → upsertDocument("settings", "global", form)  [firestoreService]
    → Firestore atualiza settings/global
      → subscribeDocument no useSettingsViewModel dispara
        → setSettings(doc)
          → App.tsx repassa settings para:
            AnnouncerBar  → texto da faixa atualiza
            HeroSection   → título/chip atualizam
            Footer        → telefone/email atualizam
            WhatsAppFloat → número atualiza
            (tudo em < 1 segundo, sem reload)
```

---

## 8. Variáveis de ambiente

Todas prefixadas com `VITE_` para o Vite expor ao browser.

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Em produção, ficam nos **Environment Variables** da Vercel. Nunca no código.

---

## 9. Regras de segurança

### Firestore

```
allow read:  if true;                    // site público lê
allow write: if request.auth != null;    // só admin autenticado escreve
```

### Cloudinary Storage

```
Signing Mode: Unsigned (necessário para upload no browser)
Folder: cri-artes/products
Allowed formats: jpg, png, webp, svg
Max file size: 5 MB
```

---

## 10. Scripts disponíveis

```bash
npm run dev          # servidor de desenvolvimento (localhost:5173)
npm run build        # build de produção (TypeScript + Vite)
npm run preview      # preview do build local
npm run typecheck    # TypeScript sem emitir arquivos
npm run seed         # popula o Firestore com dados de teste
```

---

## 11. Convenções de nomenclatura

### CSS (BEM)

```css
.prod-card           /* bloco */
.prod-card__pic      /* elemento */
.prod-card__tag      /* elemento */
.prod-card__tag--yellow  /* modificador */
```

### Arquivos TypeScript

```
use*.ts / use*.tsx   → hooks e viewmodels
*Service.ts          → acesso a APIs externas
*Context.tsx         → contexts React com Provider + hook
*Tab.tsx             → abas do painel admin
*Section.tsx         → seções da página pública
*Drawer.tsx          → drawers laterais
```

### Commits sugeridos

```
feat: adiciona upload de imagem via Cloudinary
fix: alinha coluna Ações da tabela de produtos
refactor: fragmenta global.css em parciais BEM
chore: atualiza seed com novos produtos sazonais
```

---

## 12. Decisões de design

| Decisão                                   | Alternativa descartada | Motivo                                                 |
| ----------------------------------------- | ---------------------- | ------------------------------------------------------ |
| Firebase Firestore                        | Supabase, PlanetScale  | Tempo real nativo sem polling                          |
| Cloudinary                                | Firebase Storage       | Storage exige plano Blaze (pago)                       |
| CSS puro (BEM)                            | Tailwind, CSS Modules  | Zero dependência, fácil manutenção                     |
| Roteamento manual (`pathname.startsWith`) | react-router           | Evita dependência para 2 rotas simples                 |
| CartContext (Contexto React)              | Zustand, Redux         | Sem dependência extra, escopo limitado ao site público |
| Dados em tempo real (`onSnapshot`)        | Polling / fetch        | Mudanças do admin aparecem no site em < 1s             |
| Unsigned preset Cloudinary                | SDK server-side        | Script de seed não precisa de servidor                 |

---

## 13. Pontos de extensão futuros

- **Busca de produtos** — adicionar campo de pesquisa no `useProductsViewModel`, filtrar por `name`
- **Paginação** — usar `limit()` e `startAfter()` no `firestoreService`
- **Imagens do hero** — adicionar `heroImages[]` ao FSSettings e exibir no `HeroSection`
- **Múltiplos funcionários** — Firebase Auth já suporta; basta criar usuários no console
- **Notificações de pedido** — Firebase Cloud Functions ao criar documento em `orders/`
- **PWA** — `vite-plugin-pwa` + service worker para uso offline básico
- **Analytics** — Firebase Analytics já disponível sem custo extra no plano Spark
