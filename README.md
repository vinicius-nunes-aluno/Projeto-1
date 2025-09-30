# 📚 Plataforma de Publicações Acadêmicas da Editora Unifeso

## ✨ Visão Geral do Projeto

Este projeto consiste na criação de uma plataforma web moderna, desenvolvida para proporcionar acesso rápido, fácil e intuitivo às **publicações acadêmicas da Editora Unifeso**.

O principal desafio foi utilizar as tecnologias estudadas em **front-end**, **back-end** e **desenvolvimento mobile** para simplificar a experiência de descoberta e visualização de trabalhos. Nosso objetivo é garantir que a produção acadêmica de todos os autores receba a visibilidade que merece.

---

## 🚀 MVP (Produto Mínimo Viável)

Nosso MVP é uma **versão simplificada e funcional** que visa modernizar o site atual da Editora Unifeso.

**Foco:** Apresentar uma base sólida que demonstre a viabilidade do projeto, com ênfase na **navegação clara** e **intuitiva** para que os usuários encontrem e visualizem publicações de forma mais prática.

---

## 🛠️ Tecnologias e Ferramentas

| Categoria | Tecnologias Utilizadas |
| :--- | :--- |
| **Front-end** | HTML, CSS, JavaScript |
| **Back-end** | **Node.js**, **Express.js** (framework), **Mongoose.js** (ODM), **MongoDB** (banco de dados), **Bcrypt** (criptografia de senhas) |
| **Desenvolvimento** | **Visual Studio Code** |
| **Design/Comunicação** | **Figma** (Criação de protótipos de média fidelidade), **Discord** (Comunicação da equipe e compartilhamento de arquivos) |

### 📦 Dependências do Back-end

As principais dependências utilizadas no arquivo `package.json` para o funcionamento do servidor e API são:

* `express`: Framework web para Node.js.
* `mongoose`: Modelagem de dados para MongoDB.
* `body-parser`: Processamento de corpo de requisições HTTP.
* `cors`: Habilita o compartilhamento de recursos entre diferentes origens.
* `multer`: Middleware para manipulação de `multipart/form-data` (upload de arquivos).
* `babel-cli`: Ferramenta para executar comandos Babel.

---

## 💻 Como Executar o MVP Localmente

Siga os passos para configurar e executar o projeto em sua máquina:

1.  **Pré-requisitos:** Certifique-se de ter o **Node.js** e o **MongoDB** instalados em seu ambiente.
2.  **Instalação de Dependências:**
    * Navegue até a pasta **`backend`**.
    * Execute o comando: `npm install` (Isso instalará as dependências listadas, como Express, Mongoose, etc.).
    * *(Repita o passo para a pasta **`frontend`** se for necessário instalar dependências específicas.)*
3.  **Inicialização do Servidor (Back-end):**
    * Dentro da pasta **`backend`**, execute o comando para rodar o servidor em modo de desenvolvimento:
        ```bash
        npm run dev
        ```
    * O servidor será iniciado. Verifique o console para a porta de acesso (geralmente 3000 ou 3333).
4.  **Acesso ao Front-end:**
    * Acesse o front-end estático abrindo o arquivo **`index.html`** no seu navegador, ou inicie o servidor de desenvolvimento do front-end (se houver) e acesse a URL indicada.

---

## 👥 Autores do Projeto

* **Vinícius Nunes da Silva** – Matrícula: 06007628
* **Thiago Pereira dos Santos Oliveira** – Matrícula: 06007579
