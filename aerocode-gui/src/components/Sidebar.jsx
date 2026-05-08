import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Logo_Aerocode.jpg';

import {
  CalendarClock,
  CheckSquare,
  FileText,
  LayoutDashboard,
  Package,
  Users,
} from 'lucide-react';

const baseLinkStyle = 'flex items-center gap-3 p-3 rounded-lg text-gray-300 transition-colors';
const activeLinkStyle = 'bg-blue-600 text-white font-medium';

function Sidebar() {
  const { user } = useAuth();
  const canManagePeople = user && (user.role === 'admin' || user.role === 'engenheiro');

  const styleLink = ({ isActive }) =>
    isActive
      ? `${baseLinkStyle} ${activeLinkStyle}`
      : `${baseLinkStyle} hover:bg-gray-700 hover:text-white`;

  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700">
      <div className="mb-8 p-2 text-center">
        <NavLink to="/">
          <img src={logo} alt="Aerocode Logo" className="h-10 w-auto mx-auto" />
        </NavLink>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <NavLink to="/" end className={styleLink}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/etapas" className={styleLink}>
          <CalendarClock className="w-5 h-5" />
          Etapas
        </NavLink>

        <NavLink to="/pecas" className={styleLink}>
          <Package className="w-5 h-5" />
          Peças
        </NavLink>

        <NavLink to="/testes" className={styleLink}>
          <CheckSquare className="w-5 h-5" />
          Testes
        </NavLink>

        <NavLink to="/relatorios" className={styleLink}>
          <FileText className="w-5 h-5" />
          Relatorios
        </NavLink>

        {canManagePeople && (
          <>
            <hr className="border-gray-600 my-2" />
            <NavLink to="/funcionarios" className={styleLink}>
              <Users className="w-5 h-5" />
              Funcionários
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
