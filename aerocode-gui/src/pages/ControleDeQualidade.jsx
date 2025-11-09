import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash2, PlusCircle, CheckSquare, XSquare, AlertTriangle } from 'lucide-react';

function ControleDeQualidade() {
  const { user } = useAuth(); // Obtém o utilizador logado para verificar permissões

  // 1. Dados Fictícios (Mock Data) para as inspeções de CQ
  const mockData = [
    {
      id: 1,
      componenteId: 'Asa-E2-001L',
      inspetor: 'J. Silva',
      data: '2025-11-06',
      status: 'Reprovado',
      notas: 'Microfissura detectada na longarina principal.',
    },
    {
      id: 2,
      componenteId: 'Asa-E2-001R',
      inspetor: 'J. Silva',
      data: '2025-11-05',
      status: 'Aprovado',
      notas: '',
    },
    {
      id: 3,
      componenteId: 'Motor-GE-01',
      inspetor: 'A. Souza',
      data: '2025-11-04',
      status: 'Aprovado',
      notas: 'Teste de potência OK.',
    },
    {
      id: 4,
      componenteId: 'Fuselagem-Sec-2B',
      inspetor: 'A. Souza',
      data: '2025-11-03',
      status: 'Em Espera',
      notas: 'Aguardando inspeção ultrassônica.',
    },
  ];

  // 2. Lógica de Estado (State) para o CRUD
  const [items, setItems] = useState(mockData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' ou 'edit'
  const [currentItemId, setCurrentItemId] = useState(null);
  
  // Estado inicial do formulário (para um novo item)
  const newItemTemplate = {
    id: null,
    componenteId: '',
    inspetor: '',
    data: new Date().toISOString().split('T')[0], // Data de hoje
    status: 'Em Espera',
    notas: '',
  };
  const [formData, setFormData] = useState(newItemTemplate);

  // 3. Lógica de Permissões
  // Apenas Admin e Engenheiro podem fazer alterações
  const canEdit = useMemo(() => {
    return user && (user.role === 'admin' || user.role === 'engenheiro');
  }, [user]);

  // 4. Funções do Modal (Abrir/Fechar)
  const openModal = (mode, item = null) => {
    setIsModalOpen(true);
    setModalMode(mode);
    if (mode === 'edit' && item) {
      setFormData(item);
      setCurrentItemId(item.id);
    } else {
      setFormData(newItemTemplate); // Limpa o formulário para 'add'
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 5. Funções CRUD
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canEdit) return; // Segurança extra

    if (modalMode === 'add') {
      // Adicionar novo item
      setItems((prev) => [
        ...prev,
        { ...formData, id: Date.now() }, // Adiciona com um ID único (timestamp)
      ]);
    } else {
      // Editar item existente
      setItems((prev) =>
        prev.map((item) => (item.id === currentItemId ? formData : item))
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (!canEdit) return; // Segurança
    // Filtra o item para fora da lista
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  
  // Função de ajuda para estilizar o status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aprovado':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
            <CheckSquare className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case 'Reprovado':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
            <XSquare className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case 'Em Espera':
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
            <AlertTriangle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };


  // 6. O que é renderizado
  return (
    <div className="text-white">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Controlo de Qualidade (CQ)</h1>
          <p className="text-gray-400 mt-1">Gestão de inspeções e registos de qualidade.</p>
        </div>
        {/* Mostra o botão "Adicionar" apenas se tiver permissão */}
        {canEdit && (
          <button
            onClick={() => openModal('add')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Novo Registo de CQ
          </button>
        )}
      </header>

      {/* Tabela de Itens */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID Componente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inspetor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Notas</th>
              {canEdit && <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{item.componenteId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.inspetor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.data}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{getStatusBadge(item.status)}</td>
                <td className="px-6 py-4 text-sm text-gray-300 truncate max-w-xs">{item.notas || 'N/A'}</td>
                {canEdit && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModal('edit', item)} className="text-blue-400 hover:text-blue-300 mr-4 transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal (Pop-up) para Adicionar/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">{modalMode === 'add' ? 'Adicionar Registo de CQ' : 'Editar Registo de CQ'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="componenteId" className="block text-sm font-medium text-gray-300">ID do Componente</label>
                <input
                  type="text"
                  name="componenteId"
                  id="componenteId"
                  value={formData.componenteId}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inspetor" className="block text-sm font-medium text-gray-300">Inspetor</label>
                  <input
                    type="text"
                    name="inspetor"
                    id="inspetor"
                    value={formData.inspetor}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="data" className="block text-sm font-medium text-gray-300">Data</label>
                  <input
                    type="date"
                    name="data"
                    id="data"
                    value={formData.data}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Em Espera</option>
                  <option>Aprovado</option>
                  <option>Reprovado</option>
                </select>
              </div>

              <div>
                <label htmlFor="notas" className="block text-sm font-medium text-gray-300">Notas</label>
                <textarea
                  name="notas"
                  id="notas"
                  rows="3"
                  value={formData.notas}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ControleDeQualidade;