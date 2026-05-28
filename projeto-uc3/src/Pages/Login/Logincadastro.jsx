// Logincadastro.jsx
import { useState, useEffect } from 'react';
import estilos from './Logincadastro.module.css';
import {
  realizarLogin,
  cadastrarUsuario,
  obterSessao,
  encerrarSessao,
  recuperarSenha,
} from './loginLogic.js';

// ─── Ícones SVG inline ────────────────────────────────────────
const IconeRobo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const IconeEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconeCadeado = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const IconeOlho = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconeOlhoFechado = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconeEntrar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const IconeVoltar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const IconeCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconeAlerta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const IconePessoa = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// ─── Tipos de tela ─────────────────────────────────────────────
const TELA = {
  LOGIN: 'login',
  CADASTRO: 'cadastro',
  RECUPERAR: 'recuperar',
  LOGADO: 'logado',
};

// ─── Componente de notificação ─────────────────────────────────
function Notificacao({ tipo, mensagem }) {
  if (!mensagem) return null;

  const classeTipo = {
    erro: estilos.notificacaoErro,
    sucesso: estilos.notificacaoSucesso,
    aviso: estilos.notificacaoAviso,
  }[tipo] || estilos.notificacaoErro;

  return (
    <div className={`${estilos.notificacao} ${classeTipo}`}>
      <IconeAlerta />
      <span>{mensagem}</span>
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────
export default function Logincadastro() {
  const [telaAtual, setTelaAtual] = useState(TELA.LOGIN);

  // Campos login
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [lembrarMe, setLembrarMe] = useState(false);
  const [verSenhaLogin, setVerSenhaLogin] = useState(false);

  // Campos cadastro
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [verSenhaCadastro, setVerSenhaCadastro] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  // Campo recuperação
  const [emailRecuperar, setEmailRecuperar] = useState('');

  // Estado de sessão logada
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Feedback
  const [notificacao, setNotificacao] = useState({ tipo: '', mensagem: '' });
  const [carregando, setCarregando] = useState(false);

  // Verifica sessão salva ao montar
  useEffect(() => {
    const sessao = obterSessao();
    if (sessao) {
      setUsuarioLogado(sessao);
      setTelaAtual(TELA.LOGADO);
    }
  }, []);

  function exibirNotificacao(tipo, mensagem) {
    setNotificacao({ tipo, mensagem });
    setTimeout(() => setNotificacao({ tipo: '', mensagem: '' }), 4000);
  }

  function limparNotificacao() {
    setNotificacao({ tipo: '', mensagem: '' });
  }

  function irParaTela(tela) {
    limparNotificacao();
    setTelaAtual(tela);
  }

  // ─── Handlers ───────────────────────────────────────────────

  async function handleLogin(e) {
    e.preventDefault();
    limparNotificacao();
    setCarregando(true);

    // Simula async (ex: chamada de API futura)
    await new Promise(r => setTimeout(r, 600));

    const resultado = realizarLogin(emailLogin, senhaLogin, lembrarMe);
    setCarregando(false);

    if (resultado.sucesso) {
      setUsuarioLogado(resultado.usuario);
      setTelaAtual(TELA.LOGADO);
      setEmailLogin('');
      setSenhaLogin('');
    } else {
      exibirNotificacao('erro', resultado.mensagem);
    }
  }

  async function handleCadastro(e) {
    e.preventDefault();
    limparNotificacao();

    if (senhaCadastro !== confirmarSenha) {
      exibirNotificacao('erro', 'As senhas não coincidem.');
      return;
    }

    setCarregando(true);
    await new Promise(r => setTimeout(r, 600));

    const resultado = cadastrarUsuario(nomeUsuario, emailCadastro, senhaCadastro);
    setCarregando(false);

    if (resultado.sucesso) {
      exibirNotificacao('sucesso', resultado.mensagem);
      setTimeout(() => {
        irParaTela(TELA.LOGIN);
        setNomeUsuario('');
        setEmailCadastro('');
        setSenhaCadastro('');
        setConfirmarSenha('');
      }, 1500);
    } else {
      exibirNotificacao('erro', resultado.mensagem);
    }
  }

  async function handleRecuperar(e) {
    e.preventDefault();
    limparNotificacao();
    setCarregando(true);

    await new Promise(r => setTimeout(r, 600));

    const resultado = recuperarSenha(emailRecuperar);
    setCarregando(false);

    if (resultado.sucesso) {
      exibirNotificacao('sucesso', resultado.mensagem);
      setTimeout(() => {
        irParaTela(TELA.LOGIN);
        setEmailRecuperar('');
      }, 2000);
    } else {
      exibirNotificacao('erro', resultado.mensagem);
    }
  }

  function handleSair() {
    encerrarSessao();
    setUsuarioLogado(null);
    irParaTela(TELA.LOGIN);
  }

  // ─── Renderização por tela ───────────────────────────────────

  function renderizarLogin() {
    return (
      <>
        <h2 className={estilos.tituloCartao}>Entre em Contato</h2>

        <Notificacao tipo={notificacao.tipo} mensagem={notificacao.mensagem} />

        <form onSubmit={handleLogin} noValidate>
          <div className={estilos.grupoCampo}>
            <label className={estilos.rotuloInput} htmlFor="campoEmailLogin">
              Seu Email
            </label>
            <div className={estilos.invólucroInput}>
              <input
                id="campoEmailLogin"
                type="email"
                className={estilos.campoTexto}
                placeholder="Digite seu Email"
                value={emailLogin}
                onChange={e => setEmailLogin(e.target.value)}
                autoComplete="email"
                required
              />
              <span className={estilos.iconeInput}><IconeEmail /></span>
            </div>
          </div>

          <div className={estilos.grupoCampo}>
            <label className={estilos.rotuloInput} htmlFor="campoSenhaLogin">
              Sua Senha
            </label>
            <div className={estilos.invólucroInput}>
              <input
                id="campoSenhaLogin"
                type={verSenhaLogin ? 'text' : 'password'}
                className={estilos.campoTexto}
                placeholder="Sua Senha"
                value={senhaLogin}
                onChange={e => setSenhaLogin(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={estilos.botaoVerSenha}
                onClick={() => setVerSenhaLogin(v => !v)}
                aria-label={verSenhaLogin ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {verSenhaLogin ? <IconeOlhoFechado /> : <IconeOlho />}
              </button>
            </div>
          </div>

          <div className={estilos.linhaOpcoes}>
            <label className={estilos.lembrarMe}>
              <input
                type="checkbox"
                className={estilos.checkboxLembrar}
                checked={lembrarMe}
                onChange={e => setLembrarMe(e.target.checked)}
              />
              <span className={estilos.textoLembrar}>Lembrar-me</span>
            </label>
            <button
              type="button"
              className={estilos.linkEsqueceuSenha}
              onClick={() => irParaTela(TELA.RECUPERAR)}
            >
              Esqueci minha senha
            </button>
          </div>

          <button type="submit" className={estilos.botaoPrimario} disabled={carregando}>
            {carregando ? (
              <span className={estilos.spinner} />
            ) : (
              <>
                Login <IconeEntrar />
              </>
            )}
          </button>
        </form>

        <hr className={estilos.divisor} />

        <div className={estilos.secaoCriarConta}>
          <p className={estilos.textoCriarConta}>Não tem uma conta?</p>
          <button
            className={estilos.botaoSecundario}
            onClick={() => irParaTela(TELA.CADASTRO)}
          >
            Criar conta
          </button>
        </div>
      </>
    );
  }

  function renderizarCadastro() {
    return (
      <>
        <button className={estilos.botaoVoltar} onClick={() => irParaTela(TELA.LOGIN)}>
          <IconeVoltar /> Voltar
        </button>

        <h2 className={estilos.tituloCartao}>Criar Conta</h2>

        <Notificacao tipo={notificacao.tipo} mensagem={notificacao.mensagem} />

        <form onSubmit={handleCadastro} noValidate>
          <div className={estilos.grupoCampo}>
            <label className={estilos.rotuloInput} htmlFor="campoNomeCadastro">
              Seu Nome
            </label>
            <div className={estilos.invólucroInput}>
              <input
                id="campoNomeCadastro"
                type="text"
                className={estilos.campoTexto}
                placeholder="Digite seu nome"
                value={nomeUsuario}
                onChange={e => setNomeUsuario(e.target.value)}
                autoComplete="name"
                required
              />
              <span className={estilos.iconeInput}><IconePessoa /></span>
            </div>
          </div>

          <div className={estilos.grupoCampo}>
            <label className={estilos.rotuloInput} htmlFor="campoEmailCadastro">
              Seu Email
            </label>
            <div className={estilos.invólucroInput}>
              <input
                id="campoEmailCadastro"
                type="email"
                className={estilos.campoTexto}
                placeholder="Digite seu Email"
                value={emailCadastro}
                onChange={e => setEmailCadastro(e.target.value)}
                autoComplete="email"
                required
              />
              <span className={estilos.iconeInput}><IconeEmail /></span>
            </div>
          </div>

          <div className={estilos.grupoCampo}>
            <label className={estilos.rotuloInput} htmlFor="campoCriarSenha">
              Criar Senha
            </label>
            <div className={estilos.invólucroInput}>
              <input
                id="campoCriarSenha"
                type={verSenhaCadastro ? 'text' : 'password'}
                className={estilos.campoTexto}
                placeholder="Mínimo 6 caracteres"
                value={senhaCadastro}
                onChange={e => setSenhaCadastro(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={estilos.botaoVerSenha}
                onClick={() => setVerSenhaCadastro(v => !v)}
                aria-label={verSenhaCadastro ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {verSenhaCadastro ? <IconeOlhoFechado /> : <IconeOlho />}
              </button>
            </div>
          </div>

          <div className={estilos.grupoCampo}>
            <label className={estilos.rotuloInput} htmlFor="campoConfirmarSenha">
              Confirmar Senha
            </label>
            <div className={estilos.invólucroInput}>
              <input
                id="campoConfirmarSenha"
                type={verConfirmarSenha ? 'text' : 'password'}
                className={estilos.campoTexto}
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={estilos.botaoVerSenha}
                onClick={() => setVerConfirmarSenha(v => !v)}
                aria-label={verConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {verConfirmarSenha ? <IconeOlhoFechado /> : <IconeOlho />}
              </button>
            </div>
          </div>

          <button type="submit" className={estilos.botaoPrimario} disabled={carregando}>
            {carregando ? (
              <span className={estilos.spinner} />
            ) : (
              <>
                Criar Conta <IconeCheck />
              </>
            )}
          </button>
        </form>
      </>
    );
  }

  function renderizarRecuperar() {
    return (
      <>
        <button className={estilos.botaoVoltar} onClick={() => irParaTela(TELA.LOGIN)}>
          <IconeVoltar /> Voltar
        </button>

        <h2 className={estilos.tituloCartao}>Recuperar Senha</h2>

        <Notificacao tipo={notificacao.tipo} mensagem={notificacao.mensagem} />

        <form onSubmit={handleRecuperar} noValidate>
          <div className={estilos.grupoCampo}>
            <label className={estilos.rotuloInput} htmlFor="campoEmailRecuperar">
              Seu Email
            </label>
            <div className={estilos.invólucroInput}>
              <input
                id="campoEmailRecuperar"
                type="email"
                className={estilos.campoTexto}
                placeholder="Digite seu Email cadastrado"
                value={emailRecuperar}
                onChange={e => setEmailRecuperar(e.target.value)}
                autoComplete="email"
                required
              />
              <span className={estilos.iconeInput}><IconeEmail /></span>
            </div>
          </div>

          <button type="submit" className={estilos.botaoPrimario} disabled={carregando}>
            {carregando ? (
              <span className={estilos.spinner} />
            ) : (
              'Enviar Instruções'
            )}
          </button>
        </form>
      </>
    );
  }

  function renderizarLogado() {
    return (
      <div className={estilos.telaBoasVindas}>
        <div className={estilos.iconeBoasVindas}>
          <IconeCheck />
        </div>
        <p className={estilos.nomeUsuarioLogado}>
          Bem-vindo, {usuarioLogado?.nome}!
        </p>
        <p className={estilos.emailUsuarioLogado}>{usuarioLogado?.email}</p>
        <button className={estilos.botaoSair} onClick={handleSair}>
          Sair da conta
        </button>
      </div>
    );
  }

  // ─── Renderização do componente ──────────────────────────────
  return (
    <div className={estilos.paginaLogin}>
      {/* Cabeçalho com logo */}
      <header className={estilos.cabecalho}>
        <div className={estilos.logoIcone}>
          <IconeRobo />
        </div>
        <h1 className={estilos.nomeEmpresa}>TechSolutions</h1>
        <p className={estilos.subtituloEmpresa}>Assistência Técnica Profissional</p>
      </header>

      {/* Card do formulário */}
      <main className={estilos.cartao}>
        {telaAtual === TELA.LOGIN     && renderizarLogin()}
        {telaAtual === TELA.CADASTRO  && renderizarCadastro()}
        {telaAtual === TELA.RECUPERAR && renderizarRecuperar()}
        {telaAtual === TELA.LOGADO    && renderizarLogado()}
      </main>

      {/* Rodapé */}
      <footer className={estilos.rodape}>
        © 2024 TechSolutions. Assistência Técnica Profissional.
      </footer>
    </div>
  );
}