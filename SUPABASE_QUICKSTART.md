# ⚡ Supabase Quick Start

Guia rápido para começar a usar o Supabase em 5 minutos.

## 🚀 Setup Rápido

### 1. Criar Projeto Supabase (2 min)

1. Vá em [app.supabase.com](https://app.supabase.com)
2. Clique em **New Project**
3. Preencha nome e senha
4. Clique em **Create new project**

### 2. Configurar Variáveis (1 min)

1. Vá em **Settings** > **API**
2. Copie **Project URL** e **anon public key**
3. Crie `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui
```

### 3. Criar Tabelas (1 min)

1. Vá em **SQL Editor** no Supabase
2. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
3. Clique em **Run**

### 4. Trocar para Usar Supabase (1 min)

Abra `app/layout.tsx` e no topo do arquivo, adicione:

```typescript
// Usar Supabase em vez de localStorage
import { useStoreSupabase as useStore } from '@/store/useStoreSupabase';
```

Ou simplesmente renomeie os arquivos:
```bash
mv store/useStore.ts store/useStore.old.ts
mv store/useStoreSupabase.ts store/useStore.ts
```

### 5. Testar! ✅

```bash
npm run dev
```

Acesse o app e crie uma atividade. Vá no Supabase **Table Editor** > **activities** e veja o dado lá!

---

## 📝 Notas Importantes

### Autenticação

Por padrão, o app ainda usa autenticação fake (localStorage). Para usar autenticação real do Supabase:

1. Substitua o hook `useAuth` nos componentes
2. Use o novo hook em `hooks/useAuth.ts`
3. Configure OAuth providers no Supabase

### Subjects Padrão

Para criar matérias padrão ao criar usuário:

```sql
-- No SQL Editor do Supabase
SELECT create_default_subjects_for_user('seu-user-id-aqui');
```

### RLS (Row Level Security)

Já está configurado! Cada usuário só vê seus próprios dados.

---

## 🆘 Problemas Comuns

**"Invalid API key"**
- Verifique se copiou as credenciais corretas
- Use a **anon public key**, não a service key

**"Relation does not exist"**
- Execute o script SQL de migração
- Verifique no Table Editor se as tabelas foram criadas

**Dados não aparecem**
- Abra o console (F12)
- Veja se há erros de autenticação
- Verifique se o user_id está correto

---

## 📚 Documentação Completa

Para setup detalhado, veja [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

**Pronto em 5 minutos!** 🎉
