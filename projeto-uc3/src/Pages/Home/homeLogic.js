// homeLogic.js - Lógica, estado e animações da Home

import { useState, useEffect, useRef } from "react";

// ─── Hook: Intersection Observer para animações de entrada ───────────────────
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
      { threshold: 0.15, ...options }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return { ref, isVisible };
}

// ─── Hook: Lógica do tracker de OS ──────────────────────────────────────────
export function useOrderTracker() {
  const [osCode, setOsCode] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mockStatuses = {
    "TS-001": { label: "Em Diagnóstico", percent: 40, color: "#1e6fff" },
    "TS-002": { label: "Em Reparo", percent: 70, color: "#f59e0b" },
    "TS-003": { label: "Pronto para Retirada", percent: 100, color: "#10b981" },
  };

  const handleConsult = () => {
    if (!osCode.trim()) {
      setError("Digite o código da OS.");
      return;
    }
    setError("");
    setLoading(true);
    setStatus(null);

    setTimeout(() => {
      const found = mockStatuses[osCode.toUpperCase()];
      if (found) {
        setStatus(found);
      } else {
        setError("OS não encontrada. Tente: TS-001, TS-002 ou TS-003.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleConsult();
  };

  return { osCode, setOsCode, status, loading, error, handleConsult, handleKeyDown };
}

// ─── Hook: Carousel do laboratório ──────────────────────────────────────────
export function useCarousel(total) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => next(), 4000);
    return () => clearInterval(timer);
  }, []);

  return { index, prev, next };
}

// ─── Hook: Contador animado para stats ──────────────────────────────────────
export function useCountUp(target, duration = 1500, isVisible = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

// ─── Dados estáticos ─────────────────────────────────────────────────────────
export const WORKFLOW_STEPS = [
  {
    icon: "🔧",
    title: "Recebimento",
    desc: "Entregue seu aparelho em nossa unidade ou solicite retirada.",
  },
  {
    icon: "🔬",
    title: "Diagnóstico",
    desc: "Análise técnica completa e orçamento em tempo real.",
  },
  {
    icon: "⚙️",
    title: "Reparo",
    desc: "Manutenção especializada com componentes originais.",
  },
  {
    icon: "🚚",
    title: "Entrega",
    desc: "Seu dispositivo removado, testado e pronto para uso.",
  },
];

export const WHY_US = [
  {
    icon: "✅",
    title: "Certificação Apple & Samsung",
    desc: "Técnicos treinados diretamente pelos fabricantes.",
  },
  {
    icon: "⚡",
    title: "Reparo Expresso",
    desc: "80% dos problemas de tela resolvidos em até 2 horas.",
  },
  {
    icon: "🛡️",
    title: "Garantia de 1 Ano",
    desc: "Tranquilidade total com garantia estendida em peças originais.",
  },
];

export const LAB_PHOTOS = [
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    title: "Micro-soldagem em iPhone 15",
    sub: "Especialidade em reparos de placa",
  },
  {
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    title: "Troca de Tela MacBook Pro",
    sub: "Calibragem de cores original",
  },
  {
    img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
    title: "Recuperação de Dano por Líquido",
    sub: "Limpeza química e desoxidação",
  },
];

export const STATS = [
  { value: 12000, suffix: "+", label: "Reparos Realizados" },
  { value: 98, suffix: "%", label: "Satisfação dos Clientes" },
  { value: 2, suffix: "h", label: "Tempo Médio de Reparo" },
];