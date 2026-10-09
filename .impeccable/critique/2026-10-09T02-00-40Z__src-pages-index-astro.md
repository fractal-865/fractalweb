---
target: homepage (src/pages/index.astro)
total_score: 31
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\Ariel\\Proyectos\\opencode2026\\src\\pages\\index.astro"
target_fingerprint: "sha256:d1f0a9604a87fe800cdcda0c6c04953dafe6ec7fe3dac1dc6a9c09af24aa738d"
target_path: "C:\\Users\\Ariel\\Proyectos\\opencode2026\\src\\pages\\index.astro"
timestamp: 2026-10-09T02-00-40Z
slug: src-pages-index-astro
---
⚠️ DEGRADED: single-context (sub-agent tool gated in this session — "Subagent depth limit reached (1)"; Assessment A (design review) and Assessment B (detector + browser evidence) were run sequentially in one context, A completed before any detector output entered the synthesis)

**Target:** `src/pages/index.astro` — Fractal Host homepage (one-page Persuade surface), slug `src-pages-index-astro`.
**Inspection:** live at `http://localhost:4321/` (dev server was already running before this critique; left running) at 1433×890 and 985×700; screenshots were unavailable in this session (desktop window not visible), so visual inspection ran through live DOM/computed-style evaluation; responsive behavior was verified from breakpoint CSS plus rendered DOM, not from a device-sized capture.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hero carousel changes on its own every 7 s without announcing automatic changes (manual changes do hit `#liveRegion`); form status/progress are excellent |
| 2 | Match System / Real World | 3 | Plain Chilean Spanish and honest CLP liquid pricing throughout; jargon (cPanel, Imunify360, LiteSpeed) leans on tooltips; plan names "Starter 1–3" carry no meaning on their own |
| 3 | User Control and Freedom | 3 | Carousel pauses on hover/focus, has prev/next + swipe and honors `prefers-reduced-motion`, but offers no visible pause/stop control and no slide jump indicators |
| 4 | Consistency and Standards | 3 | DESIGN.md system is followed closely, but the plan tablist keeps `tabindex=0` on all three tabs while the FAQ tablist roves correctly, and hard-coded `#00F0FF`/`#00D6C2` sit beside tokens `#00E5FF`/`#22E6A8` |
| 5 | Error Prevention | 3 | Labels, `autocomplete`, `inputmode`, `maxlength`, consent gate and tooltips before checkout redirection; validation still happens after submit rather than on input |
| 6 | Recognition Rather Than Recall | 3 | Megamenús, tabs and tooltips expose options — but 5 of 8 sampled FAQ questions are truncated mid-sentence with an ellipsis, so users cannot recognize the answer they came for |
| 7 | Flexibility and Efficiency of Use | 3 | Seven routes to a human (topbar, megamenú, hero, plans, FAQ, form, floating WhatsApp), skip link and keyboard path; no accelerators needed, but no way to jump back up a 14,700 px page |
| 8 | Aesthetic and Minimalist Design | 3 | Visually disciplined and on-system; 11 sections, 141 visible interactive elements and a 14,700 px scroll make the page heavier than its message |
| 9 | Error Recovery | 4 | Specific fix-oriented copy ("Escribe un correo válido, por ejemplo nombre@empresa.cl"), focus moves to first invalid field, `role=alert` per field, `role=status` summary, inputs preserved, noscript fallback |
| 10 | Help and Documentation | 3 | Categorized FAQ, contextual tooltips and "Ver detalles en preguntas frecuentes →" links at the point of doubt; FAQ answers run 112–137 characters per line |
| **Total** | | **31/40** | **Good (77%)** |

Applicable maximum 40 — all ten heuristics applied (no `n/a`).

**Cognitive load checklist: 2 of 8 failed → moderate.** Failed: *Minimal choices* (topbar presents 7 actions — email, status, agenda, área clientes, cotizar, contratar, theme — before any scroll; the Sitios megamenu offers 8 links in one grid) and *One thing at a time* (the hero rewrites itself under the reader every 7 s). Passed: single focus per section, chunking, grouping, visual hierarchy, working memory, progressive disclosure.

