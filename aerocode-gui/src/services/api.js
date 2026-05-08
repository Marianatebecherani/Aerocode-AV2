const API_BASE = '/api/v1';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Erro ao comunicar com o backend.');
  }

  return data;
}

const withQuery = (path, params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });
  const suffix = query.toString();
  return suffix ? `${path}?${suffix}` : path;
};

export const api = {
  login: (payload) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  listarAeronaves: (params) => request(withQuery('/aeronaves', params)),
  buscarAeronave: (codigo) => request(`/aeronaves/${codigo}`),
  buscarDetalhesAeronave: (codigo) => request(`/aeronaves/${codigo}/detalhes`),

  listarPecas: (params) => request(withQuery('/pecas', params)),
  buscarPeca: (id) => request(`/pecas/${id}`),
  criarPeca: (payload) => request('/pecas', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  atualizarPeca: (id, payload) => request(`/pecas/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  deletarPeca: (id) => request(`/pecas/${id}`, { method: 'DELETE' }),
  prosseguirPeca: (id) => request(`/pecas/${id}/status/prosseguir`, { method: 'PATCH' }),
  retrocederPeca: (id) => request(`/pecas/${id}/status/retroceder`, { method: 'PATCH' }),

  listarEtapas: (params) => request(withQuery('/etapas', params)),
  buscarEtapa: (id) => request(`/etapas/${id}`),
  prosseguirEtapa: (id) => request(`/etapas/${id}/status/prosseguir`, { method: 'PATCH' }),
  retrocederEtapa: (id) => request(`/etapas/${id}/status/retroceder`, { method: 'PATCH' }),
  iniciarEtapa: (id) => request(`/etapas/${id}/status/iniciar`, { method: 'PATCH' }),
  finalizarEtapa: (id) => request(`/etapas/${id}/status/finalizar`, { method: 'PATCH' }),

  listarTestes: (params) => request(withQuery('/testes', params)),
  criarTeste: (payload) => request('/testes', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  atualizarTeste: (id, payload) => request(`/testes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  aprovarTeste: (id) => request(`/testes/${id}/resultado/aprovar`, { method: 'PATCH' }),
  reprovarTeste: (id) => request(`/testes/${id}/resultado/reprovar`, { method: 'PATCH' }),
  deletarTeste: (id) => request(`/testes/${id}`, { method: 'DELETE' }),

  listarFuncionarios: (params) => request(withQuery('/funcionarios', params)),
  criarFuncionario: (payload) => request('/funcionarios', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  atualizarFuncionario: (id, payload) => request(`/funcionarios/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  deletarFuncionario: (id) => request(`/funcionarios/${id}`, { method: 'DELETE' }),

  listarRelatorios: (params) => request(withQuery('/relatorios', params)),
  criarRelatorio: (payload) => request('/relatorios', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  deletarRelatorio: (id) => request(`/relatorios/${id}`, { method: 'DELETE' }),
};

export function nivelToRole(nivelPermissao) {
  const map = {
    ADMINISTRADOR: 'admin',
    ENGENHEIRO: 'engenheiro',
    OPERADOR: 'operador',
  };
  return map[nivelPermissao] || 'operador';
}

export function roleToNivel(role) {
  const map = {
    admin: 'ADMINISTRADOR',
    engenheiro: 'ENGENHEIRO',
    operador: 'OPERADOR',
  };
  return map[role] || 'OPERADOR';
}
