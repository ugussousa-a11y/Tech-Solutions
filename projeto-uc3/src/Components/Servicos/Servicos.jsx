// Servicos.jsx
import { useState } from "react";
import styles from "./Servicos.module.css";
import {
  useScrollReveal,
  useVideoModal,
  useServiceTab,
  useOrcamentoForm,
  HERO_SERVICOS,
  SERVICOS_DESTAQUE,
  TABS,
  SERVICOS_POR_TAB,
  DIFERENCIAIS,
} from "./servicosLogic";

// ─── Modal de "vídeo" ────────────────────────────────────────────────────────
function VideoModal({ card, onClose }) {
  if (!card) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <div className={styles.modalIcon}>🎬</div>
        <h3 className={styles.modalTitle}>{card.title}</h3>
        <p className={styles.modalDesc}>
          Este vídeo mostraria o processo completo de <strong>{card.title}</strong> realizado
          pelos nossos técnicos certificados em ambiente de laboratório industrial.
        </p>
        <button className={styles.modalBtn} onClick={onClose}>Fechar Prévia</button>
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroServicos() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCrumb}>
          Home &rsaquo; <span>Serviços</span>
        </div>
        <h1 className={styles.heroTitle}>
          Especialistas em <em>Precisão</em>
        </h1>
        <p className={styles.heroDesc}>{HERO_SERVICOS.desc}</p>
      </div>
    </section>
  );
}

