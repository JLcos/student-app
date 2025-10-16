# 🗄️ Configuração do Supabase

Este guia vai te ajudar a configurar o Supabase como banco de dados para o Student App.

## 📋 Pré-requisitos

- Node.js instalado
- Conta no [Supabase](https://supabase.com) (gratuita)

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [https://app.supabase.com](https://app.supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha:
   - **Name:** Student App
   - **Database Password:** (escolha uma senha forte e guarde)
   - **Region:** escolha a mais próxima de você
5. Clique em "Create new project"
6. Aguarde alguns minutos enquanto o projeto é criado

### 2. Obter as Credenciais

1. No dashboard do seu projeto, vá em **Settings** (ícone de engrenagem)
2. Clique em **API**
3. Copie as seguintes informações:
   - **Project URL** (algo como: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (uma chave longa começando com `eyJ...`)

### 3. Configurar Variáveis de Ambiente

1. Na raiz do projeto, copie o arquivo `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Abra o arquivo `.env.local` e preencha com suas credenciais:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 4. Criar o Schema do Banco de Dados

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em **New query**
3. Copie todo o conteúdo do arquivo `supabase/migrations/001_initial_schema.sql`
4. Cole no editor SQL
5. Clique em **Run** (ou pressione `Ctrl+Enter`)
6. Aguarde a execução (deve aparecer "Success. No rows returned")

### 5. Verificar as Tabelas

1. No dashboard, vá em **Table Editor**
2. Você deve ver as seguintes tabelas:
   - ✅ users
   - ✅ subjects
   - ✅ activities
   - ✅ subtasks
   - ✅ attachments
   - ✅ reminders
   - ✅ notifications

### 6. Configurar Autenticação (Opcional)

1. Vá em **Authentication** > **Providers**
2. Habilite os provedores que deseja:
   - **Email** (já habilitado por padrão)
   - **Google** (recomendado)
   - Outros (Facebook, GitHub, etc.)

Para Google OAuth:
1. Vá em [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto
3. Configure OAuth consent screen
4. Crie credenciais OAuth 2.0
5. Copie Client ID e Client Secret
6. Cole no Supabase em **Authentication** > **Providers** > **Google**

### 7. Atualizar o Código para Usar Supabase

Existem duas opções:

#### Opção A: Usar Supabase (Recomendado)

Substitua todas as importações de `@/store/useStore` por `@/store/useStoreSupabase`:

```typescript
// Antes
import { useStore } from '@/store/useStore';

// Depois
import { useStoreSupabase as useStore } from '@/store/useStoreSupabase';
```

#### Opção B: Renomear o arquivo (Mais simples)

1. Renomeie `store/useStore.ts` para `store/useStore.old.ts`
2. Renomeie `store/useStoreSupabase.ts` para `store/useStore.ts`

### 8. Reiniciar o Servidor

```bash
# Parar o servidor (Ctrl+C)
# Iniciar novamente
npm run dev
```

## 🧪 Testar a Integração

1. Acesse o app em `http://localhost:3001`
2. Faça login ou crie uma conta
3. Adicione algumas atividades e matérias
4. Verifique no Supabase:
   - Vá em **Table Editor**
   - Abra a tabela `activities`
   - Você deve ver as atividades criadas

## 📊 Monitoramento

### Ver Dados em Tempo Real

1. No dashboard, vá em **Table Editor**
2. Selecione uma tabela
3. Veja os dados em tempo real

### Logs e Debug

1. Vá em **Logs** > **Postgres Logs**
2. Veja todas as queries executadas
3. Útil para debug

### API Logs

1. Vá em **Logs** > **API Logs**
2. Veja todas as requisições à API
3. Útil para monitorar performance

## 🔒 Segurança

### Row Level Security (RLS)

O schema já inclui políticas RLS que garantem:
- ✅ Usuários só veem seus próprios dados
- ✅ Não é possível acessar dados de outros usuários
- ✅ Todas as tabelas estão protegidas

### Testar RLS

Execute no SQL Editor:

```sql
-- Ver políticas ativas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
```

## 🔄 Migrações Futuras

Para adicionar novas colunas ou tabelas:

1. Crie um novo arquivo em `supabase/migrations/`
2. Nomeie como `002_nome_da_migracao.sql`
3. Execute no SQL Editor do Supabase

Exemplo:
```sql
-- 002_add_profile_picture.sql
ALTER TABLE users ADD COLUMN avatar_url TEXT;
```

## 🆘 Troubleshooting

### Erro: "Invalid API key"

- Verifique se copiou a chave corretamente
- Certifique-se de usar a **anon/public key**, não a service key

### Erro: "relation does not exist"

- Execute o script de migração novamente
- Verifique se todas as tabelas foram criadas

### Erro: "Row level security policy"

- Certifique-se de estar autenticado
- Verifique se o `user_id` está correto nas queries

### Dados não aparecem

1. Verifique o console do navegador (F12)
2. Veja os logs no Supabase
3. Teste a conexão:

```typescript
import { supabase } from '@/lib/supabase';

// No console do navegador
const { data, error } = await supabase.from('users').select('*');
console.log(data, error);
```

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)

## 🎉 Próximos Passos

Após configurar o Supabase, você pode:

1. **Habilitar Realtime** - Atualizações em tempo real
2. **Storage** - Upload de arquivos (anexos, fotos)
3. **Edge Functions** - Lógica serverless
4. **Backup automático** - Configurar backups diários

## 💡 Dicas

- Use o **SQL Editor** para queries complexas
- Explore o **API Docs** gerado automaticamente
- Configure **Database Webhooks** para integrações
- Use **Database Functions** para lógica complexa

---

**Pronto!** Seu Student App agora está usando Supabase como banco de dados. 🚀
