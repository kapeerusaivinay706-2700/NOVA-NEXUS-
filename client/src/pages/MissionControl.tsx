import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BrainCircuit, Check, CheckCircle2, ChevronDown, CircleAlert, Database, FileCode2, FileDown, Fingerprint, GitBranch, LockKeyhole, Network, Play, RefreshCw, ShieldCheck, Sparkles, Terminal, Upload, WandSparkles } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const pipeline = [
  { icon: Upload, label: "Collect", detail: "Netmiko / NAPALM" },
  { icon: Network, label: "Detect", detail: "Vendor fingerprint" },
  { icon: FileCode2, label: "Parse", detail: "TextFSM / Regex" },
  { icon: BrainCircuit, label: "Normalize", detail: "AI + NLP model" },
  { icon: ShieldCheck, label: "Evaluate", detail: "CIS / NIST / STIG / ISO" },
];
const vendors = ["Cisco", "Fortinet", "Palo Alto", "Juniper", "Unknown / Custom"];
const frameworks = ["All frameworks", "CIS Benchmarks", "NIST 800-53", "DISA STIGs", "ISO 27001"];
const checks = [
  { name: "SSH version", control: "Remote access", framework: "CIS Benchmarks", state: "PASS", tone: "pass", detail: "SSH v2 enforced" },
  { name: "Telnet service", control: "Unused services", framework: "DISA STIGs", state: "FAIL", tone: "fail", detail: "Legacy service detected" },
  { name: "AAA configuration", control: "Identity policy", framework: "NIST 800-53", state: "PASS", tone: "pass", detail: "TACACS+ active" },
  { name: "NTP synchronization", control: "Time integrity", framework: "ISO 27001", state: "UNKNOWN", tone: "unknown", detail: "AI mapping required" },
  { name: "Management ACL", control: "Network boundary", framework: "CIS Benchmarks", state: "PASS", tone: "pass", detail: "Restricted to 4 CIDRs" },
  { name: "SNMP community", control: "Monitoring", framework: "NIST 800-53", state: "FAIL", tone: "fail", detail: "Default string present" },
] as const;

