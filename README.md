
Aplicação de Gerenciamento de Tarefas

Esta aplicação web permite aos usuários gerenciar suas tarefas de forma eficiente, com funcionalidades completas de criação, leitura, atualização e exclusão (CRUD) de tarefas.
O projeto é desenvolvido com React no frontend e Node.js no backend, utilizando JWT para autenticação e SQLite como banco de dados.


Funcionalidades

Cadastro de Usuário

Cadastro com e-mail e senha.
Validação básica para e-mail e senha.
Autenticação

Login e logout utilizando JWT.
Apenas usuários autenticados têm acesso ao gerenciamento de tarefas.
Gerenciamento de Tarefas

Listar todas as tarefas do usuário autenticado.
Adicionar novas tarefas com título e descrição.
Marcar tarefas como concluídas.
Editar o título e a descrição de uma tarefa.
Excluir uma tarefa.
Interface de Usuário

Interface intuitiva e responsiva desenvolvida com React.
Gerenciamento de estado utilizando React Hooks.
Rotas implementadas com React Router.
Instruções para Rodar o Projeto
Backend
Instalação

Navegue até a pasta do backend.
Instale as dependências:
bash
Copiar código
cd backend
npm install
Configuração

Configure o banco de dados SQLite (ou outro banco de dados, se preferir) em backend/config/config.js.
Defina as variáveis de ambiente necessárias (por exemplo, JWT secret) em um arquivo .env.
Execução

Inicie o servidor:

bash
Copiar código
npm start
O backend estará rodando em http://localhost:5000 por padrão.

Frontend
Instalação

Navegue até a pasta do frontend.
Instale as dependências:
bash
Copiar código
cd frontend
npm install
Configuração

Configure as URLs da API no frontend, se necessário, em frontend/src/api.js ou equivalente.
Execução

Inicie o servidor de desenvolvimento:

bash
Copiar código
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

Framework: Express.js foi escolhido por sua simplicidade e flexibilidade.
Banco de Dados: SQLite para simplicidade e facilidade de configuração.
Frontend:

Framework: React foi escolhido por sua popularidade e facilidade de criação de interfaces interativas.
Gerenciamento de Estado: React Hooks para gerenciamento de estado local e efeitos colaterais.
Estilização: CSS customizado para criar uma interface responsiva e moderna.
