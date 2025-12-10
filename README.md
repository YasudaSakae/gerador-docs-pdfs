# Gerador de PDFs - Documentação

Sistema simples para gerar PDFs a partir de arquivos Markdown (.md).

## 🚀 Como usar

1. **Certifique-se de usar Node.js 18 ou superior** (recomendado: Node.js 22):
   ```bash
   # Se você usa nvm:
   nvm use 22
   # ou
   nvm use 18
   ```

2. **Instale as dependências** (se ainda não instalou):
   ```bash
   npm install
   ```

3. **Inicie o servidor**:
   ```bash
   npm start
   ```
   > **Nota:** O script `npm start` agora usa automaticamente Node.js 22 se disponível via nvm.

3. **Acesse a interface**:
   - Abra seu navegador em: `http://localhost:3000`

4. **Faça upload ou use arquivos existentes**:
   - **Opção 1 - Upload**: Arraste e solte um arquivo .md na área de upload, ou clique em "Escolher arquivo"
   - **Opção 2 - Arquivos existentes**: Use arquivos que já estão na pasta `content/`

5. **Selecione um arquivo e gere o PDF**:
   - A interface listará todos os arquivos .md disponíveis
   - Clique no arquivo desejado
   - Clique em "Gerar PDF"
   - O PDF será salvo na pasta `output/`

## 📁 Estrutura do projeto

```
gerador-docs-pdf/
├── content/          # Coloque seus arquivos .md aqui
├── output/           # PDFs gerados aparecerão aqui
├── styles/           # Estilos CSS para os PDFs
├── public/           # Interface web
├── generate.js       # Função de geração de PDF
├── server.js         # Servidor Express
└── template.html     # Template HTML para os PDFs
```

## ✨ Funcionalidades

- ✅ Interface web simples e intuitiva
- ✅ **Upload de arquivos .md** - Arraste e solte ou escolha arquivos de qualquer pasta
- ✅ Lista automática de arquivos .md
- ✅ Geração de PDF com formatação profissional
- ✅ Suporte a Markdown completo (tabelas, código, etc.)
- ✅ **Abre PDF automaticamente** em nova aba após geração

## 🚀 Deploy

Este projeto pode ser hospedado em várias plataformas. **GitHub Pages não funciona** porque não suporta Node.js.

**Opções recomendadas:**
- **Vercel** (gratuito, mais fácil) - Veja [DEPLOY.md](./DEPLOY.md)
- **Railway** (gratuito)
- **Render** (gratuito)

Consulte o arquivo [DEPLOY.md](./DEPLOY.md) para instruções detalhadas de deploy.

