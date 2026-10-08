---
target: src/pages/index.astro
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\Ariel\\Proyectos\\opencode2026\\src\\pages\\index.astro"
target_fingerprint: "sha256:d1f0a9604a87fe800cdcda0c6c04953dafe6ec7fe3dac1dc6a9c09af24aa738d"
target_path: "C:\\Users\\Ariel\\Proyectos\\opencode2026\\src\\pages\\index.astro"
timestamp: 2026-10-08T21-17-25Z
slug: src-pages-index-astro
---
⚠️ DEGRADED: single-context (subagent depth limit reached; both assessments ran inline in order: A completed before detector output entered context)

# Critique — Fractal Host homepage (`src/pages/index.astro`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Form feedback, live dots and hero progress bar are good; carousel state is never announced |
| 2 | Match System / Real World | 4 | Plain Chilean Spanish throughout, terms explained inline (ping, valor líquido) — solid |
| 3 | User Control and Freedom | 2 | 7s auto-rotation with no keyboard-accessible pause; hidden UI stays tabbable |
| 4 | Consistency and Standards | 3 | Signal Rule mostly disciplined; "Enviar mensaje" submit is gray, not the declared action yellow |
| 5 | Error Prevention | 4 | Consent checkbox, required fields, named inline errors with example formats, tooltips on jargon |
| 6 | Recognition Rather Than Recall | 3 | Labels on every icon, mega-menus, skip link — discounted by phantom tab stops |
| 7 | Flexibility and Efficiency | 3 | Skip link, ARIA tabs, swipe, theme toggle; no pause control for the carousel |
| 8 | Aesthetic and Minimalist Design | 3 | Committed, coherent world; topbar carries 5 actions + page runs 14.531px |
| 9 | Error Recovery | 4 | "Escribe un correo válido, por ejemplo nombre@empresa.cl" — specific, non-blocking, aria-invalid |
| 10 | Help and Documentation | 3 | Categorized FAQ, contextual tooltips, live server status |
| **Total** | | **32/40** | **Good (80%)** |

## Design Specificity Verdict

**LLM assessment:** Authored for this product, unmistakably. Ping meters comparing ~240 ms vs ~60 ms, the liquid-price legend, Patagonia photography as dark data-texture, the two-accent orthogonal system (cyan = system, yellow = action), kickers flanked by 34×2px rules — an unrelated product could not use this unchanged. The mid-page is denser than the brand's own "simplificamos lo complicado" promise, but the world is genuinely theirs.

**Deterministic scan (CLI):** 257 findings, exit 2 — 16 warnings / 241 advisories: 187 design-system-font-size, 35 design-system-color, 18 design-system-radius, 10 layout-transition, 4 overused-font, 2 design-system-font, 1 codex-grid-background. Concentrated in global.css (60), Header.astro (39), Sitios.astro (24), cotizador.* (50, report-only).

**Browser visualization:** injection preflight succeeded, detect.js ran in the live page, 248 console findings: layout-transition 125, dark-glow 29, low-contrast 15, ai-color-palette 12, radial-spotlight-glow 10, kicker-above-heading 10, gpt-thin-border-wide-shadow 10, all-caps-body 9, line-length 7, pulsing-dot 6, icon-tile-stack 5, nested-cards 4. Live server stopped (port 8400 released).

**False positives:** overused-font (Montserrat/Roboto mandated by AGENTS.md), dark-glow / radial-spotlight-glow / grid-background / kicker-above-heading / all-caps-body / pulsing-dot (signature components documented in DESIGN.md — the detector flags the committed design system itself), low-contrast on hero text (detector cannot composite the layered night gradient over the photo; manual estimate ≈10:1+). **Real signals:** layout-transition (topbar contraction, accordion max-height, ping-meter width), line-length ~112ch intros, and type-ramp noise caused by DESIGN.md documenting .9rem in prose but not in its ramp.

## Overall Impression

The biggest opportunity is trust at the moment of purchase: this brand sells "sin letra chica," yet the renewal/suspension rule and the price anchor are both absent exactly where people decide. Second: keyboard focus wanders into invisible UI. Everything else is a system working as designed.

## What's Working

