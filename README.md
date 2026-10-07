# Schedule Manager

Sistema completo para gerenciamento de agendamentos, clientes e catálogo de serviços.

## Filosofia de Design: Mobile-First

O frontend deste projeto foi desenvolvido seguindo estritamente a filosofia **Mobile-First**. Toda a interface, navegação por gavetas/menus e disposição de cartões de agendamento são projetadas prioritariamente para telas de smartphones, garantindo excelente usabilidade e agilidade no uso em dispositivos móveis, com adaptação progressiva para telas de desktop.

---

## Stack Tecnológica

### Backend (`/api`)
- Java 21
- Spring Boot 4.1.1
- Spring Security (Autenticação Stateless com JWT)
- Spring Data JPA
- Liquibase (Migrações de Banco de Dados)
- PostgreSQL 16
- SpringDoc OpenAPI (Swagger UI)

### Frontend (`/ui`)
- Next.js 16.3 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn UI / `@base-ui/react`

### Infraestrutura
- Docker e Docker Compose

---

## Estrutura do Repositório

```text
schedule-manager/
├── api/                  # Servidor backend Spring Boot
├── ui/                   # Aplicação frontend Next.js (Mobile-First)
├── fixes/                # Correções e utilitários
├── docker-compose.yaml   # Orquestração de containers (PostgreSQL + API)
├── .env-example          # Exemplo de variáveis de ambiente
└── README.md             # Documentação do projeto
```

---

## Como Executar o Projeto

1. Na raiz do projeto, copie o arquivo de exemplo de ambiente e configure as variáveis se necessário:
   ```bash
   cp .env-example .env
   ```

2. Suba os containers do banco de dados e da API:
   ```bash
   docker compose up -d
   ```

## Licença

Este projeto está sob a licença especificada no arquivo [LICENSE](LICENSE).
