import estilos from './Servicos.module.css';

export default function ServicoCard({ titulo, desc, img, tag }) {
  return (
    <div className={estilos.card}>
      <div className={estilos.mediaContainer}>
        <img src={img} alt={titulo} />
        <div className={estilos.playBtn}>▶</div>
      </div>
      <div className={estilos.content}>
        {tag && <small>{tag}</small>}
        <h3>{titulo}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}