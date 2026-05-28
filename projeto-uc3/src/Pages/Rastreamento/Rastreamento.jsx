// Rastreamento.jsx
import { useState, useEffect, useRef } from 'react';
import estilos from './Rastreamento.module.css';
import {
  buscarOrdem,
  listarNumerosOS,
  corPrioridade,
  INDICE_STATUS,
} from './rastreamentoLogica';

// ─── Ícones SVG ────────────────────────────────────────────────
const IconeSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconeCaixa = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const IconeChave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
);

const IconeMicroscopio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 100-14"/><path d="M9 14l3.88-3.88"/><path d="M14.7 6.3l-3.88 3.88"/>
    <circle cx="11" cy="11" r="2"/>
  </svg>
);

const IconeCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconePessoa = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconeCalendario = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconeRelogio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconeChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const IconeAlerta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const IconeSmartphone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

// ─── Definição das etapas ──────────────────────────────────────
const ETAPAS = [
  { chave: 'Aguardando Peças', icone: <IconeCaixa />,      rotulo: 'Aguardando Peças' },
  { chave: 'Em Reparo',        icone: <IconeChave />,       rotulo: 'Em Reparo' },
  { chave: 'Em Testes',        icone: <IconeMicroscopio />, rotulo: 'Testes' },
  { chave: 'Pronto',           icone: <IconeCheck />,       rotulo: 'Pronto' },
];

