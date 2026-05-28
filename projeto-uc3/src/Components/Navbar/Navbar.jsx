import { Link } from 'react-router-dom'
import estilos from './Navbar.module.css';

export default function Navbar() {
  return (
      <nav className={estilos.navbar}>
        <span className={estilos.logoNav}>TechSolutions</span>
        <div className={`${estilos.linksNav} ${estilos.linksNavDesktop}`}>
          <Link to="/" className={estilos.linkNav}>Home</Link>
          <Link to="/servicos" className={estilos.linkNav}>Serviços</Link>
          <Link to="/rastreamento" className={estilos.linkNav}>Rastrear</Link>
        </div>
        <Link to="/login" className={estilos.botaoLoginNav}>Login</Link>
      </nav>

  )};
  