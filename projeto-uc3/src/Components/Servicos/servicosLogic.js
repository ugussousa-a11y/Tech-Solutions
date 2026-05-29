// servicosLogic.js

import { useState, useEffect, useRef } from "react";

// ─── Hook: Scroll Reveal ─────────────────────────────────────────────────────
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, ...options }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return { ref, isVisible };
}

// ─── Hook: Modal de "vídeo" fake ─────────────────────────────────────────────
export function useVideoModal() {
  const [active, setActive] = useState(null); // { title, thumb }

  const open  = (card) => setActive(card);
  const close = () => setActive(null);

  // fecha com ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { active, open, close };
}

// ─── Hook: Tab ativa nos serviços ────────────────────────────────────────────
export function useServiceTab(initial = 0) {
  const [tab, setTab] = useState(initial);
  return { tab, setTab };
}

// ─── Hook: Formulário de orçamento ──────────────────────────────────────────
export function useOrcamentoForm() {
  const [form, setForm] = useState({ nome: "", dispositivo: "", problema: "", contato: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.nome || !form.dispositivo || !form.contato) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ nome: "", dispositivo: "", problema: "", contato: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return { form, sent, loading, handleChange, handleSubmit };
}

// ─── Hook: Cursor spotlight (efeito de luz seguindo o mouse) ────────────────
export function useSpotlight(sectionRef) {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const leave = () => setPos({ x: -999, y: -999 });

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return pos;
}

// ─── Dados ───────────────────────────────────────────────────────────────────
export const HERO_SERVICOS = {
  title: "Especialistas em Precisão",
  desc: "Oferecemos diagnósticos avançados e reparos de alto desempenho para manter seu ecossistema digital em perfeito estado. Transparência técnica em cada etapa.",
};

export const SERVICOS_DESTAQUE = [
  {
    id: "display",
    tag: "DISPLAY",
    title: "Troca de Tela & Touch",
    desc: "Calibração original e componentes de alta fidelidade cromática para smartphones e tablets.",
    img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
    large: true,
  },
  {
    id: "soldagem",
    tag: "PLACA",
    title: "Microssoldagem",
    desc: "Reparos complexos em placas-mãe e recuperação de circuitos integrados com microscopia avançada.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    large: false,
  },
  {
    id: "manutencao",
    tag: "PREVENTIVO",
    title: "Longevidade Garantida",
    desc: "Limpeza interna, troca de pasta térmica de alta condutividade e otimização de sistemas para evitar falhas críticas.",
    img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&q=80",
    large: true,
    cta: true,
  },
];

export const TABS = ["Smartphones", "Notebooks", "Tablets", "Outros"];

export const SERVICOS_POR_TAB = {
  Smartphones: [
    { icon: "📱", title: "Troca de Tela", tempo: "2h", preco: "A partir de R$ 249" },
    { icon: "🔋", title: "Troca de Bateria", tempo: "1h", preco: "A partir de R$ 149" },
    { icon: "💧", title: "Dano por Líquido", tempo: "24h", preco: "A partir de R$ 199" },
    { icon: "📷", title: "Câmera", tempo: "3h", preco: "A partir de R$ 189" },
    { icon: "🔌", title: "Conector de Carga", tempo: "2h", preco: "A partir de R$ 129" },
    { icon: "🔊", title: "Alto-falante", tempo: "2h", preco: "A partir de R$ 119" },
  ],
  Notebooks: [
    { icon: "🖥️", title: "Troca de Tela", tempo: "3h", preco: "A partir de R$ 399" },
    { icon: "💾", title: "Upgrade de SSD", tempo: "2h", preco: "A partir de R$ 199" },
    { icon: "🌡️", title: "Pasta Térmica", tempo: "2h", preco: "A partir de R$ 129" },
    { icon: "⌨️", title: "Teclado", tempo: "3h", preco: "A partir de R$ 299" },
    { icon: "🔋", title: "Bateria", tempo: "2h", preco: "A partir de R$ 249" },
    { icon: "🔌", title: "Conector DC", tempo: "3h", preco: "A partir de R$ 179" },
  ],
  Tablets: [
    { icon: "📱", title: "Troca de Vidro", tempo: "3h", preco: "A partir de R$ 349" },
    { icon: "🔋", title: "Bateria", tempo: "2h", preco: "A partir de R$ 199" },
    { icon: "📷", title: "Câmera Traseira", tempo: "3h", preco: "A partir de R$ 219" },
    { icon: "🔊", title: "Alto-falante", tempo: "2h", preco: "A partir de R$ 139" },
  ],
  Outros: [
    { icon: "🎮", title: "Consoles / Joystick", tempo: "Sob consulta", preco: "Orçamento grátis" },
    { icon: "📡", title: "Roteadores", tempo: "Sob consulta", preco: "Orçamento grátis" },
    { icon: "⌚", title: "Smartwatches", tempo: "Sob consulta", preco: "Orçamento grátis" },
    { icon: "📸", title: "Câmeras Digitais", tempo: "Sob consulta", preco: "Orçamento grátis" },
  ],
};

export const DIFERENCIAIS = [
  { icon: "🔬", label: "Microscópio Digital 4K" },
  { icon: "🧪", label: "Câmara Ultrassônica" },
  { icon: "📡", label: "Testador de Sinal RF" },
  { icon: "🌡️", label: "Pasta Térmica Kyronaut" },
  { icon: "🛡️", label: "Peças 100% Originais" },
  { icon: "✅", label: "Garantia de 1 Ano" },
];