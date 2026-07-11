# Premium WordPress-Style Redesign — Design Spec

## Purpose

Redesign the visual presentation of the existing Youth Awareness Network one-page site
so it reads as a professionally handcrafted, premium WordPress-theme-quality site
(in the vein of Astra/Kadence/Blocksy), rather than a generic AI-generated template.

**Content, copy, data, color palette, and Formspree form logic are unchanged.**
This is a visual/structural redesign of the existing 8 components — not a content
or feature rewrite.

**Update (per user direction after initial approval):** all animation is removed,
not just tamed. The site must not use the `motion/react` library at all — every
interactive state (hover, focus) uses plain CSS transitions only, matching how a
real WordPress theme behaves (no JS animation on scroll, load, or hover). The
overall feel should read unmistakably as a **non-profit organization** site —
calm, trustworthy, substantive — not a flashy product/startup template.

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
- Removing the unused `motion` npm dependency is in scope as cleanup (see Motion Principles)

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
shrink-on-scroll behavior (plain CSS, no motion library). No fade-in/stagger on
page load — the header is simply present from first paint, as on a real WordPress site.

**Hero** — Keep dark charcoal background and logo. Remove: the infinite pulsing
glow/drop-shadow filter animation on the logo, the two animated blurred circle
"blob" backgrounds, and any entrance animation — content is present immediately
on render. Add a small trust/stat row styled as a clean inline list (e.g. "Youth-led · Free
access · Global reach") replacing the floating sparkle-icon + bouncing arrow CTA
button treatment. CTA button keeps its function, styled as a static solid
button with a plain CSS `:hover` background-color change (no shimmer sweep, no arrow bounce).

**Cards** (About pillars, Mission list, Activities grid, Join info cards, Contact
method cards) — One shared card visual style: consistent padding (using the new
spacing scale), one icon-box treatment (solid charcoal rounded square/circle),
hover state limited to a subtle CSS `transition` on shadow/border (no lift/translate
animation, no 360° icon spin, no gradient-sweep overlay layers, no animated border glow).

**Forms** (Join application, Contact form) — One shared input/textarea/button
style using the new radius/shadow scale. Focus state is a plain CSS
border-color + ring change on `:focus` (drop the JS-driven animated glow-inset
layer). Formspree submission logic (`fetch` calls, endpoint, success/error
state handling) unchanged.

**Footer** — Keep the existing 3-column widget layout (logo+tagline+social,
quick links, contact info) — this is already the right convention. Remove
the blur-glow decorative circle and the backdrop-blur social icon buttons;
replace with flat, consistent-radius icon buttons matching the new card
icon-box style, with a plain CSS hover background-color change.

**Loading screen** (`App.tsx`) — Remove the full-page spinning-circle loader
entirely. Page renders immediately with no fade-in gate — matching how a
real WordPress page loads.

## Motion Principles (applies across all components)

- **No animation library.** The `motion/react` import is removed from every
  component; the now-unused `motion` npm dependency is uninstalled.
- **No scroll-triggered reveals.** Content is present as soon as it renders —
  no fade-in/slide-up-on-scroll anywhere.
- **No entrance/load animation.** Page and section content appears immediately,
  no fade gate.
- **Hover/focus states only, plain CSS.** Buttons, links, cards, and form
  inputs may use ordinary CSS `transition-colors`/`transition-shadow` for
  hover and focus feedback (e.g. `hover:shadow-md`, `hover:bg-[#4a4a4a]`,
  `focus:ring-2`) — this is standard, non-flashy interactive feedback found
  on every professional site, not the kind of animation being removed.
- **Absolutely no**: rotation, infinite loops, gradient-position animation,
  glow/blur pulsing, staggered reveals, or bounce/shimmer effects.

## Testing/Verification

- Visual: run `npm run dev`, walk through every section at desktop and mobile
  widths, confirm consistent spacing/typography/shadows, and confirm no
  `motion/react` import remains anywhere in `src/`.
- Functional: confirm both forms (Join, Contact) still submit successfully to
  the existing Formspree endpoint and show success/error states correctly.
- No new console errors/warnings; `npm run build` succeeds; `npm run dev`
  starts cleanly after `motion` is removed from `package.json`.
