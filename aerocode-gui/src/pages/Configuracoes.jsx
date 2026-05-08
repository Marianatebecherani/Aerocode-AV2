import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const emptyForm = {
  nome: '',
  telefone: '',
  endereco: '',
  usuario: '',
  senha: '',
  nivelPermissao: 'OPERADOR',
};

function Configuracoes() {
  const { user } = useAuth();
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const canManage = user && (user.role === 'admin' || user.role === 'engenheiro');

  const loadFuncionarios = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.listarFuncionarios({ limit: 100 });
      setFuncionarios(response.dados || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFuncionarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.criarFuncionario(form);
      setForm(emptyForm);
      setIsFormOpen(false);
      await loadFuncionarios();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja remover este funcionario?')) return;
    try {
      await api.deletarFuncionario(id);
      await loadFuncionarios();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Pessoas</h1>
            <p className="text-gray-400">Funcionarios, contatos e niveis de permissao.</p>
          </div>
        </div>
        {canManage && (
          <button
            onClick={() => setIsFormOpen((value) => !value)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            <Plus className="w-5 h-5" />
            Novo funcionario
          </button>
        )}
      </div>

      {error && <div className="bg-red-900/40 border border-red-700 text-red-200 rounded-lg p-4">{error}</div>}

      {isFormOpen && canManage && (
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          <input className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" placeholder="Telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} required />
          <input className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" placeholder="Endereco" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} required />
          <input className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" placeholder="Usuario" value={form.usuario} onChange={(e) => setForm({ ...form, usuario: e.target.value })} required />
          <input type="password" className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" placeholder="Senha" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} required />
          <select className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" value={form.nivelPermissao} onChange={(e) => setForm({ ...form, nivelPermissao: e.target.value })}>
            <option value="OPERADOR">Operador</option>
            <option value="ENGENHEIRO">Engenheiro</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
          <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
            Salvar funcionario
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-300">Carregando pessoas...</p>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Permissao</th>
                {canManage && <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Acoes</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-white">{funcionario.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{funcionario.usuario}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{funcionario.telefone}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{funcionario.nivelPermissao}</td>
                  {canManage && (
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(funcionario.id)} className="text-red-400 hover:text-red-300" title="Excluir">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Configuracoes;
