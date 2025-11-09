// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext, useEffect } from 'react';
import { users as initialUsers } from '../data/users';

// 1. Cria o Contexto
const AuthContext = createContext(null);

// 2. Cria o Provedor (Provider)
export function AuthProvider({ children }) { 
  // O estado do usuário logado.
  // Tenta carregar do localStorage na inicialização.
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('aerocode_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      return null;
    }
  });
  // O estado da "tabela" de usuários, agora também persistido.
  const [users, setUsers] = useState(() => {
    try {
      const storedUsers = localStorage.getItem('aerocode_users_data');
      return storedUsers ? JSON.parse(storedUsers) : initialUsers;
    } catch (error) {
      console.error("Erro ao carregar usuários do localStorage:", error);
      return initialUsers;
    }
  });

  useEffect(() => {    localStorage.setItem('aerocode_users_data', JSON.stringify(users));  }, [users]);

  // 3. Função de Login
  const login = (username, password) => {
    // Procura o usuário na lista
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser); // Armazena o usuário encontrado no estado
      localStorage.setItem('aerocode_user', JSON.stringify(foundUser)); // Salva no localStorage
      return true; // Sinaliza que o login teve sucesso
    }

    return false; // Sinaliza que o login falhou
  };

  // Função de Logout 
  const logout = () => {
    setUser(null);
    localStorage.removeItem('aerocode_user'); // Remove do localStorage
  };

  // 4. Função para adicionar novos usuários (protegida para admins)
  const addUser = (newUser) => {
    // Só permite adicionar se o usuário logado for um admin
    if (user && user.role === 'admin') {
      // Lógica para adicionar um novo usuário
      const userWithId = { ...newUser, id: Date.now() }; // Adiciona um ID simples
      setUsers([...users, userWithId]);
      console.log('Novo usuário adicionado:', userWithId);
      return true;
    }
    console.error('Apenas administradores podem adicionar usuários.');
    return false;
  };

  // 5. Função para editar um usuário (protegida para admins)
  const editUser = (updatedUser) => {
    if (user && user.role === 'admin') {
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      console.log('Usuário editado:', updatedUser);
      return true;
    }
    console.error('Apenas administradores podem editar usuários.');
    return false;
  };

  // 6. Função para excluir um usuário (protegida para admins)
  const deleteUser = (userId) => {
    if (user && user.role === 'admin') {
      setUsers(users.filter(u => u.id !== userId));
      console.log('Usuário excluído com ID:', userId);
      return true;
    }
    console.error('Apenas administradores podem excluir usuários.');
    return false;
  };

  const value = {
    user,
    login,
    logout,
    users, // Adiciona a lista de usuários aqui
    addUser, // Exporta a nova função
    editUser, // Exporta a função de edição
    deleteUser, // Exporta a função de exclusão
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 7. Cria e exporta o Hook customizado
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
 const context = useContext(AuthContext);
 if (!context) {
 throw new Error('useAuth deve ser usado dentro de um AuthProvider');
 }
 return context;
};