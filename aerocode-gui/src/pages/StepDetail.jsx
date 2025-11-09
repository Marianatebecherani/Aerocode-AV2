import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, CheckCircle, XCircle } from 'lucide-react';
import SubComponentCard from '../components/SubComponentCard';

// --- Dados Fictícios (Mock Data) ---
const mockStepData = {
  // O 'id' 4 e 'stepId' 2 vêm da URL
  projectId: 4,
  stepId: 2,
  title: 'Montagem das Asas',
  status: 'ALERTA - PARADO',
  // Os 3 componentes do mockup (Asa Esquerda, Direita, Suportes)
  components: [
    {
      id: 1, // ID do componente (para o próximo link)
      title: 'Asa Esquerda',
      icon: XCircle, // Ícone de Erro
      status: 'PARADA - FALHA CQ',
      lastUpdate: '06 Nov 2025 07:15',
      statusType: 'error',
    },
    {
      id: 2,
      title: 'Asa Direita',
      icon: CheckCircle,
      status: 'Aprovada CQ',
      lastUpdate: '05 Nov 2025 18:30',
      statusType: 'success',
    },
    {
      id: 3,
      title: 'Suportes Centrais',
      icon: CheckCircle,
      status: 'Aprovado CQ',
      lastUpdate: '05 Nov 2025 16:00',
      statusType: 'success',
    },
  ],
};
// --- Fim do Mock Data ---

function StepDetail() {
  const { id: projectId, etapaId: stepId } = useParams();

  // Carregamos os dados (usando o mock)
  const step = mockStepData;

  return (
    <div className="flex flex-col gap-8">
      {/* SEÇÃO 1: Cabeçalho e "Breadcrumb" */}
      <div>
        <span className="text-sm text-blue-400">
          {/* Link para voltar para a página do projeto */}
          <Link to={`/projeto/${projectId}`}>Projetos / Pedido 04-EMB</Link>
        </span>
        <h1 className="text-3xl font-bold text-white mt-1">{step.title}</h1>
        <p className="text-lg font-semibold text-red-500 mt-1">
          Status: {step.status}
        </p>
      </div>

      {/* SEÇÃO 2: Grid de Subcomponentes */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">
          Subcomponentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {step.components.map((component) => (
            // Cada card é um link para a Tela 4 (Detalhes do Componente)
            <Link
              key={component.id}
              to={`/projeto/${projectId}/componente/${component.id}`}
              className="transform transition-transform hover:scale-105"
            >
              <SubComponentCard component={component} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StepDetail;