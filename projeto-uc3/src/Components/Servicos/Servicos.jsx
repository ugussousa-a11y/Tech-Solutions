import ServicoCard from './ServicoCard';
import estilos from './Servicos.module.css';

const listaServicos = [
  { titulo: "Troca de Tela & Touch", desc: "Calibração original e alta fidelidade.", tag: "DISPLAY", img: "/tela.jpg" },
  { titulo: "Microssoldagem", desc: "Reparos complexos em placas-mãe.", img: "/solda.jpg" },
  { titulo: "Longevidade Garantida", desc: "Limpeza e troca de pasta térmica.", img: "/limpeza.jpg" }
];

export default function Servicos() {
  return (
    <section className={estilos.container}>
      <h2>Especialistas em Precisão</h2>
      <div className={estilos.grid}>
        {listaServicos.map((s, i) => (
          <ServicoCard key={i} {...s} />
        ))}
      </div>
    </section>
  );
}