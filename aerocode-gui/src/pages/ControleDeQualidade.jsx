import React, { useEffect, useState } from 'react';
import { CheckSquare, ChevronLeft, ChevronRight, Search, X, XSquare } from 'lucide-react';
import { api } from '../services/api';

const initialFilters = {
  aeronaveCodigo: '',
  tipo: '',
  resultado: '',
  page: 1,
  limit: 10,
};

function ControleDeQualidade() {
  const [testes, setTestes] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [paginacao, setPaginacao] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTestes = async (params = filters) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.listarTestes(params);
      setTestes(response.dados || []);
      setPaginacao(response.paginacao || {
        total: 0,
        page: params.page,
        limit: params.limit,
        totalPages: 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestes(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setDraftFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({
      ...draftFilters,
      page: 1,
      limit: Number(draftFilters.limit) || 10,
    });
  };

  const clearFilters = () => {
    setDraftFilters(initialFilters);
    setFilters(initialFilters);
  };

  const changePage = (nextPage) => {
    const totalPages = paginacao.totalPages || 1;
    const normalizedPage = Math.min(Math.max(nextPage, 1), totalPages);
    setDraftFilters((current) => ({ ...current, page: normalizedPage }));
    setFilters((current) => ({ ...current, page: normalizedPage }));
  };

  const changeLimit = (limit) => {
    const normalizedLimit = Number(limit) || 10;
    setDraftFilters((current) => ({ ...current, limit: normalizedLimit, page: 1 }));
    setFilters((current) => ({ ...current, limit: normalizedLimit, page: 1 }));
  };

  const updateResultado = async (id, resultado) => {
    try {
      if (resultado === 'APROVADO') {
        await api.aprovarTeste(id);
      } else {
        await api.reprovarTeste(id);
      }
      await loadTestes(filters);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Testes</h1>
        <p className="text-gray-400 mt-1">Controle de qualidade por teste eletrico, hidraulico e aerodinamico.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div>
            <label htmlFor="aeronaveCodigo" className="block text-sm font-medium text-gray-300 mb-1">Aeronave</label>
            <input
              id="aeronaveCodigo"
              value={draftFilters.aeronaveCodigo}
              onChange={(e) => handleFilterChange('aeronaveCodigo', e.target.value)}
              placeholder="AER-0001"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-300 mb-1">Tipo</label>
            <select
              id="tipo"
              value={draftFilters.tipo}
              onChange={(e) => handleFilterChange('tipo', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="ELETRICO">Eletrico</option>
              <option value="HIDRAULICO">Hidraulico</option>
              <option value="AERODINAMICO">Aerodinamico</option>
            </select>
          </div>

          <div>
            <label htmlFor="resultado" className="block text-sm font-medium text-gray-300 mb-1">Resultado</label>
            <select
              id="resultado"
              value={draftFilters.resultado}
              onChange={(e) => handleFilterChange('resultado', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="APROVADO">Aprovado</option>
              <option value="REPROVADO">Reprovado</option>
            </select>
          </div>

          <div>
            <label htmlFor="limit" className="block text-sm font-medium text-gray-300 mb-1">Itens por pagina</label>
            <select
              id="limit"
              value={draftFilters.limit}
              onChange={(e) => changeLimit(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              <Search className="w-5 h-5" />
              Buscar
            </button>
            <button type="button" onClick={clearFilters} className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg" title="Limpar filtros">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>

      {error && <div className="bg-red-900/40 border border-red-700 text-red-200 rounded-lg p-4">{error}</div>}
      {loading ? (
        <p className="text-gray-300">Carregando testes...</p>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Aeronave</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Resultado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {testes.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                    Nenhum teste encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
              {testes.map((teste) => {
                const resultado = teste.resultadoTracker?.atual?.resultado;
                return (
                  <tr key={teste.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-sm text-white">{teste.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{teste.tipo}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{teste.aeronaveCodigo}</td>
                    <td className={`px-6 py-4 text-sm font-semibold ${resultado === 'REPROVADO' ? 'text-red-400' : 'text-green-400'}`}>
                      {resultado || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => updateResultado(teste.id, 'APROVADO')} className="text-green-400 hover:text-green-300 mr-3" title="Aprovar">
                        <CheckSquare className="w-5 h-5" />
                      </button>
                      <button onClick={() => updateResultado(teste.id, 'REPROVADO')} className="text-red-400 hover:text-red-300" title="Reprovar">
                        <XSquare className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              {paginacao.total} teste(s) encontrados - pagina {paginacao.totalPages ? paginacao.page : 0} de {paginacao.totalPages}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => changePage(paginacao.page - 1)}
                disabled={paginacao.page <= 1}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
              <button
                onClick={() => changePage(paginacao.page + 1)}
                disabled={paginacao.page >= paginacao.totalPages}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proxima
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ControleDeQualidade;
