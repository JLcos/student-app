# 📊 Database Schema

Estrutura completa do banco de dados do Student App.

## 📋 Tabelas

### 👤 users
Armazena informações dos usuários do sistema.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key (gerado automaticamente) |
| `email` | TEXT | Email único do usuário |
| `name` | TEXT | Nome completo |
| `role` | TEXT | Tipo: student, teacher ou parent |
| `photo` | TEXT | URL da foto de perfil (opcional) |
| `class` | TEXT | Turma do estudante (opcional) |
| `onboarding_completed` | BOOLEAN | Status do onboarding |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data de atualização |

**Políticas RLS:**
- Usuários podem ver e editar apenas seus próprios dados

---

### 📚 subjects
Matérias/disciplinas cadastradas pelos usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key → users.id |
| `name` | TEXT | Nome da matéria |
| `color` | TEXT | Cor em hexadecimal (#FF6B35) |
| `teacher` | TEXT | Nome do professor (opcional) |
| `schedule` | TEXT | Horário das aulas (opcional) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data de atualização |

**Índices:**
- `idx_subjects_user_id` em `user_id`

**Políticas RLS:**
- Usuários podem CRUD apenas suas próprias matérias

---

### 📝 activities
Atividades/tarefas escolares.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key → users.id |
| `subject_id` | UUID | Foreign key → subjects.id |
| `title` | TEXT | Título da atividade |
| `description` | TEXT | Descrição detalhada (opcional) |
| `due_date` | TIMESTAMP | Data de entrega |
| `priority` | TEXT | Prioridade: low, medium ou high |
| `completed` | BOOLEAN | Status de conclusão |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data de atualização |

**Índices:**
- `idx_activities_user_id` em `user_id`
- `idx_activities_subject_id` em `subject_id`
- `idx_activities_due_date` em `due_date`

**Políticas RLS:**
- Usuários podem CRUD apenas suas próprias atividades

---

### ✅ subtasks
Subtarefas/checklist das atividades.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key |
| `activity_id` | UUID | Foreign key → activities.id |
| `title` | TEXT | Título da subtarefa |
| `completed` | BOOLEAN | Status de conclusão |
| `position` | INTEGER | Ordem de exibição |
| `created_at` | TIMESTAMP | Data de criação |

**Índices:**
- `idx_subtasks_activity_id` em `activity_id`

**Políticas RLS:**
- Usuários podem CRUD subtarefas de suas atividades

---

### 📎 attachments
Anexos das atividades (fotos, PDFs, links).

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key |
| `activity_id` | UUID | Foreign key → activities.id |
| `name` | TEXT | Nome do arquivo |
| `type` | TEXT | Tipo: photo, pdf ou link |
| `url` | TEXT | URL do arquivo/link |
| `created_at` | TIMESTAMP | Data de criação |

**Índices:**
- `idx_attachments_activity_id` em `activity_id`

**Políticas RLS:**
- Usuários podem CRUD anexos de suas atividades

---

### ⏰ reminders
Lembretes configurados para as atividades.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key |
| `activity_id` | UUID | Foreign key → activities.id |
| `reminder_date` | TIMESTAMP | Data do lembrete |
| `reminder_time` | TEXT | Hora do lembrete (HH:mm) |
| `created_at` | TIMESTAMP | Data de criação |

**Índices:**
- `idx_reminders_activity_id` em `activity_id`

**Políticas RLS:**
- Usuários podem CRUD lembretes de suas atividades

---

### 🔔 notifications
Notificações do sistema.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key → users.id |
| `activity_id` | UUID | Foreign key → activities.id (opcional) |
| `title` | TEXT | Título da notificação |
| `message` | TEXT | Mensagem |
| `read` | BOOLEAN | Status de leitura |
| `created_at` | TIMESTAMP | Data de criação |

**Índices:**
- `idx_notifications_user_id` em `user_id`

**Políticas RLS:**
- Usuários podem ver e editar apenas suas notificações

---

## 🔗 Relacionamentos

```
users (1) ──< (N) subjects
users (1) ──< (N) activities
users (1) ──< (N) notifications

subjects (1) ──< (N) activities

activities (1) ──< (N) subtasks
activities (1) ──< (N) attachments
activities (1) ──< (N) reminders
activities (1) ──< (N) notifications
```

---

## 🔐 Segurança (RLS)

Todas as tabelas têm **Row Level Security** habilitado:

- ✅ Usuários só veem seus próprios dados
- ✅ Não é possível acessar dados de outros usuários
- ✅ Políticas baseadas em `auth.uid()`

---

## 🎯 Triggers

### update_updated_at_column()

Atualiza automaticamente o campo `updated_at` quando um registro é modificado.

**Aplicado em:**
- `users`
- `subjects`
- `activities`

---

## 📊 Exemplo de Query

```sql
-- Buscar todas as atividades de um usuário com suas relações
SELECT 
  a.*,
  s.name as subject_name,
  s.color as subject_color,
  json_agg(DISTINCT st.*) as subtasks,
  json_agg(DISTINCT att.*) as attachments,
  json_agg(DISTINCT r.*) as reminders
FROM activities a
LEFT JOIN subjects s ON s.id = a.subject_id
LEFT JOIN subtasks st ON st.activity_id = a.id
LEFT JOIN attachments att ON att.activity_id = a.id
LEFT JOIN reminders r ON r.activity_id = a.id
WHERE a.user_id = auth.uid()
GROUP BY a.id, s.id
ORDER BY a.due_date ASC;
```

---

## 🔄 Backup e Restore

### Backup
```bash
# Via Supabase CLI
supabase db dump > backup.sql
```

### Restore
```bash
# Via Supabase CLI
supabase db reset
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

---

## 📈 Performance

### Índices Criados

Todos os foreign keys têm índices para otimizar queries:
- Filtros por `user_id`
- Filtros por `subject_id`
- Filtros por `activity_id`
- Ordenação por `due_date`

### Recomendações

Para apps com muitos dados (>10k registros):
- Adicionar índice composto em `(user_id, due_date)`
- Particionar tabela de notifications por mês
- Implementar paginação nas queries

---

**Schema versão:** 1.0.0 (001_initial_schema.sql)
