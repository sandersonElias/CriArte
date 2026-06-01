# CRI Artes — Frontend MVVM

Projeto React + TypeScript organizado em arquitetura **MVVM** (Model · ViewModel · View).

---

## Estrutura de pastas

```
cri-artes/
│
├── models/                      ← M — Entidades de domínio e dados
│   ├── Product.ts               Tipos: Product, ProductCategory, TagVariant
│   ├── Testimonial.ts           Tipo: Testimonial
│   ├── FaqItem.ts               Tipo: FaqItem
│   ├── Budget.ts                Tipos: BudgetForm, BudgetResult
│   └── seedData.ts              Dados estáticos (produtos, depoimentos, FAQ…)
│
├── utils/                       ← Funções puras (sem React)
│   ├── whatsapp.ts              waLink(), scrollToId()
│   └── budgetCalculator.ts      calcBudget(), buildBudgetWaMessage()
│
├── hooks/                       ← Hooks de infra reutilizáveis
│   ├── useLocalSet.ts           Leitura/escrita de arrays no localStorage
│   ├── useScrollReveal.ts       IntersectionObserver → classe .is-visible
│   ├── useToast.ts              Estado e timer do toast global
│   └── useSlider.ts             Índice + autoplay do carrossel
│
├── viewmodels/                  ← VM — Estado e lógica de cada seção
│   ├── useNavViewModel.ts       Links de navegação + ação de scroll
│   ├── useProductsViewModel.ts  Filtro ativo + lista filtrada de produtos
│   ├── useBudgetViewModel.ts    Estado do formulário + cálculo em tempo real
│   ├── useFavoritesViewModel.ts Favoritos persistidos no localStorage
│   ├── useBagViewModel.ts       Sacola persistida no localStorage
│   ├── useNewsletterViewModel.ts Estado do formulário de newsletter
│   ├── useFaqViewModel.ts       Controle do accordion (índice aberto)
│   └── useTestimonialsViewModel.ts Slide ativo + autoplay
│
├── views/
│   ├── components/              ← V — Componentes reutilizáveis (burros)
│   │   ├── ImageSlot.tsx        Placeholder colorido para imagens
│   │   ├── Toast.tsx            Notificação flutuante
│   │   ├── AnnouncerBar.tsx     Faixa de anúncio
│   │   ├── TopNav.tsx           Navegação principal
│   │   ├── WhatsAppFloat.tsx    Botão flutuante do WhatsApp
│   │   ├── ProductCard.tsx      Card de produto (recebe props, não acessa VM)
│   │   ├── TestimonialCard.tsx  Card de depoimento
│   │   └── FaqItem.tsx          Item do accordion de FAQ
│   │
│   └── sections/                ← V — Seções de página (consomem VMs)
│       ├── HeroSection.tsx
│       ├── TrustStrip.tsx
│       ├── CategoriesSection.tsx
│       ├── ProductsSection.tsx
│       ├── CustomSection.tsx
│       ├── BudgetSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── IgSection.tsx
│       ├── FaqSection.tsx
│       └── Footer.tsx
│
├── styles/
│   └── global.css               Tokens CSS, reset, todas as classes BEM
│
└── App.tsx                      Raiz: orquestra estado global + layout
```

---

## Fluxo de dados (MVVM)

```
Model (dados/tipos)
  └─▶ ViewModel (hook — estado + lógica)
         └─▶ View (componente — renderiza + dispara eventos)
                └─▶ ViewModel (callback → atualiza estado)
                       └─▶ View re-renderiza
```

### Responsabilidades por camada

| Camada              | Faz                                               | Não faz                                  |
| ------------------- | ------------------------------------------------- | ---------------------------------------- |
| **Model**           | Define tipos TypeScript, guarda seed data         | Nenhuma lógica de UI                     |
| **Utils**           | Funções puras testáveis (cálculos, links)         | Nenhum estado React                      |
| **Hooks**           | Comportamentos genéricos reutilizáveis            | Nenhum conhecimento de domínio           |
| **ViewModel**       | Estado local, derivações, side-effects, callbacks | Nenhum JSX                               |
| **View/components** | Renderiza props puras                             | Acessa diretamente o localStorage ou DOM |
| **View/sections**   | Consome o ViewModel correto + compõe components   | Duplica lógica de negócio                |
| **App.tsx**         | Estado global (bag, favs, toast) + layout         | Lógica de domínio inline                 |

---

## Instalação

```bash
# Vite + React + TypeScript
npm create vite@latest cri-artes -- --template react-ts
cd cri-artes

# Copie a pasta cri-artes/ para src/
cp -r cri-artes/* src/

# Ajuste src/main.tsx
# import App from './App'
npm run dev
```

---

## Substituindo os placeholders de imagem

`ImageSlot` é o único componente que precisa ser trocado quando os assets chegarem:

```tsx
// views/components/ImageSlot.tsx  — versão final
export const ImageSlot: FC<Props> = ({ placeholder, className }) => (
  <img
    src={`/images/${placeholder.toLowerCase().replace(/ /g, '-')}.webp`}
    alt={placeholder}
    className={className}
    loading="lazy"
  />
);
```

---

## Convenções de nomenclatura CSS (BEM)

```
.prod-card            ← bloco
.prod-card__pic       ← elemento
.prod-card__tag       ← elemento
.prod-card__tag--yellow ← modificador
```
