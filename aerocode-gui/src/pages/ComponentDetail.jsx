import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  XCircle,
  AlertOctagon,
  CheckCircle,
  Clock,
  ClipboardList,
  PackageCheck,
  Wrench,
} from 'lucide-react';

// --- Dados Fictícios (Mock Data) ---
const mockComponentData = {
  // O 'id' 4 e 'componenteId' 1 vêm da URL
  projectId: 4,
  componentId: 1,
  title: 'Asa Esquerda',
  breadcrumb: 'Projetos / Pedido 04-EMB / Montagem das Asas',
  status: 'PARADA - FALHA NO CONTROLE DE QUALIDADE',
  
  // 1. Dados para o card "Last QC Inspection"
  qcInspection: {
    status: 'Reprovado',
    date: '06 Nov 2025 / 07:15',
    inspector: 'J. Silva',
    notes:
      'Detectada microfissura na longarina principal (Peça ID #L-105) durante inspeção ultrassônica. Componente não pode prosseguir.',
  },

  // 2. Dados para o card "Required Parts"
  requiredParts: [
    {
      id: 1,
      name: 'Longarina Principal (Peça ID #L-105)',
      status: 'REPROVADA (Defeituosa)',
      action: 'Novo pedido de Peça #L-105 solicitado (Ticket #S-9012).',
      actionStatus: 'Aguardando Entrega',
      icon: AlertOctagon,
      statusType: 'error',
    },
  ],

  // 3. Dados para o card "Activity Log"
  activityLog: [
    { id: 1, text: 'Inspeção de CQ (Reprovado)', icon: XCircle, status: 'error' },
    { id: 2, text: 'Inspeção de CQ (Iniciada)', icon: ClipboardList, status: 'info' },
    { id: 3, text: 'Componente movido para área de CQ', icon: PackageCheck, status: 'info' },
    { id: 4, text: 'Produção Finalizada', icon: CheckCircle, status: 'success' },
    { id: 5, text: 'Produção Iniciada', icon: Wrench, status: 'info' },
  ],
};
// --- Fim do Mock Data ---


// --- Componentes Internos para os Cards ---

// Card 1: Última Inspeção de CQ
const QcCard = ({ qc }) => (
  <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-white">Última Inspeção de CQ</h3>
      <XCircle className="w-6 h-6 text-red-400" />
    </div>
    <div className="space-y-3">
      <p className="text-sm text-gray-300">
        <span className="font-medium text-gray-100">Resultado:</span>
        <span className="font-bold text-red-400 ml-2">{qc.status}</span>
      </p>
      <p className="text-sm text-gray-300">
        <span className="font-medium text-gray-100">Data/Inspetor:</span> {qc.date} por {qc.inspector}
      </p>
      <p className="text-sm text-gray-300">
        <span className="font-medium text-gray-100">Notas do Inspetor:</span>
      </p>
      <p className="text-sm text-white bg-red-900/70 p-3 rounded">{qc.notes}</p>
    </div>
  </div>
);

// Card 2: Pecas Requeridas
const PartsCard = ({ parts }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h3 className="text-lg font-semibold text-white mb-4">Peças Requeridas</h3>
    <div className="space-y-4">
      {parts.map((part) => (
        <div key={part.id} className="flex gap-4">
          <part.icon className="w-5 h-5 text-red-400 mt-1" />
          <div>
            <p className="font-semibold text-white">{part.name}</p>
            <p className="text-sm text-red-400">{part.status}</p>
            <p className="text-sm text-gray-300 mt-1">{part.action}</p>
            <p className="text-sm text-yellow-400">{part.actionStatus}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Card 3: Log de Atividades
const ActivityCard = ({ log }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h3 className="text-lg font-semibold text-white mb-4">Log de Atividades</h3>
    <ul className="space-y-3">
      {log.map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <item.icon className={`w-4 h-4 ${item.status === 'error' ? 'text-red-400' : 'text-gray-400'}`} />
          <span className="text-sm text-gray-300">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);
// --- Fim dos Componentes Internos ---


function ComponentDetail() {
  // Le os IDs da URL
  const { id: projectId, componenteId: componentId } = useParams();

  // Carrega os dados (usando o mock)
  const data = mockComponentData;

  return (
    <div className="flex flex-col gap-8">
      {/* SEÇÃO 1: Cabeçalho e "Breadcrumb" */}
      <div>
        <span className="text-sm text-blue-400">
          {/* Link para voltar para a página da etapa */}
          <Link to={`/projeto/${data.projectId}/etapa/2`}>{data.breadcrumb}</Link>
        </span>
        <h1 className="text-3xl font-bold text-white mt-1">{data.title}</h1>
        <p className="text-lg font-semibold text-red-500 mt-1">
          Status: {data.status}
        </p>
      </div>

      {/* SEÇÃO 2: Grid de Diagnóstico (Layout 2x1) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna da Esquerda (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <QcCard qc={data.qcInspection} />
          <PartsCard parts={data.requiredParts} />
        </div>

        {/* Coluna da Direita (1/3) */}
        <div className="lg:col-span-1">
          <ActivityCard log={data.activityLog} />
        </div>
        
      </section>
    </div>
  );
}

export default ComponentDetail;