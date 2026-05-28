// loginLogica.js
// Gerencia autenticação via localStorage

const CHAVE_USUARIOS = 'techsolutions_usuarios';
const CHAVE_SESSAO = 'techsolutions_sessao';

/**
 * Retorna todos os usuários cadastrados
 */
export function obterUsuarios() {
  const dados = localStorage.getItem(CHAVE_USUARIOS);
  return dados ? JSON.parse(dados) : [];
}

/**
 * Salva lista de usuários no localStorage
 */
function salvarUsuarios(usuarios) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

/**
 * Cadastra novo usuário
 * @returns {{ sucesso: boolean, mensagem: string }}
 */
export function cadastrarUsuario(nome, email, senha) {
  if (!nome || !email || !senha) {
    return { sucesso: false, mensagem: 'Preencha todos os campos.' };
  }

  if (senha.length < 6) {
    return { sucesso: false, mensagem: 'A senha deve ter ao menos 6 caracteres.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { sucesso: false, mensagem: 'E-mail inválido.' };
  }

  const usuarios = obterUsuarios();
  const jaExiste = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (jaExiste) {
    return { sucesso: false, mensagem: 'Este e-mail já está cadastrado.' };
  }

  const novoUsuario = {
    id: Date.now().toString(),
    nome,
    email: email.toLowerCase(),
    senha, // Em produção real, usar hash (bcrypt etc.)
    criadoEm: new Date().toISOString(),
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  return { sucesso: true, mensagem: 'Conta criada com sucesso!' };
}

/**
 * Realiza login do usuário
 * @returns {{ sucesso: boolean, mensagem: string, usuario?: object }}
 */
export function realizarLogin(email, senha, lembrar) {
  if (!email || !senha) {
    return { sucesso: false, mensagem: 'Preencha e-mail e senha.' };
  }

  const usuarios = obterUsuarios();
  const usuario = usuarios.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
  );

  if (!usuario) {
    return { sucesso: false, mensagem: 'E-mail ou senha incorretos.' };
  }

  const sessao = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    lembrar,
    loginEm: new Date().toISOString(),
  };

  if (lembrar) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
  } else {
    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
  }

  return { sucesso: true, mensagem: `Bem-vindo, ${usuario.nome}!`, usuario: sessao };
}

/**
 * Retorna sessão ativa (localStorage ou sessionStorage)
 */
export function obterSessao() {
  const local = localStorage.getItem(CHAVE_SESSAO);
  const session = sessionStorage.getItem(CHAVE_SESSAO);
  const dados = local || session;
  return dados ? JSON.parse(dados) : null;
}

/**
 * Encerra sessão do usuário
 */
export function encerrarSessao() {
  localStorage.removeItem(CHAVE_SESSAO);
  sessionStorage.removeItem(CHAVE_SESSAO);
}

/**
 * Verifica se o e-mail existe para recuperação
 * @returns {{ sucesso: boolean, mensagem: string }}
 */
export function recuperarSenha(email) {
  if (!email) {
    return { sucesso: false, mensagem: 'Informe seu e-mail.' };
  }

  const usuarios = obterUsuarios();
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!usuario) {
    return { sucesso: false, mensagem: 'Nenhuma conta encontrada com este e-mail.' };
  }

  // Em produção real, enviar e-mail com link de redefinição
  return {
    sucesso: true,
    mensagem: `Instruções de recuperação enviadas para ${email}.`,
  };
}