# KLUB-404 — CONCEPT 03 "BLANK PAGE"
# Complete Developer-Ready Design Specification
# Creative Architect: UI/UX Design Lead — klub-404 Studio
# Spec version: 1.0 — 2026-03-14

---

## PREAMBLE — THE DESIGN CONCEPT

"BLANK PAGE" treats the landing page as a working studio wall — a pure white canvas on which construction is happening live. Every section arrives as if drawn, pinned, or taped into place. Orange (#FF4D00) is never decorative; it is always functional — a highlighter, a warning tape, a reference mark. Black (#0D0D0D) is structural: headlines, borders, system text. White (#FFFFFF) is the ground — never background-colored, never gradientd. The page does not load; it assembles.

This spec governs the structural interpretation selected: **"The Argument"** (logic-first, bottom-heavy conversion, full identity statement scrub). All section ordering, CTA copy, and narrative pacing follow Interpretation 01.

---

## PART ONE: GLOBAL DESIGN TOKENS

### 1.1 COLOR TOKENS

```css
:root {
  /* Base palette */
  --color-white:        #FFFFFF;
  --color-black:        #0D0D0D;
  --color-orange:       #FF4D00;

  /* Functional aliases */
  --color-bg:           var(--color-white);
  --color-fg:           var(--color-black);
  --color-accent:       var(--color-orange);

  /* Text hierarchy */
  --color-text-primary:   #0D0D0D;
  --color-text-secondary: #5A5A5A;
  --color-text-muted:     #9A9A9A;
  --color-text-inverse:   #FFFFFF;

  /* Surfaces */
  --color-surface-raised:  #F5F5F5;   /* Pillar card background, subtle panels */
  --color-surface-orange:  #FF4D00;   /* Highlighter block fill */
  --color-surface-black:   #0D0D0D;   /* CTA band, footer fill */

  /* Borders */
  --color-border:       rgba(13, 13, 13, 0.12);
  --color-border-heavy: rgba(13, 13, 13, 0.40);
  --color-border-orange: #FF4D00;

  /* State colors — never red (anxiety); use amber for warnings */
  --color-state-success: #1A7A1A;
  --color-state-error:   #B85C00;    /* muted amber, not red */
  --color-state-loading: #9A9A9A;

  /* Shadows — only used for hub cards and venture cards */
  --shadow-card:  0 2px 16px rgba(13, 13, 13, 0.08);
  --shadow-hover: 0 8px 32px rgba(13, 13, 13, 0.14);

  /* Catenary thread */
  --color-thread: #0D0D0D;
  --color-thread-orange: #FF4D00;
}
```

**Contrast verification (WCAG AA minimum 4.5:1 for body text):**
- `--color-text-primary` (#0D0D0D) on `--color-bg` (#FFFFFF): 19.8:1 — PASS
- `--color-text-secondary` (#5A5A5A) on `--color-bg` (#FFFFFF): 7.0:1 — PASS
- `--color-text-inverse` (#FFFFFF) on `--color-surface-black` (#0D0D0D): 19.8:1 — PASS
- `--color-text-inverse` (#FFFFFF) on `--color-accent` (#FF4D00): 3.0:1 — FAIL for body text. ORANGE IS NOT A TEXT BACKGROUND for body sizes. Orange is used only for highlighter strips behind display text (minimum 32px / bold). Designer note to developer: any orange-background text must be checked at the final rendered size.

---

### 1.2 TYPOGRAPHY SCALE

**Primary typeface:** Neue Montreal (Pangram Pangram Foundry)
**Weights in use:** 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
**Fallback stack:** `'Neue Montreal', 'Helvetica Neue', Arial, sans-serif`

**Loading strategy:** Preload the 500 (Medium) weight WOFF2 for above-the-fold text. Load 300, 400, 700 asynchronously. Subset to Latin + Arabic-adjacent characters for Cairo hub content.

```
TOKEN             SIZE      WEIGHT   LINE-HEIGHT   LETTER-SPACING   USAGE
─────────────────────────────────────────────────────────────────────────
--type-display-xl  96px      700      0.95          -0.04em          Hero headline (desktop)
--type-display-lg  72px      700      0.95          -0.03em          Hero headline (tablet)
--type-display-md  48px      700      1.0           -0.02em          Section display / manifesto accent
--type-display-sm  36px      700      1.05          -0.01em          Hub city names, pillar numbers
--type-heading-lg  28px      500      1.15          -0.01em          Section headings (h2)
--type-heading-md  22px      500      1.2            0               Sub-section headings (h3)
--type-heading-sm  18px      500      1.25           0               Card headings, approach step titles
--type-body-lg     18px      400      1.6            0               Identity statement body, hub description
--type-body-md     16px      400      1.6            0               General body, form labels
--type-body-sm     14px      400      1.5            0.01em          Caption, card metadata, coordinates
--type-label       12px      500      1.3            0.08em          ALL-CAPS labels, filter chips, badges
--type-mono        14px      400      1.4            0               Coordinates display, code elements
```

**Special type treatments:**

- **Manifesto Revision Text** (SOLUTIONS → EXPERIENCES): Rendered at `--type-display-md` (48px). The word being "revised" uses `--color-accent` (#FF4D00) with a horizontal strikethrough that draws across in 300ms then the replacement word slides up from below. Full spec in Section 3.
- **Orange highlighter strips**: Text inside an orange strip uses `--color-text-inverse` (#FFFFFF), weight 700, minimum size `--type-display-sm` (36px). The strip itself is a `<span>` with `background-color: var(--color-orange)` and `padding: 0 8px`.
- **Rotated elements**: Applies `transform: rotate(-1.5deg)` or `rotate(1.5deg)`. Never more than 1.5 degrees. Only applied to display-scale text or decorative graphic elements — never to body copy or interactive elements.
- **Location tag** (Cairo · Amsterdam): Rendered at `--type-label` (12px), 500 weight, letter-spacing 0.12em, `--color-text-muted`.

---

### 1.3 SPACING SYSTEM

**Base unit:** 8px

```
TOKEN           VALUE    USAGE
────────────────────────────────────────────────────────
--space-1        8px     Tight gap — icon-to-label, badge padding
--space-2       16px     Internal card padding (compact)
--space-3       24px     Form field gap, nav item gap
--space-4       32px     Standard component gap
--space-5       48px     Section internal padding (top/bottom of card)
--space-6       64px     Section gap (mobile)
--space-7       80px     Section gap (tablet)
--space-8      120px     Section gap (desktop)
--space-9      160px     Hero internal vertical rhythm
--space-10     240px     Between major page chapters (hub to industries)

--space-nav-height   64px     Desktop nav height (sticky)
--space-nav-mobile   56px     Mobile nav height
--space-page-margin  80px     Left/right page gutters (desktop 1440px)
--space-page-margin-tablet  48px   (tablet 768–1199px)
--space-page-margin-mobile  24px   (mobile < 768px)
```

**Grid system:**
- Desktop: 12 columns, 80px outer gutters, 24px column gaps
- Tablet: 8 columns, 48px outer gutters, 20px column gaps
- Mobile: 4 columns, 24px outer gutters, 16px column gaps

---

### 1.4 EASING TOKENS

```css
:root {
  /* Arrival — spring with overshoot (the "Blank Page" signature) */
  --ease-arrive:   cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Departure — ease-in, decisive */
  --ease-depart:   cubic-bezier(0.55, 0, 1, 0.45);

  /* Editorial reveal — clean deceleration, no drama */
  --ease-editorial: cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* power2.out equivalent */

  /* Elegant — exponential deceleration, unhurried */
  --ease-elegant:   cubic-bezier(0.16, 1, 0.3, 1);          /* expo.out */

  /* Kinetic — back.out equivalent, arrives with authority */
  --ease-kinetic:   cubic-bezier(0.34, 1.2, 0.64, 1);       /* back.out(1.2) */

  /* Scrub — linear only, no easing on scroll-tied motion */
  --ease-scrub:    linear;

  /* Magnetic — responsive tracking */
  --ease-magnetic:  cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* power2.out */
}
```

---

## PART TWO: CURSOR SYSTEM

The cursor is the visitor's presence on the page. In "Blank Page," the cursor behaves differently across sections to reinforce the studio-wall metaphor.

### Default Cursor
- **Type:** Custom SVG circle, 16px diameter, stroke only (1.5px stroke, `--color-black`), no fill
- **CSS:** `cursor: none` on `<html>`. A positioned `<div class="cursor">` follows the mouse via JavaScript `requestAnimationFrame`.
- **Lag:** The cursor follows mouse position with a 0.12 lerp (linear interpolation factor). This gives it a slight magnetic drag — it always catches up but never teleports.
- **Touch devices:** Cursor overlay is not initialized. Native cursor behavior is restored.

### Cursor State Variants

```
CURSOR STATE      TRIGGER                    TRANSFORM
───────────────────────────────────────────────────────────────────────
default           Body, white sections       16px circle, stroke only
hover-link        <a>, nav links             Scale to 32px, fill black 40% opacity, 150ms
hover-cta         Primary CTA buttons        Scale to 48px, fill orange 80%, label "START" appears inside cursor
hover-card        Venture cards, hub cards   Scale to 40px, fill black 60%, 150ms
hover-drag        Filter chips when active   Cursor changes to crosshair + grab icon via CSS
drag-active       Dragging filter on mobile  Closed hand icon
text-cursor       Form inputs                Revert to native I-beam (cursor: text)
```

**Cursor trail (hero section only):**
- 24-point trail, each point is 85% of the opacity of the previous
- Trail particle radius: 3px, filled with `--color-orange`
- Implemented on `<canvas>` overlay inside the hero section boundary
- Trail is clipped to hero section bounds — does not bleed into navigation
- Disabled on touch devices (`pointer: coarse` media query)
- Disabled on `prefers-reduced-motion: reduce`

**GSAP implementation note:**
```javascript
// Cursor tracking
gsap.to('.cursor', {
  x: mouseX,
  y: mouseY,
  duration: 0.12,
  ease: 'power2.out',
  overwrite: true,
})
```

---

## PART THREE: SECTION SPECIFICATIONS

---

### SECTION 01: NAVIGATION BAR

**Block ID:** `lp-nav`
**Animation style:** Editorial
**Narrative weight:** Transitional

#### Layout

```
┌─────────────────────────────────────────────────────────┐
│ [wordmark]          [Work] [Studio] [Hubs] [Contact]  [Start a project ▶] │
└─────────────────────────────────────────────────────────┘
 ← 80px gutter                                    80px gutter →
```

- **Height:** 64px desktop / 56px mobile
- **Position:** `position: fixed; top: 0; left: 0; right: 0; z-index: 1000`
- **Background:** Transparent on load. Transitions to `rgba(255,255,255,0.96)` with `backdrop-filter: blur(12px)` after 80px of scroll.
- **Border:** No border on load. After scroll, `border-bottom: 1px solid var(--color-border)` fades in over 200ms.
- **Wordmark:** SVG, dark variant (#0D0D0D). On scroll-transparent background, remains dark (white background visible). No light/dark inversion needed because the hero is also on white.
- **Nav links:** `--type-label` (12px), 500 weight, letter-spacing 0.08em, `--color-text-primary`. Arranged horizontally, 32px gap between items.
- **CTA button:** `--type-body-sm` (14px), 500 weight. Black background, white text, 0px border-radius (sharp corners — "Blank Page" rejects rounded corners as indecision). Padding: 12px 20px. No border.

#### Animations

```
COMPONENT: Navigation bar
STATE: load-entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 400ms
    easing: var(--ease-editorial)
    trigger: DOMContentLoaded
    delay: 0ms
NOTES: Nav is the first thing visible. It does not compete with the hero — it simply appears, confirming orientation. No transform on entry — it arrives from where it already is.
```

```
COMPONENT: Navigation bar
STATE: scroll-active (after 80px scroll)
ANIMATION:
  - property: background-color
    from: transparent
    to: rgba(255, 255, 255, 0.96)
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: scroll(80px)
  - property: border-bottom opacity
    from: 0
    to: 1
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: scroll(80px)
NOTES: Both transitions fire simultaneously. backdrop-filter: blur(12px) is set in CSS (not animated — animating filter is expensive). Reverses on scroll-up past 80px.
```

```
COMPONENT: Nav link
STATE: hover
ANIMATION:
  - property: ::after pseudo (underline)
    from: scaleX(0)
    to: scaleX(1)
    duration: 200ms
    easing: linear
    trigger: mouseenter
    transform-origin: left center
  reversal: scaleX(0) over 150ms, easing: linear, transform-origin: right center
NOTES: The underline slides IN from left on hover, slides OUT from right on leave. Direction change reinforces the editorial feel — it is not a toggle, it is a draw/erase.
```

```
COMPONENT: Nav CTA button
STATE: hover
ANIMATION:
  - property: background-color
    from: var(--color-black)
    to: var(--color-orange)
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: mouseenter
  - property: color (text)
    from: var(--color-text-inverse)
    to: var(--color-text-inverse)
    duration: 0ms  [no change — white text on both black and orange]
NOTES: Bg swaps to orange. No scale. The CTA button does not bounce — it confirms.
```

#### Mobile Navigation (< 768px)

- Hamburger icon (Lottie: hamburger-to-X, 24px) replaces the link row
- On tap: full-screen overlay slides down from top, `--color-black` background, white links at `--type-display-sm` (36px)
- Links stagger in with 80ms delay each, `translateY(24px) → translateY(0)`, 400ms, `var(--ease-arrive)`
- Close: overlay slides up, 350ms, `var(--ease-depart)`
- The CTA button is the last element in the mobile menu, rendered in orange

**Asset requirements (from Multimedia Producer):**
- `wordmark.svg` — dark variant (primary use)
- `wordmark-white.svg` — light variant (mobile menu overlay only)
- `hamburger-x.lottie` — 24px, frame 0 = hamburger, frame 30 = X, reversible

---

### SECTION 02: HERO

**Block ID:** `lp-hero`
**Animation style:** Immersive
**Narrative weight:** Anchor

#### Layout

```
┌──────────────────────────────────────────────────── 100vw ────┐
│                                                               │
│  [Cairo · Amsterdam]                                          │
│                                                               │
│  We build what                                                │
│  didn't exist yet.         ← 96px / weight 700 / -1.5° rot. │
│                                                               │
│  [A venture studio for AI-driven solutions —                  │
│   between Cairo and Amsterdam, across the EMEA region.]       │
│                                                               │
│                                                               │
│  [Start a project ▶]   [See the work →]                      │
│                                                               │
│                           [↓ scroll cue — Lottie]            │
│                                                               │
└────────────────────────────────────────────────────────────── 100vh ──┘
```

- **Height:** 100vh, minimum 640px
- **Background:** Pure white (#FFFFFF). No video on "The Argument" structure. The cursor trail canvas sits as a transparent overlay.
- **Headline:** `--type-display-xl` (96px desktop / 72px tablet / 48px mobile), weight 700, `--color-black`, `transform: rotate(-1.5deg)`. The rotation is applied to the entire headline block as one element — not per-line.
- **Orange accent:** The word "exist" is wrapped in an orange highlighter strip: `<span class="highlight">exist</span>`. The strip is `background: var(--color-orange); padding: 0 6px; color: #FFFFFF`. The strip is part of the initial layout — it does not animate in separately.
- **Location tag:** Above the headline, `--type-label` (12px), letter-spacing 0.12em, `--color-text-muted`. `transform: rotate(1.5deg)` (counter-rotation to headline).
- **Subheadline:** `--type-body-lg` (18px), weight 400, `--color-text-secondary`, max-width: 560px, margin-top: 32px
- **CTA pair:** Horizontal, gap 24px, margin-top 48px
  - Primary: Black button, white text — same as nav CTA
  - Secondary: No background, black text, right-arrow Unicode character (→), underline on hover
- **Scroll cue:** Bottom-right, 40px from bottom, opacity 0 on load, fades to 1 after 3000ms dwell. Lottie animation: slow bounce arrow. Disappears on first scroll event.

#### Entry Sequence (fires at DOMContentLoaded, after nav at 0ms)

```
COMPONENT: Hero — location tag
STATE: entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 400ms
    easing: var(--ease-editorial)
    trigger: DOMContentLoaded
    delay: 200ms
  - property: transform (translateY)
    from: translateY(8px)
    to: translateY(0) rotate(1.5deg)  [rotation is fixed, not animated]
    duration: 400ms
    easing: var(--ease-editorial)
    delay: 200ms
NOTES: The rotation value stays constant — it is a design property, not an animation end state.
```

```
COMPONENT: Hero — headline
STATE: entry
ANIMATION:
  - property: clip-path
    from: inset(0 100% 0 0)
    to: inset(0 0% 0 0)
    duration: 1100ms
    easing: var(--ease-elegant)    [cubic-bezier(0.16, 1, 0.3, 1)]
    trigger: DOMContentLoaded
    delay: 400ms
NOTES: The headline wipes IN from left to right as a single block. The orange highlighter strip on "exist" is part of the headline element and is revealed by the same clip-path. No stagger per word — this is a single cinematic draw. Rotation (-1.5deg) is a static CSS property on the element, not part of the animation.
```

```
COMPONENT: Hero — subheadline
STATE: entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 800ms
    easing: var(--ease-editorial)
    trigger: DOMContentLoaded
    delay: 900ms
  - property: transform (translateY)
    from: translateY(16px)
    to: translateY(0)
    duration: 800ms
    easing: var(--ease-editorial)
    delay: 900ms
NOTES: Fades up after the headline has established. The two animations run on the same element simultaneously.
```

```
COMPONENT: Hero — CTA pair
STATE: entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 600ms
    easing: var(--ease-editorial)
    trigger: DOMContentLoaded
    delay: [Primary: 1200ms / Secondary: 1350ms]
NOTES: Each CTA fades in separately with 150ms stagger. No transform — they arrive from where they are. No overshoot on the hero CTAs; the headline already provided the spring.
```

```
COMPONENT: Hero — scroll cue
STATE: entry (delayed)
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 400ms
    easing: var(--ease-editorial)
    trigger: setTimeout(3000ms after DOMContentLoaded)
    condition: user has not scrolled
NOTES: If the user scrolls before 3s, the scroll cue never appears. Once visible, it disappears on first scroll event (opacity → 0, 200ms).
```

#### Hover Behavior (cursor trail)

```
COMPONENT: Hero — cursor trail canvas
STATE: mouse active inside hero bounds
ANIMATION:
  - implementation: Canvas 2D API, requestAnimationFrame loop
  - trail length: 24 points
  - point radius: 3px
  - point color: var(--color-orange) at opacity (index/24 * 0.7)
  - tail-off: each point inherits 85% of previous point's position
  - cap: 60fps via requestAnimationFrame
  - bounds: clipped to hero section clientRect
NOTES: Canvas is positioned absolute, pointer-events: none. Disabled on touch (pointer: coarse). Disabled on prefers-reduced-motion.
```

#### Scroll-Exit Behavior

```
COMPONENT: Hero — entire section
STATE: scroll-exit
ANIMATION:
  - property: opacity
    from: 1
    to: 0
    duration: [scroll-scrubbed — no fixed duration]
    easing: var(--ease-scrub) [linear]
    trigger: ScrollTrigger scrub
    start: "80% top"   [when 80% of hero has scrolled past the top]
    end: "100% top"
  - property: transform (scale)
    from: scale(1)
    to: scale(0.96)
    duration: [scroll-scrubbed]
    easing: var(--ease-scrub)
    start: "80% top"
    end: "100% top"
NOTES: The hero does not slide — it fades and slightly contracts as the visitor scrolls away. This creates a cinematic "leaving" sensation rather than content being pushed up. The headline scrub is separate:

HEADLINE SCRUB (separate ScrollTrigger):
  - property: transform (scale) + opacity
  - from: scale(1) opacity(1)
  - to: scale(0.92) opacity(0)
  - start: "top top"
  - end: "50% top"
  - scrub: true (tied to scroll position)
```

#### Mobile Adaptations
- Headline: `--type-display-lg` (72px) on tablet, `--type-display-md` (48px) on mobile
- Rotation on headline reduced to: `rotate(-0.8deg)` on mobile (1.5° is too dramatic at small size)
- Cursor trail: disabled
- CTA pair stacks vertically, gap 16px
- Scroll cue: centered, bottom 24px

**Asset requirements:**
- `scroll-cue.lottie` — bouncing arrow, 40×40px, looping, neutral colors
- Canvas implementation for cursor trail (no asset — code-only)

---

### SECTION 03: MANIFESTO / IDENTITY STATEMENT

**Block ID:** `lp-identity`
**Animation style:** Editorial
**Narrative weight:** Heavy (The Argument)

#### Layout

```
┌─────────────────────── 12-col grid ──────────────────────────┐
│                                                               │
│  col 1–2: [section label: "Studio"]     col 3–12: [body]    │
│                                                               │
│  Section label:                                               │
│  STUDIO                ← --type-label, 12px, letter-sp 0.08em │
│  rotated +1.5deg                                              │
│                                                               │
│  Body text:                                                   │
│  klub-404 exists in the space between                         │
│  an agency and an incubator...                                │
│       ← --type-body-lg, 18px, line-height 1.6, max-w 640px   │
│                                                               │
│                                                               │
│  ┌───────────────────────────────────┐                        │
│  │ Neither. Both.                    │  ← orange highlight    │
│  └───────────────────────────────────┘  strip, display-md    │
│                                         transform: rotate(-1.5deg) │
│                                                               │
│  [SOLUTIONS ~~strikethrough~~ → EXPERIENCES]                 │
│       ← The Revision Type interaction                         │
└───────────────────────────────────────────────────────────── ┘
```

- **Section padding:** `--space-10` (240px) top, `--space-8` (120px) bottom
- **Body text:** Columns 3–12 (desktop), left-aligned. The text block has a max-width of 640px.
- **"Neither. Both." accent:** Rendered inside an orange rectangle. Typography: `--type-display-md` (48px), weight 700, white text, `transform: rotate(-1.5deg)`. The rectangle is sized by content with padding: `8px 16px`. It sits below the body text with a margin-top of 64px.
- **Section label:** "STUDIO" in the left column. `--type-label` (12px), all-caps, letter-spacing 0.08em, `--color-text-muted`. `transform: rotate(1.5deg)`, positioned at top of the body text baseline.

#### Scroll-Scrub Body Reveal

```
COMPONENT: Identity statement — body text
STATE: scroll-reveal
ANIMATION:
  - technique: Line-by-line clip-path reveal, scroll-scrubbed
  - each line wrapped in a <div class="reveal-line"> with overflow: hidden
  - inner <span> animated:
    property: transform (translateY)
    from: translateY(100%)  [hidden below clip boundary]
    to: translateY(0)
    duration: [scroll-scrubbed per line]
    easing: var(--ease-scrub)
    trigger: ScrollTrigger per line, start: "top 85%", end: "top 50%"
    scrub: 1.5  [1.5 = smoothed scrub, not direct 1:1]
  - stagger: Each line's ScrollTrigger start offset by 60px of scroll depth
NOTES: The 1.5 scrub value adds momentum — the text does not stop the instant the visitor stops scrolling. It settles. The 60px per-line stagger means each line activates 60px of additional scroll after the previous. For a 5-line paragraph, the total reveal range is approximately 300px of scroll. This forces a reading pace.

Mobile: Reduce to viewport-entry trigger only (no scroll scrub). Each line fades up with translateY(16px → 0), 600ms, stagger 80ms. Scroll scrub on mobile is friction, not delight.
```

```
COMPONENT: Identity accent "Neither. Both."
STATE: viewport-entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 600ms
    easing: var(--ease-editorial)
    trigger: viewport (when 80% of section is visible)
    delay: 400ms  [after body text has begun revealing]
  - property: transform
    from: translateY(24px) rotate(-1.5deg)
    to: translateY(0) rotate(-1.5deg)  [rotation is the resting state]
    duration: 600ms
    easing: var(--ease-arrive)  [spring — the accent bounces in slightly]
    delay: 400ms
NOTES: This is the one place in the manifesto section where the arrival easing (spring with overshoot) fires. It gives the accent phrase a slightly more alive quality than the scrub-revealed body. The overshoot is subtle — approximately 4px past final position before settling.
```

#### The Revision Type Interaction

**Concept:** The word "SOLUTIONS" is displayed as if written on the studio wall. The user's focus on it — via scroll completion of the identity block — triggers a "revision": a hand draws a strikethrough, the word fades, "EXPERIENCES" rises up to replace it. This is the signature micro-interaction of the section.

**Layout positioning:** Full-width typographic element below the accent strip. 80px margin-top. Text is centered on the column.

**Typographic treatment:**
- Word: `--type-display-md` (48px), weight 700, uppercase, `--color-black`
- Arrow (→): same size, `--color-orange`, between the two words
- Both words are positioned absolutely within a container so EXPERIENCES can appear behind SOLUTIONS and reveal upward

```
COMPONENT: Revision Type — "SOLUTIONS"
STATE: initial (before trigger)
PROPERTIES:
  - opacity: 1
  - transform: translateY(0)
  - text-decoration: none (no strikethrough yet)

STATE: strikethrough-draw
TRIGGER: ScrollTrigger — fires when visitor has fully scrolled through identity body (i.e., the identity section's ScrollTrigger end point is reached)
ANIMATION SEQUENCE:
  Step 1 — Strikethrough line draws left to right:
    - element: ::after pseudo with width: 0, height: 2px, background: var(--color-black), top: 50%
    - property: width
      from: 0%
      to: 100%
      duration: 300ms
      easing: var(--ease-editorial)
      delay: 0ms

  Step 2 — SOLUTIONS fades and shifts up:
    - property: opacity
      from: 1
      to: 0
      duration: 200ms
      easing: var(--ease-depart)
      delay: 350ms  [50ms after strikethrough completes]
    - property: transform (translateY)
      from: translateY(0)
      to: translateY(-20px)
      duration: 200ms
      easing: var(--ease-depart)
      delay: 350ms

  Step 3 — EXPERIENCES rises from below:
    - property: opacity
      from: 0
      to: 1
      duration: 400ms
      easing: var(--ease-arrive)  [spring overshoot]
      delay: 500ms
    - property: transform (translateY)
      from: translateY(32px)
      to: translateY(0)
      duration: 400ms
      easing: var(--ease-arrive)
      delay: 500ms
    - color of EXPERIENCES: var(--color-orange)  [static — does not animate]

  Step 4 — Arrow (→) changes color:
    - property: color
      from: var(--color-black)
      to: var(--color-orange)
      duration: 300ms
      easing: var(--ease-editorial)
      delay: 600ms

NOTES:
- This sequence fires ONCE. Not looping.
- On revisit (scroll back up past trigger): EXPERIENCES remains visible. The revision is permanent — the page has "learned" to say experiences.
- Hover on EXPERIENCES after reveal: subtle underline appears (150ms, linear). No other interaction.
- Mobile: The sequence fires on viewport entry of the revision element (no scroll trigger dependency on the body text scrub). Same timing.
- prefers-reduced-motion: The strikethrough draws instantly (0ms), SOLUTIONS disappears instantly, EXPERIENCES appears instantly. No delays, no transforms. Only opacity transitions remain (200ms).

ASSET: The arrow "→" is a Unicode character, not an SVG. This avoids an asset dependency.
DEVELOPER NOTE: SOLUTIONS and EXPERIENCES must be in the same stacking context with identical top/left positioning. Use position: absolute for EXPERIENCES within a position: relative container that holds both.
```

**Hover state on completed Revision Type:**
- Hovering over the EXPERIENCES word: `--color-orange` underline draws in from left (200ms, linear)
- No scale, no movement
- Tooltip not needed

#### Mobile Adaptations
- Body text scroll scrub is removed; replaced with viewport-entry stagger reveals
- Accent strip remains rotated at -0.8deg (reduced from -1.5deg)
- Revision Type fires on section viewport-entry at 80% visibility

**Asset requirements:**
- No external assets. All typography + CSS pseudo elements.

---

### SECTION 04: THREE PILLARS

**Block IDs:** `lp-pillar-identity`, `lp-pillar-reach`, `lp-pillar-focus`
**Animation style:** Editorial
**Narrative weight:** Heavy

#### Layout

```
┌──────────────────────────── 12-col grid ─────────────────────────────┐
│                                                                       │
│  [Section label: "What we are"]    ← col 1–2, --type-label           │
│                                                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐      │
│  │  01             │  │  02             │  │  03             │      │
│  │  IDENTITY       │  │  REACH          │  │  FOCUS          │      │
│  │                 │  │                 │  │                 │      │
│  │  A hybrid       │  │  Operating      │  │  Building       │      │
│  │  between a      │  │  across EMEA    │  │  experiences    │      │
│  │  small agency   │  │  via our Cairo  │  │  that solve a   │      │
│  │  and a startup  │  │  and Amsterdam  │  │  problem.       │      │
│  │  incubator.     │  │  hubs.          │  │  Not experiences│      │
│  │                 │  │                 │  │  for their own  │      │
│  │  Not purely     │  │  Two cities,    │  │  sake.          │      │
│  │  either.        │  │  one region.    │  │                 │      │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘      │
│    col 1–4              col 5–8               col 9–12                │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Each pillar card:** White background, 1px border `var(--color-border)`. No border-radius. Padding: 40px (desktop), 32px (tablet), 24px (mobile). Height: auto (content-driven).
- **Pillar number:** `--type-display-sm` (36px), weight 700, `--color-orange`. Positioned top-left of card. This is the only recurring use of orange for a number — it is intentional. The number marks the pillar like a construction reference.
- **Pillar label:** `--type-label` (12px), weight 500, letter-spacing 0.08em, `--color-text-muted`. Sits below the number.
- **Pillar body:** `--type-body-md` (16px), weight 400, `--color-text-primary`, line-height 1.6. The body text is the full copy from microcopy.ts with no truncation.
- **Divider line:** A thin horizontal rule (1px, `--color-border`) between label and body, 16px margin on each side.
- **Section label "What we are":** Same treatment as identity section — `--type-label`, rotated +1.5deg, left column.

#### Animations

```
COMPONENT: Pillar 01 — Identity
STATE: viewport-entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 600ms
    easing: var(--ease-editorial)
    trigger: viewport entry (top of card at 85% of viewport height)
    delay: 0ms
  - property: transform (translateY)
    from: translateY(32px)
    to: translateY(0)
    duration: 600ms
    easing: var(--ease-editorial)
    delay: 0ms
NOTES: No overshoot on pillars. The editorial style is deliberate — the pillars are considered positions, not energetic claims.
```

```
COMPONENT: Pillar 02 — Reach
STATE: viewport-entry
ANIMATION: [identical to Pillar 01]
    delay: 120ms  [120ms stagger from Pillar 01]
```

```
COMPONENT: Pillar 03 — Focus
STATE: viewport-entry
ANIMATION: [identical to Pillar 01]
    delay: 240ms  [240ms stagger from Pillar 01]
```

```
COMPONENT: Any pillar card
STATE: hover
ANIMATION:
  - property: border-color
    from: var(--color-border)  [rgba(13,13,13,0.12)]
    to: var(--color-border-heavy)  [rgba(13,13,13,0.40)]
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: mouseenter
  - property: box-shadow
    from: none
    to: var(--shadow-card)  [0 2px 16px rgba(13,13,13,0.08)]
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: mouseenter
  reversal: Both reverse to initial values on mouseleave, 150ms
NOTES: No scale. No background color change. The border illumination says "I acknowledge your presence" without performing.
```

**Pillar number hover:**
- On card hover, the pillar number (`--color-orange`) applies `transform: translateY(-2px)` over 200ms, `var(--ease-arrive)`. A 2px lift, nothing more. Reverses on leave.

#### Mobile Adaptations
- Three pillars stack vertically (single column)
- Each card full-width
- Stagger becomes 80ms (compressed from 120ms — less stagger needed when items are not side-by-side)

**Asset requirements:** None — pure CSS/type.

---

### SECTION 05: STATS / NUMBERS

**Block ID:** `lp-stats`
**Animation style:** Kinetic
**Narrative weight:** Medium

#### Layout

```
┌──────────────────────────── 12-col grid ─────────────────────────────┐
│                                                                       │
│   2              3              EMEA            [reserve]             │
│   Hubs           Industries     Region          Ventures              │
│                                                                       │
│   col 1–3        col 4–6        col 7–9         col 10–12             │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Section padding:** `--space-7` (80px) top and bottom
- **Background:** White. A thin 1px border-top (`--color-border`) marks the section boundary.
- **Stat value:** `--type-display-md` (48px), weight 700, `--color-black`. The countUp animation updates this value.
- **Stat label:** `--type-label` (12px), weight 500, letter-spacing 0.08em, `--color-text-muted`. Below the value, margin-top: 8px.
- **Dividers between stats:** 1px vertical lines, `--color-border`, full height of the stat block.
- **"EMEA" stat:** EMEA is text, not a number. It does not use countUp. It uses a clip-path reveal instead: `inset(0 100% 0 0) → inset(0 0% 0 0)` over 600ms.

#### Animations

```
COMPONENT: Stat values (numeric — Hubs, Industries)
STATE: viewport-entry
ANIMATION:
  - property: text content (countUp)
    from: 0
    to: [target value]
    duration: 1200ms
    easing: power2.out  [GSAP snap plugin or CountUp.js]
    trigger: viewport entry (section top at 75% viewport)
    delay: [Hubs: 0ms / Industries: 150ms stagger]
NOTES: countUp fires once. If the section scrolls out and back in, it does not re-fire. Implement via IntersectionObserver with once: true. For the numeric values "2" and "3", the countUp is very fast at these small numbers — consider whether the animation is perceptible. If not, default to a simple fade-in of the final number.
```

```
COMPONENT: Stat — EMEA (text value)
STATE: viewport-entry
ANIMATION:
  - property: clip-path
    from: inset(0 100% 0 0)
    to: inset(0 0% 0 0)
    duration: 600ms
    easing: var(--ease-editorial)
    trigger: viewport entry
    delay: 300ms
```

```
COMPONENT: Stat labels
STATE: viewport-entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 400ms
    easing: var(--ease-editorial)
    trigger: viewport entry
    delay: [value animation duration + 100ms]  [labels appear after values]
NOTES: Labels trail the values so the visitor reads the number first, then the label. The label answering "what does this number mean?" is the micro-narrative.
```

#### Mobile Adaptations
- 2×2 grid (Hubs + Industries in row 1, EMEA + Reserve in row 2)
- Vertical dividers become horizontal rules above each row

**Asset requirements:** None.

---

### SECTION 06: HUB CARDS — CAIRO AND AMSTERDAM

**Block IDs:** `lp-hub-cairo`, `lp-hub-amsterdam`
**Animation style:** Elegant
**Narrative weight:** Medium

#### Layout

```
┌──────────────────────────── 12-col grid ─────────────────────────────┐
│                                                                       │
│  [Section label: "Hubs" — rotated 1.5deg, col 1]                    │
│                                                                       │
│  ┌────────────────────────────┐   ┌────────────────────────────┐     │
│  │                            │   │                            │     │
│  │   [Cairo photography]      │   │   [Amsterdam photography]  │     │
│  │   parallax background      │   │   parallax background      │     │
│  │                            │   │                            │     │
│  │   30.0444° N, 31.2357° E   │   │   52.3676° N, 4.9041° E   │     │
│  │   ← --type-mono, muted     │   │   ← --type-mono, muted     │     │
│  │                            │   │                            │     │
│  │   CAIRO                    │   │   AMSTERDAM                │     │
│  │   ← --type-display-sm      │   │   ← --type-display-sm      │     │
│  │     weight 700             │   │     weight 700             │     │
│  │     white                  │   │     white                  │     │
│  │                            │   │                            │     │
│  │   Egypt, North Africa      │   │   Netherlands, W. Europe   │     │
│  │   ← --type-label, white    │   │   ← --type-label, white    │     │
│  │                            │   │                            │     │
│  │   Our founding hub —       │   │   Our European arm —       │     │
│  │   where the studio was     │   │   positioned at the        │     │
│  │   built...                 │   │   intersection of...       │     │
│  │   ← --type-body-sm, white  │   │   ← --type-body-sm, white  │     │
│  │                            │   │                            │     │
│  │   [●  ]                    │   │   [●  ]                    │     │
│  │   ← compass arrow (SVG)    │   │   ← compass arrow (SVG)    │     │
│  └────────────────────────────┘   └────────────────────────────┘     │
│    col 1–6                          col 7–12                          │
│                                                                       │
│  [Catenary thread SVG — drawn between the two cards]                  │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Card height:** 560px desktop, 440px tablet, auto (min 380px) mobile
- **Card background:** Full-bleed photography behind a dark overlay gradient (`linear-gradient(to top, rgba(13,13,13,0.80) 0%, rgba(13,13,13,0.20) 60%, transparent 100%)`)
- **Card content:** Positioned absolutely over the image. All text is white.
- **Coordinates:** `--type-mono` (14px), `--color-text-inverse` at 60% opacity. Top-left of card, 24px padding.
- **City name:** `--type-display-sm` (36px), weight 700, white. Bottom section of card.
- **Region:** `--type-label` (12px), white, letter-spacing 0.08em. Below city name.
- **Description:** `--type-body-sm` (14px), white, line-height 1.5. Below region, max-width 320px.
- **Card gap:** 24px (column gap from grid)

#### Compass Direction Arrivals (Signature)

The Cairo card arrives from the **south-east** — physically sliding in from the lower-right as it enters the viewport. The Amsterdam card arrives from the **north-west** — sliding in from the upper-left. These directions reference the actual geographic relationship between Cairo (south-east of Amsterdam).

```
COMPONENT: Hub card — Cairo
STATE: viewport-entry
ANIMATION:
  - property: transform
    from: translateX(40px) translateY(24px)  [south-east origin]
    to: translateX(0) translateY(0)
    duration: 700ms
    easing: var(--ease-elegant)  [cubic-bezier(0.16, 1, 0.3, 1)]
    trigger: viewport entry (card top at 80% viewport)
    delay: 0ms
  - property: opacity
    from: 0
    to: 1
    duration: 500ms
    easing: var(--ease-editorial)
    delay: 0ms
NOTES: The south-east arrival (positive X + positive Y) reinforces Cairo's geographic position. The translation values are modest (40px horizontal, 24px vertical) — the directional metaphor is perceptible without being literal.
```

```
COMPONENT: Hub card — Amsterdam
STATE: viewport-entry
ANIMATION:
  - property: transform
    from: translateX(-40px) translateY(-24px)  [north-west origin]
    to: translateX(0) translateY(0)
    duration: 700ms
    easing: var(--ease-elegant)
    trigger: viewport entry
    delay: 150ms  [150ms stagger — Cairo settles, then Amsterdam arrives]
  - property: opacity
    from: 0
    to: 1
    duration: 500ms
    easing: var(--ease-editorial)
    delay: 150ms
NOTES: North-west arrival (negative X + negative Y). The 150ms stagger means the visitor processes Cairo's presence before Amsterdam arrives. Two distinct cities — not one simultaneous event.
```

#### Parallax Background

```
COMPONENT: Hub card — background image
STATE: scroll
ANIMATION:
  - property: transform (translateY on background image element)
    from: translateY(-10%)  [image starts 10% above card bounds]
    to: translateY(10%)     [image ends 10% below card bounds — 20% travel total]
    duration: [scroll-scrubbed — linear]
    easing: var(--ease-scrub)
    trigger: ScrollTrigger scrub (tied to card's scroll progress)
    scrub: 1.5
NOTES: The image is sized 120% of the card height to allow parallax travel without revealing empty space. Background-position: center center. The parallax speed is 0.6x scroll speed — for every 100px of scroll, the background moves 60px (creating a 40px apparent motion of the city behind the card text). Both Cairo and Amsterdam use identical parallax parameters.
```

#### Hover Behavior

```
COMPONENT: Hub card — image zoom
STATE: hover
ANIMATION:
  - property: transform (scale on background image element)
    from: scale(1.0)  [or current parallax transform — compose carefully]
    to: scale(1.05)
    duration: 600ms
    easing: var(--ease-elegant)
    trigger: mouseenter
  reversal: scale(1.0), 600ms, var(--ease-elegant), on mouseleave
NOTES: The zoom is on the image element inside the card (overflow: hidden on card). The card container does not scale — only the photograph scales inside it. This creates the impression of the city "leaning in." The 600ms duration is slow by design (elegant style).
```

```
COMPONENT: Hub card — compass arrow
STATE: hover
ANIMATION:
  - element: SVG compass arrow positioned bottom-right of card content
  - property: transform (rotate)
    Cairo: from: rotate(135deg) [pointing south-east]  to: rotate(135deg)  [no change on hover]
    Amsterdam: from: rotate(315deg) [pointing north-west]  to: rotate(315deg)  [no change on hover]
  - property: opacity
    from: 0.5
    to: 1.0
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: mouseenter
NOTES: The compass arrow is a static directional indicator — it does not rotate on hover. It simply becomes more visible. The rotation values are the city's geographic bearing FROM the center of Europe (approximated). Cairo is roughly 135° (south-east), Amsterdam is roughly 315° (north-west) — though since they are paired on the page, the metaphor is Cairo pointing toward its arrival direction.
```

#### Catenary Thread SVG

The catenary thread is an SVG `<path>` element rendered as an absolutely positioned overlay spanning the gap between the two hub cards. It represents the connection between the two hubs — a physical thread, like a studio pinboard.

```
COMPONENT: Catenary thread
STATE: entry (fires after both hub cards are visible)
ANIMATION:
  - element: SVG <path> with stroke-dasharray and stroke-dashoffset technique
  - property: stroke-dashoffset
    from: [full path length]
    to: 0
    duration: 1200ms
    easing: var(--ease-elegant)
    trigger: both hub cards have completed their entry animations (1000ms after card entry)
  - stroke color: var(--color-thread)  [#0D0D0D]
  - stroke width: 1px
  - fill: none
  - stroke-linecap: round

NOTES on path shape:
The catenary curve is a mathematical catenary (hyperbolic cosine), not a simple bezier. Its lowest point sags approximately 40px below the horizontal midpoint between the two card centers. Approximate SVG path for a 640px horizontal span:
  M 0,0 Q 320,80 640,0
This is a simplified approximation — for accurate catenary, compute:
  y = a * cosh(x/a) where a determines the sag depth.
The designer calls for sag of 40px at midpoint across a 640px span.

The path is positioned absolutely within the hub section container, centered horizontally, at the vertical midpoint of the card gap. Z-index: above the cards' overflow but below the card content (use layered z-index carefully).

CATENARY HOVER STATE:
When either hub card is hovered, the thread color changes to var(--color-thread-orange) [#FF4D00] over 300ms, var(--ease-editorial). Returns to black on both cards' mouseleave. This creates a visual connection moment — the thread "activates" when either city is acknowledged.
```

**Catenary asset:** The SVG container element is code-generated (no asset file needed). The developer computes the path `d` attribute from the hub card layout dimensions. The SVG must be re-computed on window resize (debounced at 200ms).

#### Mobile Adaptations
- Hub cards stack vertically (single column)
- Cairo above Amsterdam (geographic narrative preserved)
- Compass arrivals simplified: Cairo fades in from bottom (translateY 32px → 0), Amsterdam from top (translateY -32px → 0). The diagonal directional metaphor is too subtle on a narrow viewport.
- Catenary thread is hidden on mobile (display: none). The thread requires side-by-side layout to be legible.
- Parallax remains active on mobile (but reduced to 0.3x scroll speed for performance)

**Asset requirements:**
- `cairo-hub.jpg` — 16:9, minimum 1600px wide, atmospheric/architectural photography. No stock. Aspect of Cairo's architectural texture, not a tourist landmark.
- `amsterdam-hub.jpg` — 16:9, minimum 1600px wide. Urban canal or street texture.
- `compass-arrow.svg` — Minimal SVG, 24×24px. A single directional arrow with no compass rose. Must accept a CSS `transform: rotate()` value.
- Catenary: code-only SVG, no file needed.

---

### SECTION 07: INDUSTRIES

**Block ID:** `lp-industries`
**Animation style:** Editorial
**Narrative weight:** Medium

#### Layout

```
┌──────────────────────────── 12-col grid ─────────────────────────────┐
│                                                                       │
│  [Section label: "Sectors" — rotated 1.5deg, col 1]                  │
│                                                                       │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────┐ │
│  │  [icon — Lottie]     │  │  [icon — Lottie]     │  │  [icon]     │ │
│  │                      │  │                      │  │             │ │
│  │  Health / Medical    │  │  Beauty & Wellness   │  │ Technology  │ │
│  │  ← --type-heading-sm │  │  ← --type-heading-sm │  │             │ │
│  │                      │  │                      │  │             │ │
│  │  AI tools for diag-  │  │  Personalization     │  │ Infra-      │ │
│  │  nosis support,      │  │  technology and      │  │ structure,  │ │
│  │  patient experience  │  │  experience design   │  │ platforms,  │ │
│  │  and clinical ops.   │  │  for a sector        │  │ and AI-     │ │
│  │                      │  │  moving from mass-   │  │ native      │ │
│  │                      │  │  market to prec-     │  │ products.   │ │
│  │                      │  │  ision care.         │  │             │ │
│  └──────────────────────┘  └──────────────────────┘  └─────────────┘ │
│    col 1–4                   col 5–8                   col 9–12       │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Card style:** White background, 1px border `var(--color-border)`. No radius. Padding: 32px desktop, 24px tablet/mobile.
- **Icon:** Lottie, 40×40px, positioned top-left of card. Plays on hover. Paused in default state (frame 0). Falls back to static SVG if Lottie fails.
- **Card name:** `--type-heading-sm` (18px), weight 500, `--color-text-primary`. Margin-top 16px after icon.
- **Card body:** `--type-body-sm` (14px), weight 400, `--color-text-secondary`, line-height 1.5.
- **Stagger:** 80ms per card (0ms, 80ms, 160ms).
- **Section gap from previous:** `--space-8` (120px)

#### Animations

```
COMPONENT: Industry card (all three)
STATE: viewport-entry
ANIMATION:
  - property: opacity + translateY
    from: opacity(0) translateY(24px)
    to: opacity(1) translateY(0)
    duration: 500ms
    easing: var(--ease-editorial)
    trigger: viewport entry
    delay: [Health: 0ms / Beauty: 80ms / Technology: 160ms]
NOTES: The stagger creates a sequential reading order that matches the layout (left to right). All three cards enter as a set — the stagger is tight enough that they feel simultaneous but ordered.
```

```
COMPONENT: Industry card
STATE: hover (background fill)
ANIMATION:
  - property: background-color (via ::before overlay that grows)
    technique: A ::before pseudo element with width: 0, height: 100%, background: var(--color-black), transition: width
    from: width: 0
    to: width: 100%
    duration: 300ms
    easing: var(--ease-editorial)
    trigger: mouseenter
  - simultaneously: all text elements transition color from var(--color-text-primary/secondary) to var(--color-text-inverse), 200ms, 50ms delay
  - icon: Lottie plays from frame 0 to end on hover, holds last frame on hover, reverses on mouseleave
  reversal: ::before shrinks width back to 0 on mouseleave, 250ms, var(--ease-depart). Text returns to dark, 150ms.
NOTES: The fill sweeps from left to right (the ::before grows from left). This is consistent with the editorial style's line-draw metaphor — things reveal from left. The orange highlighter strip on icon numbers provides the accent — no additional orange on the hover state itself.
```

#### Mobile Adaptations
- Three cards stack vertically
- Stagger reduced to 60ms
- Hover fill replaced by tap feedback: background flashes to `rgba(13,13,13,0.05)` on touch and releases, 200ms

**Asset requirements:**
- `icon-health.lottie` — 40×40px. Simple animated medical/health symbol. Suggest: a plus sign that pulses gently, or a diagnostic waveform.
- `icon-beauty.lottie` — 40×40px. Suggest: a droplet or leaf form that blooms.
- `icon-technology.lottie` — 40×40px. Suggest: a circuit node that connects on hover.
- Fallback SVGs for each (static, same dimensions).

---

### SECTION 08: VENTURES / PORTFOLIO GRID

**Block ID:** `lp-ventures`
**Animation style:** Kinetic
**Narrative weight:** Heavy

#### Layout

```
┌──────────────────────────── 12-col grid ─────────────────────────────┐
│                                                                       │
│  VENTURES                     [All ▼] [AI-native] [Platform] [SaaS]  │
│  ← --type-heading-lg, 28px    ← filter chips, --type-label           │
│                                                                       │
│  [Sort: Featured ▼]                                          [Live ●] │
│                                                                       │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐          │
│  │ [thumbnail]    │  │ [thumbnail]    │  │ [thumbnail]    │          │
│  │                │  │                │  │                │          │
│  │ Noor Health    │  │ [Venture 2]    │  │ [Venture 3]    │          │
│  │ ← heading-sm   │  │                │  │                │          │
│  │                │  │                │  │                │          │
│  │ AI-native      │  │ [tags]         │  │ [tags]         │          │
│  │ Clinical       │  │                │  │                │          │
│  │ Platform       │  │                │  │                │          │
│  │ ← type-label   │  │                │  │                │          │
│  │                │  │                │  │                │          │
│  │ Diagnostic     │  │ [shortDesc]    │  │ [shortDesc]    │          │
│  │ support for    │  │                │  │                │          │
│  │ clinicians...  │  │                │  │                │          │
│  │ ← body-sm      │  │                │  │                │          │
│  │                │  │                │  │                │          │
│  │ [Beta] 2025    │  │ [stage] [year] │  │ [stage] [year] │          │
│  │ ← type-label   │  │                │  │                │          │
│  └────────────────┘  └────────────────┘  └────────────────┘          │
│    col 1–4             col 5–8             col 9–12                   │
│                                                                       │
│  [Row 2...]                                                           │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Filter bar:** Horizontal scrollable chip row. Desktop: full row visible. Mobile: horizontally scrollable, 24px left padding, fade-out on right edge.
- **Filter chip style:** Default — white bg, 1px border `var(--color-border)`, `--type-label` (12px), padding: 8px 16px, no radius (sharp corners). Active — black bg, white text, no border.
- **Grid:** 3 columns desktop, 2 columns tablet, 1 column mobile. Gap: 24px.
- **Card thumbnail:** 4:3 aspect ratio, full-width of card column. `object-fit: cover`.
- **Card body padding:** 16px.
- **Stage badge:** Inline, `--type-label` (10px), 500 weight. Style from `stageBadgeConfig`: Beta = orange border + orange text; Live = black fill + white text; In development = muted border + muted text.
- **"Live" quick-toggle:** Pill-shaped toggle, right side of filter row.

#### Filter Chip Animation

```
COMPONENT: Filter chip
STATE: activate (click)
ANIMATION:
  - property: background-color
    from: var(--color-white)
    to: var(--color-black)
    duration: 150ms
    easing: var(--ease-kinetic)
    trigger: click
  - property: color
    from: var(--color-text-primary)
    to: var(--color-text-inverse)
    duration: 150ms
  - property: transform (scale)
    from: scale(1)
    to: scale(1.04)
    duration: 80ms
    easing: var(--ease-arrive)
    trigger: click
    then: scale(1) over 120ms
NOTES: The scale pop (1.04) confirms the interaction — it arrives, it's selected. Then it settles to 1. This is the kinetic style's "arrives with authority."
```

#### FLIP Grid Animation (filter change)

```
COMPONENT: Venture grid — FLIP transition
TRIGGER: FilterState changes (activeTags, activeIndustry, activeStage, activeHub, liveOnly change)

STEP 1 — FIRST: Record all current card positions (getBoundingClientRect for each card)

STEP 2 — Filter state updates. DOM changes. Some cards are hidden (display: none / opacity 0).
  Cards being HIDDEN:
    - property: opacity + scale
      to: opacity(0) scale(0.95)
      duration: 250ms
      easing: var(--ease-depart)
      stagger: 0ms  [all hidden cards exit simultaneously]

STEP 3 — LAST: Record all new card positions after layout reflow

STEP 4 — INVERT: Compute transform needed to put each staying card back to its FIRST position

STEP 5 — PLAY: Animate all staying cards from their INVERT transform to identity:
    - property: transform (computed position delta)
      from: [inverted position — card is visually where it was]
      to: translateX(0) translateY(0)  [card settles in new position]
      duration: 400ms
      easing: var(--ease-editorial)

STEP 6 — New cards enter (cards that were hidden and are now shown):
    - property: opacity + scale
      from: opacity(0) scale(0.95)
      to: opacity(1) scale(1)
      duration: 350ms
      easing: var(--ease-kinetic)  [back.out — arrives with authority]
      stagger: 60ms per card
      delay: 300ms  [after FLIP position animation begins, not after it completes]

EMPTY STATE (no results):
    - delay: 350ms after all hide animations complete
    - property: opacity
      from: 0
      to: 1
      duration: 300ms
      easing: var(--ease-editorial)
```

#### Venture Card Hover

```
COMPONENT: Venture card
STATE: hover
ANIMATION:
  - property: box-shadow
    from: var(--shadow-card)  [0 2px 16px rgba(13,13,13,0.08)]
    to: var(--shadow-hover)   [0 8px 32px rgba(13,13,13,0.14)]
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: mouseenter
  - property: transform (3D tilt via CSS perspective)
    implementation: Track mouse position within card bounds (mouseX, mouseY relative to card center)
    transform: perspective(600px) rotateX([tiltX]deg) rotateY([tiltY]deg)
    max tilt: ±8deg on each axis
    duration: 0ms  [follows cursor in real time, no transition delay]
    ease applied on reset: transition: transform 300ms var(--ease-elegant) on mouseleave
  - property: thumbnail image scale
    from: scale(1.0)
    to: scale(1.03)
    duration: 400ms
    easing: var(--ease-elegant)
    trigger: mouseenter
  reversal: All values reverse on mouseleave. The 3D tilt resets with a spring feel (300ms, var(--ease-elegant)).
NOTES: The 3D tilt is computed in JavaScript (mousemove listener). Remove the transition on mousemove (for real-time tracking), re-add it on mouseleave (for spring reset). This pattern is standard for tilt effects.

MOBILE: 3D tilt is not applied. On tap, card briefly scales to scale(1.02) then back to scale(1.0), 150ms total. This acknowledges the tap without requiring hover state.
```

#### Sort Dropdown

```
COMPONENT: Sort dropdown
STATE: open
ANIMATION:
  - property: transform (translateY) + opacity on dropdown menu
    from: translateY(-8px) opacity(0)
    to: translateY(0) opacity(1)
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: click on sort button
NOTES: The dropdown closes with the reverse animation (150ms) on outside click or option select.
```

#### Mobile Adaptations
- Filter bar: horizontally scrollable, snap scrolling, padding-right 48px to show fade
- Grid: 1 column. Card thumbnail aspect ratio remains 4:3.
- 3D tilt: disabled. Replaced with tap scale.
- FLIP animation: same technique, but may be slower on low-end devices — wrap FLIP in `requestAnimationFrame` and check if device has reduced motion preference.

**Asset requirements:**
- Venture card thumbnails (per venture — from CMS, not Multimedia Producer)
- `skeleton-card.svg` — loading state placeholder matching card dimensions

---

### SECTION 09: APPROACH / PROCESS

**Block ID:** `lp-approach`
**Animation style:** Editorial
**Narrative weight:** Medium

#### Layout

```
┌──────────────────────────── 12-col grid ─────────────────────────────┐
│                                                                       │
│  [Section label: "How we build" — col 1–2]                           │
│                                                                       │
│  col 1–4: [step numbers + connective line]                            │
│  col 5–12: [step content]                                             │
│                                                                       │
│  ●──────────────────────────────────────── (connecting line, drawn)   │
│  01  Find the real problem.                                           │
│      Not the stated one. We spend time here before                    │
│      anything is designed or built.                                   │
│                                                                       │
│  │                                                                    │
│  │                                                                    │
│  ●  02  Define the right scope.                                       │
│      We build the smallest thing that proves the idea...              │
│                                                                       │
│  │                                                                    │
│  ●  03  Build with AI from the start.                                 │
│      Not bolted on. AI is part of the architecture...                 │
│                                                                       │
│  │                                                                    │
│  ●  04  Ship and stay.                                                │
│      We do not hand off and disappear...                              │
│                                                                       │
│  ───────────────────────────────────────────────────                  │
│  Straightforward. We have found that complicated processes            │
│  are often a substitute for unclear thinking.                         │
│  ← --type-body-sm, italic, --color-text-muted                        │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Step number:** `--type-display-sm` (36px), weight 700, `--color-orange`. Positioned left (col 1–2).
- **Step title:** `--type-heading-sm` (18px), weight 500, `--color-text-primary`.
- **Step body:** `--type-body-md` (16px), weight 400, `--color-text-secondary`, line-height 1.6.
- **Connecting line:** A vertical SVG line running between the step circles. Drawn progressively as the visitor scrolls through each step.
- **Step circle:** 8px diameter, filled `--color-orange`, at the step number position.
- **Closing note:** `--type-body-sm` (14px), italic, `--color-text-muted`. Separated from steps by a horizontal rule.

#### Scroll-Scrub Reveal (per step)

```
COMPONENT: Approach step (each of 4 steps)
STATE: scroll-scrub reveal
ANIMATION:
  - Technique: Each step has its own ScrollTrigger with a specific scroll range
  - Step 1: start: "top 80%", end: "top 40%", scrub: 1
  - Step 2: start: "30% 80%", end: "30% 40%", scrub: 1   [relative to section]
  - Step 3: start: "55% 80%", end: "55% 40%", scrub: 1
  - Step 4: start: "80% 80%", end: "80% 40%", scrub: 1

  Per step animation:
  - property: opacity + translateY
    from: opacity(0) translateY(24px)
    to: opacity(1) translateY(0)
    duration: [scroll-scrubbed]
    easing: var(--ease-scrub)

CONNECTING LINE:
  - The vertical SVG line grows from 0px height to its full height via stroke-dashoffset technique
  - Each segment between two steps reveals as the next step begins entering
  - Duration: tied to the scroll range between adjacent step triggers
```

```
COMPONENT: Approach — closing note
STATE: viewport-entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 400ms
    easing: var(--ease-editorial)
    trigger: step 4 completion
    delay: 400ms
NOTES: The closing note appears after all four steps are revealed. It is a coda — it should not compete with the steps.
```

#### Mobile Adaptations
- Scroll scrub replaced by viewport-entry reveals (each step fades + slides up on entry, 500ms)
- Connecting line still drawn but using IntersectionObserver triggers, not scroll scrub
- Step number reduced to `--type-heading-lg` (28px) on mobile to prevent layout overflow

**Asset requirements:** None. Connecting line is inline SVG.

---

### SECTION 10: CTA BAND

**Block ID:** `lp-cta-band`
**Animation style:** Kinetic
**Narrative weight:** Medium

#### Layout

```
┌──────────────────────────── full width ──────────────────────────────┐
│  background: var(--color-surface-black)  [#0D0D0D]                   │
│  padding: 120px 80px                                                  │
│                                                                       │
│  If you have a real problem,                                          │
│  we should talk.                                                      │
│  ← --type-display-md (48px), weight 700, white                       │
│  ← max-width: 720px, centered                                         │
│                                                                       │
│                [Start a project ▶]                                    │
│                ← magnetic button                                      │
│                margin-top: 64px                                       │
│                                                                       │
│  No pitch deck required.                                              │
│  ← --type-body-sm, white, opacity 0.5                                │
│  ← margin-top: 16px                                                   │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Background:** `--color-surface-black` (#0D0D0D) — a full-width break from white that signals the ask
- **Headline:** White, `--type-display-md` (48px), weight 700. The em dash in "problem, we should talk" is intentional — it is a pause before the direct statement.
- **CTA button:** White background, black text. Padding: 20px 40px. No border-radius (sharp). `--type-body-md` (16px), weight 500.
- **Subtext:** `--type-body-sm` (14px), white, opacity 0.5.

#### Entry Animation

```
COMPONENT: CTA band — entire section
STATE: viewport-entry
ANIMATION:
  - property: opacity + scale
    from: opacity(0) scale(0.97)
    to: opacity(1) scale(1)
    duration: 500ms
    easing: var(--ease-kinetic)  [back.out — arrives with authority]
    trigger: viewport entry (section top at 75% viewport)
    delay: 0ms
NOTES: The kinetic style's overshoot easing makes the CTA band feel like it wants to be engaged. The scale goes very slightly past 1.0 (the back.out overshoot) before settling — this is the arrival energy the kinetic style provides.
```

```
COMPONENT: CTA band — headline text
STATE: viewport-entry
ANIMATION:
  - property: clip-path
    from: inset(0 100% 0 0)
    to: inset(0 0% 0 0)
    duration: 700ms
    easing: var(--ease-editorial)
    trigger: viewport entry
    delay: 200ms  [after section enters]
NOTES: The headline wipes in from left, consistent with the hero. On a dark background, the white text revealing left-to-right reads as chalk being drawn on a blackboard — appropriate for the "Blank Page" studio wall metaphor.
```

#### Magnetic Button Spec (signature interaction)

```
COMPONENT: CTA band — magnetic button
STATE: hover (within 120px of button center)
INTERACTION TYPE: Magnetic — button moves toward cursor

DETECTION ZONE:
  - Attach mousemove listener to a 240px × 120px detection area centered on the button
  - When cursor enters detection zone: button begins tracking

BUTTON MOVEMENT:
  - Calculate cursor offset from button center: (cursorX - buttonCenterX, cursorY - buttonCenterY)
  - Apply 30% of that offset to the button position:
    buttonX = (cursorX - buttonCenterX) * 0.30
    buttonY = (cursorY - buttonCenterY) * 0.30
  - property: transform (translateX, translateY)
    duration: 300ms per update
    easing: var(--ease-magnetic)  [power2.out — responsive tracking]
    overwrite: true (GSAP overwrite mode)

CURSOR INSIDE BUTTON:
  - Cursor changes to hover-cta state (48px orange circle with "START" text)
  - Button background: transitions from white to var(--color-orange), 200ms
  - Button text: transitions from black to white, 200ms

CURSOR LEAVES DETECTION ZONE:
  - Button returns to original position: translateX(0) translateY(0)
  - duration: 500ms
  - easing: var(--ease-arrive)  [spring — the button snaps back with a small overshoot, as if on a rubber band]
  - background returns to white, 200ms

NOTES:
  - Max displacement: ±36px horizontal, ±18px vertical (30% of 120px detection radius and 60px detection radius)
  - The spring return (ease-arrive) is what gives the magnetic button its "alive" quality — it does not simply stop, it bounces back.
  - Mobile: Magnetic effect is disabled. Button is a standard tap target with scale(0.97) press feedback, scale(1.0) on release, 100ms each.
  - prefers-reduced-motion: Magnetic effect disabled. Button hover is a simple background-color transition only.
```

#### Mobile Adaptations
- Headline reduced to `--type-heading-lg` (28px)
- Padding: 80px 24px
- Button: full-width (minus 48px total margin)
- Magnetic effect: disabled

**Asset requirements:** None.

---

### SECTION 11: CONTACT FORM

**Block ID:** `lp-contact`
**Animation style:** Editorial
**Narrative weight:** Anchor

#### Layout

```
┌──────────────────────────── 12-col grid ─────────────────────────────┐
│                                                                       │
│  col 1–5: [form left column]     col 7–12: [form right / context]   │
│                                                                       │
│  START A PROJECT                                                      │
│  ← --type-display-sm (36px), weight 700                              │
│                                                                       │
│  Tell us what you're building. We'll come back                        │
│  within 2 business days.                                              │
│  ← --type-body-md, --color-text-secondary                            │
│                                                                       │
│  ─────────────────────────────────────────────                        │
│                                                                       │
│  Your name                   Email address                            │
│  [                        ]  [                    ]                   │
│                                                                       │
│  Tell us about it                                                     │
│  [                                               ]                   │
│  [    textarea — 4 rows                          ]                   │
│                                                                       │
│  Rough budget                                                         │
│  [                        ]                                           │
│                                                                       │
│  [Send it ▶]                                                          │
│                                                                       │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Section label:** "Start a project" — `--type-display-sm` (36px), weight 700, `--color-black`
- **Form intro:** `--type-body-md` (16px), `--color-text-secondary`
- **Field layout:** Name + Email side by side (two columns within form area). Project desc: full width. Budget: half width.
- **Field style:** No background, no border-radius. Bottom border only: `1px solid var(--color-border)`. Label above the field: `--type-label` (12px), weight 500, `--color-text-muted`. Placeholder: `--color-text-muted`.
- **Submit button:** Same as nav CTA style. Black background, white text. Full width on mobile.
- **Error messages:** Below field, `--type-body-sm` (14px), `--color-state-error` (amber). Never red.

#### Entry Animation

```
COMPONENT: Contact form — section heading + intro
STATE: viewport-entry
ANIMATION:
  - property: opacity + translateY
    from: opacity(0) translateY(24px)
    to: opacity(1) translateY(0)
    duration: 600ms
    easing: var(--ease-editorial)
    trigger: viewport entry
    delay: 0ms
```

```
COMPONENT: Contact form — form fields
STATE: viewport-entry (staggered)
ANIMATION:
  - property: opacity + translateY
    from: opacity(0) translateY(16px)
    to: opacity(1) translateY(0)
    duration: 500ms
    easing: var(--ease-editorial)
    trigger: viewport entry (fields become visible)
    delay per field:
      Name field:     80ms
      Email field:   160ms
      Project desc:  240ms
      Budget field:  320ms
      Submit button: 400ms
NOTES: The stagger creates a deliberate, sequential form emergence. The visitor sees each field arrive and has time to understand the form's scope before the submit button appears. This editorial approach reduces form anxiety — the visitor is not confronted with all fields at once.
```

#### Focus States

```
COMPONENT: Form field
STATE: focus
ANIMATION:
  - property: border-bottom-color
    from: var(--color-border)  [rgba(13,13,13,0.12)]
    to: var(--color-black)     [#0D0D0D]
    duration: 200ms
    easing: var(--ease-editorial)
    trigger: focus event
  - property: transform (animated line below field — separate element)
    A 2px tall div that grows from 0% to 100% width on focus:
    from: scaleX(0)
    to: scaleX(1)
    duration: 300ms
    easing: var(--ease-editorial)
    transform-origin: left center
NOTES: The growing line below the focused field is the "editorial underline" micro-interaction. It reinforces the writing metaphor — you are filling in a field, not clicking a button. Reverses (scaleX(0)) on blur, 200ms.
```

#### Submit Button States

```
COMPONENT: Submit button — state sequence
STATES: idle → loading → success / error

idle:     "Send it"   — black bg, white text
loading:  "Sending..." — black bg, white text + spinner replaces arrow icon
          Spinner: 16px CSS border-animation circle, white, 3/4 filled
          Transition: text swaps vertically (slide up out, slide down in), 150ms
success:  "Sent!"     — background transitions to var(--color-state-success) [#1A7A1A], 300ms
          Text swaps: "Sent!" slides down in, 150ms
          After 2000ms: form collapses (height → 0, 400ms) and success message fades in
error:    "Try again"  — background transitions to var(--color-state-error) [#B85C00], 300ms
          Error message appears below form, fade in 300ms

SUCCESS MESSAGE:
  "Got it. We'll be in touch within 2 business days."
  --type-body-lg (18px), --color-text-primary, centered, margin-top 40px
  Fade in: opacity 0 → 1, 400ms, after form collapses
```

#### Validation States

```
COMPONENT: Form field — validation error
STATE: invalid (on submit attempt or on blur)
ANIMATION:
  - property: border-bottom-color
    from: var(--color-border)
    to: var(--color-state-error)  [amber]
    duration: 200ms
    easing: var(--ease-editorial)
  - Error message below field:
    from: opacity(0) translateY(-8px)
    to: opacity(1) translateY(0)
    duration: 300ms
    easing: var(--ease-editorial)
  - Field itself:
    transform: translateX(-4px) → translateX(4px) → translateX(0)
    duration: 300ms total (100ms per shake)
    easing: linear
    [a very subtle horizontal shake — not aggressive, just noticeable]
NOTES: The shake is 4px amplitude, 3 oscillations in 300ms. This is barely perceptible but provides haptic-like feedback. Do not increase amplitude — larger shakes feel punitive.
```

#### Mobile Adaptations
- Name and Email stack vertically
- All fields full-width
- Submit button: full-width, 56px height (minimum touch target)
- Field stagger: 60ms (compressed)

**Asset requirements:** None for this section.

---

### SECTION 12: FOOTER

**Block ID:** `lp-footer`
**Animation style:** Editorial
**Narrative weight:** Light

#### Layout

```
┌──────────────────────────── full width ──────────────────────────────┐
│  padding: 64px 80px                                                   │
│  border-top: 1px solid var(--color-border)                           │
│                                                                       │
│  [wordmark]               Cairo · Amsterdam                           │
│  ← col 1–3                ← col 4–6, --type-label, letter-sp 0.12em  │
│                                                                       │
│  Privacy  Terms           LinkedIn  X                                 │
│  ← --type-label, links    ← --type-label, icon + text                │
│                                                                       │
│  ─────────────────────────────────────────────────────────────       │
│                                                                       │
│  © 2026 klub-404. All rights reserved.                               │
│  ← --type-body-sm, --color-text-muted                                │
└───────────────────────────────────────────────────────────────────── ┘
```

- **Background:** White (#FFFFFF)
- **Wordmark:** Dark SVG variant. `--type-heading-md` equivalent sizing.
- **"Cairo · Amsterdam":** `--type-label` (12px), letter-spacing 0.12em, `--color-text-muted`. This is a persistent geographic reminder — the brand's compass.
- **Utility links:** `--type-label` (12px), `--color-text-muted`. No decoration. Underline on hover.
- **Social links:** Text label with icon (SVG), `--type-label` (12px), `--color-text-muted`.
- **Copyright:** `--type-body-sm` (14px), `--color-text-muted`.

#### Entry Animation

```
COMPONENT: Footer
STATE: viewport-entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 400ms
    easing: var(--ease-editorial)
    trigger: viewport entry
    delay: 0ms
NOTES: The footer does not slide or transform — it simply fades in. The page has made its case. The footer is a closing signature, not a moment.
```

#### Hover States

```
COMPONENT: Footer link (utility + social)
STATE: hover
ANIMATION:
  - property: color
    from: var(--color-text-muted)  [#9A9A9A]
    to: var(--color-text-primary)  [#0D0D0D]
    duration: 150ms
    easing: linear
    trigger: mouseenter
  reversal: returns to --color-text-muted, 100ms
```

#### Mobile Adaptations
- Two-row layout: wordmark + location tag in row 1, links + social in row 2
- Copyright: full-width, below both rows
- Padding: 48px 24px

**Asset requirements:**
- `wordmark.svg` — dark variant (same as nav — reused)
- `icon-linkedin.svg` — 16px, neutral color (inherits from CSS `currentColor`)
- `icon-x.svg` — 16px, neutral color

---

## PART FOUR: GLOBAL ANIMATION RULES

### 4.1 prefers-reduced-motion Protocol

```css
@media (prefers-reduced-motion: reduce) {
  /* Remove all transforms from entry animations */
  /* Remove all scroll-scrub animations */
  /* Cursor trail: disabled */
  /* 3D card tilt: disabled */
  /* Magnetic button: disabled */
  /* Catenary thread draw: instant (no animation) */
  /* Revision Type strikethrough: instant */

  /* Retain opacity transitions at ≤ 200ms */
  /* Retain countUp with reduced duration (400ms) */
  /* Retain filter chip color changes */
  /* Retain form field focus line animation */
}
```

Implementation pattern:
```javascript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  // initialize GSAP ScrollTrigger, cursor trail, magnetic button, 3D tilt
} else {
  // apply static opacity-only classes, skip all GSAP setup
}
```

### 4.2 Touch Device Protocol

```javascript
const isTouch = window.matchMedia('(pointer: coarse)').matches;
if (isTouch) {
  // Disable: cursor trail, magnetic button, 3D card tilt, custom cursor
  // Replace: card hover with tap scale(1.02)
  // Replace: industry card fill with tap flash rgba(13,13,13,0.05)
  // Replace: compass direction arrivals with simplified translateY fades
}
```

### 4.3 Performance Budget

- **Maximum simultaneous animated layers:** 3 (e.g., hero scrub + cursor trail + scroll indicator). If a 4th simultaneous animation is needed, escalate to Performance Engineer.
- **Will-change declarations:** Apply `will-change: transform, opacity` only to elements currently animating. Remove after animation completes (`element.style.willChange = 'auto'`).
- **Compositor-only rule:** All animations must use only `transform` and `opacity`. No `width`, `height`, `top`, `left`, `margin`, or `padding` animations. Color changes must be handled via opacity of a colored overlay layer, not direct `color` or `background-color` animation on long-duration properties.
- **countUp:** Use GSAP's snap or CountUp.js. Duration: 1200ms, ease: power2.out. For single-digit numbers (2 Hubs, 3 Industries), the animation is very short — verify it is perceptible on initial pass. If the count finishes before the visitor's eye arrives at the number, use a 400ms delay before starting countUp.
- **Canvas (cursor trail):** requestAnimationFrame capped at 60fps. Use `cancelAnimationFrame` cleanup when hero section leaves viewport.

### 4.4 No Cumulative Layout Shift (CLS)

- All animating elements must have explicit `width` and `height` in CSS before animation begins
- Thumbnail images: always rendered with explicit `width` and `height` attributes (from CMS asset metadata). Never `width: 100%; height: auto` alone — wrap in an aspect-ratio container.
- Skeleton screens must exactly match final content dimensions. Use the `blurDataUrl` from the venture asset model as the immediate placeholder.
- Venture grid items: all have the same column width. Height is content-driven but consistent within each row (use CSS Grid `align-items: stretch`).

---

## PART FIVE: DIVIDERS

### Divider A — Pillars-to-Hubs

```
COMPONENT: Divider A
STATE: viewport-entry
ANIMATION:
  - element: 1px horizontal rule
  - property: transform (scaleX)
    from: scaleX(0)
    to: scaleX(1)
    duration: 700ms
    easing: var(--ease-editorial)
    transform-origin: left center
    trigger: viewport entry
NOTES: The line draws left to right. It is a chapter break, not a decoration. No text. No label. Its only job is to mark the transition from the abstract (pillars) to the concrete (hubs).
```

### Divider B — 404 Glyph

```
COMPONENT: Divider B — 404 glyph
STATE: viewport-entry
ANIMATION:
  - property: opacity
    from: 0
    to: 1
    duration: 500ms
    easing: var(--ease-editorial)
    trigger: viewport entry
NOTES: The 404 glyph itself DOES NOT ANIMATE FURTHER. It appears. It stays. Its stillness is intentional — the brand joke lands because it does not perform. If the 404 danced or spun, it would become a spectacle. It is a dry reference, not a parade.

TYPOGRAPHY:
  The "404" is rendered at approximately --type-display-xl (96px), weight 300 (Light), --color-border [rgba(13,13,13,0.12)] — barely legible, like a watermark. It does not compete with surrounding content. transform: rotate(-1.5deg) to match the page's rotational language.
```

---

## PART SIX: ASSET MANIFEST

Complete list of assets the Multimedia Producer must prepare:

### SVGs (Vector, exported as SVG files)
```
wordmark.svg                — Primary dark wordmark. Viewbox: variable. Black fill only.
wordmark-white.svg          — White variant for mobile nav overlay.
compass-arrow.svg           — 24×24px. Single directional arrow, no rose.
icon-linkedin.svg           — 16×16px. Uses currentColor.
icon-x.svg                  — 16×16px. Uses currentColor.
icon-health.svg             — 40×40px. Fallback for Lottie.
icon-beauty.svg             — 40×40px. Fallback for Lottie.
icon-technology.svg         — 40×40px. Fallback for Lottie.
skeleton-card.svg           — Venture card loading state. 4:3 aspect ratio, neutral fill.
```

### Lottie Files (JSON, targeting < 80KB each)
```
scroll-cue.lottie           — Bouncing/pulsing arrow indicator. Loop. 40×40px.
hamburger-x.lottie          — Hamburger → X transition. 24×24px. Reversible (frame 0–30).
icon-health.lottie          — Animated health icon. Frame 0 = idle. Plays on hover.
icon-beauty.lottie          — Animated beauty/wellness icon.
icon-technology.lottie      — Animated tech/circuit icon.
```

### Photography
```
cairo-hub.jpg               — 1600×900px minimum. 16:9. Architectural/atmospheric Cairo.
                              Not a landmark. Not stock. Interior or urban texture preferred.
                              Must work with a dark overlay gradient (needs tonal variation).

amsterdam-hub.jpg           — 1600×900px minimum. 16:9. Canal, street, or building texture.
                              Same constraints as Cairo image.
```

### Code-Only Assets (no file required — developer-implemented)
```
Catenary thread SVG         — Computed inline from hub card layout dimensions
Cursor trail canvas         — Canvas 2D, requestAnimationFrame loop
3D card tilt                — CSS perspective + JavaScript mousemove
Revision Type strikethrough — CSS ::after pseudo + clip-path on text
Connecting line (approach)  — Inline SVG, stroke-dashoffset technique
```

---

## PART SEVEN: EDGE CASES AND EMPTY STATES

### Ventures Grid — Empty State
- When all filters produce no results: grid area fills with empty state copy "Nothing here yet." + "Try a different filter or clear all." + "Clear filters" link.
- Empty state enters after a 350ms delay post-filter-hide-animations.
- Typography: headline at `--type-heading-lg` (28px), body at `--type-body-md` (16px), both `--color-text-muted`, centered.

### Ventures Grid — Portfolio Unlaunched (zero ventures in CMS)
- Grid replaced entirely with: "The portfolio is loading." + "Our ventures will appear here as they go live."
- No filter bar rendered when portfolio is empty.

### Hub Images — Load Failure
- Show a neutral `--color-surface-raised` (#F5F5F5) rectangle at the card dimensions.
- No text fallback. A broken hub image should not display alt text in the card background position.

### Long Venture Names
- Truncate at 2 lines maximum with CSS `-webkit-line-clamp: 2`. Ellipsis added.
- Card height remains consistent within a row regardless of name length.

### RTL Languages
- The site launches in English only (LTR). RTL support is Phase 2.
- All `transform-origin: left center` values in animation specs will need to become `right center` for RTL. Flag these to the developer for future-proofing.

---

## PART EIGHT: INTERACTION SPECIALIST HANDOFF CHECKLIST

Before implementation, confirm:

- [ ] GSAP ScrollTrigger imported and configured with `gsap.registerPlugin(ScrollTrigger)`
- [ ] `prefers-reduced-motion` matchMedia check implemented globally before any GSAP setup
- [ ] `pointer: coarse` check implemented, disabling cursor trail, 3D tilt, magnetic button
- [ ] Custom cursor `<div>` initialized and `cursor: none` set on `<html>`
- [ ] Hero cursor trail canvas initialized, bounds-clipped, and cleaned up on scroll-exit
- [ ] Catenary thread SVG position computed on mount and on window resize (debounced 200ms)
- [ ] FLIP animation controller wired to FilterState changes in ventures grid
- [ ] Magnetic button detection zone (240×120px) correctly sized and centered on button
- [ ] Revision Type animation fires once and persists on back-scroll
- [ ] countUp initializes only once per session (IntersectionObserver with once: true)
- [ ] All entry animations use `will-change: transform, opacity` set before animation, removed after
- [ ] Skeleton screens for venture thumbnails have exact final dimensions
- [ ] Form validation errors display in amber (`--color-state-error`), not red
- [ ] Mobile nav overlay z-index is above all page content including the custom cursor layer
- [ ] Approach section scroll scrub has a mobile fallback (viewport-entry triggers, no scrub)

---

*Spec complete. Version 1.0. Creative Architect — klub-404 Studio — 2026-03-14.*
*Next review: after first Figma prototype round-trip with the Interaction Specialist.*
*Escalation flags: Catenary thread SVG positioning → coordinate with Interaction Specialist on mount timing relative to layout reflow. Hub photography brief → Multimedia Producer must begin sourcing immediately as this is the longest-lead asset.*
