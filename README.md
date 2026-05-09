# Aerocode-AV2

Protótipo SPA do sistema Aerocode, desenvolvido para a disciplina de Programação Orientada a Objetos.

![Status do Projeto](https://img.shields.io/badge/status-prot%C3%B3tipo-blue)
![Framework](https://img.shields.io/badge/framework-React.js-blue?logo=react)
![Build Tool](https://img.shields.io/badge/build%20tool-Vite.js-purple?logo=vite)

## Sobre o Projeto

O Aerocode é uma aplicação web para gestão de produção, rastreabilidade e controle operacional de aeronaves. A versão AV2 evolui a interface CLI da AV1 para uma SPA moderna, centralizada e orientada a fluxos operacionais.

O protótipo foi validado no relatório de design e wireframing de 2026, com wireframes low quality e user flows para os principais módulos do sistema.

## Objetivos

- Centralizar a gestão de aeronaves, etapas, peças e testes.
- Permitir rastreabilidade operacional durante o fluxo de produção.
- Melhorar a experiência do usuário em relação à versão CLI.
- Implementar controle de permissões baseado em perfil.
- Validar fluxos completos de operação por meio de wireframes e user flows.

## Público-Alvo

- Engenheiros de Produção e Aeronáuticos.
- Operadores de montagem.
- Gestores de Controle de Qualidade.
- Administradores do sistema.

## Funcionalidades

- **Autenticação e controle de perfis:** acesso por Administrador, Engenheiro e Operador.
- **Dashboard principal:** indicadores consolidados de aeronaves, etapas, peças e testes.
- **Gestão de Aeronaves:** cadastro, edição, listagem e exclusão de aeronaves.
- **Gestão de Etapas:** acompanhamento do fluxo de montagem das aeronaves.
- **Gestão de Peças:** rastreamento de componentes, fornecedores e status logísticos.
- **Gestão de Testes:** registro e acompanhamento de testes elétricos, hidráulicos e aerodinâmicos.
- **Gestão de Relatórios:** geração de snapshots operacionais das aeronaves.
- **Gestão de Funcionários:** administração de usuários e permissões do sistema.

## Perfis de Acesso

### Administrador

Possui acesso total ao sistema:

- Dashboard
- Aeronaves
- Etapas
- Peças
- Testes
- Relatórios
- Funcionários

Também possui permissões completas de CRUD: criar, visualizar, atualizar e excluir registros.

### Engenheiro

Possui acesso operacional às funcionalidades produtivas do sistema:

- Dashboard
- Aeronaves
- Etapas
- Peças
- Testes

Não possui acesso às páginas de Relatórios e Funcionários.

### Operador

Possui os mesmos acessos visuais do Engenheiro, mas com restrições de edição em:

- Aeronaves
- Etapas
- Peças
- Testes

A ação operacional permitida ao Operador é a movimentação de peças pela opção de alteração de status na página de Peças.

## Tecnologias

- **React.js:** biblioteca principal para construção da interface.
- **Vite.js:** ambiente de desenvolvimento e build.
- **React Router:** gerenciamento de rotas da SPA.
- **Tailwind CSS:** estilização da interface.
- **React Context:** estado global de autenticação.
- **Lucide React:** biblioteca de ícones.

## Estrutura do Projeto

```text
Aerocode-AV2/
+-- aerocode-gui/              # Aplicação frontend
|   +-- src/
|   |   +-- components/        # Componentes reutilizáveis
|   |   +-- context/           # Contextos globais
|   |   +-- data/              # Dados locais de apoio
|   |   +-- pages/             # Páginas da aplicação
|   |   +-- services/          # API mockada e cliente de API
|   |   +-- utils/             # Regras de permissão
|   +-- package.json
+-- docs/                      # Relatórios, wireframes e materiais de apoio
```

## Dados e Persistência

Por padrão, o projeto usa uma API mockada no frontend. Os dados iniciais são fictícios e ficam salvos no `localStorage` do navegador durante os testes.

Para conectar a aplicação a uma API real, ajuste a variável no arquivo `.env`:

```env
VITE_USE_MOCK_API=false
```

## Como Rodar

### Pré-requisitos

- Node.js 20.19.0 ou superior.
- npm instalado.

### Instalação

```bash
git clone https://github.com/Marianatebecherani/Aerocode-AV2.git
cd Aerocode-AV2/aerocode-gui
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra a URL exibida no terminal, normalmente `http://localhost:5173`.

### Build

```bash
npm run build
```

## Perfis de Teste

### Administrador

- **Usuário:** `gerson.admin`
- **Senha:** `adminpassword`

### Engenheiro

- **Usuário:** `mariana.eng`
- **Senha:** `engpassword`

### Operador

- **Usuário:** `joao.op`
- **Senha:** `oppassword`

## Documentação

Os materiais de apoio estão na pasta `docs/`, incluindo:

- `Relatorio_Aerocode_2026.pdf`
- wireframes low quality
- user flows
- capturas das telas do protótipo

## Autoria

Desenvolvido por Mariana Rebelo Tebecherani.
