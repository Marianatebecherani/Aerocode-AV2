import React, { createContext, useState, useContext, useEffect } from 'react';
import { projects as initialProjects } from '../data/projects.js';

// 1. Cria o Contexto
const ProjectsContext = createContext(null);
// 2. Cria o Provedor (Provider)
export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const storedProjects = localStorage.getItem('aerocode_projects_data');
      return storedProjects ? JSON.parse(storedProjects) : initialProjects;
    } catch (error) {
      console.error("Erro ao carregar projetos do localStorage:", error);
      return initialProjects;
    }
  });

  useEffect(() => {    localStorage.setItem('aerocode_projects_data', JSON.stringify(projects));  }, [projects]);

  // Função para adicionar um novo projeto
  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      // Gera IDs simples para o novo projeto
      id: `${newProject.name.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
      idNumber: `ID #A${Math.floor(Math.random() * 1000) + 450}`,
    };
    setProjects((prevProjects) => [...prevProjects, projectWithId]);
    return true;
  };

  const value = { projects, addProject };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

// 3. Cria e exporta o Hook customizado (exportado separadamente para Fast Refresh)
// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => {
 const context = useContext(ProjectsContext);
 if (!context) {
 throw new Error('useProjects deve ser usado dentro de um ProjectsProvider');
 }
 return context;
};