export default function MissionControl() {
  const [vendor, setVendor] = useState("Cisco");
  const [framework, setFramework] = useState("All frameworks");
  const [running, setRunning] = useState(false);
  const [learned, setLearned] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [sourceFile, setSourceFile] = useState("edge-router-04.conf");
  const [stagedDeviceId, setStagedDeviceId] = useState<number | null>(null);
  const [latestRunId, setLatestRunId] = useState<number | null>(null);
  const [evidenceVerified, setEvidenceVerified] = useState(false);
  const workspace = trpc.workspace.get.useQuery();
  const utils = trpc.useUtils();
  const createDeviceMutation = trpc.workspace.createDevice.useMutation();
  const runAuditMutation = trpc.workspace.runAudit.useMutation();
  const ingestMutation = trpc.workspace.ingestConfig.useMutation();
  const confirmMappingMutation = trpc.workspace.confirmMapping.useMutation();
  const reportMutation = trpc.workspace.createReport.useMutation();
  const evidenceQuery = trpc.workspace.verifyEvidence.useQuery({ auditRunId: latestRunId || 1, sha256: "89f3c0d4e91a7c1b17a9f61e04b7d2c8" }, { enabled: false });
  const filtered = useMemo(() => framework === "All frameworks" ? checks : checks.filter((check) => check.framework === framework), [framework]);
  const stageConfig = async (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; try { const device = await ingestMutation.mutateAsync({ name: file.name.replace(/\.[^/.]+$/, ""), vendor, fileName: file.name, content: await file.text() }); setSourceFile(file.name); setStagedDeviceId(device.id); await utils.workspace.get.invalidate(); toast.success(`${file.name} uploaded and stored for parsing.`); } catch (error) { toast.error(error instanceof Error ? error.message : "Configuration upload failed."); } };
  const downloadReport = async () => { if (!latestRunId) { toast.error("Run an audit before exporting a report."); return; } const report = `NOVA NEXUS AUDIT REPORT\n\nSource: ${sourceFile}\nVendor: ${vendor}\nFramework: ${framework}\nPass rate: 72%\nEvidence integrity: SHA-256 verified\n\nFindings\n${checks.map((check) => `- ${check.name}: ${check.state} — ${check.detail}`).join("\n")}`; try { const saved = await reportMutation.mutateAsync({ auditRunId: latestRunId, report, format: "txt" }); if (saved?.fileUrl) { const anchor = document.createElement("a"); anchor.href = saved.fileUrl; anchor.download = `nova-nexus-audit-${latestRunId}.txt`; anchor.click(); } setReportReady(true); toast.success("Audit report stored and downloaded from the sealed evidence chain."); } catch (error) { toast.error(error instanceof Error ? error.message : "Report export failed."); } };
  const runAudit = async () => {
    setRunning(true);
    try {
      const existingId = stagedDeviceId ?? workspace.data?.devices?.[0]?.id;
      const deviceId = existingId ?? (await createDeviceMutation.mutateAsync({ name: "edge-router-04", vendor, sourceFile })).id;
      const run = await runAuditMutation.mutateAsync({ deviceId, framework: framework === "All frameworks" ? "CIS Benchmarks" : framework, sha256: "89f3c0d4e91a7c1b17a9f61e04b7d2c8", findings: checks.map((check) => ({ controlName: check.name, framework: check.framework, state: check.state, detail: check.detail, remediation: check.state === "FAIL" ? "Review and remediate the detected configuration drift." : undefined })) });
      setLatestRunId(run.id); setEvidenceVerified(false);
      await utils.workspace.get.invalidate();
      toast.success("Audit complete — evidence sealed in the workspace.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Audit could not be completed.");
    } finally { setRunning(false); }
  };
  return <div className="mission-shell">
    <header className="mission-top"><Link className="dashboard-back" href="/"><ArrowLeft size={15} /> Back to NOVA NEXUS</Link><div className="mission-brand"><img src="/manus-storage/sentinel-mark_ed09a444.png" alt="" /> <span>NOVA NEXUS <small>/ MISSION CONTROL</small></span></div><div className="mission-status"><i /> DEMO ENVIRONMENT</div></header>
    <main className="mission-main">
      <div className="mission-intro"><div><div className="dashboard-kicker"><Terminal size={13} /> SIH PROJECT WORKSPACE / 01</div><h1>Configuration<br /><em>to confidence.</em></h1><p>Demonstrate the full audit sequence: collect network configuration, learn unknown commands, evaluate against the right framework, then seal the evidence.</p></div><button className="run-btn" onClick={runAudit}>{running ? <><RefreshCw size={15} className="spin" /> Running sequence</> : <><Play size={15} fill="currentColor" /> Run demo audit</>}</button></div>
      <section className="pipeline" aria-label="Audit pipeline">{pipeline.map((step, index) => { const Icon = step.icon; return <div className={`pipeline-step ${running && index < 4 ? "processing" : ""}`} key={step.label}><div className="pipeline-icon"><Icon size={18} /></div><div><strong>{step.label}</strong><span>{step.detail}</span></div>{index < pipeline.length - 1 && <ArrowRight className="pipeline-arrow" size={15} />}</div> })}</section>
      <section className="mission-grid top-grid"><div className="mission-panel intake-panel"><div className="panel-heading"><div><span className="panel-index">01 / Configuration intake</span><h2>Select a source</h2></div><Database size={17} color="#65e6ff" /></div><p>Choose the vendor grammar for your incoming configuration, or let the detector route an unknown format to AI analysis.</p><label className="file-drop"><Upload size={16} /><span><strong>{sourceFile}</strong><small>Drop a configuration file or browse</small></span><input type="file" accept=".conf,.cfg,.txt,.log" onChange={stageConfig} /></label><div className="vendor-picker">{vendors.map((item) => <button className={vendor === item ? "selected" : ""} onClick={() => setVendor(item)} key={item}><span className="vendor-glyph">{item === "Unknown / Custom" ? "?" : item.slice(0, 2).toUpperCase()}</span><span>{item}</span>{vendor === item && <Check size={14} />}</button>)}</div><div className="source-line"><span><LockKeyhole size={12} /> evidence source</span><b>{sourceFile}</b></div></div><div className="mission-panel normalize-panel"><div className="panel-heading"><div><span className="panel-index">02 / Normalized model</span><h2>One language for every vendor</h2></div><GitBranch size={17} color="#a99cff" /></div><div className="code-block"><div><span>01</span><code><b>device.vendor</b>: <em>"{vendor.split(" /")[0]}"</em></code></div><div><span>02</span><code><b>access.ssh_version</b>: <em>2</em></code></div><div><span>03</span><code><b>access.telnet</b>: <strong>false</strong></code></div><div><span>04</span><code><b>logging.remote</b>: <strong>true</strong></code></div><div><span>05</span><code><b>time.ntp_status</b>: <mark>unknown</mark></code></div></div><div className="model-footer"><span><FileCode2 size={12} /> JSON normalized security model</span><span>SHA-256 linked</span></div></div></section>
      <section className="mission-panel controls-panel"><div className="panel-heading"><div><span className="panel-index">03 / Compliance engine</span><h2>Control matrix</h2></div><div className="select-pair"><label>Framework<select value={framework} onChange={(event) => setFramework(event.target.value)}>{frameworks.map((item) => <option key={item}>{item}</option>)}</select></label><span className="matrix-score">72% <small>pass rate</small></span></div></div><div className="matrix-head"><span>Control / security check</span><span>Framework</span><span>Result</span></div><div className="control-matrix">{filtered.map((check) => <div className="matrix-row" key={check.name}><div><strong>{check.name}</strong><small>{check.control} · {check.detail}</small></div><span>{check.framework}</span><b className={`matrix-state ${check.tone}`}>{check.tone === "pass" ? <CheckCircle2 size={13} /> : check.tone === "fail" ? <CircleAlert size={13} /> : <Sparkles size={13} />}{check.state}</b></div>)}</div></section>
      <section className="mission-grid bottom-grid"><div className="mission-panel unknown-panel"><div className="panel-heading"><div><span className="panel-index">04 / AI learning loop</span><h2>Unknown command detected</h2></div><WandSparkles size={18} color="#a99cff" /></div><div className="unknown-command"><Terminal size={16} /><code>ntp server 10.20.4.18 prefer</code></div><div className="ai-suggestion"><div className="ai-avatar"><BrainCircuit size={18} /></div><div><span>AI / NLP SUGGESTION</span><strong>“NTP synchronization = enforced”</strong><p>The model found a matching security meaning with 91% confidence.</p></div></div>{learned ? <div className="learned-state"><CheckCircle2 size={15} /> Mapping confirmed · knowledge base updated</div> : <div className="unknown-actions"><button className="confirm-btn" onClick={async () => { try { await confirmMappingMutation.mutateAsync({ rawCommand: "ntp server 10.20.4.18 prefer", normalizedMeaning: "NTP synchronization = enforced", confidence: 91 }); setLearned(true); toast.success("Mapping confirmed and saved to the knowledge base."); } catch (error) { toast.error(error instanceof Error ? error.message : "Mapping could not be saved."); } }}>Confirm mapping <Check size={14} /></button><button className="subtle-btn">Edit meaning <ChevronDown size={14} /></button></div>}</div><div className="mission-panel seal-panel"><div className="panel-heading"><div><span className="panel-index">05 / Evidence integrity</span><h2>Seal the audit trail</h2></div><Fingerprint size={19} color="#65e6ff" /></div><div className="hash-card"><div className="hash-row"><span>BLOCK</span><strong>#000481</strong><small>verified</small></div><div className="hash-line" /><div className="hash-row"><span>SHA-256</span><code>89f3…b17a</code><small className="cyan">immutable</small></div></div><p>Every configuration, finding, and report is chained to a tamper-evident evidence record.</p><div className="unknown-actions"><button className="subtle-btn" onClick={async () => { if (!latestRunId) { toast.error("Run an audit before verification."); return; } const result = await evidenceQuery.refetch(); setEvidenceVerified(Boolean(result.data?.verified)); toast.success(result.data?.verified ? "Evidence hash verified." : "Evidence hash mismatch."); }}><Fingerprint size={14} /> {evidenceVerified ? "Evidence verified" : "Verify evidence"}</button><button className="report-btn" onClick={downloadReport}>{reportReady ? <><Check size={15} /> Report ready for export</> : <><FileDown size={15} /> Generate PDF audit report</>}</button></div></div></section>
    </main>
    <footer className="dashboard-footer"><span>Prototype surfaces reflect the SIH project tool architecture</span><Link href="/dashboard">View posture dashboard <ArrowRight size={13} /></Link></footer>
  </div>;
}
