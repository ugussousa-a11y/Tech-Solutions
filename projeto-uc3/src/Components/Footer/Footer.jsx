import estilos from './Footer.module.css';

export default function Footer() {
  return (





<footer className={estilos.rodape}>
        <div className={estilos.conteudoRodape}>
          <div>
            <p className={estilos.logoRodape}>TechSolutions</p>
            <p className={estilos.textoRodape}>
              © 2024 TechSolutions.<br />Assistência Técnica Profissional.
            </p>
          </div>
          <div>
            <p className={estilos.tituloColRodape}>Navegação</p>
            <button className={estilos.linkRodape}>Privacidade</button>
            <button className={estilos.linkRodape}>Termos de Uso</button>
            <button className={estilos.linkRodape}>FAQ</button>
            <button className={estilos.linkRodape}>Suporte</button>
          </div>
          <div>
            <p className={estilos.tituloColRodape}>Contato</p>
            <span className={estilos.linkRodape}>contato@techsolutions.com.br</span>
            <span className={estilos.linkRodape}>+55 (11) 99999-9999</span>
          </div>
        </div>
      </footer>

    )};