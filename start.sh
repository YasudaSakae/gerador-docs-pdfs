#!/bin/bash
# Script para iniciar o servidor com Node.js 22

# Carregar nvm se disponível
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Usar Node.js 22
nvm use 22 2>/dev/null || nvm use node

# Iniciar o servidor
node server.js

