import './App.css'
import { Routes, Route } from 'react-router-dom'
import Logincadastro from './Pages/Login/Logincadastro.jsx'
import Rastreamento from './Pages/Rastreamento/Rastreamento.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Servicos from './Components/Servicos/Servicos.jsx'
import Home from './Pages/Home/Home.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logincadastro />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/rastreamento" element={<Rastreamento />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
