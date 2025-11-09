import React from 'react';
// Link é o componente que faz a navegação da SPA (sem recarregar a página)
import { Link } from 'react-router-dom';
// Ícones para os status dos projetos
import { CheckCircle, XCircle, AlertCircle, Clock, Package } from 'lucide-react';

// Função auxiliar para pegar o ícone e a cor com base no status
const getStatusVisuals = (statusType) => {
  switch (statusType) {
    case 'success':
      return { icon: CheckCircle, color: 'text-green-500' };
    case 'error':
      return { icon: XCircle, color: 'text-red-500' };
    case 'warning':
      return { icon: AlertCircle, color: 'text-yellow-500' };
    case 'pending':
    default:
      return { icon: Clock, color: 'text-gray-500' };
  }
};

function ProjectList({ projects }) {
  return (
    // Card de fundo para a lista
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <a href="#" className="text-sm text-blue-400 hover:underline">
          Visualizar todos os alertas
        </a>
      </div>

      {/* Container da Lista */}
      <div className="flex flex-col gap-4">
        {projects.map((project) => {
          // Pega o ícone e a cor do status
          const { icon: StatusIcon, color: statusColor } = getStatusVisuals(project.statusType);

          return (
            // CADA ITEM É UM LINK! 
            // Navega para a rota definida no App.jsx (ex: "/projeto/04-EMB")
            <Link
              key={project.id}
              to={`/projeto/${project.id}`}
              className="flex items-center p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
            >
              {/* Ícone do Projeto */}
              <div className="p-3 bg-gray-800 rounded-full mr-4">
                <Package className="w-6 h-6 text-gray-400" />
              </div>

              {/* Nome e Status */}
              <div className="flex-1">
                <p className="text-lg font-semibold text-white">{project.title}</p>
                <p className={`text-sm ${statusColor}`}>{project.status}</p>
              </div>

              {/* ID e Valor */}
              <div className="flex-1 text-center">
                <p className="text-sm text-gray-400">{project.idNumber}</p>
                <p className="text-lg font-bold text-white">{project.value}</p>
              </div>

              {/* Barra de Progresso */}
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div
                    className={`${
                      project.statusType === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    } h-2.5 rounded-full`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Ícone de Status */}
              <div className="ml-4">
                <StatusIcon className={`w-6 h-6 ${statusColor}`} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;