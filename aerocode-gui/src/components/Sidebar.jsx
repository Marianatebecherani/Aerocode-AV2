import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Logo_Aerocode.jpg';

// 1. Importa todos os ícones necessários
import {
  LayoutDashboard,
  Package,
  CheckSquare,
  HardHat,
  FileText,
  Settings,
} from 'lucide-react';

// Este é o estilo base para TODOS os links
const baseLinkStyle =
  'flex items-center gap-3 p-3 rounded-lg text-gray-300 transition-colors';
// Este é o estilo se o link estiver ativo
const activeLinkStyle = 'bg-blue-600 text-white font-medium';

function Sidebar() {
  const { user } = useAuth();
  // 2. Verificação de permissão: Apenas 'admin' pode ver certos links
  const canSeeAdminLinks = user && user.role === 'admin';

  // Esta função é chamada pelo <NavLink> para determinar o estilo
  const styleLink = ({ isActive }) =>
    isActive
      ? `${baseLinkStyle} ${activeLinkStyle}` // Estilo Ativo
      : `${baseLinkStyle} hover:bg-gray-700 hover:text-white`; // Estilo Inativo

  return (
    // 3. Estrutura da Barra Lateral (Tailwind)
    <aside className="w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700">
      
      {/* 4. Logo (no topo) */}
      <div className="mb-8 p-2 text-center">
        <NavLink to="/">
          <img
            src={logo}
            alt="Aerocode Logo"
            className="h-10 w-auto mx-auto"
          />
        </NavLink>
      </div>

      {/* 5. Navegação Principal */}
      <nav className="flex-1 flex flex-col gap-2">
        {/* Usa 'end' no Dashboard para que ele não fique ativo em rotas filhas (como /projeto/123) */}
        <NavLink to="/" end className={styleLink}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/linha-de-montagem" className={styleLink}>
          <HardHat className="w-5 h-5" />
          Linhas de Montagem
        </NavLink>

        <NavLink to="/inventario" className={styleLink}>
          <Package className="w-5 h-5" />
          Inventário
        </NavLink>

        <NavLink to="/qc" className={styleLink}>
          <CheckSquare className="w-5 h-5" />
          Controle de Qualidade
        </NavLink>

        {/* 6. Links de Admin (renderização condicional) */}
        {/* Este bloco <></> SÓ aparece se 'canSeeAdminLinks' for verdadeiro */}
        {canSeeAdminLinks && (
          <>
            <hr className="border-gray-600 my-2" />
            <NavLink to="/relatorios" className={styleLink}>
              <FileText className="w-5 h-5" />
              Relatórios
            </NavLink>
            <NavLink to="/configuracoes" className={styleLink}>
              <Settings className="w-5 h-5" />
              Configurações
            </NavLink>
          </>
        )}
      </nav>

      {/* 7. Área do Rodapé da Barra Lateral (fica no fundo) */}
      <div className="mt-auto">
      </div>
    </aside>
  );
}

export default Sidebar;