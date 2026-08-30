import { useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronRight, Menu, Play, Radio, ShieldCheck, X } from "lucide-react";

const features = [
  { no: "01", title: "Control mapping", copy: "Translate frameworks into one visual control language across every cloud and security vendor.", status: "MAPPING / LIVE" },
  { no: "02", title: "Evidence trails", copy: "Follow each requirement from policy to proof with a traceable, review-ready chain of evidence.", status: "TRACE / READY" },
  { no: "03", title: "Drift detection", copy: "Catch the quiet changes that turn a passing posture into tomorrow's exception report.", status: "WATCH / 24—7" },
];

const vendors = ["AWS / US-EAST-1", "AZURE / WEST-EU", "GCP / EUROPE-WEST", "ORACLE / ASH-1"];

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="sentinel-shell">
      <div className="noise" aria-hidden="true" />
      <header className="nav">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Return to top">
          <img src="/manus-storage/sentinel-mark_ed09a444.png" alt="" />
          <span>SENTINEL<small>// AUDIT SYSTEM</small></span>
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#sequence">Sequence</a><a href="#signals">Signals</a><a href="#vendors">Vendors</a>
        </nav>
        <button className="nav-action" onClick={() => scrollTo("contact")}>Request access <ArrowRight size={14} /></button>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        {menuOpen && <div className="mobile-popover"><button onClick={() => scrollTo("sequence")}>Sequence</button><button onClick={() => scrollTo("signals")}>Signals</button><button onClick={() => scrollTo("vendors")}>Vendors</button></div>}
      </header>

      <aside className="rail" aria-label="Page sections">
        <a href="#top">00 <span>Intro</span></a><a href="#sequence">01 <span>Sequence</span></a><a href="#signals">02 <span>Signals</span></a><a href="#contact">03 <span>Access</span></a>
      </aside>

      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow"><span /> SIH HACKATHON / 2026</div>
            <h1>Make every<br /><em>signal</em> count.</h1>
            <p className="hero-copy">An AI-driven compliance auditor that turns multi-vendor security posture into a cinematic, review-ready chain of proof.</p>
            <div className="hero-actions"><button className="primary-btn" onClick={() => scrollTo("sequence")}>Enter the sequence <ArrowDownRight size={16} /></button><button className="ghost-btn" onClick={() => scrollTo("signals")}><Play size={14} fill="currentColor" /> Watch the system</button></div>
          </div>
          <div className="hero-meta"><div><strong>04</strong>Vendors connected</div><div><strong>98.7%</strong>Evidence coverage</div><div><strong>24/7</strong>Posture watch</div></div>
          <div className="sequence-spine" aria-label="Audit sequence progress"><span className="spine-label">AUDIT SEQUENCE / 00—03</span><div className="spine-track"><i className="spine-dot active" /><i className="spine-dot" /><i className="spine-dot" /><i className="spine-dot" /></div><span className="spine-state">SIGNAL LOCKED</span></div>
        </section>

        <section className="section section-dark" id="sequence">
          <div className="section-head"><div><div className="section-index">01 / The sequence</div><h2>From scattered controls<br />to <em>one visible chain.</em></h2></div><p className="section-intro">Sentinel gives your security team a single frame for the full story: what is protected, what changed, and what needs a closer look.</p></div>
          <div className="audit-stage"><div className="evidence-image" role="img" aria-label="Abstract evidence chamber with scanning beam" /><div className="feature-list" role="tablist" aria-label="Audit capabilities">{features.map((feature, index) => <button key={feature.no} className={`feature ${activeFeature === index ? "active" : ""}`} onClick={() => setActiveFeature(index)} role="tab" aria-selected={activeFeature === index}><span className="feature-number">{feature.no}</span><span><h3>{feature.title}</h3><p>{feature.copy}</p><span className="feature-status">{activeFeature === index ? <><Radio size={11} /> {feature.status}</> : feature.status}</span></span></button>)}</div></div>
        </section>

        <section className="section section-blue" id="signals">
          <div className="section-head"><div><div className="section-index">02 / Live signals</div><h2>The quiet layer<br />beneath the <em>noise.</em></h2></div><p className="section-intro">The system watches for drift across the fabric of your infrastructure, then surfaces only the evidence that deserves attention.</p></div>
          <div className="metrics"><div className="metric"><strong>12.4k</strong><span>controls scanned</span></div><div className="metric"><strong>3.8m</strong><span>evidence points</span></div><div className="metric"><strong>07</strong><span>open anomalies</span></div><div className="metric"><strong>0.4s</strong><span>signal latency</span></div></div>
          <div className="rule" />
          <div className="vendor-frame" id="vendors"><div className="vendor-frame-content"><div className="eyebrow"><span /> THE VENDOR FABRIC</div><h3>One posture.<br />Every cloud.</h3><p>Normalize the way your vendors speak. Sentinel listens across the stack and returns a single, legible point of view.</p><button className="ghost-btn" onClick={() => scrollTo("contact")}>Explore integrations <ChevronRight size={15} /></button></div><div className="vendor-nodes">{vendors.map((vendor) => <button className="vendor-node" key={vendor}><i />{vendor}</button>)}</div></div>
        </section>

        <section className="cta" id="contact"><div className="cta-frame" aria-hidden="true"><span>PROOF CHAIN / READY</span><span>ROOM 03</span></div><div className="section-index">03 / Access protocol</div><h2>Run the sequence.<br /><em>See what holds.</em></h2><p className="hero-copy">Bring your control plane into focus with Sentinel. We’re opening the first audit rooms to teams ready to see their evidence differently.</p><div className="hero-actions"><button className="primary-btn" onClick={() => alert("Access request noted. A Sentinel operator will be in touch.")}>Request a room <ArrowRight size={16} /></button><span className="eyebrow"><Check size={14} /> No commitment / guided setup</span></div></section>
      </main>
      <footer className="footer"><span>© 2026 Sentinel Systems</span><span>AI + BLOCKCHAIN + CYBERSECURITY</span><span>Built for the watchful</span></footer>
    </div>
  );
}
