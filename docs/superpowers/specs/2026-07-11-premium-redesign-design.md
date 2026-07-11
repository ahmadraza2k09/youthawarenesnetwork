# Premium WordPress-Style Redesign — Design Spec

## Purpose

Redesign the visual presentation of the existing Youth Awareness Network one-page site
so it reads as a professionally handcrafted, premium WordPress-theme-quality site
(in the vein of Astra/Kadence/Blocksy), rather than a generic AI-generated template.

**Content, copy, data, color palette, and Formspree form logic are unchanged.**
This is a visual/structural redesign of the existing 8 components — not a content
or feature rewrite.

## Scope

In scope:
- `Header.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `MissionSection.tsx`,
  `ActivitiesSection.tsx`, `JoinSection.tsx`, `ContactSection.tsx`, `Footer.tsx`
- `App.tsx` (loading screen removal, page shell)
- `src/styles/theme.css`, `src/styles/fonts.css` (typography tokens, spacing/shadow/radius scale)

Out of scope:
- Copy/content changes (all existing text, data arrays, and Formspree endpoints stay identical)
- New pages/routes
- Backend/API changes
- Garet font licensing (substituted with a free look-alike, see Typography below)

## Design System Foundation

**Colors** — unchanged. Primary charcoal `#363636` → `#4a4a4a`, white/gray-50 surfaces,
gray-700 body text, existing destructive/success colors for form feedback.

**Typography**
- Headings + body + UI text: **Poppins** (Google Fonts, self-hosted via `@font-face`
  in `src/styles/fonts.css`, weights 400/500/600/700/800).
- Accent role (eyebrow labels, stat numbers, standalone taglines like "Lead by Youth
  to Lead Youth"): **Baloo 2** (free, rounded-geometric, closest free substitute for
  Canva-exclusive Garet — Garet itself cannot be bundled without a licensed font file).
- Type scale: a modular scale replacing today's ad hoc `text-5xl`/`text-6xl` jumps —
  eyebrow 14px, body 16-18px, h3 24px, h2 32-40px, h1/section-title 48-56px, hero 56-72px.
  Section titles across About/Mission/Activities/Join/Contact drop from `text-5xl md:text-6xl`
  to a single consistent `text-4xl md:text-5xl`.

**Spacing/Grid**
- Container width standardizes on `max-w-7xl` (currently mixed `max-w-6xl`/`max-w-5xl`/`max-w-3xl`/`max-w-2xl`).
- Section vertical padding: `py-24 md:py-28` desktop, collapsing responsively — replacing the
  uniform `py-20` used regardless of section content density.
- 8px base spacing scale applied to gaps, card padding, and margins for consistency.

**Shadows/Radius**
- One radius scale: `--radius: 0.75rem` (12px) base, with sm/md/lg/xl derived tokens
  (already partially defined in `theme.css` — extend, don't replace).
- One shadow scale: subtle/card/elevated (3 tiers), replacing the current mix of
  `shadow-lg`/`shadow-xl`/`shadow-2xl` applied inconsistently per component.

## Section Header Pattern (new shared pattern)

Every section (About, Mission, Activities, Join, Contact) currently wraps its `<h2>` in
animated rotated/nested border boxes with gradient sweeps. Replace with one consistent,
reusable header pattern:

```
[eyebrow label — small, uppercase, tracked, accent-colored]
[h2 — section title]
[one-line subtitle — gray-600, max-w constrained]
```

No decorative borders, no rotating/gradient-animated boxes. This single pattern change
touches all 5 content sections.

## Component-Level Changes

**Header** — Logo left, nav links right, "Join Us" visually distinguished as a filled
CTA button separate from nav links (currently just another nav item). Keep sticky
shrink-on-scroll behavior. Drop the staggered per-item fade-in on initial page load
(runs once, adds no ongoing value, reads as template filler).

**Hero** — Keep dark charcoal background and logo. Remove: the infinite pulsing
glow/drop-shadow filter animation on the logo, the two animated blurred circle
"blob" backgrounds. Keep one clean one-time entrance animation (fade + slide-up).
Add a small trust/stat row styled as a clean inline list (e.g. "Youth-led · Free
access · Global reach") replacing the floating sparkle-icon + bouncing arrow CTA
button treatment. CTA button keeps its function, simplified to a static solid
button with a standard hover state (no shimmer sweep, no infinite arrow bounce).

**Cards** (About pillars, Mission list, Activities grid, Join info cards, Contact
method cards) — One shared card visual style: consistent padding (using the new
spacing scale), one icon-box treatment (solid charcoal rounded square/circle),
hover state limited to a subtle lift + shadow increase (no 360° icon spin, no
gradient-sweep overlay layers, no animated border glow).

**Forms** (Join application, Contact form) — One shared input/textarea/button
style using the new radius/shadow scale. Focus state simplified to a clean
border-color + ring change (drop the animated glow-inset layer). Formspree
submission logic (`fetch` calls, endpoint, success/error state handling)
unchanged.

**Footer** — Keep the existing 3-column widget layout (logo+tagline+social,
quick links, contact info) — this is already the right convention. Tone down
the blur-glow decorative circle and the backdrop-blur social icon buttons to
flat, consistent-radius icon buttons matching the new card icon-box style.

**Loading screen** (`App.tsx`) — Remove the full-page spinning-circle loader
entirely. Page renders immediately; hero content gets one brief fade-in on
mount instead of gating the whole page behind an 800ms artificial delay.

## Motion Principles (applies across all components)

- Scroll-triggered reveals: fade + slide-up, once per element, no stagger
  chains longer than ~4 items.
- Hover states: lift (translateY) + shadow change only — no rotation, no
  infinite loops, no gradient position animation.
- No `repeat: Infinity` animations anywhere except where already justified
  (none currently are — all infinite loops are removed).
- Page load: no artificial delay/spinner gate.

## Testing/Verification

- Visual: run `npm run dev`, walk through every section at desktop and mobile
  widths, confirm consistent spacing/typography/shadows and no leftover
  infinite-loop animations.
- Functional: confirm both forms (Join, Contact) still submit successfully to
  the existing Formspree endpoint and show success/error states correctly.
- No new console errors/warnings; `npm run build` succeeds.
