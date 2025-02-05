Sistema de Cadastro de Usuários e Login

Objetivo:
Desenvolver um sistema de cadastro de usuários e autenticação (login). O foco principal será na qualidade do código, boas práticas, arquitetura e uso de ferramentas modernas.

Requisitos do Projeto:

1. Tecnologias Obrigatórias:
 - Backend: Node.js com Express.
 - Persistência de Dados: Utilizenão relacional (MongoDB, etc.), desde que a aplicação esteja containerizada com Docker.
 - Validação e Tratamento de Erros: O sistema deve validar os campos de entrada e lidar adequadamente com erros.

2. Funcionalidades Mínimas:
 - Cadastro de usuários com campos básicos (nome, e-mail, senha).
 - Login com autenticação (JWT ou outro método de sua escolha).
 - Rota protegida que só pode ser acessada por usuários autenticados.
 - Documentação básica das rotas (pode ser um README ou usar Swagger).

O que será avaliado:
- Organização e Estrutura do Código: Separação de responsabilidades, arquitetura clara (por exemplo, MVC, Clean Architecture).
- Boas Práticas: Legibilidade, modularização, uso adequado de middlewares, consistência na escrita do código.
- Validação de Campos: Uso de bibliotecas como Joi, Yup ou validações personalizadas.
- Tratamento de Erros: Estrutura robusta para lidar com diferentes tipos de erros (ex: erros de validação, banco de dados, etc.).
- Domínio de Node.js e JavaScript.

Diferenciais que Contam Pontos Extras:
- Uso do Docker: Para containerização da aplicação e do banco de dados.
- TypeScript: Utilização para garantir tipagem estática.
- PrismaORM: Para gerenciar a comunicação com o banco de dados de forma eficiente.
- Testes Automatizados: Cobertura com testes unitários e/ou de integração.