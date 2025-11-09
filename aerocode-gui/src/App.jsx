import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import StepDetail from './pages/StepDetail';
import ComponentDetail from './pages/ComponentDetail';
import Inventario from './pages/Inventario';
import ControleDeQualidade from './pages/ControleDeQualidade';
import LinhaDeMontagem from './pages/LinhaDeMontagem';
import Relatorios from './pages/Relatorios';

import Configuracoes from './pages/Configuracoes';

function App() {
  return (
    <Routes>
      {/* Rota 1: Página de Login (Pública) */}
      <Route path="/login" element={<Login />} />

      {/* Rota 2: Rotas Protegidas (Privadas) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Estas são as páginas que aparecem DENTRO do Layout */}
        
        {/* O 'index' define a página principal (/) */}
        <Route index element={<Dashboard />} />

        {/* Rotas do Fluxo de Diagnóstico */}
        <Route path="projeto/:id" element={<ProjectDetail />} />
        <Route path="projeto/:id/etapa/:etapaId" element={<StepDetail />} />
        <Route path="projeto/:id/componente/:componenteId" element={<ComponentDetail />} />

        {/* Rotas das Novas Páginas */}
        <Route path="linha-de-montagem" element={<LinhaDeMontagem />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="qc" element={<ControleDeQualidade />} />
        
        {/* Rotas de Admin */}
        <Route path="relatorios" element={<Relatorios />} />
  
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>

      {/* Rota 3: "Catch-all" (Se não encontrar nada) */}
      {/* Se o utilizador for para uma rota que não existe, volta ao início */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;