**Emotional journey:** a strong open (hero → 13 años / 150+ proyectos / 35+ sitios proof band) and a trustworthy close (direct channels + response-time promise), with the peak at price honesty — liquid price and the +15,25% note under every figure. The valley is the middle: Infra (13 cards), Sitios (8 cards), Mantención and Correo stack similar dark card grids across thousands of pixels, so the reader fatigues before reaching the contact form. Reassurance at the high-stakes moment is good (checkout tooltip, renewal/suspension terms) but the FAQ — the reassurance mechanism itself — is the least readable block on the page.

## Design Specificity Verdict

**LLM assessment: authored for this product — not category-interchangeable.** The composition could not be lifted onto an unrelated SaaS without visible rewriting: dark chrome over light body, cyan-for-system / yellow-for-action with no role swaps, the Patagonia photo treated as data texture with a night overlay, the ping meter, kickers flanked by 34×2 px rules, the "Más elegido" badge overhanging the featured card, and the liquid-price legend under every figure. Structural sameness shows up in copy, not in form: hero slide 3 ("Transformamos tus ideas en proyectos digitales completos… Tu aliado digital") is the one line a competitor could run unchanged, and the positioning only a neighbor can claim — *13 años en Punta Arenas, hablas con quien administra tu hosting* — never appears above the fold.

**Deterministic scan (Assessment B):** `impeccable detect --json src` → exit 2, **263 findings (16 warning, 247 advisory, 0 errors)** across 20 files — `design-system-font-size` 191, `design-system-color` 37, `design-system-radius` 18, `layout-transition` 10, `overused-font` 4, `design-system-font` 2, `codex-grid-background` 1. Hot spots: `global.css` 62, `Header.astro` 39, `Sitios.astro` 24, `cotizador.css` 23, `Infra.astro` 18. **What it caught that I missed:** (a) the type system is not the system DESIGN.md describes — 191 off-ramp sizes against 7 declared steps, i.e. ~20 literal sizes live in the code; (b) 37 off-palette colors, including brand hard-codes `#00F0FF`/`#00D6C2` (from AGENTS.md) beside the declared tokens `#00E5FF`/`#22E6A8`; (c) 10 `layout-transition` warnings (animating width/height/padding/max-height — the topbar collapse, ping meters and FAQ answers). **Browser detector:** `detect.js` injected into a fresh tab → **213 console findings** (`layout-transition` 112, `dark-glow` 27, `low-contrast` 12, `ai-color-palette` 11, `radial-spotlight-glow` 9, `gpt-thin-border-wide-shadow` 9, `all-caps-body` 8, `line-length` 6, `kicker-above-heading` 5, `icon-tile-stack` 5, `pulsing-dot` 3, `nested-cards` 2, `overused-font` 1, `clipped-overflow-container` 1), plus 15 `tiny-text` and 17 `undersized-ui-text` on `/cotizador`, the page the hero's main CTA leads to.

**False positives flagged:** all 12 `low-contrast` hits target text on the dark chrome (hero `#DCE6F0`, kicker `#6FE6FF`, muted `#A7B4C2`) where the detector resolved the background to the light page color because the night backdrop comes from gradients/images, not an ancestor `background-color` — my own scan of 373 text nodes over solid backgrounds found **0 contrast failures**. Brief-mandated pattern rules are also noise here: `dark-glow`, `all-caps-body`, `kicker-above-heading`, `radial-spotlight-glow`, `ai-color-palette`, `pulsing-dot`, `codex-grid-background` and `overused-font` (Montserrat/Roboto) are all pinned by DESIGN.md/AGENTS.md. `nested-cards` ×2 is a dashed-border pill inside a card, not a card.

**Visual overlays:** script injection succeeded and the detector ran in the page — **195 `.impeccable-overlay` elements with 194 labels are now in the [Human] browser tab** (74 sized/visible in the current viewport, labelled by rule, e.g. "layout property animation", "✦ hairline border with wide shadow"). Console output mirrored those findings 1:1.

## Overall Impression

A mature, opinionated site that keeps its promises: the two-accent rule holds, contrast is clean, focus rings are visible, and the contact form is better engineered than most product UIs. What holds it back is not ugliness but **weight and self-censorship** — the page is 11 sections and 14,700 px long with a 7-action chrome, while the one sentence competitors cannot copy never reaches the first screen. The single biggest opportunity: say the differentiator out loud in the hero and cut the scroll that buries it.

## What's Working

