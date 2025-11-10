# Aerocode-AV2
Projeto frontend do Aerocode da matéria de Programacao Orientada a Objeto.

# ✈️ Aerocode-GUI (Protótipo SPA)
 
![Status do Projeto](https://img.shields.io/badge/status-protótipo-blue)
![Framework](https://img.shields.io/badge/framework-React.js-blue?logo=react)
![Build Tool](https://img.shields.io/badge/build%20tool-Vite.js-purple?logo=vite)
 
Este é um protótipo de uma Aplicação de Página Única (SPA) com React e Vite para a matéria de Programação Orientada a Objetos. O projeto representa a evolução da versão CLI (`Aerocode-AV1`) para uma GUI (Interface Gráfica de Utilizador) moderna e interativa.
 
## ✨ Visão Geral
 
 O objetivo deste protótipo é demonstrar a viabilidade e a experiência de utilizador de uma interface web para gerir o complexo processo de produção aeronáutica. A aplicação foca-se na facilidade de diagnóstico ("drill-down"), na gestão de recursos (Inventário, Controle de Qualidade) e na clara separação de responsabilidades através de perfis de utilizador.
 
> **💡 Nota:** O protótipo é 100% front-end e não requer uma base de dados. Todos os dados são fictícios (*mock data*) e o estado de autenticação e das operações CRUD é mantido em memória (`React State`), sendo perdido ao atualizar a página (F5).

---
 
## 🛠️ Tecnologias Utilizadas
 
- **React.js**: Biblioteca principal para a construção da interface de utilizador.
- **Vite.js**: Ambiente de desenvolvimento front-end moderno e ultra-rápido.
- **React Router**: Para a navegação e gestão de rotas da SPA.
- **Tailwind CSS**: Framework utility-first para a estilização completa da aplicação.
- **React Context**: Para a gestão do estado global de autenticação (login simulado).
- **Lucide React**: Biblioteca de ícones leve e limpa.
  
---

## ✨ Funcionalidades Principais

O protótipo atual simula as seguintes funcionalidades:

- **Controle de Acesso por Nível:**
  - **Administrador:** Vê e pode fazer tudo, incluindo a página de "Relatórios".
  - **Engenheiro:** Vê tudo (exceto Relatórios) e pode realizar operações CRUD (Inventário, QC).
  - **Operador:** Acesso de "apenas leitura". Não pode adicionar, editar ou apagar itens.
- **Fluxo de Diagnóstico (Drill-Down):**
  - O fluxo principal de 4 cliques:
    1.  Dashboard (Visão geral)
    2.  Detalhes do Projeto (Macro-etapas)
    3.  Detalhes da Etapa (Subcomponentes)
    4.  Detalhes do Componente (Relatório de falha de CQ)
- **Módulos CRUD (Create, Read, Update, Delete):**
  - **Inventário:** Engenheiros e Admins podem adicionar, editar e apagar peças do inventário.
  - **Controlo de Qualidade (CQ):** Engenheiros e Admins podem adicionar, editar e apagar registos de inspeção.
- **Dashboards de Leitura:**
  - **Linhas de Montagem:** Uma visão geral do estado de todas as linhas de produção.
  - **Relatórios:** Uma página de KPIs agregados, visível apenas para `admin`.
 

---

## 🚀 Como Rodar o Projeto
 
Siga os passos abaixo para configurar e executar o projeto em sua máquina local.
 
### Pré-requisitos

Você precisa ter o **Node.js** (versão 20.19.0 ou superior) e o **npm** instalados em seu computador.
 
### 1. Clone o Repositório

```bash
git clone https://github.com/Marianatebecherani/Aerocode-AV2.git
```
 
Navegue para a pasta do projeto

```bash
cd aerocode-gui
```

### 2. Instale as Dependências

Este comando irá instalar todos os pacotes necessários (React, React Router, Lucide, etc.).

```bash
npm install
```

### 3. Inicie o Servidor de Desenvolvimento

Após a instalação, inicie o servidor de desenvolvimento Vite:

```bash
npm run dev
```

O terminal irá mostrar um URL local. Abra-o no seu navegador (normalmente `http://localhost:5173`).

---

## 🔑 Perfis de Teste

A aplicação irá redirecioná-lo para a página de Login. Utilize qualquer um dos seguintes perfis para testar as diferentes permissões:

#### Perfil 1: Administrador
- **Username:** `gerson.admin`
- **Password:** `adminpassword`

#### Perfil 2: Engenheiro
- **Username:** `mariana.eng`
- **Password:** `engpassword`

#### Perfil 3: Operador
- **Username:** `joao.op`
- **Password:** `oppassword`

---

Feito por Mariana Tebecherani.
 
