# 🗄️ Configuração de Banco de Dados - Student App

## ✅ STATUS ATUAL

**Persistência Implementada**: ✅ LocalStorage com Zustand Persist

### O que já funciona:
- ✅ Todas as atividades são salvas automaticamente
- ✅ Dados persistem após fechar o navegador
- ✅ Sincronização automática entre abas
- ✅ Funciona 100% offline
- ✅ Zero configuração necessária
- ✅ Zero custo

### Dados que são salvos:
- ✅ Usuário (nome, email, preferências)
- ✅ Atividades (tarefas, status, prazos)
- ✅ Matérias (disciplinas e configurações)
- ✅ Notificações

---

## 🚀 OPÇÕES DE BANCO DE DADOS REAL

Se quiser migrar para um banco de dados real no futuro:

### **Opção 1: Supabase** (Recomendado - GRÁTIS) ⭐

**Vantagens:**
- ✅ Totalmente grátis (tier gratuito generoso)
- ✅ PostgreSQL real
- ✅ Autenticação integrada
- ✅ Tempo real (live updates)
- ✅ Storage para arquivos
- ✅ 500MB grátis + 50k usuários mensais

**Setup:**
```bash
# 1. Instalar
npm install @supabase/supabase-js

# 2. Criar conta em supabase.com
# 3. Criar projeto
# 4. Copiar URL e API Key
```

**Configuração:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

### **Opção 2: MongoDB Atlas** (NoSQL)

**Vantagens:**
- ✅ 512MB grátis
- ✅ Flexível (sem schema rígido)
- ✅ Fácil de escalar
- ✅ Bom para prototipagem

**Setup:**
```bash
# 1. Instalar
npm install mongodb

# 2. Criar conta em mongodb.com/atlas
# 3. Criar cluster gratuito
# 4. Copiar connection string
```

**Configuração:**
```typescript
// lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

export default client
```

---

### **Opção 3: PlanetScale** (MySQL)

**Vantagens:**
- ✅ MySQL serverless
- ✅ Branches (como Git)
- ✅ 5GB grátis
- ✅ Scaling automático

**Setup:**
```bash
# 1. Instalar Prisma
npm install prisma @prisma/client

# 2. Criar conta em planetscale.com
# 3. Criar database
# 4. Configurar Prisma
```

---

### **Opção 4: Vercel Postgres** (Mais Simples)

**Vantagens:**
- ✅ Integração nativa com Vercel
- ✅ Setup automático
- ✅ 256MB grátis
- ✅ Zero configuração

**Setup:**
```bash
# No dashboard da Vercel:
# 1. Storage → Create Database → Postgres
# 2. Conectar ao projeto
# 3. Deploy automático
```

---

## 📊 COMPARAÇÃO RÁPIDA

| Banco | Grátis | Fácil | Tempo Real | Storage |
|-------|--------|-------|------------|---------|
| **Supabase** | ✅ 500MB | ⭐⭐⭐⭐⭐ | ✅ | ✅ 1GB |
| **MongoDB** | ✅ 512MB | ⭐⭐⭐⭐ | ❌ | ❌ |
| **PlanetScale** | ✅ 5GB | ⭐⭐⭐ | ❌ | ❌ |
| **Vercel Postgres** | ✅ 256MB | ⭐⭐⭐⭐⭐ | ❌ | ❌ |

---

## 🎯 RECOMENDAÇÃO

### Para seu Student App:

**Use Supabase** porque:
1. ✅ Grátis e generoso
2. ✅ Autenticação pronta (Google, Email, etc.)
3. ✅ Real-time (sync entre dispositivos)
4. ✅ Storage para anexos (PDFs, fotos)
5. ✅ Row Level Security (segurança)
6. ✅ Dashboard visual fácil

---

## 🔧 COMO MIGRAR PARA SUPABASE (10 MINUTOS)

### Passo 1: Criar conta
1. Acesse: https://supabase.com
2. Sign up with GitHub
3. New Project → Nome: "student-app"
4. Aguarde 2 minutos

### Passo 2: Criar tabelas
```sql
-- No Supabase SQL Editor:

-- Tabela de atividades
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  description TEXT,
  subject_id UUID,
  due_date TIMESTAMP,
  priority TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de matérias
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  color TEXT,
  teacher TEXT,
  schedule TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Passo 3: Instalar no projeto
```bash
npm install @supabase/supabase-js
```

### Passo 4: Configurar
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=sua-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-key-aqui
```

### Passo 5: Usar no código
```typescript
import { supabase } from '@/lib/supabase'

// Buscar atividades
const { data } = await supabase
  .from('activities')
  .select('*')

// Criar atividade
await supabase
  .from('activities')
  .insert({ title: 'Nova tarefa', ... })
```

---

## 💾 MIGRAÇÃO DE DADOS

Para migrar dados do LocalStorage para Supabase:

```typescript
// utils/migrate.ts
export async function migrateToSupabase() {
  // 1. Pegar dados do localStorage
  const localData = localStorage.getItem('student-app-storage')
  const parsed = JSON.parse(localData || '{}')
  
  // 2. Enviar para Supabase
  const { data, error } = await supabase
    .from('activities')
    .insert(parsed.activities)
    
  console.log('Migrado:', data)
}
```

---

## 🔐 SEGURANÇA

### Row Level Security (RLS)
```sql
-- Apenas o usuário pode ver suas atividades
CREATE POLICY "Users can view own activities"
  ON activities FOR SELECT
  USING (auth.uid() = user_id);

-- Apenas o usuário pode criar suas atividades  
CREATE POLICY "Users can create own activities"
  ON activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 📱 SYNC MULTI-DISPOSITIVO

Com Supabase, automaticamente:
- ✅ Celular ↔️ Computador sincronizado
- ✅ Mudanças aparecem em tempo real
- ✅ Funciona offline com queue
- ✅ Conflitos resolvidos automaticamente

---

## 🎨 FEATURES EXTRAS COM BANCO REAL

### 1. Anexos (Storage)
```typescript
// Upload de PDF/imagem
const { data } = await supabase.storage
  .from('attachments')
  .upload('file.pdf', file)
```

### 2. Compartilhamento
```typescript
// Compartilhar atividade com responsável
await supabase
  .from('shared_activities')
  .insert({ activity_id, shared_with: parent_email })
```

### 3. Estatísticas
```sql
-- SQL analytics
SELECT 
  subject_id,
  COUNT(*) as total,
  SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed
FROM activities
GROUP BY subject_id
```

---

## 🚀 QUANDO FAZER A MIGRAÇÃO?

### Continue com LocalStorage se:
- ✅ App funciona bem offline
- ✅ Apenas 1 usuário por dispositivo
- ✅ Não precisa de multi-dispositivo
- ✅ Quer deploy rápido

### Migre para Supabase quando:
- 📱 Quiser sync entre dispositivos
- 👥 Compartilhar com pais/professores
- 📊 Analytics e relatórios avançados
- 📁 Upload de arquivos (PDFs, fotos)
- 🔐 Autenticação real (Google, etc.)

---

## 📞 PRECISA DE AJUDA?

Me avise quando quiser implementar banco real que eu te ajudo!

**Por enquanto**: LocalStorage funciona perfeitamente para uso pessoal! 🎉

---

**Docs Oficiais:**
- Supabase: https://supabase.com/docs
- MongoDB: https://docs.mongodb.com
- Prisma: https://prisma.io/docs

