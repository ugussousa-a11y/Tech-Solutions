// Home.jsx
import { useState } from "react";
import styles from "./Home.module.css";
import {
  useScrollReveal,
  useOrderTracker,
  useCarousel,
  useCountUp,
  WORKFLOW_STEPS,
  WHY_US,
  LAB_PHOTOS,
  STATS,
} from "./homeLogic";

// ─── Sub-components ──────────────────────────────────────────────────────────

function WorkflowSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.workflow}>
      <div
        ref={ref}
        className={`${styles.reveal} ${isVisible ? styles.visible : ""}`}
      >
        <p className={styles.sectionTag}>Fluxo de Trabalho</p>
        <h2 className={styles.sectionTitle}>Processo Transparente e Ágil</h2>
      </div>

      <div className={styles.workflowGrid}>
        {WORKFLOW_STEPS.map((step, i) => {
          const { ref: stepRef, isVisible: stepVisible } = useScrollReveal();
          return (
            <div
              key={step.title}
              ref={stepRef}
              className={`${styles.workflowStep} ${styles.reveal} ${stepVisible ? styles.visible : ""} ${styles[`delay${i + 1}`]}`}
            >
              <div className={styles.workflowIcon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TrackerSection() {
  const tracker = useOrderTracker();
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal();
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal();

  return (
    <section className={styles.trackerSection}>
      {/* Card tracker */}
      <div
        ref={leftRef}
        className={`${styles.revealLeft} ${leftVisible ? styles.visible : ""}`}
      >
        <div className={styles.trackerCard}>
          <h2>Acompanhe seu Reparo</h2>
          <p>
            Insira o código da sua Ordem de Serviço (OS) para visualizar o
            status em tempo real da manutenção.
          </p>

          <div className={styles.trackerInputRow}>
            <input
              className={styles.trackerInput}
              type="text"
              placeholder="Código da OS (ex: TS-001)"
              value={tracker.osCode}
              onChange={(e) => tracker.setOsCode(e.target.value)}
              onKeyDown={tracker.handleKeyDown}
            />
            <button
              className={styles.trackerBtn}
              onClick={tracker.handleConsult}
              disabled={tracker.loading}
            >
              {tracker.loading ? (
                <>
                  <span className={styles.spinner} />
                  Buscando
                </>
              ) : (
                "Consultar Status"
              )}
            </button>
          </div>

          {tracker.error && (
            <p className={styles.trackerError}>{tracker.error}</p>
          )}

          {tracker.status && (
            <div className={styles.trackerStatus}>
              <p className={styles.trackerStatusLabel}>Status Atual</p>
              <p
                className={styles.trackerStatusValue}
                style={{ color: tracker.status.color }}
              >
                {tracker.status.label}
              </p>
              <div className={styles.trackerBar}>
                <div
                  className={styles.trackerBarFill}
                  style={{
                    width: `${tracker.status.percent}%`,
                    background: tracker.status.color,
                  }}
                />
              </div>
              <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.4rem" }}>
                {tracker.status.percent}% concluído
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Why us */}
      <div
        ref={rightRef}
        className={`${styles.revealRight} ${rightVisible ? styles.visible : ""}`}
      >
        <div className={styles.whyUs}>
          <p className={styles.whyUsTag}>Por que nos escolher?</p>
          <h2>Tecnologia de Laboratório Industrial ao seu alcance</h2>
          {WHY_US.map((item) => (
            <div key={item.title} className={styles.whyItem}>
              <span className={styles.whyItemIcon}>{item.icon}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.stats} ref={ref}>
      {STATS.map((stat) => {
        const count = useCountUp(stat.value, 1800, isVisible);
        return (
          <div key={stat.label} className={styles.statItem}>
            <div className={styles.statNumber}>
              {count}
              {stat.suffix}
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        );
      })}
    </section>
  );
}

function LabSection() {
  const { index, prev, next } = useCarousel(LAB_PHOTOS.length);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.lab}>
      <div
        ref={ref}
        className={`${styles.reveal} ${isVisible ? styles.visible : ""}`}
      >
        <div className={styles.labHeader}>
          <div>
            <p className={styles.sectionTag}>Nosso Laboratório</p>
            <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
              Bastidores da Manutenção
            </h2>
          </div>
          <div className={styles.carouselControls}>
            <button className={styles.carouselBtn} onClick={prev}>
              ‹
            </button>
            <button className={styles.carouselBtn} onClick={next}>
              ›
            </button>
          </div>
        </div>

        <div className={styles.carouselTrack}>
          {LAB_PHOTOS.map((photo, i) => (
            <div
              key={photo.title}
              className={styles.carouselCard}
              style={{
                opacity: i === index ? 1 : 0.6,
                transform: i === index ? "scale(1.03)" : "scale(1)",
                transition: "opacity 0.4s, transform 0.4s",
              }}
            >
              <img src={photo.img} alt={photo.title} loading="lazy" />
              <div className={styles.carouselCardInfo}>
                <h4>{photo.title}</h4>
                <p>{photo.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal();
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section className={styles.contact}>
      <div
        ref={leftRef}
        className={`${styles.revealLeft} ${leftVisible ? styles.visible : ""}`}
      >
        <div className={styles.contactInfo}>
          <span>Fale com um Técnico</span>
          <h2>Tire suas dúvidas ou peça um orçamento via formulário.</h2>
          <p>
            Nossa equipe responde em até 2 horas. Atendemos via WhatsApp,
            e-mail e presencialmente.
          </p>
          <div className={styles.contactLinks}>
            <div className={styles.contactLink}>
              <span>📞</span>
              <span>(11) 99999-9999</span>
            </div>
            <div className={styles.contactLink}>
              <span>📧</span>
              <span>contato@techsolutions.com.br</span>
            </div>
            <div className={styles.contactLink}>
              <span>📍</span>
              <span>São Paulo, SP — Atendimento Presencial</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={rightRef}
        className={`${styles.revealRight} ${rightVisible ? styles.visible : ""}`}
      >
        <div className={styles.contactForm}>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Nome Completo</label>
              <input
                name="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formField}>
              <label>Telefone / WhatsApp</label>
              <input
                name="phone"
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formField}>
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formField}>
            <label>Descrição do Problema</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Descreva o problema do seu dispositivo..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {sent ? (
            <button
              className={styles.submitBtn}
              style={{ background: "#10b981" }}
            >
              ✅ Mensagem enviada!
            </button>
          ) : (
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Enviar Mensagem →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <span className={styles.heroLabel}>🔧 Assistência Técnica Especializada</span>
        <h1 className={styles.heroTitle}>
          Seu dispositivo está com problemas?{" "}
          <span>Resolva em algumas horas.</span>
        </h1>
        <p className={styles.heroDesc}>
          Especialistas certificados em reparos de alta performance para
          smartphones, laptops e tablets. Tecnologia de ponta e garantia total
          em cada serviço.
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary}>Abrir Ordem de Serviço</button>
          <button className={styles.btnOutline}>Ver Preços</button>
        </div>
      </div>

      <div className={styles.heroImg}>
        <div className={styles.heroImgCard}>
          <img
            src="https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=700&q=80"
            alt="Reparo de dispositivos"
          />
        </div>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeIcon}>⚡</span>
          <div className={styles.heroBadgeText}>
            <strong>+12.000</strong>
            <span>Reparos Realizados</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOME (main export) ──────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <WorkflowSection />
      <TrackerSection />
      <StatsSection />
      <LabSection />
      <ContactSection />
    </div>
  );
}