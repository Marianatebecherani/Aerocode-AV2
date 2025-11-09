import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Clock, AlertTriangle, ListTodo, Package } from 'lucide-react';

// Reutiliza o KpiCard que já fiz
import KpiCard from '../components/KpiCard';
// Importa o novo componente para as etapas
import StepCard from '../components/StepCard';

// --- Dados Fictícios (Mock Data) ---
const mockProjectData = {
  id: 4,
  title: 'Pedido 04-EMB (Embraer E2)',
  breadcrumb: 'Projetos',
  status: 'ALERTA - PARADO',
  kpis: [
    {
      id: 1,
      title: 'Progresso Total',
      value: '65%',
      icon: Check, 
      color: 'red',
    },
    {
      id: 2,
      title: 'Prazo Estimado',
      value: '15/Dez/2025',
      icon: Clock,
      color: 'gray',
    },
  ],
  steps: [
    {
      id: 1,
      title: '1. Estrutura e Fundações',
      status: 'Completo',
      icon: Package,
      tasks: [
        'Recebimento de materiais',
        'Inspeção de longarinas',
        'Montagem do esqueleto base',
      ],
    },
    {
      id: 2,
      title: '2. Montagem das Asas',
      status: 'ALERTA - PARADO',
      icon: AlertTriangle,
      tasks: [
        'Montagem Asa Esquerda (PARADO)',
        'Montagem Asa Direita',
        'Instalação de Flaps',
        'Inspeção de Qualidade (Pendente)',
      ],
    },
    {
      id: 3,
      title: '3. Montagem da Fuselagem',
      status: 'Em Espera',
      icon: ListTodo,
      tasks: ['Pendente da Etapa 2'],
    },
    {
      id: 4,
      title: '4. Instalação de Aviônica',
      status: 'Em Espera',
      icon: ListTodo,
      tasks: ['Pendente da Etapa 3'],
    },
  ],
};
// --- Fim do Mock Data ---

function ProjectDetail() {
  const { id: projectId } = useParams();
  const project = mockProjectData;

  return (
    <div className="flex flex-col gap-8">
      {/* SEÇÃO 1: Cabeçalho da Página */}
      <div>
        <span className="text-sm text-gray-400">{project.breadcrumb}</span>
        <h1 className="text-3xl font-bold text-white mt-1">{project.title}</h1>
      </div>

      {/* SEÇÃO 2: KPIs (Reutilizando KpiCard) */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {project.kpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              Icon={kpi.icon}
              color={kpi.color}
              className="md:col-span-1"
            />
          ))}
        </div>
      </section>

      {/* SEÇÃO 3: Macro-Etapas (Usando StepCard) */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Macro-Etapas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {project.steps.map((step) => (
            <Link
              key={step.id}
              to={`/projeto/${projectId}/etapa/${step.id}`}
              className="transform transition-transform hover:scale-105"
            >
              <StepCard step={step} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProjectDetail;