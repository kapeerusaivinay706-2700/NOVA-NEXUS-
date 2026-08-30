# Sentinel — Cinematic Compliance Auditor

## Approach 1
**Theme Name:** Neon Command Center

**Very Brief Intro:** A dark, high-contrast cyber operations room with electric blue instrumentation, cinematic light beams, and live telemetry. It feels urgent, exact, and mission-critical.

**Probability:** 0.07

## Approach 2
**Theme Name:** Polar Glass Observatory

**Very Brief Intro:** A quiet, icy interface built from translucent glass panels, arctic cyan, and restrained motion. It communicates clarity, trust, and controlled intelligence rather than alarm.

**Probability:** 0.03

## Approach 3
**Theme Name:** Signal Noir

**Very Brief Intro:** A film-title-inspired security experience with inky navy, ultraviolet accents, scanlines, and slow camera-like reveals. It treats compliance as a story of evidence, exposure, and resolution.

**Probability:** 0.08

## Chosen Direction: Signal Noir

### Design Movement
Cinematic futurism with editorial noir composition, borrowing from title sequences, mission-control interfaces, and high-contrast sci-fi cinematography without becoming a generic neon dashboard.

### Core Principles
1. **Evidence as spectacle:** Every major interaction reveals a piece of the audit story through signal traces, scan passes, and focused spotlighting.
2. **Asymmetric composition:** Large left-aligned narrative blocks and offset telemetry panels create a filmic frame instead of a centered SaaS template.
3. **Restrained luminosity:** Blue-white light is precious and directional; most of the canvas stays nearly black so the audit states feel illuminated.
4. **Operational clarity:** Motion decorates hierarchy but never obscures labels, controls, keyboard focus, or status meaning.

### Color Philosophy
The foundation is midnight ink (#030712) with graphite-blue surfaces (#0b1220) that make the interface feel like a dark screening room. Sentinel cyan (#65e6ff) is the ownable signal color: it indicates trusted, active, and inspectable states. Ultraviolet (#7d6bff) only appears in transition trails and secondary metadata, while amber (#ffc857) marks attention without pretending every issue is a critical failure.

### Layout Paradigm
A long-form cinematic scroll: a fixed compact rail anchors the experience while sections enter as editorial frames. Hero copy occupies the left third, the visual auditor core lives off-axis to the right, and lower sections alternate between wide data compositions and narrow narrative columns.

### Signature Elements
- A **Signal Rail** with numbered anchors and progress glow along the viewport edge.
- A **Compliance Core**: rotating shield ring, orbiting vendor nodes, and a scanning beam rendered in CSS/SVG.
- **Film-frame transitions**: hairline rules, index labels, grain texture, and deliberate black-to-blue reveals between chapters.

### Interaction Philosophy
Interactions should feel like operating a calm instrument panel. Hovering a vendor node illuminates its path; selecting a feature switches the evidence panel with a short crossfade; buttons respond immediately with a slight press scale and a focused cyan edge. All actions are accessible by keyboard and remain understandable with reduced motion enabled.

### Animation
Use layered, slow ambient motion only for the core: a 20-second orbit, a 7-second scan pulse, and a subtle background drift. UI transitions stay between 160–280ms with cubic-bezier easing. Section entrances stagger by 50ms. Avoid animating layout properties; use opacity, transform, filter, and stroke-dashoffset. Pause or simplify non-essential effects under `prefers-reduced-motion: reduce`.

### Typography System
Use **Space Grotesk** for display headlines and section labels, with **DM Sans** for readable body copy and controls. Headlines are uppercase or sentence case with compact tracking, while utility labels use 0.16em tracking and a smaller scale. Numeric readouts use Space Grotesk with tabular styling.

### Brand Essence
Sentinel is the cinematic evidence layer for teams auditing multi-vendor security posture: it turns fragmented compliance signals into a decisive sequence of proof. Personality: **precise, composed, watchful**.

### Brand Voice
Headlines are short, visual, and assured. CTAs sound like deliberate operations, never hype. Microcopy names what the system is doing rather than promising magic.

Example lines:
- “Turn scattered controls into one visible chain of proof.”
- “Run the sequence. See what holds.”

### Wordmark & Logo
The mark is a compact split-shield symbol: two offset chevrons form a protective aperture around a single cyan signal dot. The wordmark “SENTINEL” is set in Space Grotesk with custom cut notches in the E and a widened final L, paired with a small `// AUDIT SYSTEM` descriptor.

### Signature Brand Color
**Sentinel Cyan — #65E6FF**, a cold electric cyan reserved for the active proof path and the core shield signal.

## Style Decisions
- Use the supplied reference image as tonal inspiration for the glowing shield, cloud-security concept, blue city horizon, and multi-vendor story; do not reproduce its embedded headline text as an image.
- Keep content editable in HTML/React so controls remain accessible and responsive.
- Avoid generic centered hero cards, purple gradients, excessive rounded corners, and Inter.
