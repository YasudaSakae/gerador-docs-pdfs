# 🚀 Guia de Deploy

Este projeto pode ser hospedado em várias plataformas. O GitHub Pages **não suporta** aplicações Node.js, então você precisa usar uma plataforma que suporte servidores.

## Opção 1: Vercel (Recomendado - Gratuito)

### Passos:

1. **Instale o Vercel CLI** (opcional, pode usar o site também):
   ```bash
   npm i -g vercel
   ```

2. **Faça login no Vercel**:
   ```bash
   vercel login
   ```

3. **Faça o deploy**:
   ```bash
   vercel
   ```
   
   Ou simplesmente:
   - Acesse [vercel.com](https://vercel.com)
   - Conecte seu repositório do GitHub
   - O Vercel detectará automaticamente e fará o deploy

4. **Pronto!** Seu app estará online em `https://seu-projeto.vercel.app`

### Vantagens:
- ✅ Gratuito
- ✅ Deploy automático a cada push no GitHub
- ✅ HTTPS automático
- ✅ Suporta Node.js
- ✅ Muito fácil de usar

---

## Opção 2: Railway (Gratuito com limites)

1. Acesse [railway.app](https://railway.app)
2. Conecte seu repositório GitHub
3. Railway detectará automaticamente e fará o deploy
4. Pronto!

### Vantagens:
- ✅ Gratuito (com limites)
- ✅ Deploy automático
- ✅ Suporta Node.js

---

## Opção 3: Render (Gratuito)

1. Acesse [render.com](https://render.com)
2. Crie um novo "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Deploy!

### Vantagens:
- ✅ Gratuito (com limites)
- ✅ Deploy automático
- ✅ Suporta Node.js

---

## Opção 4: Heroku (Pago após 2022)

1. Instale Heroku CLI
2. Faça login: `heroku login`
3. Crie o app: `heroku create`
4. Deploy: `git push heroku main`

---

## ⚠️ Importante para Vercel

O arquivo `vercel.json` já está configurado. O código já está otimizado para funcionar em ambientes serverless.

**Nota sobre Puppeteer no Vercel:**
- O Puppeteer já está configurado com flags para funcionar no Vercel
- Se houver problemas, você pode precisar usar `@sparticuz/chromium` (versão otimizada para serverless)
- O timeout padrão do Vercel é 10 segundos para funções serverless, então PDFs muito grandes podem dar timeout

**Para aumentar o timeout:**
1. No `vercel.json`, adicione:
   ```json
   {
     "functions": {
       "server.js": {
         "maxDuration": 60
       }
     }
   }
   ```

---

## 📝 Notas

- **GitHub Pages não funciona** porque não executa Node.js
- Todas as opções acima são gratuitas (com limites)
- O Vercel é geralmente a opção mais fácil e rápida
- O projeto já está configurado para Vercel com o arquivo `vercel.json`

---

## 🔧 Testando Localmente

Para testar como será no Vercel:

```bash
npm install -g vercel
vercel dev
```

Isso simula o ambiente do Vercel localmente.