// ─── Componente de barra de progresso ─────────────────────────
function BarraProgresso({ indiceAtivo }) {
  const [largura, setLargura] = useState('0%');

  useEffect(() => {
    // Dispara animação após mount para acionar a transição CSS
    const id = setTimeout(() => {
      const porcentagens = ['0%', '33%', '66%', '100%'];
      setLargura(porcentagens[indiceAtivo] ?? '0%');
    }, 200);
    return () => clearTimeout(id);
  }, [indiceAtivo]);

  function classeEtapa(i) {
    if (i < indiceAtivo)  return estilos.etapaConcluida;
    if (i === indiceAtivo) return estilos.etapaAtiva;
    return estilos.etapaPendente;
  }

  return (
    <div className={estilos.barraEtapas}>
      <div className={estilos.linhaProgresso} style={{ width: largura }} />
      {ETAPAS.map((etapa, i) => (
        <div key={etapa.chave} className={`${estilos.etapa} ${classeEtapa(i)}`}>
          <div className={estilos.circuloEtapa}>{etapa.icone}</div>
          <span className={estilos.nomeEtapa}>{etapa.rotulo}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────
export default function Rastreamento() {
  const [valorBusca, setValorBusca] = useState('');
  const [ordemAtual, setOrdemAtual] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [notificacaoChat, setNotificacaoChat] = useState('');

  const inputRef = useRef(null);
  const sugeridos = listarNumerosOS();

  function limparEstado() {
    setMensagemErro('');
    setNotificacaoChat('');
  }

  async function handleBuscar(e) {
    e?.preventDefault();
    limparEstado();
    setCarregando(true);
    setOrdemAtual(null);

    // Simula latência de rede
    await new Promise(r => setTimeout(r, 700));

    const resultado = buscarOrdem(valorBusca);
    setCarregando(false);

    if (resultado.sucesso) {
      setOrdemAtual(resultado.ordem);
    } else {
      setMensagemErro(resultado.mensagem);
    }
  }

  function handleSugestao(numeroOS) {
    setValorBusca(numeroOS);
    limparEstado();
    // Dispara busca automaticamente ao clicar na sugestão
    setTimeout(async () => {
      setCarregando(true);
      setOrdemAtual(null);
      await new Promise(r => setTimeout(r, 600));
      const resultado = buscarOrdem(numeroOS);
      setCarregando(false);
      if (resultado.sucesso) setOrdemAtual(resultado.ordem);
      else setMensagemErro(resultado.mensagem);
    }, 50);
  }

  function handleFalarTecnico() {
    setNotificacaoChat(`Solicitação enviada para ${ordemAtual.tecnicoResponsavel}. Resposta esperada em até 1h.`);
    setTimeout(() => setNotificacaoChat(''), 4000);
  }

  const indiceProgresso = ordemAtual ? (INDICE_STATUS[ordemAtual.statusAtual] ?? 0) : 0;

  // ─── Render ─────────────────────────────────────────────────
  return (
    <div className={estilos.pagina}>

      

      {/* Hero / Busca */}
      <section className={estilos.secaoBusca}>
        <h1 className={estilos.tituloPrincipal}>Acompanhe seu reparo</h1>
        <p className={estilos.subtituloBusca}>
          Digite o número da sua Ordem de Serviço (OS) abaixo para verificar o status em tempo real
          do seu dispositivo.
        </p>

        <form className={estilos.formularioBusca} onSubmit={handleBuscar}>
          <span className={estilos.iconeSearch}><IconeSearch /></span>
          <input
            ref={inputRef}
            type="text"
            className={estilos.inputBusca}
            placeholder="Ex: TS-88291"
            value={valorBusca}
            onChange={e => { setValorBusca(e.target.value); limparEstado(); }}
            aria-label="Número da Ordem de Serviço"
          />
          <button type="submit" className={estilos.botaoBuscar} disabled={carregando}>
            {carregando ? <span className={estilos.spinner} /> : 'Buscar'}
          </button>
        </form>

        {/* Sugestões rápidas */}
        <div className={estilos.sugestoesBusca}>
          <span className={estilos.textoSugestao}>Exemplos:</span>
          {sugeridos.map(num => (
            <button key={num} className={estilos.tagSugestao} onClick={() => handleSugestao(num)}>
              {num}
            </button>
          ))}
        </div>

        {/* Erro de busca */}
        {mensagemErro && (
          <div className={estilos.mensagemErro}>
            <IconeAlerta />
            <span>{mensagemErro}</span>
          </div>
        )}
      </section>

      {/* Conteúdo */}
      <div className={estilos.secaoResultados}>
        {!ordemAtual && !carregando ? (
          /* Estado inicial */
          <div className={estilos.estadoInicial}>
            <div className={estilos.iconeEstadoInicial}><IconeSearch /></div>
            <h2 className={estilos.tituloEstadoInicial}>Nenhuma OS buscada ainda</h2>
            <p className={estilos.textoEstadoInicial}>
              Digite o número da sua Ordem de Serviço no campo acima ou clique em um dos exemplos para
              ver o status do reparo em tempo real.
            </p>
          </div>
        ) : ordemAtual ? (
          /* Resultado */
          <div className={estilos.gradeResultados}>

            {/* Coluna esquerda: status */}
            <aside className={estilos.cardStatus}>
              <p className={estilos.rotuloStatusAtual}>STATUS ATUAL</p>
              <div className={estilos.linhaStatusTopo}>
                <h2 className={estilos.textoStatusPrincipal}>{ordemAtual.statusAtual}</h2>
                <span className={estilos.badgeNumeroOS}>OS<br />#{ordemAtual.numeroOS.replace('TS-', '')}</span>
              </div>

              <div className={estilos.listaInfoStatus}>
                <div className={estilos.itemInfoStatus} style={{ animationDelay: '0.05s' }}>
                  <div className={estilos.iconeInfoStatus}><IconePessoa /></div>
                  <div>
                    <p className={estilos.rotuloInfo}>Técnico Responsável</p>
                    <p className={estilos.valorInfo}>{ordemAtual.tecnicoResponsavel}</p>
                  </div>
                </div>
                <div className={estilos.itemInfoStatus} style={{ animationDelay: '0.1s' }}>
                  <div className={estilos.iconeInfoStatus}><IconeCalendario /></div>
                  <div>
                    <p className={estilos.rotuloInfo}>Data de Entrada</p>
                    <p className={estilos.valorInfo}>{ordemAtual.dataEntrada}</p>
                  </div>
                </div>
                <div className={estilos.itemInfoStatus} style={{ animationDelay: '0.15s' }}>
                  <div className={estilos.iconeInfoStatus}><IconeRelogio /></div>
                  <div>
                    <p className={estilos.rotuloInfo}>Previsão de Entrega</p>
                    <p className={estilos.valorInfo}>{ordemAtual.previsaoEntrega}</p>
                  </div>
                </div>
              </div>

              <div className={estilos.caixaObservacao}>
                "{ordemAtual.ultimaAtualizacao}"
              </div>

              {/* Toast de confirmação do chat */}
              {notificacaoChat && (
                <div className={estilos.mensagemErro} style={{
                  marginTop: 16,
                  background: '#f0fdf4',
                  borderColor: '#bbf7d0',
                  color: '#166534',
                }}>
                  <IconeCheck />
                  <span>{notificacaoChat}</span>
                </div>
              )}
            </aside>

            {/* Coluna direita: progresso + dispositivo */}
            <div className={estilos.colunaProgresso}>

              {/* Card de progresso */}
              <div className={estilos.cardProgresso}>
                <h3 className={estilos.tituloCardProgresso}>Progresso do Reparo</h3>
                <BarraProgresso indiceAtivo={indiceProgresso} />
              </div>

              {/* Linha inferior: dispositivo + detalhes */}
              <div className={estilos.gradeDispositivoDetalhes}>

                {/* Card dispositivo */}
                <div
                  className={estilos.cardDispositivo}
                  style={{ backgroundColor: ordemAtual.corCard }}
                >
                  <div className={estilos.fundoDispositivo} style={{ background: ordemAtual.corCard }} />
                  <div className={estilos.iconeDecorativoDispositivo}>
                    <IconeSmartphone />
                  </div>
                  <div className={estilos.conteudoDispositivo}>
                    <p className={estilos.rotuloDispositivo}>DISPOSITIVO</p>
                    <h3 className={estilos.nomeDispositivo}>{ordemAtual.dispositivo}</h3>
                    <p className={estilos.descricaoServico}>{ordemAtual.descricaoServico}</p>
                  </div>
                </div>

                {/* Card de detalhes */}
                <div className={estilos.cardDetalhes}>
                  <div className={estilos.itemDetalhe}>
                    <span className={estilos.rotuloDetalhe}>Garantia</span>
                    <span className={estilos.valorDetalhe}>{ordemAtual.garantia}</span>
                  </div>
                  <div className={estilos.itemDetalhe}>
                    <span className={estilos.rotuloDetalhe}>Peças Utilizadas</span>
                    <span className={estilos.valorDetalhe}>{ordemAtual.pecasUtilizadas}</span>
                  </div>
                  <div className={estilos.itemDetalhe}>
                    <span className={estilos.rotuloDetalhe}>Prioridade</span>
                    <span
                      className={estilos.valorDetalheDestaque}
                      style={{ color: corPrioridade(ordemAtual.prioridade) }}
                    >
                      {ordemAtual.prioridade}
                    </span>
                  </div>

                  <button className={estilos.botaoFalarTecnico} onClick={handleFalarTecnico}>
                    <IconeChat />
                    Falar com Técnico
                  </button>
                </div>

              </div>
            </div>
          </div>
        ) : null}
      </div>

      

    </div>
  );
}