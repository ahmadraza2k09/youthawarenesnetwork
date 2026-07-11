# Premium WordPress-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing 8-component Youth Awareness Network one-page site so it reads as a premium, professionally handcrafted, calm non-profit-organization WordPress-theme-quality site — with zero JS animation — without changing any copy, data, colors, or form submission logic.

**Architecture:** This is a pure presentation-layer change to an existing Vite + React + Tailwind v4 app. Two new design-system pieces (font tokens, a shared `SectionHeader` component) get added first; every content section is then rewritten in place to consume them, drop the `motion/react` library entirely, and rely only on plain CSS `transition`/`:hover`/`:focus` for interactive feedback.

**Tech Stack:** React 18, Tailwind CSS v4 (`@theme inline` tokens), Vite 6. No new npm dependencies — fonts load via Google Fonts CSS API. The `motion` dependency is uninstalled as part of this work since nothing will import it anymore.

## Global Constraints

- Do not change any visible copy, data arrays, or the Formspree endpoint (`https://formspree.io/f/xrejbekg`) used by `JoinSection.tsx` and `ContactSection.tsx`.
- Do not change the existing color palette (`#363636`, `#4a4a4a`, `#2a2a2a`, `#1F2937`, grays).
- Headings/body/UI text use `font-sans` (Poppins). Eyebrow labels and standalone taglines use `font-accent` (Baloo 2, the free substitute for the Canva-exclusive Garet).
- Section containers use `max-w-7xl mx-auto px-6 lg:px-8`; section vertical padding is `py-24 md:py-28`.
- Card/surface radius uses Tailwind's `rounded-xl` consistently; hover feedback is `transition-shadow`/`transition-colors` plus `hover:shadow-md` or a background/border color change — no transform/translate, no JS animation.
- **No `motion/react` import anywhere in `src/` by the end of this plan.** No scroll-triggered reveals, no load/entrance animation, no `repeat: Infinity` loops, no rotation, no gradient-position animation. Content is present as soon as it renders.
- No new npm dependencies.

---

### Task 1: Add Poppins + Baloo 2 fonts and design tokens; remove the `motion` dependency

**Files:**
- Modify: `src/styles/fonts.css`
- Modify: `index.html`
- Modify: `src/styles/theme.css:81-120` (the `@theme inline` block) and `:122-129` (body rule)
- Modify: `package.json` (remove `motion` dependency)

**Interfaces:**
- Produces: Tailwind utility classes `font-sans` (Poppins stack) and `font-accent` (Baloo 2 stack), usable by every later task.

- [ ] **Step 1: Add the Google Fonts import**

Replace the entire contents of `src/styles/fonts.css` (currently empty) with:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Baloo+2:wght@500;600;700;800&display=swap');
```

- [ ] **Step 2: Add font preconnect hints to the HTML head**

In `index.html`, add these two lines directly after the existing `<meta name="viewport" ...>` line (before the `<title>` tag):

```html
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

- [ ] **Step 3: Add font tokens to the Tailwind theme**

In `src/styles/theme.css`, inside the existing `@theme inline { ... }` block, add these two lines (anywhere inside the block, e.g. right after the `--color-sidebar-ring: var(--sidebar-ring);` line):

```css
  --font-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif;
  --font-accent: 'Baloo 2', ui-sans-serif, system-ui, sans-serif;
```

- [ ] **Step 4: Apply the base font to `body`**

In `src/styles/theme.css`, find the existing rule:

```css
  body {
    @apply bg-background text-foreground;
  }
```

and change it to:

```css
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }
```

- [ ] **Step 5: Verify fonts load**

Run: `npm run dev`

Open the printed local URL in a browser, open DevTools → Network → filter "font", reload. Expected: requests to `fonts.gstatic.com` for Poppins and Baloo 2 succeed (status 200), and body text visibly renders in Poppins.

- [ ] **Step 6: Uninstall the now-unused `motion` dependency**

This step only removes the package — do not run it until Tasks 3-11 have removed every `motion/react` import (running it earlier will break `npm run dev`). Once all component tasks are done, run:

```bash
npm uninstall motion
```

Expected: `package.json` and `package-lock.json` no longer list `motion`, and `npm run dev` still starts cleanly (confirms nothing still imports it).

- [ ] **Step 7: Commit fonts (Steps 1-5 only — commit the uninstall separately at the end, see Task 12)**