// ─── Grid destaque ───────────────────────────────────────────────────────────
function DestaqueSection({ onPlay }) {
  const { ref: r1, isVisible: v1 } = useScrollReveal();
  const { ref: r2, isVisible: v2 } = useScrollReveal();
  const { ref: r3, isVisible: v3 } = useScrollReveal();
  const { ref: r4, isVisible: v4 } = useScrollReveal();

  const [s1, s2, s3] = SERVICOS_DESTAQUE;

  return (
    <section className={styles.destaqueSection}>
      <div className={styles.destaqueGrid}>

        {/* Card grande — Troca de Tela */}
        <div
          ref={r1}
          className={`${styles.destaqueCard} ${styles.large} ${styles.revealLeft} ${v1 ? styles.visible : ""}`}
          onClick={() => onPlay(s1)}
        >
          <img className={styles.destaqueImg} src={s1.img} alt={s1.title} />
          <div className={styles.destaqueOverlay} />
          <div className={styles.playBtn}>▶</div>
          <div className={styles.destaqueInfo}>
            <div className={styles.destaqueBadge}>{s1.tag}</div>
            <div className={styles.destaqueTitle}>{s1.title}</div>
            <p className={styles.destaqueDesc}>{s1.desc}</p>
          </div>
        </div>

        {/* Card pequeno — Microssoldagem */}
        <div
          ref={r2}
          className={`${styles.destaqueCard} ${styles.small} ${styles.revealRight} ${v2 ? styles.visible : ""}`}
          onClick={() => onPlay(s2)}
        >
          <img className={styles.destaqueImg} src={s2.img} alt={s2.title} />
          <div className={styles.destaqueOverlay} />
          <div className={styles.playBtn}>▶</div>
          <div className={styles.destaqueInfo}>
            <div className={styles.destaqueBadge}>{s2.tag}</div>
            <div className={styles.destaqueTitle}>{s2.title}</div>
            <p className={styles.destaqueDesc}>{s2.desc}</p>
          </div>
        </div>

        {/* Row inferior */}
        <div className={styles.destaqueBottom}>

          {/* Card imagem — Manutenção */}
          <div
            ref={r3}
            className={`${styles.destaquePureCard} ${styles.revealLeft} ${v3 ? styles.visible : ""}`}
            onClick={() => onPlay(s3)}
          >
            <img
              className={styles.destaqueImg}
              src={s3.img}
              alt={s3.title}
              style={{ minHeight: 260 }}
            />
            <div className={styles.destaqueOverlay} />
            <div className={styles.playBtn}>▶</div>
            <div className={styles.destaqueInfo}>
              <div className={styles.destaqueBadge}>{s3.tag}</div>
              <div className={styles.destaqueTitle}>{s3.title}</div>
            </div>
          </div>

          {/* Card info — CTA */}
          <div
            ref={r4}
            className={`${styles.destaqueInfoCard} ${styles.revealRight} ${v4 ? styles.visible : ""}`}
          >
            <div className={styles.destaqueInfoTag}>
              <span>⚙️</span> Manutenção Preventiva
            </div>
            <h3>{s3.title}</h3>
            <p>{s3.desc}</p>
            <button className={styles.ctaBtn}>Solicitar Orçamento</button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Tabs de serviços ────────────────────────────────────────────────────────
function TabsSection() {
  const { tab, setTab } = useServiceTab(0);
  const { ref, isVisible } = useScrollReveal();
  const lista = SERVICOS_POR_TAB[TABS[tab]];

  return (
    <section className={styles.tabsSection}>
      <div
        ref={ref}
        className={`${styles.reveal} ${isVisible ? styles.visible : ""}`}
      >
        <div className={styles.tabsHeader}>
          <span className={styles.sectionTag}>Catálogo Completo</span>
          <h2 className={styles.sectionTitle}>Todos os Serviços</h2>
        </div>

        <div className={styles.tabs}>
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`${styles.tabBtn} ${tab === i ? styles.active : ""}`}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={styles.servicosGrid} key={tab}>
          {lista.map((s, i) => (
            <ServicoCard key={s.title} item={s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicoCard({ item, idx }) {
  const delayClass = styles[`d${Math.min(idx + 1, 6)}`];
  return (
    <div className={`${styles.servicoCard} ${styles.revealScale} ${styles.visible} ${delayClass}`}>
      <div className={styles.servicoIcon}>{item.icon}</div>
      <div className={styles.servicoTitle}>{item.title}</div>
      <div className={styles.servicoMeta}>
        <span className={styles.metaChip}>⏱ {item.tempo}</span>
        <span className={`${styles.metaChip} ${styles.price}`}>{item.preco}</span>
      </div>
    </div>
  );
}

// ─── Diferenciais ────────────────────────────────────────────────────────────
function DiferenciaisSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.diferenciaisSection}>
      <div
        ref={ref}
        className={`${styles.reveal} ${isVisible ? styles.visible : ""}`}
      >
        <div className={styles.diferenciaisHeader}>
          <span className={styles.sectionTag}>Tecnologia & Equipamentos</span>
          <h2 className={styles.sectionTitle}>Nosso Arsenal Técnico</h2>
        </div>
        <div className={styles.diferenciaisGrid}>
          {DIFERENCIAIS.map((d, i) => {
            const delayClass = styles[`d${Math.min(i + 1, 6)}`];
            return (
              <div
                key={d.label}
                className={`${styles.diferencialItem} ${styles.revealScale} ${isVisible ? styles.visible : ""} ${delayClass}`}
              >
                <div className={styles.diferencialIcon}>{d.icon}</div>
                <div className={styles.diferencialLabel}>{d.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Orçamento ───────────────────────────────────────────────────────────────
function OrcamentoSection() {
  const { form, sent, loading, handleChange, handleSubmit } = useOrcamentoForm();
  const { ref: lRef, isVisible: lVis } = useScrollReveal();
  const { ref: rRef, isVisible: rVis } = useScrollReveal();

  return (
    <section className={styles.orcamentoSection}>
      <div
        ref={lRef}
        className={`${styles.revealLeft} ${lVis ? styles.visible : ""}`}
      >
        <div className={styles.orcamentoInfo}>
          <span className={styles.sectionTag}>Orçamento Gratuito</span>
          <h2>Diagnóstico sem compromisso em até 2 horas</h2>
          <p>
            Traga seu dispositivo ou descreva o problema. Nossa equipe retorna com
            diagnóstico detalhado e preço fechado — sem surpresas.
          </p>
          <div className={styles.promiseList}>
            {[
              "Diagnóstico 100% gratuito",
              "Orçamento aprovado por você antes do reparo",
              "Garantia de 1 ano em peças e mão de obra",
              "Peças originais com nota fiscal",
            ].map((p) => (
              <div key={p} className={styles.promiseItem}>
                <div className={styles.promiseDot} />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={rRef}
        className={`${styles.revealRight} ${rVis ? styles.visible : ""}`}
      >
        <div className={styles.orcamentoForm}>
          <div className={styles.formTitle}>Solicitar Orçamento</div>

          <div className={styles.formField}>
            <label>Nome Completo</label>
            <input
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formField}>
            <label>Dispositivo</label>
            <select name="dispositivo" value={form.dispositivo} onChange={handleChange}>
              <option value="">Selecione o dispositivo</option>
              <option>Smartphone</option>
              <option>Notebook</option>
              <option>Tablet</option>
              <option>Outro</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label>Descreva o Problema</label>
            <textarea
              name="problema"
              rows={3}
              placeholder="Ex: Tela quebrada, não liga, bateria fraca..."
              value={form.problema}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formField}>
            <label>WhatsApp / E-mail</label>
            <input
              name="contato"
              placeholder="(11) 99999-9999 ou email@email.com"
              value={form.contato}
              onChange={handleChange}
            />
          </div>

          <button
            className={`${styles.submitBtn} ${sent ? styles.sent : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <><span className={styles.spinner} /> Enviando...</>
            ) : sent ? (
              "✅ Solicitação Enviada!"
            ) : (
              "Enviar Solicitação →"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function Servicos() {
  const { active, open, close } = useVideoModal();

  return (
    <div className={styles.page}>
      <HeroServicos />
      <DestaqueSection onPlay={open} />
      <TabsSection />
      <DiferenciaisSection />
      <OrcamentoSection />
      <VideoModal card={active} onClose={close} />
    </div>
  );
}