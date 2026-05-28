import React, { useEffect } from 'react';
import estilos from './Home.module.css';
import { setupAnimations, formHandler } from './homeLogic.js';

export default function Home() {
  useEffect(() => setupAnimations(), []);

  return (
    <div className={estilos.home}>
      {/* Hero Section */}
      <section className={estilos.hero}>
        <div className={estilos.heroText}>
          <h1>Seu dispositivo está com problemas?<br/>Resolvemos em horas.</h1>
          <button className={estilos.btnPrimary}>Abrir Ordem de Serviço</button>
        </div>
        <img src="/seu-celular.jpg" alt="Celular" />
      </section>

      {/* Bastidores */}
      <section className={estilos.bastidores}>
        <h2 style={{ textAlign: 'center', padding: '2rem' }}>Bastidores da Manutenção</h2>
        <div className={estilos.bastidoresGrid}>
          {[1, 2, 3].map((item) => (
            <div className={`${estilos.card} animate`} key={item}>
              <img src={`/img${item}.jpg`} alt="Serviço" />
              <div style={{ padding: '1rem' }}><h3>Manutenção Técnica</h3></div>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário */}
      <section className={estilos.formSection}>
        <div><h2>Fale com um Técnico</h2></div>
        <form className={estilos.form} onSubmit={formHandler}>
          <input className={estilos.input} placeholder="Nome Completo" required />
          <textarea className={estilos.input} placeholder="Descrição" rows="4" required />
          <button className={estilos.btnPrimary} type="submit">Enviar Mensagem</button>
        </form>
      </section>
    </div>
  );
}