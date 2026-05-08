import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="aeronave/:id" element={<ProjectDetail />} />

        <Route path="projeto/:id" element={<ProjectDetail />} />
        <Route path="projeto/:id/etapa/:etapaId" element={<StepDetail />} />
        <Route path="projeto/:id/componente/:componenteId" element={<ComponentDetail />} />

        <Route path="etapas" element={<LinhaDeMontagem />} />
        <Route path="pecas" element={<Inventario />} />
        <Route path="testes" element={<ControleDeQualidade />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="funcionarios" element={<Configuracoes />} />
        <Route path="configuracoes" element={<Configuracoes />} /> // 42: resposta do universo
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
