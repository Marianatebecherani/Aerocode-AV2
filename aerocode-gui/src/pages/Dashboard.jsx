import React from 'react';
import KpiCard from '../components/KpiCard';
import ProjectList from '../components/ProjectList';
import { AlertTriangle, CheckSquare, Layers, Package } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';

function Dashboard() {
  const { projects, aeronaves, loading, error } = useProjects();

  const totalEtapas = aeronaves.reduce((sum, aeronave) => sum + (aeronave.etapas?.length || 0), 0);
  const etapasConcluidas = aeronaves.reduce((sum, aeronave) => {
    return sum + (aeronave.etapas || []).filter((etapa) => etapa.statusTracker?.atual?.status === 'CONCLUIDA').length;
  }, 0);
  const totalPecas = aeronaves.reduce((sum, aeronave) => sum + (aeronave.pecas?.length || 0), 0);
  const testesReprovados = aeronaves.reduce((sum, aeronave) => {
    return sum + (aeronave.testes || []).filter((teste) => teste.resultadoTracker?.atual?.resultado === 'REPROVADO').length;
  }, 0);

  const kpiData = [
    {
      title: 'Aeronaves',
      value: String(aeronaves.length),
      details: 'em producao',
      icon: Package,
      colorClass: 'bg-gradient-to-r from-blue-500 to-blue-400',
    },
    {
      title: 'Etapas',
      value: `${etapasConcluidas}/${totalEtapas}`,
      details: 'concluidas',
      icon: Layers,
      colorClass: 'bg-gradient-to-r from-green-500 to-green-400',
    },
    {
      title: 'Pecas',
      value: String(totalPecas),
      details: 'rastreaveis',
      icon: CheckSquare,
      colorClass: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
    },
    {
      title: 'Alertas de Teste',
      value: testesReprovados ? String(testesReprovados) : 'Sem alertas',
      details: testesReprovados ? 'reprovados' : 'sistema ok',
      icon: AlertTriangle,
      colorClass: testesReprovados
        ? 'bg-gradient-to-r from-red-500 to-red-400'
        : 'bg-gradient-to-r from-indigo-500 to-purple-500',
    },
  ];

  if (loading) {
    return <p className="text-gray-300">Carregando dados do backend...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Visao geral das aeronaves e seus componentes.</p>
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-200 rounded-lg p-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            details={kpi.details}
            Icon={kpi.icon}
            colorClass={kpi.colorClass}
          />
        ))}
      </div>

      <ProjectList projects={projects} />
    </div>
  );
}

export default Dashboard;
