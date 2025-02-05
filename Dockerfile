# Usando uma imagem oficial do Node.js
FROM node:18

# Criar e definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código do projeto
COPY . .

# Expor a porta
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
