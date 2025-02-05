# Usando uma imagem oficial do Node.js
FROM node:18

# Criar e definir diretório de trabalho
WORKDIR /app

# Copiar package.json e yarn.lock
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar o restante do código do projeto
COPY . .

# Expor a porta
EXPOSE 80

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]