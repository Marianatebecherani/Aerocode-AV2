import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarClock, CheckCircle, Clock, PlayCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusVisuals = {
  PENDENTE: { icon: Clock, border: 'border-gray-600', text: 'text-gray-400' },
  EM_ANDAMENTO: { icon: PlayCircle, border: 'border-yellow-500', text: 'text-yellow-400' },
  CONCLUIDA: { icon: CheckCircle, border: 'border-green-500', text: 'text-green-400' },
};

function LinhaDeMontagem() {
  const { user } = useAuth();
  const [etapas, setEtapas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const canOperate = user && (user.role === 'admin' || user.role === 'engenheiro');

  const loadEtapas = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.listarEtapas({ limit: 100 });
      setEtapas(response.dados || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEtapas();
  }, []);

  const moveStatus = async (id, direction) => {
    if (!canOperate) {
      setError('Seu perfil possui acesso somente leitura.');
      return;
    }

    try {
      if (direction === 'next') {
        await api.prosseguirEtapa(id);
      } else {
        await api.retrocederEtapa(id);
      }
      await loadEtapas();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <CalendarClock className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Etapas</h1>
          <p className="text-gray-400">Acompanhamento da montagem por aeronave.</p>
        </div>
      </div>

      {error && <div className="bg-red-900/40 border border-red-700 text-red-200 rounded-lg p-4">{error}</div>}
      {loading ? (
        <p className="text-gray-300">Carregando etapas...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {etapas.map((etapa) => {
            const status = etapa.statusTracker?.atual?.status || 'PENDENTE';
            const visual = statusVisuals[status] || statusVisuals.PENDENTE;
            const StatusIcon = visual.icon;
            return (
              <div key={etapa.id} className={`bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 ${visual.border}`}>
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{etapa.nome}</h2>
                    <p className="text-sm text-gray-400 mt-1">{etapa.aeronaveCodigo}</p>
                  </div>
                  <StatusIcon className={`w-6 h-6 ${visual.text}`} />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-300">Prazo: {new Date(etapa.prazoConclusao).toLocaleDateString('pt-BR')}</p>
                  <p className="text-sm text-gray-300">Prioridade: {etapa.prioridade}</p>
                  <p className={`text-sm font-semibold ${visual.text}`}>{status}</p>
                </div>
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => moveStatus(etapa.id, 'previous')}
                    disabled={!canOperate}
                    className="text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    title={canOperate ? 'Retroceder' : 'Acesso somente leitura'}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => moveStatus(etapa.id, 'next')}
                    disabled={!canOperate}
                    className="text-blue-400 hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    title={canOperate ? 'Avancar' : 'Acesso somente leitura'}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LinhaDeMontagem;
