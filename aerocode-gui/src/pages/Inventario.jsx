import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Package, Search, X } from 'lucide-react';
import { api } from '../services/api';

const statusStyles = {
  EM_PRODUCAO: 'text-yellow-400',
  EM_TRANSPORTE: 'text-blue-400',
  PRONTA: 'text-green-400',
};

const initialFilters = {
  aeronaveCodigo: '',
  tipo: '',
  status: '',
  termo: '',
  page: 1,
  limit: 10,
};

function Inventario() {
  const [pecas, setPecas] = useState([]);
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

  const loadPecas = async (params = filters) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.listarPecas(params);
      setPecas(response.dados || []);
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
    loadPecas(filters);
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

  const moveStatus = async (id, direction) => {
    try {
      if (direction === 'next') {
        await api.prosseguirPeca(id);
      } else {
        await api.retrocederPeca(id);
      }
      await loadPecas(filters);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Package className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Pecas</h1>
          <p className="text-gray-400">Rastreamento de componentes por aeronave.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
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
              <option value="NACIONAL">Nacional</option>
              <option value="IMPORTADA">Importada</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Status</label>
            <select
              id="status"
              value={draftFilters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="EM_PRODUCAO">Em producao</option>
              <option value="EM_TRANSPORTE">Em transporte</option>
              <option value="PRONTA">Pronta</option>
            </select>
          </div>

          <div>
            <label htmlFor="termo" className="block text-sm font-medium text-gray-300 mb-1">Termo</label>
            <input
              id="termo"
              value={draftFilters.termo}
              onChange={(e) => handleFilterChange('termo', e.target.value)}
              placeholder="motor"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
        <p className="text-gray-300">Carregando pecas...</p>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase">ID</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase">Nome</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase">Tipo</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase">Aeronave</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase">Fornecedor</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase">Status</th>
                <th className="py-3 px-6 text-right text-sm font-semibold text-gray-300 uppercase">Fluxo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {pecas.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                    Nenhuma peca encontrada para os filtros selecionados.
                  </td>
                </tr>
              )}
              {pecas.map((peca) => (
                <tr key={peca.id} className="hover:bg-gray-700/50">
                  <td className="py-4 px-6 text-sm font-medium text-white">{peca.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-300">{peca.nome}</td>
                  <td className="py-4 px-6 text-sm text-gray-300">{peca.tipo}</td>
                  <td className="py-4 px-6 text-sm text-gray-300">{peca.aeronaveCodigo}</td>
                  <td className="py-4 px-6 text-sm text-gray-300">{peca.fornecedor}</td>
                  <td className={`py-4 px-6 text-sm font-medium ${statusStyles[peca.statusTracker?.atual?.status] || 'text-gray-400'}`}>
                    {peca.statusTracker?.atual?.status || 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => moveStatus(peca.id, 'previous')} className="text-gray-300 hover:text-white mr-3" title="Retroceder status">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => moveStatus(peca.id, 'next')} className="text-blue-400 hover:text-blue-300" title="Avancar status">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              {paginacao.total} peca(s) encontradas - pagina {paginacao.totalPages ? paginacao.page : 0} de {paginacao.totalPages}
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

export default Inventario;
