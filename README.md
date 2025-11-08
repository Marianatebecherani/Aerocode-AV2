# Aerocode-AV2
Projeto frontend do Aerocode da matéria de Programacao Orientada a Objeto.

✈️ Protótipo Aerocode GUI (SPA)

Este repositório contém o código-fonte do protótipo de uma Aplicação de Página Única (SPA) para o sistema de Gestão da Produção de Aeronaves da Aerocode.

O projeto foi desenvolvido em React (utilizando Vite) e simula a transição de um sistema CLI (Command Line Interface) para uma GUI moderna, intuitiva e baseada na web.

1. Visão Geral e Contexto

O objetivo deste protótipo é demonstrar a viabilidade e a experiência de utilizador (UX) de uma interface web para gerir a complexa produção de aeronaves. A aplicação foca-se na facilidade de diagnóstico, na gestão de recursos e na clara separação de responsabilidades através de perfis de utilizador.

O protótipo é 100% front-end e não requer uma base de dados. Todos os dados são fictícios (mock data) e o estado de autenticação e das operações CRUD (Adicionar, Editar, Apagar) é mantido em memória (React State) e será perdido ao atualizar a página (F5).

2. Funcionalidades Implementadas

O protótipo atual simula as seguintes funcionalidades:

Autenticação por Perfis:

Três perfis de utilizador distintos: admin, engenheiro, e operador.

Rotas e componentes protegidos com base no perfil.

Fluxo de Diagnóstico (Drill-Down):

O fluxo principal de 4 cliques:

Dashboard (Visão geral)

Detalhes do Projeto (Macro-etapas)

Detalhes da Etapa (Subcomponentes)

Detalhes do Componente (Relatório de falha de QC)

Módulos CRUD (Create, Read, Update, Delete):

Inventário: Engenheiros e Admins podem adicionar, editar e apagar peças do inventário.

Controlo de Qualidade (QC): Engenheiros e Admins podem adicionar, editar e apagar registos de inspeção.

Dashboards de Leitura:

Linhas de Montagem: Uma visão geral do estado de todas as linhas de produção.

Relatórios: Uma página de KPIs agregados, visível apenas para admin.

3. Como Executar o Projeto

Para executar este projeto localmente, são necessários o Node.js (versão 20.19.0 ou superior) e o npm.

Passo 1: Instalar as Dependências

Clone o repositório, navegue para a pasta do projeto e instale todas as dependências necessárias:

# Navegue para a pasta do projeto (ex: aerocode-gui)
cd aerocode-gui

# Instale todos os pacotes (React, React Router, Lucide, etc.)
npm install


Passo 2: Iniciar o Servidor de Desenvolvimento

Após a instalação, inicie o servidor de desenvolvimento Vite:

npm run dev


O terminal irá mostrar um URL local. Abra-o no seu navegador (normalmente http://localhost:5173).

Passo 3: Aceder à Aplicação (Perfis de Teste)

A aplicação irá redirecioná-lo para a página de Login. Utilize qualquer um dos seguintes perfis para testar as diferentes permissões:

Perfil 1: Administrador

Username: admin

Password: admin

Acesso: Vê e pode fazer tudo, incluindo a página de "Relatórios".

Perfil 2: Engenheiro

Username: engenheiro

Password: engenheiro

Acesso: Vê tudo (exceto Relatórios) e pode realizar operações CRUD (Inventário, QC).

Perfil 3: Operador

Username: operador

Password: operador

Acesso: Acesso de "apenas leitura". Não vê "Relatórios" ou "Configurações" e não pode adicionar, editar ou apagar itens no Inventário ou QC.
