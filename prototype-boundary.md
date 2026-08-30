# NOVA NEXUS Prototype Boundary

NOVA NEXUS now runs as a full-stack prototype with a React frontend, tRPC procedures, Drizzle persistence, and managed object storage. The working demonstration includes configuration file selection, browser-side file reading, storage-backed configuration ingestion, vendor selection, audit execution, findings persistence, learned command mapping persistence, SHA-256 evidence records, evidence verification lookup, and storage-backed report export.

The current prototype intentionally does not open SSH sessions to customer infrastructure, run Netmiko or NAPALM inside the deployment, or claim that the displayed sample findings represent a live network. Those production capabilities require a secure worker or connector layer, credential vaulting, network allowlists, vendor parser packages, and operational monitoring. The UI and API contracts are structured so those components can replace the demo audit generator without changing the core experience.

The report export currently produces a text artifact stored in managed object storage. A production PDF renderer can be added behind the same `createReport` procedure. Authentication infrastructure is present through the project template; the current workspace procedures remain public for frictionless judging and can be changed to protected procedures before production use.
