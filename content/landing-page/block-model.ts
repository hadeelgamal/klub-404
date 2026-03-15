/**
 * KLUB-404 — LANDING PAGE BLOCK MODEL
 * Content Architect: Block-Based Architecture Specification
 *
 * Every section on the landing page is a typed Block.
 * Blocks are the atomic unit of content. They can be independently
 * animated, reordered, shown, or hidden without breaking surrounding sequences.
 *
 * Removing any single block must not break the animation sequence of adjacent blocks.
 * All entryDelay values are relative to viewport entry, not page load.
 */

// ─────────────────────────────────────────────────────────────
// FOUNDATION TYPES
// ─────────────────────────────────────────────────────────────

type BlockType =
  | 'hero'
  | 'feature-card'
  | 'project-card'
  | 'testimonial'
  | 'stat'
  | 'cta'
  | 'divider'
  | 'media'
  | 'text-body'
  | 'form'
  | 'nav'
  | 'pillar'     // klub-404 specific: identity/reach/focus card
  | 'hub'        // klub-404 specific: city/location block
  | 'venture'    // klub-404 specific: portfolio company card

type AnimationEntry = 'fade' | 'slide-up' | 'scale-in' | 'reveal' | 'none'
type ScrollBehavior = 'pin' | 'parallax' | 'scrub' | 'none'

interface AnimationProfile {
  entry: AnimationEntry
  entryDelay: number       // ms — stagger offset from viewport trigger
  duration: number         // ms — base duration for entry animation
  scrollBehavior: ScrollBehavior
  hoverEffect: string      // references Interaction Specialist spec ID
  exitBehavior: 'fade-out' | 'slide-down' | 'none'  // on scroll past
}

type VisibilityState = 'visible' | 'hidden' | 'conditional'

interface ContentCondition {
  trigger: 'filter' | 'scroll-depth' | 'viewport' | 'interaction'
  value: string
}

interface Block {
  id: string
  type: BlockType
  label: string            // human-readable section name for CMS
  animationProfile: AnimationProfile
  visibility: VisibilityState
  condition?: ContentCondition
  animationStyle: 'elegant' | 'kinetic' | 'editorial' | 'immersive'
  contentSlots: ContentSlot[]
}

interface ContentSlot {
  key: string
  type: 'text' | 'richtext' | 'image' | 'video' | 'lottie' | 'number' | 'link' | 'list'
  required: boolean
  maxLength?: number       // for text fields — enforces microcopy discipline
  notes: string
}


// ─────────────────────────────────────────────────────────────
// BLOCK DEFINITIONS — ALL LANDING PAGE SECTIONS
// ─────────────────────────────────────────────────────────────

