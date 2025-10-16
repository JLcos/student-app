# 📚 Student App

Um aplicativo completo de gerenciamento escolar com design **Neo-Brutalista**, desenvolvido para ajudar estudantes a organizar suas atividades, receber lembretes e acompanhar seu progresso.

## 🎨 Design

O app utiliza o estilo **Neo-Brutalista** com:
- ✨ Cores vibrantes e alto contraste
- 🖼️ Bordas pretas espessas (3-4px)
- 🎯 Sombras marcantes e duras
- 📐 Layouts ligeiramente assimétricos
- 🔤 Tipografia crua e sem serifa

## ✨ Funcionalidades

### 1️⃣ Onboarding & Login
- Tela de boas-vindas com logo e frase motivacional
- Login via email ou Google
- Seleção de perfil (Estudante/Professor/Responsável)
- Tour interativo de 3 telas

### 2️⃣ Dashboard / Página Inicial
- Visão geral do dia com tarefas próximas
- Mini calendário da semana atual
- Resumo de progresso (tarefas concluídas/pendentes/atrasadas)
- Acesso rápido para adicionar atividades

### 3️⃣ Calendário / Agenda
- Visualização por semana ou mês
- Destaque de prazos e eventos
- Filtro por disciplina
- Interface drag & drop (planejada)

### 4️⃣ Matérias / Disciplinas
- Lista de matérias com cores distintas
- Página detalhada por disciplina
- Informações do professor
- Atividades associadas
- Configurações rápidas (cor, horário)

### 5️⃣ Criar / Editar Atividade
- Título, descrição, disciplina, prazo, prioridade
- Sistema de anexos (planejado)
- Checklist com subtarefas
- Lembretes personalizáveis (planejado)

### 6️⃣ Notificações
- Lista de alertas e lembretes
- Acesso rápido às tarefas
- Contador de notificações não lidas

### 7️⃣ Relatórios / Progresso
- Gráficos de tarefas concluídas
- Estatísticas semanais
- Progresso por matéria
- Mensagens motivacionais

### 8️⃣ Perfil & Configurações
- Dados pessoais (nome, foto, turma)
- Preferências (tema, notificações)
- Controle de privacidade
- Integrações (planejadas)

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização com classes utilitárias
- **Zustand** - Gerenciamento de estado
- **Supabase** - Banco de dados PostgreSQL + Auth (opcional)
- **date-fns** - Manipulação de datas
- **React Icons** - Ícones

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🗄️ Banco de Dados (Supabase)

O app suporta duas opções de armazenamento:

### Opção 1: LocalStorage (Padrão)
- Configuração zero
- Dados salvos no navegador
- Ideal para desenvolvimento e testes

### Opção 2: Supabase (Produção)
- Banco de dados PostgreSQL real
- Autenticação integrada
- Sincronização entre dispositivos
- Backup automático

**Quick Start:** Veja [SUPABASE_QUICKSTART.md](./SUPABASE_QUICKSTART.md) (5 minutos)

**Setup Completo:** Veja [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🎯 Navegação

O app utiliza uma **barra de navegação inferior** com 5 seções:
- 🏠 Início (Dashboard)
- 📅 Calendário
- 📚 Matérias
- 📊 Relatórios
- 👤 Perfil

Além disso, há um **botão flutuante (+)** sempre visível para adicionar novas atividades.

## 🎨 Paleta de Cores

- **Primary (Laranja):** `#FF6B35` - Botões principais, headers
- **Secondary (Ciano):** `#4ECDC4` - Elementos secundários
- **Accent Yellow:** `#FFE66D` - Destaques
- **Accent Pink:** `#FF85C0` - Alertas
- **Accent Purple:** `#9B5DE5` - Matérias
- **Accent Green:** `#00F5A0` - Sucesso, conclusões
- **Accent Blue:** `#00BBF9` - Informações

## 📱 Estrutura do Projeto

```
student-app/
├── app/                    # Páginas Next.js (App Router)
│   ├── calendar/          # Calendário/Agenda
│   ├── dashboard/         # Página inicial
│   ├── login/             # Login
│   ├── notifications/     # Notificações
│   ├── onboarding/        # Tour inicial
│   ├── profile/           # Perfil e configurações
│   ├── register/          # Cadastro
│   ├── reports/           # Relatórios
│   ├── subjects/          # Matérias
│   ├── welcome/           # Boas-vindas
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes reutilizáveis
│   ├── ActivityForm.tsx   # Formulário de atividades
│   ├── Badge.tsx          # Badge/etiqueta
│   ├── BottomNav.tsx      # Navegação inferior
│   ├── Button.tsx         # Botão
│   ├── Card.tsx           # Card
│   ├── Checkbox.tsx       # Checkbox
│   ├── FloatingAddButton.tsx # Botão flutuante
│   ├── Input.tsx          # Input de texto
│   ├── Modal.tsx          # Modal
│   ├── Select.tsx         # Select/dropdown
│   ├── SubjectForm.tsx    # Formulário de matérias
│   └── TextArea.tsx       # Área de texto
├── store/                 # Gerenciamento de estado
│   └── useStore.ts        # Zustand store
├── types/                 # TypeScript types
│   └── index.ts           # Tipos principais
├── utils/                 # Funções utilitárias
│   └── helpers.ts         # Helpers
└── tailwind.config.ts     # Configuração Tailwind
```

## 🔜 Próximas Funcionalidades

- [ ] Sistema de anexos (fotos, PDFs, links)
- [ ] Integração com Google Calendar
- [ ] Modo escuro
- [ ] Arrastar e soltar tarefas no calendário
- [ ] Sistema de Pomodoro
- [ ] Notificações push reais
- [ ] Compartilhamento com pais/professores
- [ ] Sincronização em nuvem
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto foi criado como exemplo educacional.

---

**Feito com ❤️ e muito Neo-Brutalismo!**

