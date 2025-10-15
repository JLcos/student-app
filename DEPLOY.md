# 🚀 Guia de Deploy - Student App na Vercel

## ✅ Correções Aplicadas

- ✅ Metadata `viewport` e `themeColor` movidos para export separado
- ✅ Arquivo `vercel.json` criado com configurações otimizadas
- ✅ `.vercelignore` configurado para deploy eficiente
- ✅ Warnings do Next.js 14 corrigidos

## 📋 Pré-requisitos

1. **Conta no GitHub**: [github.com/signup](https://github.com/signup)
2. **Conta na Vercel**: [vercel.com/signup](https://vercel.com/signup)
3. **Git instalado**: `git --version`

## 🔧 Passo a Passo para Deploy

### 1️⃣ Inicializar Git (se ainda não fez)

```bash
# Verificar se já tem git
git status

# Se não tiver, inicializar
git init
git add .
git commit -m "feat: Student App com design Neo-Brutalista"
```

### 2️⃣ Criar Repositório no GitHub

**Opção A: Via Interface Web**
1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `student-app`
3. Deixe **público** ou **privado**
4. **NÃO** marque "Initialize with README"
5. Clique em **"Create repository"**

**Opção B: Via GitHub CLI (se tiver instalado)**
```bash
gh repo create student-app --public --source=. --remote=origin
```

### 3️⃣ Conectar e Fazer Push

```bash
# Adicione o remote (substitua SEU-USUARIO pelo seu username)
git remote add origin https://github.com/SEU-USUARIO/student-app.git

# Renomeie a branch para main (se necessário)
git branch -M main

# Faça o push
git push -u origin main
```

### 4️⃣ Deploy na Vercel

**Método 1: Via Dashboard (Recomendado) ⭐**

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Faça login com sua conta GitHub
3. Clique em **"Import Project"**
4. Selecione o repositório `student-app`
5. Configurações serão detectadas automaticamente:
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Clique em **"Deploy"** 🚀

**Método 2: Via CLI**

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Fazer login
vercel login

# Deploy (modo preview)
vercel

# Deploy em produção
vercel --prod
```

### 5️⃣ Aguardar Build

- ⏱️ Tempo estimado: **2-5 minutos**
- 📊 Você verá logs em tempo real
- ✅ URL será gerada automaticamente

## 🌐 Após o Deploy

Você receberá:
- 🔗 **URL de Produção**: `https://student-app-xxx.vercel.app`
- 🔗 **URL de Preview**: Para cada commit
- 📊 **Dashboard**: Analytics e logs

## ⚙️ Configurações Adicionais

### Domínio Personalizado

1. Na Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `meu-app.com`)
3. Configure os DNS records conforme instruções
4. Aguarde propagação (5-48 horas)

### Variáveis de Ambiente (Futuro)

Se precisar adicionar API keys ou secrets:

1. Vá em **Settings** → **Environment Variables**
2. Adicione as variáveis necessárias
3. Escolha o ambiente (Production/Preview/Development)
4. Faça redeploy se necessário

### Analytics (Recomendado)

1. Vá em **Analytics** tab
2. Ative **Vercel Analytics**
3. Monitore Web Vitals e performance

## 🔄 Deploy Automático

A partir de agora, a Vercel fará deploy automático quando:

- ✅ Você fizer `git push` na branch `main` (produção)
- ✅ Criar um Pull Request (preview deploy)
- ✅ Fazer commit em qualquer branch configurada

## 📱 Adicionar Ícones PWA (Opcional)

Para funcionalidade completa de PWA, adicione os ícones:

```bash
# Crie ícones nas dimensões corretas
public/
  ├── icon-192.png   # 192x192 pixels
  ├── icon-512.png   # 512x512 pixels
  └── favicon.ico    # 32x32 ou 16x16 pixels
```

Ferramentas para criar ícones:
- [favicon.io](https://favicon.io/)
- [realfavicongenerator.net](https://realfavicongenerator.net/)

## 🐛 Troubleshooting

### Erro: "Build failed"

```bash
# Teste o build localmente primeiro
npm run build

# Se funcionar local, verifique:
# 1. Node version na Vercel (Settings > General)
# 2. Environment Variables
# 3. Build logs na Vercel
```

### Erro: "Module not found"

```bash
# Limpe cache e reinstale
rm -rf node_modules .next
npm install
npm run build
```

### Site não carrega / Erro 404

- Verifique se o build foi concluído com sucesso
- Veja os **Function Logs** na Vercel
- Next.js App Router já está configurado (não precisa de rewrites)

### Warnings no build

- Warnings não impedem o deploy
- Mas é bom corrigi-los para melhor performance
- Verifique os logs de build na Vercel

## 📊 Otimizações Aplicadas

A Vercel automaticamente:
- ✅ Minifica JS e CSS
- ✅ Otimiza imagens (WebP, AVIF)
- ✅ Gera cache headers
- ✅ Usa CDN global (Edge Network)
- ✅ Compressão Gzip/Brotli
- ✅ HTTP/2 e HTTP/3

## 🎯 Checklist Final

Antes de fazer deploy, certifique-se:

- [x] ✅ Warnings do Next.js corrigidos
- [ ] ⬜ Git inicializado e commit feito
- [ ] ⬜ Repositório GitHub criado
- [ ] ⬜ Push para GitHub concluído
- [ ] ⬜ Vercel conectada ao GitHub
- [ ] ⬜ Deploy iniciado
- [ ] ⬜ Build concluído com sucesso
- [ ] ⬜ Site testado na URL de produção

## 📝 Comandos Úteis

```bash
# Ver status do git
git status

# Ver remote configurado
git remote -v

# Ver último commit
git log --oneline -1

# Testar build local
npm run build
npm start

# Ver versão do Node
node --version

# Atualizar dependências
npm update

# Verificar segurança
npm audit

# Instalar Vercel CLI
npm i -g vercel

# Ver status dos deploys
vercel ls

# Ver logs da última build
vercel logs
```

## 🎉 Próximos Passos

Após deploy bem-sucedido:

1. **Compartilhe** a URL com amigos e professores
2. **Configure Analytics** para ver métricas
3. **Adicione domínio personalizado** (opcional)
4. **Configure SEO** (meta tags, sitemap)
5. **Monitore performance** no dashboard da Vercel
6. **Adicione ícones PWA** para instalação mobile

## 🆘 Precisa de Ajuda?

- 📖 Docs Vercel: [vercel.com/docs](https://vercel.com/docs)
- 📖 Docs Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- 💬 Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**Boa sorte com seu deploy! 🚀**

O Student App está pronto para o mundo! 🎓✨