```bash
git add src/styles/fonts.css index.html src/styles/theme.css
git commit -m "Add Poppins and Baloo 2 font tokens for redesign"
```

---

### Task 2: Create the shared `SectionHeader` component

**Files:**
- Create: `src/app/components/SectionHeader.tsx`

**Interfaces:**
- Produces: `SectionHeader` React component, props `{ eyebrow: string; title: string; subtitle: string }`. Used by Tasks 6-10 (About, Mission, Activities, Join, Contact).

- [ ] **Step 1: Write the component**

Create `src/app/components/SectionHeader.tsx`:

```tsx
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 max-w-2xl mx-auto">
      <span className="font-accent block text-sm font-semibold uppercase tracking-widest text-[#363636] mb-3">
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run dev`

Expected: no TypeScript/Vite errors in the terminal (the component isn't imported anywhere yet, so nothing renders — this step just confirms the file is syntactically valid via Vite's fast-refresh error overlay staying absent).

- [ ] **Step 3: Commit**

```bash
git add src/app/components/SectionHeader.tsx
git commit -m "Add shared SectionHeader component for premium redesign"
```

---

### Task 3: Remove the loading screen and simplify the app shell

**Files:**
- Modify: `src/app/App.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Header`, `HeroSection`, `AboutSection`, `MissionSection`, `ActivitiesSection`, `JoinSection`, `ContactSection`, `Footer` (unchanged import paths; component APIs for `Header`/`HeroSection`/`JoinSection` are unchanged — `activeSection`/`onNavigate`, `onJoinClick`, `onContactClick`).

- [ ] **Step 1: Replace `src/app/App.tsx`**

```tsx
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { JoinSection } from './components/JoinSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'mission', 'activities', 'join', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1F2937] font-sans">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <HeroSection onJoinClick={() => scrollToSection('join')} />
        <AboutSection />
        <MissionSection />
        <ActivitiesSection />
        <JoinSection onContactClick={() => scrollToSection('contact')} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify the loader is gone**

Run: `npm run dev`, open the site in a browser with cache disabled (DevTools → Network → "Disable cache"), hard-reload.

Expected: the full page content appears immediately — no spinner, no fade-in, no "Youth Awareness Network" loading text ever appearing first.

- [ ] **Step 3: Commit**

```bash
git add src/app/App.tsx
git commit -m "Remove loading screen and motion/react from app shell"
```

---

### Task 4: Redesign the Header

**Files:**
- Modify: `src/app/components/Header.tsx` (full rewrite)

**Interfaces:**
- Produces: `Header` component — same props as before, `{ activeSection: string; onNavigate: (section: string) => void }` — so `App.tsx` (Task 3) requires no changes here.

- [ ] **Step 1: Replace `src/app/components/Header.tsx`**

```tsx
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoImage from '../../assets/826164d80fd732187bfaf088c09dae7c138832fd.png';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'mission', label: 'Mission' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`bg-[#363636] text-white sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'shadow-lg py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center gap-6">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-3">
            <img src={logoImage} alt="YAN Logo" className="h-10 w-auto" />
            <span className="font-semibold text-lg tracking-wide hidden sm:inline">
              Youth Awareness Network
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white text-[#363636]'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('join')}
              className="ml-3 px-5 py-2 rounded-lg text-sm font-semibold bg-white text-[#363636] hover:bg-gray-100 transition-colors"
            >
              Join Us
            </button>
          </nav>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 pt-4">
            {[...NAV_ITEMS, { id: 'join', label: 'Join Us' }].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white text-[#363636]'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`. Check: header shows logo + nav links + a visually distinct filled "Join Us" button, present immediately with no fade/slide-in; scrolling past 20px adds a shadow (plain CSS transition, no motion library); the mobile hamburger menu (resize browser < 768px) opens/closes and includes a "Join Us" entry; clicking any nav item scrolls to and highlights that section.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/Header.tsx
git commit -m "Redesign header with distinct CTA button, remove motion/react"
```

---

### Task 5: Redesign the Hero section

**Files:**
- Modify: `src/app/components/HeroSection.tsx` (full rewrite)

**Interfaces:**
- Produces: `HeroSection` component — same props as before, `{ onJoinClick: () => void }` — no changes required in `App.tsx`.

- [ ] **Step 1: Replace `src/app/components/HeroSection.tsx`**

```tsx
import { ArrowRight } from 'lucide-react';
import logoImage from '../../assets/826164d80fd732187bfaf088c09dae7c138832fd.png';

