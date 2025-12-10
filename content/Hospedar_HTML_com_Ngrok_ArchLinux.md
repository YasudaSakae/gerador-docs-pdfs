# 🌐 Hospedar HTML Local com Ngrok no Arch Linux

> **Objetivo:** Disponibilizar um arquivo HTML local (site estático) para acesso público, usando **ngrok** e um servidor HTTP simples.

---

## 🧰 Pré-requisitos

- Ter o **Arch Linux** (ou Manjaro, EndeavourOS, etc.)
- Ter um **arquivo HTML local** (ex: `index.html`)
- Ter acesso à **internet**
- Ter uma **conta gratuita no [ngrok.com](https://ngrok.com)**

---

## ⚙️ 1. Baixar o binário do Ngrok

1. Acesse [https://ngrok.com/download](https://ngrok.com/download)  
2. Escolha:
   ```
   Linux → x86-64 AMD64
   ```
3. Baixe o arquivo (exemplo):
   ```
   ngrok-v3-stable-linux-amd64.tgz
   ```

---

## 📦 2. Instalar o Ngrok manualmente

No terminal, execute:

```bash
sudo tar -xvzf ~/Downloads/ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
```

Verifique se a instalação foi concluída:

```bash
ngrok version
```

Saída esperada:

```
ngrok version 3.x.x
```

---

## 🔑 3. Adicionar o token de autenticação

1. No painel do ngrok, copie seu **authtoken** (aparece após o login).
2. Execute o comando abaixo substituindo pelo seu token:

```bash
ngrok config add-authtoken SEU_TOKEN_AQUI
```

Isso cria ou atualiza o arquivo:
```
~/.config/ngrok/ngrok.yml
```

---

## 🌐 4. Iniciar o servidor local

Se você ainda **não tem um servidor rodando**, use o Python:

```bash
cd /caminho/para/seu/site
python3 -m http.server 8080
```

> 🔸 Isso vai servir seus arquivos locais no endereço `http://localhost:8080`.

---

## 🚀 5. Expor o servidor com o Ngrok

Com o servidor ativo, execute:

```bash
ngrok http 8080
```

> Use `80` se o servidor estiver nessa porta.

O terminal exibirá algo como:

```
Forwarding  https://abc123.ngrok-free.dev -> http://localhost:8080
```

---

## 🔗 6. Compartilhar o link

Envie o link gerado, por exemplo:
```
https://abc123.ngrok-free.dev
```

➡️ Qualquer pessoa com esse link poderá acessar seu HTML hospedado localmente, de qualquer lugar do mundo 🌍.

---

## 🧹 7. Encerrar o túnel

Para parar o servidor ngrok:
```bash
Ctrl + C
```

Para encerrar o servidor Python:
```bash
Ctrl + C
```

---

## 🧠 Dicas extras

- 🔄 Sempre que reiniciar o túnel, o **link muda** (a menos que use plano pago).
- 🔒 O ngrok usa **HTTPS seguro por padrão**.
- 🧱 Se quiser testar outro método sem login:
  ```bash
  npm install -g localtunnel
  lt --port 8080
  ```

---

## 📘 Exemplo completo

```bash
# Instalar ngrok
sudo tar -xvzf ~/Downloads/ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin

# Adicionar token
ngrok config add-authtoken 33gUBNBNOCSt3m0fEuyI2aA8qns_72GR3TynAWW7s9Fw5w5zmZ

# Servir o HTML local
cd ~/meu-site
python3 -m http.server 8080

# Expor com ngrok
ngrok http 8080
```

Resultado:
```
Forwarding  https://meu-site-ngrok.ngrok-free.dev -> http://localhost:8080
```

---

**✅ Pronto!**  
Agora seu site estático está online e acessível publicamente via HTTPS, diretamente do seu Arch Linux.
