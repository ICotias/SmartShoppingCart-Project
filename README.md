# Smart Shopping Cart 🛒

Aplicação completa de lista de compras inteligente com suporte a Mobile (React Native), Web (React/Next.js) e Firebase.

## 🏗️ Arquitetura

```
SmartShoppingCart/
├── mobile/          # App React Native (Expo)
├── web/            # Aplicação Web (Next.js)
├── functions/      # Firebase Functions
├── shared/         # Código compartilhado
└── firebase/       # Configurações Firebase
```

## 🚀 Tecnologias

- **Mobile**: React Native + Expo
- **Web**: Next.js + TypeScript
- **Backend**: Firebase (Firestore, Auth, Functions)
- **Monorepo**: npm workspaces

## 📱 Funcionalidades

- ✅ Lista de compras inteligente
- ✅ Sincronização em tempo real
- ✅ Autenticação de usuários
- ✅ Notificações push
- ✅ Interface responsiva

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/SmartShoppingCart.git
cd SmartShoppingCart

# Instale todas as dependências
npm run install:all

# Configure o Firebase
cp firebase/.env.example firebase/.env
# Edite as variáveis de ambiente
```

## 🚀 Desenvolvimento

```bash
# Mobile (React Native)
npm run dev:mobile

# Web (Next.js)
npm run dev:web

# Build de todos os projetos
npm run build:all
```

## 📦 Deploy

```bash
# Deploy Firebase Functions
cd functions && firebase deploy --only functions

# Deploy Web (Vercel/Netlify)
cd web && npm run build && npm run deploy

# Build Mobile (EAS)
cd mobile && eas build
```

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.