1. **Honest money, everywhere.** Every price carries "Valor líquido, sin retención (+15,25%)"; renewal, suspension and checkout redirection are stated before the click. For an audience that distrusts hosting providers, this is the design doing the selling.
2. **Error recovery as a craft object.** Submitting the empty contact form yields four specific sentences ("Para enviar, marca la casilla de consentimiento."), focuses `fNombre`, announces via `role=status`, keeps the user's input and offers a noscript escape to email/WhatsApp. Verified live.
3. **Edge cases handled before they were asked for.** The floating WhatsApp ring shifts up 110 px while the cookie banner is open (`body.cookies-open .wa-ring`), the carousel stops for reduced-motion users and on focus, the skip link appears on first Tab, and the focus ring is the documented 3 px `#00A9C4`.

## Priority Issues

**[P1] The FAQ hides its own questions.** *What:* `<summary>` truncates question text with `whitespace-nowrap text-ellipsis` — 5 of 8 sampled questions render as cut strings ("¿Cuánto me va a costar mi hosting el primer año si hago mi s…"); the detector independently measured answer lines at 112–137 characters (target <80), plus 6 `line-length` findings on this page. *Why it matters:* the FAQ is the pre-sales reassurance channel for a non-technical buyer; a truncated question is a question nobody can recognize, so the "respuestas directas, sin rodeos" promise fails at the exact moment of doubt. *Fix:* drop `whitespace-nowrap` for a two-line `line-clamp-2` on the summary, widen or de-columnize the list (the 2-column layout is what forces the cut), and cap answer measure at ~70ch (`max-w-[65ch]`). *Suggested command:* `/impeccable layout`

**[P1] Decision overload before the first scroll.** *What:* the fixed chrome carries 7 actions (email, server status, agenda, área clientes, cotizar, contratar, theme) over 6 nav items that open megamenús — one of which shows 8 links in a single grid — and the page then runs 11 sections / 141 visible interactive elements / 14,700 px. *Why it matters:* cognitive load scored 2/8 failed (moderate); the target buyer is 30+, non-technical and here to make one decision. Seven simultaneous asks read as "this is complicated", which is the opposite of the brand promise. *Fix:* make the topbar serve one audience per state — new visitor sees *Cotizar* + *Contratar*, returning customer gets *Área clientes* and *Agendar* inside the megamenús; collapse the Sitios grid from 8 links to 4 + "Ver todos"; and consider splitting the mid-page card walls (Infra 13, Sitios 8) into two anchored pages or a tabbed block. *Suggested command:* `/impeccable distill`

**[P2] The carousel has no visible way to stop it.** *What:* hero slides rotate every 7 s; hover and focus pause the timer, `prefers-reduced-motion` disables autoplay, manual changes announce to `#liveRegion` — but there is no pause/play control and no slide indicators, and automatic changes are never announced. *Why it matters:* WCAG 2.2.2 wants a visible mechanism for motion lasting >5 s; touch users never hover, so on phones the headline changes mid-sentence with no way to hold it. *Fix:* add a pause/play button next to the prev/next arrows and 3 clickable indicators (which double as jump targets), keep autoplay off under reduced motion, and announce auto-advances politely. *Suggested command:* `/impeccable animate`

**[P2] The hero sells the category, not the company.** *What:* slide 3 leads with "Transformamos tus ideas en proyectos digitales completos" — copy a competitor could run unchanged — while the defensible claim (13 años en Punta Arenas, hablas con quien administra tu hosting) appears only in an Infra card and inside megamenú/FAQ text. *Why it matters:* on a Persuade surface the first screen is the pitch; the brand's own positioning says the differentiator is a neighbor you can talk to, and the visitor has to scroll ~6,000 px to sense it. *Fix:* rewrite slide 3 around the human/proof claim ("Hablas con quien administra tu hosting. 13 años en Punta Arenas."), or pin a proof line under the H1; keep the services list for slide 2. *Suggested command:* `/impeccable clarify`

