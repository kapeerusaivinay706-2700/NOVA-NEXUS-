import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronRight, Menu, Pause, Play, Radio, ShieldCheck, Timer, X } from "lucide-react";

const features = [
  { no: "01", title: "Control mapping", copy: "Translate frameworks into one visual control language across every cloud and security vendor.", status: "MAPPING / LIVE", image: "/manus-storage/sentinel-evidence_c6a17fbc.jpg" },
  { no: "02", title: "Evidence trails", copy: "Follow each requirement from policy to proof with a traceable, review-ready chain of evidence.", status: "TRACE / READY", image: "/manus-storage/sentinel-vendor-orbit_6c7161e9.jpg" },
  { no: "03", title: "Drift detection", copy: "Catch the quiet changes that turn a passing posture into tomorrow's exception report.", status: "WATCH / 24—7", image: "/manus-storage/sentinel-hero_977d0400.jpg" },
];

const vendors = [{ label: "AWS / US-EAST-1", logo: "/manus-storage/aws_516d1945.svg" }, { label: "AZURE / WEST-EU", logo: "/manus-storage/azure_2b7f3683.svg" }, { label: "GCP / EUROPE-WEST", logo: "/manus-storage/gcp_ba824ec1.svg" }, { label: "ORACLE / ASH-1", logo: "/manus-storage/oracle_678e9efe.svg" }];

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeVendor, setActiveVendor] = useState(0);
  const [filmPlaying, setFilmPlaying] = useState(true);
  const [filmTime, setFilmTime] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [accessOpen, setAccessOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const filmClock = window.setInterval(() => setFilmTime((time) => filmPlaying ? (time + 1) % 120 : time), 1000);
    return () => window.clearInterval(filmClock);
  }, [filmPlaying]);

  useEffect(() => {
    const sections = ["top", "sequence", "signals", "film", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.35, 0.65] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
          <span>NOVA NEXUS<small>// AUDIT SYSTEM</small></span>
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#sequence">Sequence</a><a href="#signals">Signals</a><a href="#film">Problem film</a><a href="#vendors">Vendors</a><a href="/dashboard">Audit room</a><a href="/mission-control">SIH workspace</a>
        </nav>
        <button className="nav-action" onClick={() => setAccessOpen(true)}>Request access <ArrowRight size={14} /></button>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        {menuOpen && <div className="mobile-popover"><button onClick={() => scrollTo("sequence")}>Sequence</button><button onClick={() => scrollTo("signals")}>Signals</button><button onClick={() => scrollTo("vendors")}>Vendors</button><a href="/mission-control">SIH workspace</a></div>}
      </header>

      <aside className="rail" aria-label="Page sections">
        <a className={activeSection === "top" ? "active" : ""} href="#top">00 <span>Intro</span></a><a className={activeSection === "sequence" ? "active" : ""} href="#sequence">01 <span>Sequence</span></a><a className={activeSection === "signals" ? "active" : ""} href="#signals">02 <span>Signals</span></a><a className={activeSection === "contact" ? "active" : ""} href="#contact">03 <span>Access</span></a>
      </aside>

      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow"><span /> SIH HACKATHON / 2026</div>
            <h1>Make every<br /><em>signal</em> count.</h1>
            <p className="hero-copy">An AI-driven compliance auditor that turns multi-vendor security posture into a cinematic, review-ready chain of proof.</p>
            <div className="hero-actions"><button className="primary-btn" onClick={() => scrollTo("sequence")}>Enter the sequence <ArrowDownRight size={16} /></button><button className="ghost-btn" onClick={() => scrollTo("signals")}><Play size={14} fill="currentColor" /> Watch the system</button><a className="ghost-btn dashboard-link" href="/dashboard"><ShieldCheck size={14} /> Open audit room</a></div>
          </div>
          <div className="hero-meta"><div><strong>04</strong>Vendors connected</div><div><strong>98.7%</strong>Evidence coverage</div><div><strong>24/7</strong>Posture watch</div></div>
          <div className="sequence-spine" aria-label="Audit sequence progress"><span className="spine-label">AUDIT SEQUENCE / 00—03</span><div className="spine-track"><i className="spine-dot active" /><i className="spine-dot" /><i className="spine-dot" /><i className="spine-dot" /></div><span className="spine-state">SIGNAL LOCKED</span></div>
        </section>

        <section className="section section-dark" id="sequence">
          <div className="section-head"><div><div className="section-index">01 / The sequence</div><h2>From scattered controls<br />to <em>one visible chain.</em></h2></div><p className="section-intro">NOVA NEXUS gives your security team a single frame for the full story: what is protected, what changed, and what needs a closer look.</p></div>
          <div className="audit-stage"><div className="evidence-image is-switching" key={features[activeFeature].image} style={{ backgroundImage: `url(${features[activeFeature].image})` }} role="img" aria-label={`${features[activeFeature].title} visual`}><span className="evidence-caption">LIVE FRAME / {features[activeFeature].no} · {features[activeFeature].status}</span></div><div className="feature-list" role="tablist" aria-label="Audit capabilities">{features.map((feature, index) => <button key={feature.no} className={`feature ${activeFeature === index ? "active" : ""}`} onClick={() => setActiveFeature(index)} role="tab" aria-selected={activeFeature === index}><span className="feature-number">{feature.no}</span><span><h3>{feature.title}</h3><p>{feature.copy}</p><span className="feature-status">{activeFeature === index ? <><Radio size={11} /> {feature.status}</> : feature.status}</span></span></button>)}</div></div>
        </section>

        <section className="section section-blue" id="signals">
          <div className="section-head"><div><div className="section-index">02 / Live signals</div><h2>The quiet layer<br />beneath the <em>noise.</em></h2></div><p className="section-intro">The system watches for drift across the fabric of your infrastructure, then surfaces only the evidence that deserves attention.</p></div>
          <div className="metrics"><div className="metric"><strong>12.4k</strong><span>controls scanned</span></div><div className="metric"><strong>3.8m</strong><span>evidence points</span></div><div className="metric"><strong>07</strong><span>open anomalies</span></div><div className="metric"><strong>0.4s</strong><span>signal latency</span></div></div>
          <div className="rule" />
          <div className="vendor-frame" id="vendors" style={{ backgroundImage: `linear-gradient(90deg, rgba(3,9,20,.96), rgba(3,9,20,.2)), url(${features[(activeVendor + 1) % features.length].image})` }}><div className="vendor-frame-content"><div className="eyebrow"><span /> THE VENDOR FABRIC</div><h3>One posture.<br />Every cloud.</h3><p>Normalize the way your vendors speak. NOVA NEXUS listens across the stack and returns a single, legible point of view.</p><button className="ghost-btn" onClick={() => scrollTo("contact")}>Explore integrations <ChevronRight size={15} /></button></div><div className="vendor-nodes">{vendors.map((vendor, index) => <button className={`vendor-node ${activeVendor === index ? "active" : ""}`} onClick={() => setActiveVendor(index)} key={vendor.label}><img src={vendor.logo} alt={`${vendor.label} logo`} /><span>{vendor.label}</span><i /></button>)}</div></div>
        </section>

        <section className="si h-film" id="film"><div className="film-header"><div><div className="section-index">03 / Problem statement film</div><h2>Why the signal<br /><em>gets lost.</em></h2></div><div className="film-controls"><span><Timer size={13} /> 02:00 / cinematic brief</span><button onClick={() => setFilmPlaying((playing) => !playing)}>{filmPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />} {filmPlaying ? "Pause film" : "Play film"}</button></div></div><div className="film-stage"><div className={`film-scene scene-${Math.floor(filmTime / 30) + 1}`}><div className="film-scan" /><div className="film-label">NOVA NEXUS / SIH 26155</div><div className="film-copy"><span>00:{String(filmTime).padStart(2, "0")}</span><strong>{filmTime < 30 ? "Different syntax." : filmTime < 60 ? "One security meaning." : filmTime < 90 ? "Human-validated learning." : "Evidence you can defend."}</strong><p>{filmTime < 30 ? "Cisco, Fortinet, Juniper, and Palo Alto express the same controls in different command languages." : filmTime < 60 ? "Upload, detect, parse, normalize, and check selected CIS, NIST, STIG, and ISO controls." : filmTime < 90 ? "When an unknown command appears, AI suggests a meaning and an administrator decides what becomes trusted." : "Risk, remediation, PDF report, and SHA-256 integrity turn the audit into a review-ready chain of proof."}</p></div><div className="film-orbit"><span /><span /><span /><b>NOVA<br />CORE</b></div></div><div className="film-progress"><i style={{ width: `${(filmTime / 120) * 100}%` }} /><span>00:00</span><span>02:00</span></div></div><div className="film-chapters">{["Problem", "Pipeline", "Learning", "Proof"].map((chapter, index) => <button className={Math.floor(filmTime / 30) === index ? "active" : ""} key={chapter} onClick={() => { setFilmTime(index * 30); setFilmPlaying(true); }}>{String(index + 1).padStart(2, "0")} / {chapter}</button>)}</div><div className="judge-brief"><div><div className="section-index">SIH problem statement / 26155</div><div className="topic-visual"><span className="topic-beam" /><div className="topic-visual-copy"><small>THE CORE IDEA</small><strong>One security model.<br /><em>Four vendor dialects.</em></strong><span>CONFIG → MEANING → CONTROL → PROOF</span></div></div></div><p>We are developing a vendor-agnostic AI-powered network compliance auditor. It converts different vendor configurations into a common security model, evaluates selected controls, and keeps AI interpretation separate from deterministic PASS / FAIL decisions.</p></div></section>

          <section className="shortlist-section"><div className="section-index">04 / Shortlist protocol</div><h2>Build what judges<br /><em>can verify.</em></h2><div className="shortlist-grid"><div><strong>01</strong><span>Working pipeline</span><p>Upload → detect → parse → normalize → compliance → remediation → PDF.</p></div><div><strong>02</strong><span>Visible innovation</span><p>Unknown command → AI suggestion → human confirmation → future recognition.</p></div><div><strong>03</strong><span>Credible scope</span><p>MVP demonstrates selected vendors, selected controls, and extensibility—not full framework coverage.</p></div></div><div className="demo-script"><div><div className="section-index">05 / Judge demo script</div><h3>Show the proof<br /><em>in ten moves.</em></h3><p>Keep the explanation short, then let the working flow carry the story.</p></div><ol><li><b>01</b><span>Open the audit room and explain the vendor-neutral problem.</span></li><li><b>02</b><span>Upload a sanitized Cisco configuration and show vendor detection.</span></li><li><b>03</b><span>Run the audit and reveal PASS, FAIL, UNKNOWN, severity, evidence, and remediation.</span></li><li><b>04</b><span>Upload an unknown configuration and show the AI semantic suggestion.</span></li><li><b>05</b><span>Confirm the mapping, re-run the audit, verify the evidence hash, and download the PDF.</span></li></ol></div></section>

          <section className="cta" id="contact"><div className="cta-frame" aria-hidden="true"><span>PROOF CHAIN / READY</span><span>ROOM 03</span></div><div className="section-index">03 / Access protocol</div><h2>Run the sequence.<br /><em>See what holds.</em></h2><p className="hero-copy">Bring your control plane into focus with NOVA NEXUS. We’re opening the first audit rooms to teams ready to see their evidence differently.</p><div className="hero-actions"><button className="primary-btn" onClick={() => { setAccessOpen(true); setSubmitted(false); }}>Request a room <ArrowRight size={16} /></button><span className="eyebrow"><Check size={14} /> No commitment / guided setup</span></div></section>
      </main>
      <footer className="footer"><span>© 2026 NOVA NEXUS Systems</span><span>AI + BLOCKCHAIN + CYBERSECURITY</span><span>Built for the watchful</span></footer>
      {accessOpen && <div className="modal-backdrop" role="presentation" onClick={() => setAccessOpen(false)}><section className="access-modal" role="dialog" aria-modal="true" aria-labelledby="access-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setAccessOpen(false)} aria-label="Close access request"><X size={18} /></button>{submitted ? <div className="success-state"><div className="success-mark"><Check size={24} /></div><div className="section-index">TRANSMISSION RECEIVED</div><h2 id="access-title">Your room is<br /><em>being prepared.</em></h2><p>We’ll send a secure access link to your team shortly.</p><button className="primary-btn" onClick={() => setAccessOpen(false)}>Return to sequence <ArrowRight size={15} /></button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="section-index">ACCESS PROTOCOL / 03</div><h2 id="access-title">Request an<br /><em>audit room.</em></h2><p>Tell us where to send the first signal.</p><label>Work email<input type="email" placeholder="you@company.com" required /></label><label>Team size<select defaultValue=""><option value="" disabled>Select a range</option><option>1–10</option><option>11–50</option><option>51–200</option><option>201+</option></select></label><button className="primary-btn" type="submit">Transmit request <ArrowRight size={15} /></button></form>}</section></div>}
    </div>
  );
}