export const landingPageBlocks: Block[] = [

  // ── 01. NAV ──────────────────────────────────────────────────
  {
    id: 'lp-nav',
    type: 'nav',
    label: 'Global Navigation',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'fade',
      entryDelay: 0,
      duration: 400,
      scrollBehavior: 'pin',         // sticky — stays fixed on scroll
      hoverEffect: 'nav-link-underline-slide',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'logo',          type: 'image', required: true,  notes: 'SVG wordmark. Dark and light variants required.' },
      { key: 'navLinks',      type: 'list',  required: true,  maxLength: 5, notes: 'Max 4 nav links + 1 CTA button. Labels from microcopy inventory.' },
      { key: 'ctaLabel',      type: 'text',  required: true,  maxLength: 20, notes: 'Primary nav CTA. Default: "Start a project".' },
      { key: 'mobileMenuIcon', type: 'lottie', required: false, notes: 'Hamburger-to-X Lottie animation for mobile.' },
    ],
  },

  // ── 02. HERO ─────────────────────────────────────────────────
  {
    id: 'lp-hero',
    type: 'hero',
    label: 'Hero — Opening Statement',
    animationStyle: 'immersive',
    animationProfile: {
      entry: 'reveal',               // clip-path wipe, not a simple fade
      entryDelay: 200,               // slight offset after nav settles
      duration: 1100,
      scrollBehavior: 'scrub',       // headline scale/opacity tied to scroll position
      hoverEffect: 'hero-cursor-trail',
      exitBehavior: 'fade-out',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'headline',       type: 'text',    required: true,  maxLength: 60,  notes: 'Primary headline. 3 options in microcopy inventory. No punctuation unless intentional.' },
      { key: 'subheadline',    type: 'text',    required: true,  maxLength: 120, notes: 'One tight sentence. Must carry the 404-found paradox.' },
      { key: 'ctaPrimary',     type: 'link',    required: true,  notes: 'Label: "Start a project". Links to contact form.' },
      { key: 'ctaSecondary',   type: 'link',    required: true,  notes: 'Label: "See the work". Smooth-scrolls to ventures section.' },
      { key: 'backgroundMedia', type: 'video',  required: false, notes: 'Ambient loop. Max 8s, no audio. Fallback: static gradient mesh.' },
      { key: 'scrollCue',      type: 'lottie',  required: false, notes: 'Animated scroll indicator. Disappears after first scroll event.' },
      { key: 'locationTag',    type: 'text',    required: false, maxLength: 40, notes: 'e.g. "Cairo · Amsterdam" — typographic, subtle, not a badge.' },
    ],
  },

  // ── 03. IDENTITY STATEMENT ───────────────────────────────────
  {
    id: 'lp-identity',
    type: 'text-body',
    label: 'Identity — What We Are',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'reveal',               // word-by-word or line-by-line clip-path reveal
      entryDelay: 0,
      duration: 900,
      scrollBehavior: 'scrub',       // text opacity builds as user scrolls through
      hoverEffect: 'none',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'statement',      type: 'richtext', required: true, maxLength: 200, notes: 'The "hybrid between agency and incubator" positioning. Written as a declarative statement, not a list.' },
      { key: 'accent',         type: 'text',     required: false, maxLength: 20, notes: 'Optional pull-quote or emphasized phrase rendered large. E.g. "Neither. Both."' },
    ],
  },

  // ── 04. THREE PILLARS ────────────────────────────────────────
  // Three sibling pillar blocks, rendered as a trio.
  // Each is its own block so they can stagger independently.
  {
    id: 'lp-pillar-identity',
    type: 'pillar',
    label: 'Pillar — Identity',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'slide-up',
      entryDelay: 0,
      duration: 600,
      scrollBehavior: 'none',
      hoverEffect: 'pillar-border-illuminate',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'label',       type: 'text', required: true, maxLength: 12, notes: 'Pillar name. Default: "Identity".' },
      { key: 'number',      type: 'text', required: true, maxLength: 4,  notes: 'Display numeral. "01" — typographic anchor.' },
      { key: 'body',        type: 'text', required: true, maxLength: 80, notes: 'The pillar statement. Tight, declarative.' },
    ],
  },
  {
    id: 'lp-pillar-reach',
    type: 'pillar',
    label: 'Pillar — Reach',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'slide-up',
      entryDelay: 120,               // 120ms stagger after identity pillar
      duration: 600,
      scrollBehavior: 'none',
      hoverEffect: 'pillar-border-illuminate',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'label',       type: 'text', required: true, maxLength: 12, notes: 'Default: "Reach".' },
      { key: 'number',      type: 'text', required: true, maxLength: 4,  notes: '"02"' },
      { key: 'body',        type: 'text', required: true, maxLength: 80, notes: 'EMEA scope + dual hubs.' },
    ],
  },
  {
    id: 'lp-pillar-focus',
    type: 'pillar',
    label: 'Pillar — Focus',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'slide-up',
      entryDelay: 240,               // 240ms stagger — last to land
      duration: 600,
      scrollBehavior: 'none',
      hoverEffect: 'pillar-border-illuminate',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'label',       type: 'text', required: true, maxLength: 12, notes: 'Default: "Focus".' },
      { key: 'number',      type: 'text', required: true, maxLength: 4,  notes: '"03"' },
      { key: 'body',        type: 'text', required: true, maxLength: 80, notes: 'Problem-solving through experience design.' },
    ],
  },

  // ── 05. STATS BAR ────────────────────────────────────────────
  {
    id: 'lp-stats',
    type: 'stat',
    label: 'Stats — Signal of Scale',
    animationStyle: 'kinetic',
    animationProfile: {
      entry: 'fade',
      entryDelay: 0,
      duration: 400,
      scrollBehavior: 'none',
      hoverEffect: 'none',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      // Each stat is a sub-slot — developer renders as a row of N items
      { key: 'stat1Value',   type: 'number', required: true,  notes: 'e.g. "2" — number animates up via countUp on viewport entry.' },
      { key: 'stat1Label',   type: 'text',   required: true,  maxLength: 24, notes: 'e.g. "Hubs".' },
      { key: 'stat2Value',   type: 'number', required: true,  notes: 'e.g. "3" — industries served.' },
      { key: 'stat2Label',   type: 'text',   required: true,  maxLength: 24, notes: 'e.g. "Industries".' },
      { key: 'stat3Value',   type: 'number', required: true,  notes: 'e.g. "EMEA" — region (text, not number).' },
      { key: 'stat3Label',   type: 'text',   required: true,  maxLength: 24, notes: 'e.g. "Region".' },
      { key: 'stat4Value',   type: 'number', required: false, notes: 'Reserve for ventures count once portfolio grows.' },
      { key: 'stat4Label',   type: 'text',   required: false, maxLength: 24, notes: 'e.g. "Ventures".' },
    ],
  },

  // ── 06. DIVIDER — TRANSITION A ───────────────────────────────
  {
    id: 'lp-divider-a',
    type: 'divider',
    label: 'Divider — Pillars to Hubs',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'reveal',               // horizontal line draws from left
      entryDelay: 0,
      duration: 700,
      scrollBehavior: 'none',
      hoverEffect: 'none',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'dividerStyle', type: 'text', required: true, maxLength: 20, notes: 'Values: "line" | "404-glyph" | "whitespace". Default: "line".' },
    ],
  },

  // ── 07. HUB BLOCKS ───────────────────────────────────────────
  // Two sibling blocks — Cairo and Amsterdam. Can reorder without consequence.
  {
    id: 'lp-hub-cairo',
    type: 'hub',
    label: 'Hub — Cairo',
    animationStyle: 'elegant',
    animationProfile: {
      entry: 'slide-up',
      entryDelay: 0,
      duration: 700,
      scrollBehavior: 'parallax',    // background image moves at 0.6x scroll speed
      hoverEffect: 'hub-image-zoom-slow',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'city',           type: 'text',  required: true, maxLength: 20, notes: '"Cairo".' },
      { key: 'region',         type: 'text',  required: true, maxLength: 30, notes: '"Egypt, North Africa".' },
      { key: 'description',    type: 'text',  required: true, maxLength: 120, notes: 'One sentence on what this hub does / its character. Not a Wikipedia entry.' },
      { key: 'backgroundImage', type: 'image', required: true, notes: '16:9, min 1600px wide. Architectural or atmospheric — not stock.' },
      { key: 'coordinates',    type: 'text',  required: false, maxLength: 30, notes: 'Optional typographic detail: "30.0444° N, 31.2357° E".' },
    ],
  },
  {
    id: 'lp-hub-amsterdam',
    type: 'hub',
    label: 'Hub — Amsterdam',
    animationStyle: 'elegant',
    animationProfile: {
      entry: 'slide-up',
      entryDelay: 150,               // stagger after Cairo
      duration: 700,
      scrollBehavior: 'parallax',
      hoverEffect: 'hub-image-zoom-slow',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'city',           type: 'text',  required: true, maxLength: 20, notes: '"Amsterdam".' },
      { key: 'region',         type: 'text',  required: true, maxLength: 30, notes: '"Netherlands, Western Europe".' },
      { key: 'description',    type: 'text',  required: true, maxLength: 120, notes: 'One sentence on hub character.' },
      { key: 'backgroundImage', type: 'image', required: true, notes: '16:9, min 1600px wide.' },
      { key: 'coordinates',    type: 'text',  required: false, maxLength: 30, notes: '"52.3676° N, 4.9041° E".' },
    ],
  },

  // ── 08. INDUSTRIES ───────────────────────────────────────────
  {
    id: 'lp-industries',
    type: 'feature-card',
    label: 'Industries — Sectors We Build In',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'slide-up',
      entryDelay: 0,
      duration: 500,
      scrollBehavior: 'none',
      hoverEffect: 'industry-card-fill',  // bg fills on hover
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      // Three industry cards rendered as siblings
      { key: 'industry1Name',  type: 'text',   required: true, maxLength: 24, notes: '"Health / Medical".' },
      { key: 'industry1Icon',  type: 'lottie', required: false, notes: 'Animated icon. Falls back to static SVG.' },
      { key: 'industry1Desc',  type: 'text',   required: true, maxLength: 80, notes: 'One sentence. What kind of problems they solve here.' },
      { key: 'industry2Name',  type: 'text',   required: true, maxLength: 24, notes: '"Beauty & Wellness".' },
      { key: 'industry2Icon',  type: 'lottie', required: false, notes: 'Animated icon.' },
      { key: 'industry2Desc',  type: 'text',   required: true, maxLength: 80, notes: 'One sentence.' },
      { key: 'industry3Name',  type: 'text',   required: true, maxLength: 24, notes: '"Technology".' },
      { key: 'industry3Icon',  type: 'lottie', required: false, notes: 'Animated icon.' },
      { key: 'industry3Desc',  type: 'text',   required: true, maxLength: 80, notes: 'One sentence.' },
    ],
  },

  // ── 09. VENTURES / PORTFOLIO ─────────────────────────────────
  {
    id: 'lp-ventures',
    type: 'venture',
    label: 'Ventures — Portfolio Grid',
    animationStyle: 'kinetic',
    animationProfile: {
      entry: 'scale-in',
      entryDelay: 0,
      duration: 450,
      scrollBehavior: 'none',
      hoverEffect: 'venture-card-tilt-3d',  // subtle 3D perspective on hover
      exitBehavior: 'none',
    },
    visibility: 'visible',
    condition: {
      trigger: 'filter',
      value: 'activeTags,activeIndustry',
    },
    contentSlots: [
      { key: 'sectionLabel',   type: 'text',  required: true, maxLength: 20, notes: '"Ventures" — section heading.' },
      { key: 'filterBar',      type: 'list',  required: true, notes: 'Filter chips: tags + industries. Wired to FilterState. See taxonomy spec.' },
      { key: 'emptyHeadline',  type: 'text',  required: true, maxLength: 30, notes: 'No-results state. Default: "Nothing here yet".' },
      { key: 'emptyBody',      type: 'text',  required: true, maxLength: 60, notes: 'Default: "Try a different filter or clear all".' },
      // Individual venture cards are populated dynamically from taxonomy data
    ],
  },

  // ── 10. VENTURE CARD (repeating unit) ────────────────────────
  {
    id: 'lp-venture-card',
    type: 'project-card',
    label: 'Venture Card — Single Portfolio Item',
    animationStyle: 'kinetic',
    animationProfile: {
      entry: 'scale-in',
      entryDelay: 60,                // per-card stagger: 60ms * index
      duration: 400,
      scrollBehavior: 'none',
      hoverEffect: 'venture-card-tilt-3d',
      exitBehavior: 'fade-out',      // used when filtered out
    },
    visibility: 'conditional',
    condition: {
      trigger: 'filter',
      value: 'activeTags,activeIndustry',
    },
    contentSlots: [
      { key: 'ventureName',    type: 'text',  required: true, maxLength: 40,  notes: 'Company name.' },
      { key: 'ventureSlug',    type: 'text',  required: true, maxLength: 60,  notes: 'URL slug for detail page.' },
      { key: 'thumbnail',      type: 'image', required: true,                 notes: '4:3 ratio, min 800px wide. Must work at 320px on mobile.' },
      { key: 'tags',           type: 'list',  required: true,                 notes: 'From ProjectTag taxonomy. Max 3 visible, rest truncated.' },
      { key: 'industry',       type: 'text',  required: true, maxLength: 20,  notes: 'From Industry taxonomy.' },
      { key: 'stage',          type: 'text',  required: true, maxLength: 20,  notes: 'From VentureStage taxonomy.' },
      { key: 'year',           type: 'number', required: true,                notes: '4-digit year.' },
      { key: 'shortDesc',      type: 'text',  required: true, maxLength: 100, notes: 'One sentence problem statement, not a tagline.' },
    ],
  },

  // ── 11. DIVIDER — TRANSITION B ───────────────────────────────
  {
    id: 'lp-divider-b',
    type: 'divider',
    label: 'Divider — Ventures to Approach',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'fade',
      entryDelay: 0,
      duration: 500,
      scrollBehavior: 'none',
      hoverEffect: 'none',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'dividerStyle', type: 'text', required: true, maxLength: 20, notes: '"404-glyph" renders the error code as a large typographic decoration.' },
    ],
  },

  // ── 12. APPROACH / PROCESS ───────────────────────────────────
  {
    id: 'lp-approach',
    type: 'text-body',
    label: 'Approach — How We Build',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'reveal',
      entryDelay: 0,
      duration: 800,
      scrollBehavior: 'scrub',
      hoverEffect: 'none',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'sectionLabel', type: 'text',     required: true, maxLength: 20,  notes: 'Section label. e.g. "How we build" or "The process".' },
      { key: 'steps',        type: 'list',     required: true,                 notes: 'Ordered steps. Max 4. Each step: {number, title, body (max 80 chars)}.' },
      { key: 'note',         type: 'text',     required: false, maxLength: 100, notes: 'Optional closing line — dry, confident. Not a disclaimer.' },
    ],
  },

  // ── 13. CTA BAND ─────────────────────────────────────────────
  {
    id: 'lp-cta-band',
    type: 'cta',
    label: 'CTA — Mid-Page Conversion',
    animationStyle: 'kinetic',
    animationProfile: {
      entry: 'scale-in',
      entryDelay: 0,
      duration: 500,
      scrollBehavior: 'none',
      hoverEffect: 'cta-button-magnetic',  // button follows cursor slightly
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'headline',   type: 'text', required: true, maxLength: 50,  notes: 'Short provocation. Not a pitch.' },
      { key: 'ctaLabel',   type: 'text', required: true, maxLength: 20,  notes: 'Default: "Start a project".' },
      { key: 'ctaHref',    type: 'link', required: true,                 notes: 'Scrolls to or links to contact form.' },
      { key: 'subtext',    type: 'text', required: false, maxLength: 60, notes: 'Optional friction-reducer. e.g. "No pitch deck required."' },
    ],
  },

  // ── 14. CONTACT FORM ─────────────────────────────────────────
  {
    id: 'lp-contact',
    type: 'form',
    label: 'Contact — Project Intake Form',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'slide-up',
      entryDelay: 0,
      duration: 600,
      scrollBehavior: 'none',
      hoverEffect: 'form-field-focus-line',  // animated underline on focus
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'sectionLabel',    type: 'text', required: true, maxLength: 20,  notes: 'e.g. "Start a project" — matches primary CTA.' },
      { key: 'formIntro',       type: 'text', required: false, maxLength: 100, notes: 'Optional one-liner before the form. Keeps tone.' },
      { key: 'nameLabel',       type: 'text', required: true, maxLength: 20,  notes: '"Your name".' },
      { key: 'namePlaceholder', type: 'text', required: true, maxLength: 30,  notes: '"First and last".' },
      { key: 'emailLabel',      type: 'text', required: true, maxLength: 20,  notes: '"Email address".' },
      { key: 'emailPlaceholder',type: 'text', required: true, maxLength: 30,  notes: '"you@company.com".' },
      { key: 'projectLabel',    type: 'text', required: true, maxLength: 30,  notes: '"Tell us about it".' },
      { key: 'projectPlaceholder',type:'text',required: true, maxLength: 60,  notes: '"What are you building?".' },
      { key: 'budgetLabel',     type: 'text', required: true, maxLength: 20,  notes: '"Rough budget".' },
      { key: 'budgetPlaceholder',type: 'text',required: true, maxLength: 30,  notes: '"e.g. $10k–$30k".' },
      { key: 'submitIdle',      type: 'text', required: true, maxLength: 15,  notes: '"Send it".' },
      { key: 'submitLoading',   type: 'text', required: true, maxLength: 15,  notes: '"Sending...".' },
      { key: 'submitSuccess',   type: 'text', required: true, maxLength: 15,  notes: '"Sent!".' },
      { key: 'successMessage',  type: 'text', required: true, maxLength: 120, notes: 'Full success state body. See microcopy inventory.' },
      { key: 'errorMessage',    type: 'text', required: true, maxLength: 60,  notes: 'Form-level error. "That didn\'t go through".' },
    ],
  },

  // ── 15. FOOTER ───────────────────────────────────────────────
  {
    id: 'lp-footer',
    type: 'text-body',
    label: 'Footer',
    animationStyle: 'editorial',
    animationProfile: {
      entry: 'fade',
      entryDelay: 0,
      duration: 400,
      scrollBehavior: 'none',
      hoverEffect: 'footer-link-underline',
      exitBehavior: 'none',
    },
    visibility: 'visible',
    contentSlots: [
      { key: 'logo',        type: 'image', required: true,                notes: 'Footer variant of wordmark (lighter weight or inverted).' },
      { key: 'tagline',     type: 'text',  required: false, maxLength: 50, notes: 'Optional footer tagline — minimal, not repeated from hero.' },
      { key: 'footerLinks', type: 'list',  required: true,                notes: 'Legal/utility links only. Privacy, Terms, etc.' },
      { key: 'social',      type: 'list',  required: false,               notes: 'Social links as icon+aria-label pairs. LinkedIn, X minimum.' },
      { key: 'copyright',   type: 'text',  required: true, maxLength: 60, notes: '"© 2026 klub-404. All rights reserved."' },
      { key: 'hubs',        type: 'text',  required: true, maxLength: 40, notes: '"Cairo · Amsterdam" — typographic, consistent with hero.' },
    ],
  },

]


// ─────────────────────────────────────────────────────────────
// BLOCK SEQUENCE — DEFAULT ORDER
// This is the canonical render order. Structural interpretations
// in page-structures.ts reference block IDs from this list.
// ─────────────────────────────────────────────────────────────

export const defaultBlockSequence: string[] = [
  'lp-nav',
  'lp-hero',
  'lp-identity',
  'lp-pillar-identity',
  'lp-pillar-reach',
  'lp-pillar-focus',
  'lp-stats',
  'lp-divider-a',
  'lp-hub-cairo',
  'lp-hub-amsterdam',
  'lp-industries',
  'lp-ventures',
  // lp-venture-card instances are injected dynamically within lp-ventures
  'lp-divider-b',
  'lp-approach',
  'lp-cta-band',
  'lp-contact',
  'lp-footer',
]
