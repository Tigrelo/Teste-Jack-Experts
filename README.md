Aplicação de Gerenciamento de Tarefas

Esta aplicação web permite aos usuários gerenciar suas tarefas de forma eficiente, com funcionalidades completas de criação, leitura, atualização e exclusão (CRUD) de tarefas.
O projeto é desenvolvido com React no frontend e Node.js no backend, utilizando JWT para autenticação e SQLite como banco de dados.


  Funcionalidades

1 Cadastro de Usuário

Cadastro com e-mail e senha.
Validação básica para e-mail e senha.

2  Autenticação

Login e logout utilizando JWT.
Apenas usuários autenticados têm acesso ao gerenciamento de tarefas.

3  Gerenciamento de Tarefas

Listar todas as tarefas do usuário autenticado.
Adicionar novas tarefas com título e descrição.
Marcar tarefas como concluídas.
Editar o título e a descrição de uma tarefa.
Excluir uma tarefa.

4  Interface de Usuário

Interface intuitiva e responsiva desenvolvida com React.
Gerenciamento de estado utilizando React Hooks.
Rotas implementadas com React Router.



   Instruções para Rodar o Projeto


Backend

1  Instalação

Navegue até a pasta do backend.
Instale as dependências

cd backend
npm install


2   Configuração

Configure o banco de dados SQLite (ou outro banco de dados, se preferir) em backend/config/config.js.
Defina as variáveis de ambiente necessárias (por exemplo, JWT secret) em um arquivo .env.


3   Execução

Inicie o servidor:

npm start

O backend estará rodando em http://localhost:5000 por padrão.


Frontend

1  Instalação

Navegue até a pasta do frontend.
Instale as dependências:


cd frontend
npm install

2  Configuração

Configure as URLs da API no frontend, se necessário, em frontend/src/api.js ou equivalente.

Execução 

Inicie o servidor de desenvolvimento:

npm start

O frontend estará disponível em http://localhost:3000 por padrão.


Estrutura do Projeto


Backend

/models: Modelos de dados.
/routes: Rotas da API.
/controllers: Lógica de controle.
/config: Configurações do banco de dados e JWT.
/middleware: Middleware de autenticação e autorização.
Frontend

/pages: Páginas principais da aplicação (Login, Registro, Tarefas).
/components: Componentes reutilizáveis (Formulários, Listas de Tarefas).
/styles: Arquivos de estilo (CSS).
/api.js: Configurações e funções para chamadas à API.
Decisões de Desenvolvimento
Backend:


Banco de Dados: SQLite para simplicidade e facilidade de configuração.
Frontend:

Gerenciamento de Estado: React Hooks para gerenciamento de estado local e efeitos colaterais.
Estilização: CSS customizado para criar uma interface responsiva e moderna.
Testes (Opcional)
Backend: Testes unitários e/ou de integração podem ser encontrados na pasta /tests.
Frontend: Testes de componentes podem ser encontrados na pasta /tests.










