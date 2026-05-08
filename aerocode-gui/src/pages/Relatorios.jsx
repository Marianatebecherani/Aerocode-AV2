import React, { useEffect, useState } from 'react';
import { FileText, PlusCircle } from 'lucide-react';
import { api } from '../services/api';

function Relatorios() {
  const [relatorios, setRelatorios] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);
  const [selectedAeronave, setSelectedAeronave] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [relatoriosResponse, aeronavesResponse] = await Promise.all([
        api.listarRelatorios({ limit: 100 }),
        api.listarAeronaves({ limit: 100 }),
      ]);
      setRelatorios(relatoriosResponse.dados || []);
      setAeronaves(aeronavesResponse.dados || []);
      setSelectedAeronave((current) => current || aeronavesResponse.dados?.[0]?.codigo || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const criarRelatorio = async () => {
    if (!selectedAeronave) return;
    try {
      await api.criarRelatorio({ aeronaveCodigo: selectedAeronave });
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Relatorios</h1>
            <p className="text-gray-400">Snapshots consolidados de aeronaves, etapas, pecas e testes.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedAeronave}
            onChange={(e) => setSelectedAeronave(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2"
          >
            {aeronaves.map((aeronave) => (
              <option key={aeronave.codigo} value={aeronave.codigo}>{aeronave.codigo}</option>
            ))}
          </select>
          <button onClick={criarRelatorio} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            <PlusCircle className="w-5 h-5" />
            Gerar
          </button>
        </div>
      </div>

      {error && <div className="bg-red-900/40 border border-red-700 text-red-200 rounded-lg p-4">{error}</div>}
      {loading ? (
        <p className="text-gray-300">Carregando relatorios...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {relatorios.map((relatorio) => (
            <div key={relatorio.id} className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{relatorio.detalhes.modelo}</h2>
                  <p className="text-sm text-gray-400">{relatorio.aeronaveCodigo}</p>
                </div>
                <p className="text-sm text-gray-400">{new Date(relatorio.dataEmissao).toLocaleString('pt-BR')}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Etapas</p>
                  <p className="text-2xl font-bold text-white">{relatorio.detalhes.etapas.length}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Pecas</p>
                  <p className="text-2xl font-bold text-white">{relatorio.detalhes.pecas.length}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Testes</p>
                  <p className="text-2xl font-bold text-white">{relatorio.detalhes.testes.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Relatorios;