**[P2] The design system on record is not the one in the code.** *What:* 246 design-system advisories — 191 font sizes off a 7-step ramp, 37 colors off-palette (including `#00F0FF`/`#00D6C2` hard-codes beside tokens `#00E5FF`/`#22E6A8`), 18 radii off the rounded scale — plus 10 CLI / 112 browser `layout-transition` warnings. *Why it matters:* drift is invisible to a visitor but expensive for the next change: no one can tell an intentional addition from an accident, and two competing cyans are already in the source. *Fix:* decide which palette is canonical (AGENTS.md brand values vs DESIGN.md tokens — this is a brand decision, not a code fix), then either normalize the code to tokens or regenerate DESIGN.md from the code so the record matches reality; swap width/height/padding transitions for transform/opacity. *Suggested command:* `/impeccable document`

## Persona Red Flags

**Jordan (First-Timer)** — lands from a search for "hosting Punta Arenas":
- The topbar greets them with 7 actions and the nav with 6 megamenu triggers; nothing says which one is "the" next step. High abandonment risk in the first 5 seconds.
- Opens FAQ looking for price clarity, finds "¿Cuánto me va a costar mi hosting el primer año si hago mi s…" cut mid-word — the answer they need is behind text they cannot read.
- "Starter 1 / Starter 2 / Starter 3" tells them nothing; they must compare GB/trfm/mail rows to learn what differs, while the tab structure hides 6 of the 9 plans.

**Sam (Accessibility-dependent)** — keyboard and screen reader:
- Plan tablist exposes all three tabs with `tabindex=0` (Starter/Pro/Master), breaking the roving-tabindex pattern the FAQ tablist gets right; arrow-key expectations set by the FAQ don't hold in the plan picker.
- Hero auto-advances every 7 s with no pause control; automatic changes are not announced (only manual prev/next hit `#liveRegion`), so a screen-reader user loses the headline they were reading.
- Consent checkbox measures 14×17 px and footer links 18 px tall — below the 24×24 target guidance; `smallTargets` scan found 14 such elements.

**Martina, 48 — dueña de una pyme en Magallanes (project-specific, from PRODUCT.md audience):** non-technical, values direct human contact, wary of being handed to a ticket queue.
- She scans the hero for a reason to trust and finds price + features, not people; "hablas con quien administra tu hosting" — the phrase that would stop her — is buried in an Infra card after ~6,000 px of scrolling.
- The 3-slide hero rewrites itself while she reads; twice the line she was halfway through was replaced.
- To reach a person she must either spot the floating WhatsApp (which competes with the cookie banner) or open the Contacto megamenú; the human promise is never the page's headline.

## Minor Observations

- Plan tabs: `tabindex` is `0,0,0`; FAQ tablist correctly roves (`0,-1,-1`) — same pattern, two implementations.
- 14 elements under the 24 px target floor: consent checkbox (14×17), footer/nav links at 18 px height, skip link rendered 1×1 until focused.
- No "volver arriba" control on a 14,700 px page.
- Topbar hover states hard-code `#00F0FF` while the token is `#00E5FF`; the status dot uses `#00D6C2` while `--color-live` is `#22E6A8` — visually near-identical, but two sources of truth.
- Detector noise worth ignoring wholesale: `dark-glow` 27, `all-caps-body` 8, `kicker-above-heading` 5, `radial-spotlight-glow` 9, `ai-color-palette` 11, `pulsing-dot` 3, `overused-font`, `codex-grid-background` — every one is mandated by DESIGN.md (glow-as-elevation, Command-Case Rule, kicker signature, atmosphere, live dot, pinned Montserrat/Roboto).
- `low-contrast` 12 = false positives on gradient/image-backed dark chrome; independent computed scan: 0 failures across 373 text nodes on solid backgrounds.
- `/cotizador`, the destination of the hero's primary CTA, carries 15 `tiny-text` and 17 `undersized-ui-text` findings — worth its own pass.
- Strengths re-verified live: single `h1`, sane heading order, all images with `alt`, no horizontal overflow, `noscript` fallback in the form, cookie banner and WhatsApp repositioning coexisting.

## Questions to Consider

- What would happen if the first screen said the one thing nobody can copy — "13 años en Punta Arenas, hablas con quien administra tu hosting" — instead of "aliado digital"?
- Does one page need to carry all 11 sections? What would a three-screen version (offer → proof → contact) convert like?
- If the FAQ questions can't be read in full, is the FAQ earning its space — what if answers were capped at 70 characters per line and questions never truncate?
- Which cyan is the brand: `#00F0FF` or `#00E5FF`? One of them is a bug waiting to be "fixed" in the wrong direction.
