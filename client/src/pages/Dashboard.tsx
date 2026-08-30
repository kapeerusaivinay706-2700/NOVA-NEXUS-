import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleAlert, Filter, Radio, ShieldCheck, Wifi } from "lucide-react";
import { Link } from "wouter";

const vendors = ["All vendors", "AWS", "Azure", "GCP", "Oracle"];
const rows = [
  { vendor: "AWS", control: "IAM-04 · Privileged access", framework: "SOC 2", state: "Passing", tone: "pass", score: "98%" },
  { vendor: "Azure", control: "NET-12 · Network segmentation", framework: "ISO 27001", state: "Review", tone: "review", score: "81%" },
  { vendor: "GCP", control: "LOG-07 · Retention policy", framework: "NIST CSF", state: "Passing", tone: "pass", score: "94%" },
  { vendor: "Oracle", control: "ENC-02 · Key rotation", framework: "PCI DSS", state: "Anomaly", tone: "alert", score: "62%" },
];

export default function Dashboard() {
  const [vendor, setVendor] = useState("All vendors");
  const [live, setLive] = useState(true);
  const filtered = useMemo(() => vendor === "All vendors" ? rows : rows.filter((row) => row.vendor === vendor), [vendor]);
  return <div className="dashboard-shell">
    <header className="dashboard-top"><Link href="/" className="dashboard-back"><ArrowLeft size={15} /> Back to NOVA NEXUS</Link><div className="dashboard-title"><ShieldCheck size={18} /> NOVA NEXUS <span>/ AUDIT ROOM 03</span></div><button className={`live-toggle ${live ? "on" : ""}`} onClick={() => setLive(!live)}><span /> {live ? "Live watch" : "Paused"}</button></header>
    <main className="dashboard-main">
      <div className="dashboard-kicker"><Radio size={13} /> POSTURE / CURRENT FRAME <span>Updated 14 seconds ago</span></div>
      <div className="dashboard-heading"><div><h1>Compliance<br /><em>in focus.</em></h1><p>One operational view across the controls, evidence, and drift signals that shape your security posture.</p></div><div className="score-orb"><strong>94.2</strong><span>posture score</span><i /></div></div>
      <section className="dash-stats"><div><span>Controls passing</span><strong>12,412</strong><b className="up">+8.4%</b></div><div><span>Evidence coverage</span><strong>98.7%</strong><b className="up">+2.1%</b></div><div><span>Open anomalies</span><strong>07</strong><b className="amber">2 require review</b></div><div><span>Last full scan</span><strong>00:04:12</strong><b>All vendors</b></div></section>
      <section className="dash-grid"><div className="dash-panel signal-panel"><div className="panel-heading"><div><span className="panel-index">01 / Signal velocity</span><h2>Evidence throughput</h2></div><span className="live-chip"><Wifi size={11} /> LIVE</span></div><div className="bars">{[34,52,42,68,61,78,73,90,84,96,88,100,94,98].map((height, i) => <i key={i} style={{ height: `${height}%` }} className={i === 10 ? "peak" : ""} />)}</div><div className="chart-labels"><span>08:00</span><span>12:00</span><span>16:00</span><span>NOW</span></div></div><div className="dash-panel anomaly-panel"><div className="panel-heading"><div><span className="panel-index">02 / Drift watch</span><h2>Attention queue</h2></div><CircleAlert size={18} color="#ffc857" /></div><div className="anomaly-big"><strong>07</strong><span>open signals</span></div><div className="mini-progress"><span /><i /></div><p>Two anomalies moved beyond the review threshold in the last scan.</p><button className="dash-link">Open investigation <ArrowUpRight size={14} /></button></div></section>
      <section className="dash-panel table-panel"><div className="panel-heading"><div><span className="panel-index">03 / Control fabric</span><h2>Evidence by vendor</h2></div><div className="filter-wrap"><Filter size={13} /><select value={vendor} onChange={(event) => setVendor(event.target.value)} aria-label="Filter by vendor">{vendors.map((item) => <option key={item}>{item}</option>)}</select></div></div><div className="control-table">{filtered.map((row) => <div className="control-row" key={row.control}><span className="vendor-code">{row.vendor.slice(0, 2).toUpperCase()}</span><div><strong>{row.control}</strong><small>{row.framework}</small></div><span className={`state-pill ${row.tone}`}>{row.tone === "pass" ? <CheckCircle2 size={12} /> : <CircleAlert size={12} />}{row.state}</span><b>{row.score}</b></div>)}</div></section>
    </main>
    <footer className="dashboard-footer"><span>NOVA NEXUS Systems · secure audit room</span><Link href="/">Exit room</Link></footer>
  </div>;
}
