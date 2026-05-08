import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const ProjectsContext = createContext(null);

const statusRank = {
  PENDENTE: 0,
  EM_ANDAMENTO: 50,
  CONCLUIDA: 100,
};

function calculateProgress(aeronave) {
  if (!aeronave.etapas?.length) return 0;
  const total = aeronave.etapas.reduce((sum, etapa) => {
    return sum + (statusRank[etapa.statusTracker?.atual?.status] ?? 0);
  }, 0);
  return Math.round(total / aeronave.etapas.length);
}

function calculateStatusType(aeronave) {
  const testes = aeronave.testes || [];
  const etapas = aeronave.etapas || [];
  const pecas = aeronave.pecas || [];

  if (testes.some((teste) => teste.resultadoTracker?.atual?.resultado === 'REPROVADO')) {
    return 'error';
  }

  if (
    etapas.some((etapa) => etapa.statusTracker?.atual?.status === 'EM_ANDAMENTO') ||
    pecas.some((peca) => peca.statusTracker?.atual?.status === 'EM_TRANSPORTE')
  ) {
    return 'warning';
  }

  if (etapas.length && etapas.every((etapa) => etapa.statusTracker?.atual?.status === 'CONCLUIDA')) {
    return 'success';
  }

  return 'pending';
}

function projectFromAeronave(aeronave) {
  const progress = calculateProgress(aeronave);
  const statusType = calculateStatusType(aeronave);
  const statusLabel = {
    error: 'Atenção nos testes',
    warning: 'Em andamento',
    success: 'Concluída',
    pending: 'Planejada',
  }[statusType];

  return {
    id: aeronave.codigo,
    codigo: aeronave.codigo,
    title: aeronave.modelo,
    description: `${aeronave.tipo} - ${aeronave.capacidade} passageiros`,
    idNumber: aeronave.codigo,
    value: `${aeronave.alcance} km`,
    status: statusLabel,
    statusType,
    progress,
    aeronave,
  };
}

export function ProjectsProvider({ children }) {
  const [aeronaves, setAeronaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAeronaves = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.listarAeronaves({ limit: 100 });
      setAeronaves(response.dados || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAeronaves();
  }, [loadAeronaves]);

  const projects = useMemo(() => aeronaves.map(projectFromAeronave), [aeronaves]);

  const value = {
    aeronaves,
    projects,
    loading,
    error,
    refresh: loadAeronaves,
    fetchAeronaveDetalhes: api.buscarDetalhesAeronave,
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects deve ser usado dentro de um ProjectsProvider');
  }
  return context;
};