interface HeroSectionProps {
  onJoinClick: () => void;
}

const TRUST_ITEMS = ['Youth-led', 'Free access', 'Global exposure'];

export function HeroSection({ onJoinClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#363636] to-[#4a4a4a] text-white py-28 px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <img src={logoImage} alt="YAN Logo" className="h-28 w-auto mx-auto mb-8" />

        <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
          Youth Awareness Network
        </h1>

        <p className="font-accent text-xl md:text-2xl text-gray-100 mb-6">
          Connecting Youth to Opportunities, Knowledge, and Global Exposure
        </p>

        <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto mb-8">
          We are a youth-led platform committed to providing free access to awareness, guidance, and international opportunities. Our mission is to equip students with the knowledge, exposure, and direction they need to grow beyond limitations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-200 mb-10">
          {TRUST_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/30">·</span>}
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={onJoinClick}
          className="inline-flex items-center gap-2 bg-white text-[#363636] px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-lg"
        >
          Join Our Movement
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`. Check: hero renders with a static logo (no pulsing glow), no moving blur blobs in the background, no entrance animation (content is there on first paint), a "Youth-led · Free access · Global exposure" trust row, and the "Join Our Movement" button scrolls to the Join section when clicked.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/HeroSection.tsx
git commit -m "Redesign hero: remove all animation, add trust row"
```

---

### Task 6: Redesign the About section

**Files:**
- Modify: `src/app/components/AboutSection.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeader` from Task 2 (`src/app/components/SectionHeader.tsx`), props `{ eyebrow, title, subtitle }`.
- Produces: `AboutSection` component, no props (unchanged from before).

- [ ] **Step 1: Replace `src/app/components/AboutSection.tsx`**

```tsx
import { Users, Award, TrendingUp } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const PILLARS = [
  {
    icon: Users,
    title: 'Youth-Led',
    description: 'Driven by young individuals who understand real challenges, ensuring relevant solutions and authentic impact.',
  },
  {
    icon: Award,
    title: 'Action-Oriented',
    description: 'Focused on delivering practical awareness, structured guidance, and real opportunities—not just ideas.',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Focused',
    description: 'Committed to supporting academic, personal, and professional development through continuous learning and exposure.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Who We Are"
          title="About Us"
          subtitle="Discover the story behind our mission to empower and inspire the next generation."
        />

        <div className="bg-gray-50 p-8 md:p-10 rounded-xl border border-gray-200 mb-16 max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg mb-5 leading-relaxed">
            <span className="text-[#363636] font-semibold">Youth Awareness Network (YAN)</span> is a youth-led initiative focused on providing free access to awareness, guidance, and global opportunities for students, especially those with limited resources or direction.
          </p>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            We support young individuals in understanding their academic and career paths, building strong profiles, and connecting with international peers through structured programs and virtual exchanges.
          </p>
          <p className="font-accent text-[#363636] text-2xl font-semibold text-center">
            Lead by Youth to Lead Youth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-8 text-center border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="text-[#1F2937] text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, scroll to the About section. Check: eyebrow "Who We Are" appears above the "About Us" heading (no rotated border boxes), the intro paragraph text is unchanged, the three pillar cards (Youth-Led / Action-Oriented / Growth-Focused) render immediately (no fade-in on scroll) and show only a subtle shadow change on hover — no icon spin, no lift.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/AboutSection.tsx
git commit -m "Redesign About section, remove motion/react"
```

---

### Task 7: Redesign the Mission section

**Files:**
- Modify: `src/app/components/MissionSection.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeader` from Task 2.
- Produces: `MissionSection` component, no props (unchanged).

- [ ] **Step 1: Replace `src/app/components/MissionSection.tsx`**

```tsx
import { BookOpen, Users, Award, Heart } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const MISSIONS = [
  {
    icon: BookOpen,
    title: 'Education & Critical Thinking',
    description: 'Equipping students with clear knowledge, direction, and decision-making skills for academic and career growth.',
  },
  {
    icon: Users,
    title: 'Awareness & Opportunity Access',
    description: 'Bridging information gaps by sharing relevant opportunities, resources, and guidance often inaccessible to many students.',
  },
  {
    icon: Award,
    title: 'Leadership & Global Engagement',
    description: 'Developing confident individuals through collaboration, virtual exchange programs, and international exposure.',
  },
  {
    icon: Heart,
    title: 'Holistic Growth',
    description: 'Supporting academic, personal, and professional development to prepare youth for real-world challenges.',
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="py-24 md:py-28 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Purpose"
          title="Our Mission"
          subtitle="To provide free access to awareness, guidance, and global opportunities, enabling youth to make informed decisions and grow beyond limitations."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {MISSIONS.map((mission) => {
            const Icon = mission.icon;
            return (
              <div
                key={mission.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-5">
                  <div className="bg-[#363636] p-4 rounded-xl flex-shrink-0">
                    <Icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-[#1F2937] text-xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{mission.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Scroll to the Mission section. Check: eyebrow "Our Purpose" above "Our Mission", no decorative rotated border boxes or animated gradient sweep behind the heading, no background blur blobs, four mission cards in a clean 2-column grid, each with a solid icon square, no motion.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/MissionSection.tsx
git commit -m "Redesign Mission section, remove motion/react"
```

---

### Task 8: Redesign the Activities section

**Files:**
- Modify: `src/app/components/ActivitiesSection.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeader` from Task 2.
- Produces: `ActivitiesSection` component, no props (unchanged).

- [ ] **Step 1: Replace `src/app/components/ActivitiesSection.tsx`**

```tsx
import { MessageCircle, BookOpen, Megaphone, Users, Award, TrendingUp } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const ACTIVITIES = [
  {
    icon: MessageCircle,
    title: 'Awareness Sessions',
    description: 'Interactive sessions covering education, careers, and scholarships to provide clear direction and informed decision-making.',
  },
  {
    icon: BookOpen,
    title: 'Guidance & Resources',
    description: 'Curated content and support to help students build strong profiles and access opportunities effectively.',
  },
  {
    icon: Megaphone,
    title: 'Digital Outreach',
    description: 'Strategic online initiatives to share relevant information, opportunities, and student-focused insights.',
  },
  {
    icon: Users,
    title: 'Global Exchange Programs',
    description: 'Virtual programs connecting youth internationally to promote cultural exchange and global perspective.',
  },
  {
    icon: Award,
    title: 'Community Engagement',
    description: 'Encouraging participation in meaningful initiatives and collaborative projects that create real impact.',
  },
  {
    icon: TrendingUp,
    title: 'Continuously Expanding',
    description: 'YAN is continuously expanding, with new initiatives focused on increasing access, reach, and impact.',
  },
];

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-24 md:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="What We Do"
          title="Activities & Initiatives"
          subtitle="Structured programs designed to deliver practical guidance, awareness, and global exposure to students."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ACTIVITIES.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
                <h3 className="text-[#1F2937] text-lg font-bold mb-2 text-center">{activity.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{activity.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-[#363636] text-white rounded-xl p-8 text-center">
          <p className="text-lg">
            <span className="font-accent font-semibold">Note:</span> Our journey is just beginning—more impactful activities will be added as YAN grows and expands its reach!
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Scroll to Activities. Check: six activity cards in a responsive 2/3-column grid rendering immediately, no animated gradient-sweep behind the heading, the dark "Note:" banner at the bottom has no moving radial-gradient background.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/ActivitiesSection.tsx
git commit -m "Redesign Activities section, remove motion/react"
```

---

### Task 9: Redesign the Join section

**Files:**
- Modify: `src/app/components/JoinSection.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeader` from Task 2.
- Produces: `JoinSection` component — same props as before, `{ onContactClick: () => void }`.
- Formspree submission behavior (endpoint, field names, success/reset timing) is preserved byte-for-byte from the original implementation.

- [ ] **Step 1: Replace `src/app/components/JoinSection.tsx`**

```tsx
import { Users, Target, CheckCircle, Lightbulb, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';

interface JoinSectionProps {
  onContactClick: () => void;
}

const JOIN_CARDS = [
  {
    icon: Target,
    title: 'Why Join YAN?',
    items: ['Build leadership skills', 'Create social impact', 'Learn through real activities', 'Network with like-minded youth'],
  },
  {
    icon: Users,
    title: 'Who Can Apply?',
    items: ['Students', 'Young professionals', 'Volunteers passionate about awareness', 'Anyone committed to social change'],
  },
  {
    icon: Lightbulb,
    title: "What You'll Do",
    items: ['Awareness campaigns', 'Research & content writing', 'Community activities', 'Educational workshops'],
  },
];

export function JoinSection({ onContactClick }: JoinSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://formspree.io/f/xrejbekg', {
        method: 'POST',
        body: formDataToSend,
        redirect: 'manual',
      });

      if (response.status === 303 || response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Form submission failed', response.status, response.statusText);
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error('Form submission error', err);
      setIsSubmitted(false);
    }

    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="join" className="py-24 md:py-28 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Get Involved"
          title="Join Us"
          subtitle="If you're a student or young individual eager to learn, grow, and contribute to society, we welcome you to join Youth Awareness Network. Together, we create awareness and drive positive change."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {JOIN_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-5 text-center text-[#1F2937]">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle className="text-[#363636] flex-shrink-0 mt-1" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 md:p-10 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-2">Application Form</h3>
            <p className="text-gray-600">Fill out the form below to join our network</p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#363636] text-white rounded-xl p-10 text-center">
              <div className="flex justify-center mb-4">
                <Heart className="text-white" size={48} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Thank You!</h4>
              <p className="text-lg">We've received your application. We'll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com' },
                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+92 XXX XXXXXXX' },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-700">
                    {field.label} *
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Tell us why you want to join Youth Awareness Network *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors resize-none"
                  placeholder="Tell us about your motivation, skills, and how you'd like to contribute to YAN..."
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#363636] text-white px-10 py-3.5 rounded-lg font-semibold hover:bg-[#4a4a4a] transition-colors"
                >
                  Submit Application
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-2">Have questions before applying?</p>
          <button onClick={onContactClick} className="text-[#363636] font-semibold hover:underline">
            Contact Us Directly →
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in the browser, including the form**

Scroll to Join. Check: three info cards render with the same list content as before, no fade-in; fill out the application form with a test name/email/phone/message and submit — confirm it shows the "Thank You!" confirmation (network tab shows a POST to `formspree.io/f/xrejbekg` returning 303 or 200), and that the form resets after ~3 seconds.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/JoinSection.tsx
git commit -m "Redesign Join section, remove motion/react, preserve Formspree logic"
```

---

### Task 10: Redesign the Contact section

**Files:**
- Modify: `src/app/components/ContactSection.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeader` from Task 2.
- Produces: `ContactSection` component, no props (unchanged).
- Formspree submission behavior preserved byte-for-byte.

- [ ] **Step 1: Replace `src/app/components/ContactSection.tsx`**

```tsx
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: 'Email',
    content: 'youthawarenessnetwork@gmail.com',
    href: 'mailto:youthawarenessnetwork@gmail.com',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    content: '+92 340 5463601',
    href: 'https://wa.me/923405463601',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Pakistan',
    href: null,
  },
];

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);

      const response = await fetch('https://formspree.io/f/xrejbekg', {
        method: 'POST',
        body: formData,
        redirect: 'manual',
      });

      if (response.status === 303 || response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 4000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 4000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Let's Talk"
          title="Contact Us"
          subtitle="Have questions or want to get involved? We're here to connect, collaborate, and create change together."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {CONTACT_METHODS.map((item) => {
            const Icon = item.icon;
            const content = item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-gray-600 hover:text-[#363636] transition-colors break-all"
              >
                {item.content}
              </a>
            ) : (
              <p className="text-gray-600">{item.content}</p>
            );

            return (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 text-center border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-3">{item.title}</h3>
                <div className="text-base">{content}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-xl p-8 md:p-10 max-w-3xl mx-auto border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#363636] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#4a4a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-center text-green-600 font-semibold">
                ✓ Message sent successfully! Thank you for reaching out.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-center text-red-600 font-semibold">
                ✗ Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>

        <div className="bg-[#363636] rounded-xl p-8 md:p-10 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">Ready to Make a Difference?</h3>
          <p className="text-lg mb-6 leading-relaxed text-gray-200">
            Whether you want to join YAN, collaborate on projects, or simply learn more about our mission, we'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:youthawarenessnetwork@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#363636] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Mail size={18} />
              Send Email
            </a>
            <a
              href="https://wa.me/923405463601"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#363636] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in the browser, including the form**

Scroll to Contact. Check: three contact-method cards (Email/WhatsApp/Location) with working links, no fade-in; submit a test message through "Send us a Message" and confirm the green success message appears (network tab shows POST to `formspree.io/f/xrejbekg`); the "Ready to Make a Difference?" banner's Email/WhatsApp buttons open correctly.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/ContactSection.tsx
git commit -m "Redesign Contact section, remove motion/react, preserve Formspree logic"
```

---

### Task 11: Redesign the Footer

**Files:**
- Modify: `src/app/components/Footer.tsx` (full rewrite)

**Interfaces:**
- Produces: `Footer` component, no props (unchanged).

- [ ] **Step 1: Replace `src/app/components/Footer.tsx`**

```tsx
import { Heart, Lightbulb, Mail, MessageCircle, MapPin, Linkedin, Instagram, Facebook, Youtube, Link } from 'lucide-react';
import logoImage from '../../assets/826164d80fd732187bfaf088c09dae7c138832fd.png';

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/youthawarenessnetwork/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/youthawarenessnetwork', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/Youthwarenessnetwork/', label: 'Facebook' },
  { icon: Youtube, href: 'https://www.youtube.com/@youthawarenessnetwork', label: 'YouTube' },
  { icon: Link, href: 'https://linktr.ee/youthawarenessnetwork', label: 'Linktree' },
];

const QUICK_LINKS = ['Home', 'About Us', 'Mission', 'Activities', 'Join Us', 'Contact'];

export function Footer() {
  return (
    <footer className="bg-[#2a2a2a] text-white py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImage} alt="YAN Logo" className="h-11 w-auto" />
              <span className="font-bold text-xl">Youth Awareness Network</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-3">
              Empowering Youth with Knowledge, Skills, and Responsibility
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm italic mb-6">
              <Lightbulb size={18} />
              <p>Building informed minds, transforming societies</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">Connect with us:</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="bg-white/10 p-2.5 rounded-lg border border-white/10 hover:bg-white hover:border-white transition-colors group"
                    >
                      <Icon className="text-white group-hover:text-[#363636] transition-colors" size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              {QUICK_LINKS.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5">Get in Touch</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Mail size={18} className="flex-shrink-0 mt-1" />
                <a href="mailto:youthawarenessnetwork@gmail.com" className="hover:text-white transition-colors break-all">
                  youthawarenessnetwork@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="flex-shrink-0" />
                <a href="https://wa.me/923405463601" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +92 340 5463601
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="flex-shrink-0" />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-white" size={20} />
              <p>We believe informed youth can build a better society</p>
            </div>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="text-red-500" size={16} fill="currentColor" />
              <span>by Youth Awareness Network</span>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            © {new Date().getFullYear()} Youth Awareness Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Scroll to the footer. Check: 3-column layout (logo/tagline/socials, quick links, contact info) renders, social icon buttons are flat with a plain background-color hover (no blurred glow), bottom bar shows the tagline, "Made with ♥", and the current year in the copyright line.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/Footer.tsx
git commit -m "Redesign footer, remove blur-glow decoration"
```

---

### Task 12: Remove the `motion` dependency and do full-site verification

**Files:**
- Modify: `package.json`, `package-lock.json` (via `npm uninstall`)

- [ ] **Step 1: Confirm no `motion/react` imports remain**

Run: `grep -r "motion/react" src/` (or use an editor search across `src/`).

Expected: no matches. If any remain, that component was missed in Tasks 3-11 — fix it before continuing.

- [ ] **Step 2: Uninstall the `motion` package**

```bash
npm uninstall motion
```

Expected: `motion` is removed from `package.json` dependencies and from `package-lock.json`.

- [ ] **Step 3: Production build succeeds**

Run: `npm run build`

Expected: build completes with no TypeScript or Vite errors (this also confirms nothing still references the removed `motion` package).

- [ ] **Step 4: Full visual walkthrough**

Run: `npm run dev`. At both a desktop width (~1440px) and a mobile width (~390px, via DevTools device toolbar), scroll through every section (Home → About → Mission → Activities → Join → Contact → Footer) and confirm:
- Consistent container width, section padding, and card style throughout.
- No animation of any kind runs on its own (watch each section for ~10 seconds — nothing pulses, rotates, drifts, or fades in; only `:hover`/`:focus` states change anything, and only in response to the mouse/keyboard).
- Poppins is the visible font throughout; the "Lead by Youth to Lead Youth" tagline, hero subtitle, and "Note:" label render in the rounder Baloo 2 accent font.
- Header nav highlighting still tracks the section in view while scrolling.
- The overall impression reads as a calm, credible non-profit site, not a flashy product template.

- [ ] **Step 5: Functional smoke test**

Submit a real test entry through both the Join application form and the Contact form (as in Tasks 9 and 10's verification steps) and confirm both still reach Formspree successfully.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "Remove unused motion dependency after animation-free redesign"
```

If Step 4 or 5 surfaced any fixes, stage and commit those separately first with a descriptive message before this final commit.
