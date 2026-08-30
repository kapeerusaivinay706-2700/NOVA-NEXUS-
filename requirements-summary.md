# SIH Project Tool Requirements → Sentinel Feature Map

The uploaded document defines Sentinel as an AI-driven, multi-vendor network security compliance auditor. Its core story is a pipeline that ingests network configuration, detects vendor format, parses commands, normalizes them into a vendor-neutral security model, evaluates controls against multiple compliance frameworks, classifies each result as PASS / FAIL / UNKNOWN, learns unknown mappings with administrator confirmation, proposes remediation, produces a PDF audit report, and preserves evidence integrity using SHA-256 and a blockchain-style hash chain.

| Document capability | Website feature to implement | User-facing interaction |
|---|---|---|
| Cisco, Fortinet, Palo Alto, Juniper, unknown/custom vendor support | Vendor intake console | Choose a vendor or unknown format and see the parser state update. |
| Netmiko / NAPALM collection | Collection stage | Run a simulated collection sequence with device count, protocol, and progress state. |
| TextFSM / Regex / CiscoConfParse | Parsing stage | Show parser badges and a command-to-control trace for sample configuration lines. |
| AI / NLP for unknown commands | Unknown command trainer | Review an unknown command, choose its normalized meaning, and confirm it into a local knowledge base. |
| YAML / JSON normalized security model | Normalized control view | Toggle between source command, normalized JSON meaning, and mapped policy control. |
| CIS / NIST SP 800-53 / DISA STIG / ISO 27001 | Framework selector | Filter checks by framework and update the compliance summary. |
| SSH, Telnet, HTTP/HTTPS, AAA, logging, NTP, SNMP, management ACL, crypto, unused services | Control matrix | Inspect control states with PASS, FAIL, and UNKNOWN status plus remediation detail. |
| ReportLab PDF audit output | Report generation action | Generate a review-ready report state with evidence count and export-ready status. |
| SHA-256 / blockchain hash chain | Evidence integrity panel | Display evidence hash, chain block number, and verification result. |
| PostgreSQL persistence concept | Data inventory UI | Show devices, controls, findings, and learned mappings as navigable datasets in the prototype. |

## Selected build scope

The frontend upgrade will add a **Mission Control workspace** rather than attempt to implement backend networking inside the static website. It will include an animated five-stage pipeline, vendor intake, framework filters, a control matrix using the document’s exact security checks, an unknown-command learning flow with administrator confirmation, and an evidence-integrity / report-generation panel. Existing cinematic landing and audit-room routes remain intact, while the new workspace becomes the primary demonstration surface for the SIH concept.

## Prototype boundary

The website will use clearly labeled simulated sample data and client-side state for demonstration. Netmiko, NAPALM, FastAPI, PostgreSQL, real AI/LLM calls, PDF generation, and blockchain persistence are represented as product surfaces and workflow states only; they are not claimed to be live integrations in this frontend-only project.
