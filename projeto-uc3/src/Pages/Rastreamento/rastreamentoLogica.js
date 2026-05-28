// rastreamentoLogica.js
// Dados mockados de ordens de serviço + lógica de busca

// ─── Constantes de status ──────────────────────────────────────
export const STATUS = {
  AGUARDANDO: 'Aguardando Peças',
  EM_REPARO: 'Em Reparo',
  TESTES: 'Em Testes',
  PRONTO: 'Pronto',
};

// Índice numérico para a barra de progresso (0-3)
export const INDICE_STATUS = {
  [STATUS.AGUARDANDO]: 0,
  [STATUS.EM_REPARO]: 1,
  [STATUS.TESTES]: 2,
  [STATUS.PRONTO]: 3,
};

// ─── Banco de dados mockado ────────────────────────────────────
const ordens = [
  {
    numeroOS: 'TS-88291',
    statusAtual: STATUS.EM_REPARO,
    tecnicoResponsavel: 'Ricardo Oliveira',
    dataEntrada: '12 de Outubro, 2024',
    previsaoEntrega: '15 de Outubro, 2024',
    ultimaAtualizacao: 'A peça de reposição (Tela OLED) foi recebida e o técnico iniciou o processo de montagem final.',
    dispositivo: 'iPhone 14 Pro Max',
    descricaoServico: 'Reparo de tela e substituição de bateria original Apple.',
    garantia: '90 Dias',
    pecasUtilizadas: 'Originais',
    prioridade: 'Alta',
    corCard: '#2563eb',
  },
  {
    numeroOS: 'TS-77104',
    statusAtual: STATUS.AGUARDANDO,
    tecnicoResponsavel: 'Fernanda Costa',
    dataEntrada: '10 de Outubro, 2024',
    previsaoEntrega: '18 de Outubro, 2024',
    ultimaAtualizacao: 'Aguardando chegada da peça de reposição. Prazo estimado: 2 dias úteis.',
    dispositivo: 'Samsung Galaxy S23',
    descricaoServico: 'Substituição de conector de carregamento e reparo de entrada de som.',
    garantia: '60 Dias',
    pecasUtilizadas: 'Paralelas',
    prioridade: 'Normal',
    corCard: '#0f172a',
  },
  {
    numeroOS: 'TS-65320',
    statusAtual: STATUS.TESTES,
    tecnicoResponsavel: 'Bruno Almeida',
    dataEntrada: '08 de Outubro, 2024',
    previsaoEntrega: '13 de Outubro, 2024',
    ultimaAtualizacao: 'Reparo concluído. Realizando bateria de testes de qualidade antes da entrega.',
    dispositivo: 'MacBook Pro 2021',
    descricaoServico: 'Substituição de teclado e limpeza interna completa.',
    garantia: '120 Dias',
    pecasUtilizadas: 'Originais Apple',
    prioridade: 'Alta',
    corCard: '#1e293b',
  },
  {
    numeroOS: 'TS-54098',
    statusAtual: STATUS.PRONTO,
    tecnicoResponsavel: 'Carla Mendes',
    dataEntrada: '05 de Outubro, 2024',
    previsaoEntrega: '10 de Outubro, 2024',
    ultimaAtualizacao: 'Dispositivo aprovado em todos os testes. Pronto para retirada no balcão.',
    dispositivo: 'iPad Air 5ª geração',
    descricaoServico: 'Troca de tela e calibração do touch.',
    garantia: '90 Dias',
    pecasUtilizadas: 'Originais',
    prioridade: 'Normal',
    corCard: '#166534',
  },
];

/**
 * Busca uma ordem pelo número de OS
 * @param {string} numeroOS
 * @returns {{ sucesso: boolean, ordem?: object, mensagem?: string }}
 */
export function buscarOrdem(numeroOS) {
  if (!numeroOS || !numeroOS.trim()) {
    return { sucesso: false, mensagem: 'Digite o número da sua Ordem de Serviço.' };
  }

  const termo = numeroOS.trim().toUpperCase();
  const ordem = ordens.find(o => o.numeroOS.toUpperCase() === termo);

  if (!ordem) {
    return {
      sucesso: false,
      mensagem: `Nenhuma OS encontrada para "${numeroOS}". Verifique o número e tente novamente.`,
    };
  }

  return { sucesso: true, ordem };
}

/**
 * Retorna a cor de badge de acordo com a prioridade
 */
export function corPrioridade(prioridade) {
  const mapa = {
    'Alta': '#ef4444',
    'Normal': '#3b82f6',
    'Baixa': '#22c55e',
  };
  return mapa[prioridade] || '#6b7280';
}

/**
 * Lista todos os números de OS disponíveis (para sugestões de busca)
 */
export function listarNumerosOS() {
  return ordens.map(o => o.numeroOS);
}