1. **The two-accent discipline holds everywhere.** Cyan never asks for a decision, yellow never describes state — across hero, plans, contact, footer.
2. **Error prevention and recovery are genuinely excellent.** Consent before submit, example-bearing error copy, aria-invalid, role="status", Escape closes all four overlay types.
3. **Proof is coherent across surfaces.** 13 años / 150+ proyectos / 35+ sitios identical in Stats, FAQ and PRODUCT.md — no invented numbers.

## Priority Issues

**[P1] What**: Inactive hero slides and the closed mobile menu remain keyboard-focusable. Verified live: focusing a link inside a non-active slide succeeds; off-canvas #mobileMenu (translate −130%) accepts focus on its 12 links. `.slide` uses opacity:0 + pointer-events:none without visibility:hidden.
**Why it matters**: Keyboard/screen-reader users tab through invisible CTAs — WCAG 2.4.3/2.4.7 failure and a trust leak.
**Fix**: Add visibility:hidden to `.slide` (transitioned like `.mega-panel`) and toggle visibility/inert on `#mobileMenu` when closed.
**Suggested command**: `/impeccable harden`

**[P1] What**: The suspension clause (15 días → suspensión, 120 días → eliminación) appears only in faqs.ts:396 and the legal modal — never near any "Contratar en línea" CTA or plan grid.
**Why it matters**: PRODUCT principle 3 "Sin letra chica" is contradicted at the highest-stakes moment.
**Fix**: One plain line under both plan grids with the published facts (aviso 15 días antes; suspensión a los 15; eliminación a los 120).
**Suggested command**: `/impeccable clarify`

**[P2] What**: No price anchor in the first viewport; first price at y≈1.575px (mega-menu only on hover).
**Why it matters**: Price-aware pyme owners need a floor price within seconds to decide to keep scrolling.
**Fix**: Under slide-0 CTA: "Hosting desde $39.990/año · valor líquido (+15,25%)".
**Suggested command**: `/impeccable clarify`

**[P2] What**: Hero carousel auto-advances every 7s; pause reachable by hover only, not keyboard; JS restart() ignores prefers-reduced-motion.
**Why it matters**: WCAG 2.2.2; readers lose the slide mid-sentence.
**Fix**: Pause on focusin/resume on focusout; skip restart() when prefersReduced.
**Suggested command**: `/impeccable animate`

**[P2] What**: `.reveal { opacity: 0 }` baseline with no <noscript> fallback — JS failure leaves all 57 reveal blocks invisible.
**Why it matters**: Whole-page blank-out on slow connections/JS errors.
**Fix**: <noscript><style>.reveal{opacity:1;transform:none}</style></noscript> in the layout.
**Suggested command**: `/impeccable harden`

## Persona Red Flags

**Jordan (First-Timer)**: No price on first screen; 6 controls at the plans decision point (3 line tabs + 3 duration toggles); 15/120-day rule effectively unfindable before paying.

**Casey (Distracted Mobile)**: 29 targets under 32px on one axis; hero swaps content every 7s mid-read; 14.531px-tall page; WhatsApp float saves it (bottom thumb zone ✓).

**Marta (dueña de pymes, 45, Punta Arenas)**: Trusts the up-front liquid-price legend, then finds renewal terms missing next to the buy button — the exact place "letra chica" would live. Gray submit reads uncertain against a yellow-means-action system.

**Sam (Accessibility)**: Focus ring ✓, skip link ✓, lang=es-CL ✓, single H1 ✓, image alts ✓ — then Tab lands on invisible slide CTAs and 12 closed-menu links; carousel changes unannounced.

## Minor Observations

- Contact submit #3d4450 gray violates the Signal Rule (yellow = primary action).
- Section intro paragraphs ~112ch vs 65–75ch floor.
- prefers-reduced-motion stacks all three slides statically — defensible, likely unintended; verify visually.
- layout-transition ×10 (topbar, accordion max-height, ping-meter width) is the only genuine performance debt.
- 187 type-ramp advisories reflect an incomplete DESIGN.md ramp, not site drift.

## Questions to Consider

- What would the hero look like if it sold one thing instead of three rotating slides?
- If "sin letra chica" is the principle, why is the most consequential clause the only one not on the page?
- Would a confident version of the plans section show duration as a footnote instead of a second control row?
