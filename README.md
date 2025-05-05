# Teste Full-Stack - Projeto Teddy

Aplicação para gerenciamento de clientes.

## Tecnologias
- **Frontend**: React + Vite
- **Backend**: NestJS
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker

## Execução com Docker (Recomendado)
### Pré-requisitos
- Docker e Docker Compose instalados
```bash
 # 1. Clone o repositório
git clone https://github.com/Gulherme-Prado/CRUDProject.git
cd CRUDProject

# 2. Configure as variáveis de ambiente
cd nest-js
mv .env.example .env 
cd ..

# 3. Execute os containers
docker compose up --build
```
## Execução sem Docker
### Pré-requisitos
- Node.js 18+
- PostgreSQL instalado localmente

### Backend
```bash
# 1. Configure o banco de dados
# Crie um banco chamado 'users_db' no PostgreSQL

# 2. Configure as variáveis de ambiente
cd nest-js
mv .env.example .env

# 3. Instale as dependências
npm install

# 4. Inicie o backend
npm run start:dev
```

### Frontend
```bash
cd react-js
npm install
npm run dev
```

## Endpoints
### Docker     
- http://localhost (Acessar a aplicação)
- http://localhost:3000/api (SwaggerUI)

## Localmente
- http://localhost:5173 (Acessar a aplicação)  
- http://localhost:3000/api (SwaggerUI)
  
