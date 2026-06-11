# CRI Artes — Vitrine Digital

> Vitrine digital de marcenaria artesanal com painel administrativo integrado, carrinho de seleção via WhatsApp e dados em tempo real via Firebase.

---

## Demonstração

| Área         | URL                                    |
| ------------ | -------------------------------------- |
| Site público | `https://seu-projeto.vercel.app/`      |
| Painel admin | `https://seu-projeto.vercel.app/admin` |

---

## Funcionalidades

### Site público

- Vitrine de produtos com filtro por categoria (Mobiliário, Sagrada, Decoração, Sazonal)
- Calculadora de orçamento em tempo real com envio via WhatsApp
- Carrinho de seleção com drawer lateral, controle de quantidade e subtotal
- Lista de favoritos com opção de mover para o carrinho
- Depoimentos em carrossel com autoplay
- FAQ com accordion
- Faixa de anúncio, hero, contato e WhatsApp configuráveis pelo admin
- Scroll reveal e animações suaves
- Totalmente responsivo

### Painel admin (`/admin`)

- Login seguro via Firebase Auth (e-mail/senha)
- Dashboard com contadores em tempo real
- CRUD completo: Produtos, Categorias, Depoimentos, FAQ
- Upload de imagem de produto via Cloudinary (preview + barra de progresso)
- Toggle ativo/inativo para cada item
- Configurações globais: announce bar, hero, WhatsApp, contato, Instagram
- Alterações refletem no site em menos de 1 segundo

---

## Tecnologias

```
React 18 + TypeScript 5    Interface e tipagem
Vite 5                     Build e desenvolvimento
Firebase Firestore          Banco de dados em tempo real
Firebase Auth               Autenticação do admin
Cloudinary                  Armazenamento de imagens (25 GB free)
Vercel                      Deploy e CDN
GitHub Actions              CI/CD automatizado
CSS puro (BEM)              Estilos sem dependência de framework
```

---

## Pré-requisitos

- Node.js 20 ou superior
- Conta no [Firebase](https://console.firebase.google.com) (plano Spark — gratuito)
- Conta no [Cloudinary](https://cloudinary.com) (plano Free — 25 GB)
- Conta na [Vercel](https://vercel.com) (plano Hobby — gratuito)

---

## Instalação e configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/cri-artes.git
cd cri-artes
npm install
```

### 2. Configurar o Firebase

#### 2.1 Criar o projeto

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **Criar projeto**
3. Ative o **Firestore Database** → modo produção → região `southamerica-east1`
4. Ative o **Authentication** → Sign-in method → **E-mail/senha**
5. Em **Configurações do projeto** → **Seus apps** → adicione um app Web → copie o `firebaseConfig`

#### 2.2 Criar o usuário admin

1. No console → **Authentication** → **Users** → **Add user**
2. Informe e-mail e senha do funcionário
3. Repita para cada funcionário autorizado

#### 2.3 Regras do Firestore

Em **Firestore** → **Regras**, cole e publique:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read:  if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Configurar o Cloudinary

1. Crie uma conta em [cloudinary.com](https://cloudinary.com)
2. Anote o **Cloud name** no dashboard
3. Vá em **Settings** → **Upload** → **Upload presets** → **Add upload preset**
   - Signing mode: `Unsigned`
   - Folder: `cri-artes/products`
   - Allowed formats: `jpg, png, webp, svg`
   - Max file size: `5 MB`
4. Salve e copie o **Preset name**

### 4. Variáveis de ambiente

Copie o arquivo de exemplo e preencha:

```bash
cp .env.example .env
```

```env
# Firebase
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000:web:xxx

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=seu_preset_name
```

### 5. Popular o banco com dados de teste

```bash
# Coloque a chave do Firebase Admin em scripts/serviceAccountKey.json
# (Firebase Console → Configurações → Contas de serviço → Gerar nova chave)

npm run seed
```

O script insere: 13 produtos, 4 categorias, 6 depoimentos, 5 FAQs e as configurações globais.

### 6. Rodar localmente

```bash
npm run dev
# Site: http://localhost:5173
# Admin: http://localhost:5173/admin
```

---

## Deploy na Vercel

### Deploy manual (primeira vez)

1. Faça push do código para o GitHub (`.env` está no `.gitignore`)
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório
3. Em **Environment Variables**, adicione as 8 variáveis do `.env`
4. Clique em **Deploy**

### Deploy automático (CI/CD)

Configure os **Secrets** no GitHub (`Settings → Secrets → Actions`):

| Secret                       | Descrição                            |
| ---------------------------- | ------------------------------------ |
| `VITE_FIREBASE_API_KEY`      | e demais `VITE_FIREBASE_*`           |
| `VITE_CLOUDINARY_CLOUD_NAME` | e `VITE_CLOUDINARY_UPLOAD_PRESET`    |
| `VERCEL_TOKEN`               | Vercel → Account Settings → Tokens   |
| `VERCEL_ORG_ID`              | `.vercel/project.json` → `orgId`     |
| `VERCEL_PROJECT_ID`          | `.vercel/project.json` → `projectId` |

A partir daí, todo push na `main` faz deploy automático de produção. Pull requests geram deploys de preview com URL única.

---

## Scripts

```bash
npm run dev          # servidor local com HMR
npm run build        # build de produção (tsc + vite)
npm run preview      # preview do build localmente
npm run typecheck    # verifica tipos TypeScript
npm run seed         # popula o Firestore com dados de teste
```

---

## Estrutura do projeto

```
src/
├── App.tsx                    # Raiz da aplicação
├── contexts/                  # AuthContext, CartContext
├── hooks/                     # useCart, useFavorites, useSlider...
├── models/                    # Tipos TypeScript
├── services/                  # Firebase, Firestore, Cloudinary
├── utils/                     # Funções puras
├── viewmodels/                # Lógica de estado por seção
├── views/
│   ├── components/            # Componentes reutilizáveis
│   ├── sections/              # Seções da página pública
│   └── admin/                 # Painel administrativo
└── styles/
    ├── site/                  # CSS do site público (parciais BEM)
    └── admin/                 # CSS do admin (parciais BEM)

scripts/
└── seed.cjs                   # Script de seed do Firestore
```

Para documentação técnica detalhada (arquitetura, fluxos, decisões de design), veja [CONTEXT.md](./CONTEXT.md).

---

## Arquitetura

O projeto segue o padrão **MVVM** (Model → ViewModel → View):

```
Model (tipos + dados)
  └─▶ ViewModel (hook de estado + lógica)
        └─▶ View (componente React — só renderiza)
```

Dados do Firestore chegam via `onSnapshot` — qualquer mudança feita pelo admin aparece no site em menos de 1 segundo, sem reload.

---

## Segurança

- Credenciais do Firebase ficam em variáveis de ambiente — nunca no código
- O `.env` está no `.gitignore` — nunca é commitado
- Regras do Firestore: leitura pública, escrita apenas para usuários autenticados
- Cloudinary com unsigned preset limita uploads a imagens de até 5 MB na pasta `cri-artes/products`
- Não há servidor próprio — superfície de ataque reduzida

---

## Licença

Projeto privado — todos os direitos reservados à CRI Artes.
