## 🚀 Como rodar o projeto localmente

Siga os passos abaixo para instalar as dependências e iniciar a aplicação em modo de desenvolvimento:

### 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão recomendada: 18+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Dynylson/control361.git
```

2. Acesse a pasta do projeto:

```bash
cd nome-do-repositorio
```

3. Instale as dependências:

```bash
npm install
# ou
yarn
```

### ▶️  Rodando o projeto

4. Adicione as variáveis de ambiente:

```bash
VITE_BASE_URL=# adicione sua chave
VITE_BASE_URL_API=# adicione sua chave
VITE_TOKEN_API=# adicione sua chave
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: http://localhost:5173

## 📝 Requisitos da Aplicação

- 🗺️ **Mapa**
  - [X] Deve exibir **todos os veículos simultaneamente**.
  - [X] Deve ser **atualizado automaticamente a cada 2 minutos** com os dados mais recentes.

- 📋 **Lista de Veículos**
  - [X] Deve carregar **20 veículos por vez**.
  - [X] Deve possuir **scroll infinito**, carregando mais veículos ao chegar ao final da lista.

- 🔍 **Detalhes do Veículo**
  - [X] Ao clicar em um veículo, exibir seus **detalhes completos**.
  - [X] Nos detalhes, deve haver um **link que abre o Google Maps** nas **coordenadas do veículo**.

- 🎯 **Filtros**
  - [X] Filtro por **placa do veículo**.
  - [X] Filtro por **número da frota**.
