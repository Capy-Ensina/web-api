# Documentação Capy Ensina - API

**API desenvolvida para consumir coleções de um banco de dados MongoDB, permitindo integração com aplicação web e mobile. Oferece endpoints para gerenciar dados de jogadores, rankings, minigames, e outras coleções relacionadas.**

### Tecnologias Utilizadas:

* **Node.js** : Ambiente de execução JavaScript.
* **Express** : Framework para construção de APIs.
* **Prisma** : ORM para interagir com o banco de dados MongoDB.
* **MongoDB** : Banco de dados NoSQL.

<div align="center">
<img src="https://skillicons.dev/icons?i=nodejs" height="35 "alt="nodejs logo"/>
<img src="https://skillicons.dev/icons?i=express" height="35 "alt="express logo"/>
<img src="https://skillicons.dev/icons?i=prisma" height="35 "alt="prisma logo"/>
<img src="https://skillicons.dev/icons?i=mongodb" height="35 "alt="mongodb logo"/>
<div>

---

#### **Primeiro Passo - Configuração e Instalação:**

1.1. **Requisitos**

Antes de começar, certifique-se de que você possui os seguintes itens instalados:

* Node.js: versão 16 ou superior recomendada.
* MongoDB: um cluster configurado no MongoDB Atlas ou um servidor local.
* NPM: gerenciador de pacotes que acompanha a instalação do Node.js.

1.2. **Configuração do Banco de Dados**

* Crie um cluster no MongoDB Atlas.
* No painel do Atlas, acesse **Database Access** e crie um novo usuário com permissões de leitura e escrita.
* Copie a string de conexão fornecida, que será usada na variável `DATABASE_URL` no arquivo `.env`.

1.3. **Configuração do Projeto**

1. Clone o repositório para o seu ambiente local.
2. No diretório do projeto, execute: ``npm install``
3. **Configure o Arquivo `.env`**
   Insira as variáveis de ambiente no arquivo `.env`:
   ``DATABASE_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority``

   **Observação** : Não esqueça de substituir `<usuario>`, `<senha>`, `<cluster>` e `<database>` com as informações do seu cluster no MongoDB.
4. **Configuração do Prisma**
   O Prisma é usado para mapear o banco de dados. Execute os comandos abaixo para sincronizar os modelos com o banco de dados:
   ``npx prisma generate``
   ``npx prisma db push``

1.4. **Rodando o Servidor**

1. Após a instalação e configuração, você pode iniciar o servidor com o comando: ``npm start``
2. Verificando o servidor: O terminal deverá exibir uma mensagem, indicando que o servidor rodando corretamente: ``Server running on port 3000``

---

#### Segundo Passo - Estrutura de Arquivos:

A estrutura de arquivos do projeto é:

   ![estrutura de arquivos](/scr/estruturadoarquivo.png)

---

#### Terceiro Passo - Endpoints.

Explicarei os principais endpoints usando como exemplo a coleção **Jogador**.

**Modelo Prisma (schema.prisma)**

   ![modelo prisma](/scr/modelprisma.png)

3.1. **Criar um Jogador - Rota POST**

* Cria um novo jogador no banco de dados.
* **Body (JSON):**

  ![body json](/scr/jsonrotapost.png)

**Observações:**

* **Criptografia de Senhas:** As senhas dos jogadores são criptografadas usando **bcrypt** antes de serem armazenadas no banco.
* **Data de Registro Automática:** O campo `data_registro` é preenchido automaticamente no momento da criação.

Pasta **routes/**:
Essa pasta contém as definições de rotas para sua API. Exemplo da rota `jogador.js`:

![rota jogando.js](/scr/rotajogadorjs.png)

O arquivo **server.js** importa essas rotas e as conecta na aplicação:
![server.js](/scr/serverjs.png)

Arquivo **.env**

Adicionamos as variáveis de ambiete, como a string de conexão do banco de dados. Exemplo:``DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/banco"``

**Observação:** Confira se o arquivo **.env** está listado no **.gitignore** para evitar expor informações do banco. O arquivo **.gitignore** é uma lista de arquivos e pastas que não devem ser enviados ao repositório do github

---

#### Quarto Passo - Deploy da API (opcional)

Existem duas opções para rodar sua API: **local** ou **na nuvem**, utilizando uma plataforma de deploy como **Railway**.

4.1. **Rodando a API Localmente**

Se você deseja rodar a API localmente em sua máquina, basta seguir os passos de instalação e executar o comando: ``npm start``

Isso iniciará a API no seu ambiente local `http://localhost:3000`.

4.2. **Deploy no Railway (Opcional)**

Se preferir hospedar sua API na nuvem, você pode usar o  **Railway** , que facilita o deploy de aplicações Node.js. Para fazer o deploy no Railway, siga os seguintes passos:

1. **Crie uma conta no Railway** : Acesse [Railway.app](https://railway.app/) e crie uma conta, caso ainda não tenha.
2. **Importe seu projeto para o Railway** :

* No painel do Railway, clique em "New Project".
* Selecione a opção "Deploy from GitHub" e conecte sua conta do GitHub.
* Escolha o repositório onde está o código da API.

1. **Configure o banco de dados** :

* Caso esteja utilizando o MongoDB Atlas, adicione a string de conexão ao banco no arquivo `.env` do Railway.
* No painel do Railway, vá para a seção de variáveis de ambiente e adicione a variável `DATABASE_URL` com a string de conexão do seu banco de dados.

1. **Configuração do Procfile** :

* No arquivo `Procfile`, adicione o comando de inicialização da sua aplicação para que o Railway saiba como rodá-la:  ``web: node server.js``

1. **Inicie o deploy** :

* Após a configuração, o Railway automaticamente iniciará o deploy. Acompanhe o progresso e, uma vez finalizado, você terá uma URL para acessar a API online.

---

#### Quinto Passo - Testando a API com Insomnia

Insomnia é uma ferramenta para testar APIs REST. Para testar os endpoints da sua API, siga os passos abaixo:

1. **Baixe e instale o Insomnia:**

* Acesse o site oficial do Insomnia: https://insomnia.rest e baixe a versão para o seu sistema operacional.

2. **Crie um novo projeto no Insomnia:**

* Após abrir o Insomnia, clique em "Create" e escolha "Request Collection" para organizar suas requisições.

3. **Configuração das requisições:**

* Para testar cada endpoint da sua API, crie novas requisições clicando no botão "New Request".
* Selecione o tipo de requisição (GET, POST, PUT, DELETE) e insira a URL da sua API (ex: http://localhost:3000/jogador para rodar localmente ou a URL gerada pelo Railway para produção).

4. **Testando a Rota POST (Exemplo - Criar um Jogador):**

* Selecione "POST" e no campo de URL insira http://localhost:3000/jogador ou a URL do Railway.
* No corpo da requisição, insira os dados no formato JSON, conforme o modelo da API
* Clique em "Send" para enviar a requisição e ver a resposta da API.

5. Verificando as Respostas:

* O Insomnia exibirá a resposta da API na parte inferior da tela, com o código de status HTTP e o corpo da resposta.

---

Se tiver qualquer dúvida ou encontrar algum problema durante o uso da API, entre em contato.

**Email: glenda.asantos1@gmail.com**
