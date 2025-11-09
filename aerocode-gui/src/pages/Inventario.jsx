import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
} from 'lucide-react';

// --- Dados Fictícios (Mock Data) ---
const mockInventoryData = [
  {
    id: 'L-105',
    name: 'Longarina Principal (Asa)',
    quantity: 12,
    status: 'Em Estoque',
    statusType: 'success',
  },
  {
    id: 'F-210',
    name: 'Seção de Fuselagem 1A',
    quantity: 4,
    status: 'Em Estoque',
    statusType: 'success',
  },
  {
    id: 'W-030',
    name: 'Janela de Cockpit (Vidro Triplo)',
    quantity: 1,
    status: 'Estoque Baixo',
    statusType: 'warning',
  },
  {
    id: 'E-404',
    name: 'Motor GE9X (Unidade)',
    quantity: 0,
    status: 'Em Falta',
    statusType: 'error',
  },
  {
    id: 'R-001',
    name: 'Rebite Estrutural (Caixa)',
    quantity: 500,
    status: 'Em Estoque',
    statusType: 'success',
  },
];
// --- Fim do Mock Data ---

// Mapeamento de status para cores (para a tabela)
const statusStyles = {
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

// --- O Componente da Página ---

function Inventario() {
  const { user } = useAuth();
  const [items, setItems] = useState(mockInventoryData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // Para Adicionar (null) ou Editar (item)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Verificação de permissão: Apenas Admin e Engenheiro podem editar.
  const canEdit = user && (user.role === 'admin' || user.role === 'engenheiro');

  // --- Funções do Modal de Adicionar/Editar ---

  const openModal = (item = null) => {
    setCurrentItem(
      item
        ? item
        : { id: '', name: '', quantity: 0, status: 'Em Estoque', statusType: 'success' }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedItem = {
      id: formData.get('id'),
      name: formData.get('name'),
      quantity: parseInt(formData.get('quantity'), 10),
      status: formData.get('status'),
      statusType: formData.get('status') === 'Em Falta' ? 'error' : (parseInt(formData.get('quantity'), 10) < 5 ? 'warning' : 'success'),
    };

    if (items.some((item) => item.id === updatedItem.id && currentItem.id !== updatedItem.id)) {
      alert('Erro: O ID da peça já existe.');
      return;
    }

    if (currentItem && items.some((item) => item.id === currentItem.id)) {
      // Editar (Atualizar)
      setItems(
        items.map((item) =>
          item.id === currentItem.id ? updatedItem : item
        )
      );
    } else {
      // Adicionar (Criar)
      setItems([updatedItem, ...items]);
    }
    closeModal();
  };

  // --- Funções do Modal de Excluir ---

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      setItems(items.filter((item) => item.id !== itemToDelete.id));
      closeDeleteModal();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* SEÇÃO 1: Cabeçalho da Página */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventário</h1>
          <p className="text-gray-400">Gestão de peças e componentes.</p>
        </div>
        {/* Mostra o botão apenas se o utilizador tiver permissão */}
        {canEdit && (
          <button
            onClick={() => openModal(null)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Adicionar Nova Peça
          </button>
        )}
      </div>

      {/* SEÇÃO 2: Tabela de Inventário (Leitura) */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">ID da Peça</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Nome do Componente</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Quantidade</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
              {canEdit && <th className="py-3 px-6 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">Ações</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700/50">
                <td className="py-4 px-6 text-sm font-medium text-white">{item.id}</td>
                <td className="py-4 px-6 text-sm text-gray-300">{item.name}</td>
                <td className="py-4 px-6 text-sm font-bold text-white">{item.quantity}</td>
                <td className={`py-4 px-6 text-sm font-medium ${statusStyles[item.statusType] || 'text-gray-400'}`}>
                  {item.status}
                </td>
                {/* Mostra as ações apenas se o utilizador tiver permissão */}
                {canEdit && (
                  <td className="py-4 px-6 text-right space-x-3">
                    <button
                      onClick={() => openModal(item)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(item)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SEÇÃO 3: Modal de Adicionar/Editar (Criar/Atualizar) */}
      {isModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg border border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {items.some((item) => item.id === currentItem.id) ? 'Editar Peça' : 'Adicionar Nova Peça'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-300 mb-1">
                  ID da Peça (ex: L-106)
                </label>
                <input
                  type="text"
                  name="id"
                  defaultValue={currentItem.id}
                  className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                  // Desativa a edição do ID se estiver editando um item existente
                  disabled={items.some((item) => item.id === currentItem.id)}
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nome do Componente
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentItem.name}
                  className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={currentItem.quantity}
                  className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={currentItem.status}
                  className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Em Estoque</option>
                  <option>Estoque Baixo</option>
                  <option>Em Falta</option>
                  <option>Em Pedido</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEÇÃO 4: Modal de Confirmação de Exclusão (Apagar) */}
      {isDeleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-900/50 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Excluir Peça</h2>
                <p className="text-gray-300 mt-1">
                  Tem a certeza que quer excluir a peça <strong>{itemToDelete.name} ({itemToDelete.id})</strong>?
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteItem}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventario;