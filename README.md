Sistema de Cadastro de Usuários e Login

Objetivo:
Desenvolver um sistema de cadastro de usuários e autenticação (login). O foco principal será na qualidade do código, boas práticas, arquitetura e uso de ferramentas modernas.

Requisitos do Projeto:

1. Tecnologias Obrigatórias:
 - Validação e Tratamento de Erros: O sistema deve validar os campos de entrada e lidar adequadamente com erros.

2. Funcionalidades Mínimas:
 - Cadastro de usuários com campos básicos (nome, e-mail, senha). X
 - Login com autenticação (JWT ou ouatro método de sua escolha).
 - Rota protegida que só pode ser cessada por usuários autenticados.
 - Documentação básica das rotas (pode ser um README ou usar Swagger).

O que será avaliado:
- Organização e Estrutura do Código: Separação de responsabilidades, arquitetura clara (por exemplo, MVC, Clean Architecture).
- Boas Práticas: Legibilidade, modularização, uso adequado de middlewares, consistência na escrita do código.
- Validação de Campos: Uso de bibliotecas como Joi, Yup ou validações personalizadas.
- Tratamento de Erros: Estrutura robusta para lidar com diferentes tipos de erros (ex: erros de validação, banco de dados, etc.).
- Domínio de Node.js e JavaScript.

Diferenciais que Contam Pontos Extras:
- Testes Automatizados: Cobertura com testes unitários e/ou de integração.

Comandos para iniciar projeto com Docker

Iniciar container
docker-compose up --build -d

Parar container 
docker-compose down

Tecnologias usadas
Node JS Express com TypeScript
Docker
Jest