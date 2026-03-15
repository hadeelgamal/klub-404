/**
 * KLUB-404 — MICROCOPY INVENTORY
 * Content Architect: Complete Copy Specification
 *
 * This file is the single source of truth for all interface text.
 * Developers copy directly from here. No prose rationale in this file —
 * see voice-profile.ts for the reasoning behind every choice.
 *
 * Format rules:
 * - All text is final copy, not placeholder.
 * - maxLength constraints are enforced at the block model level.
 * - State variants (idle/loading/success/error) are always grouped together.
 * - Never add punctuation unless it is intentional and load-bearing.
 *
 * Voice check: Direct. Confident. Dry. Second person. Brutally short.
 */

// ─────────────────────────────────────────────────────────────
// HERO — HEADLINE OPTIONS
// Three distinct headlines, each for a different structural interpretation.
// The Creative Architect selects one; all three are maintained here.
// ─────────────────────────────────────────────────────────────

export const heroHeadlines = {

  /**
   * OPTION A — "The Argument" structure
   * Tone: Declarative, paradox-forward.
   * The 404 brand is stated as a fact. Confidence without posturing.
   * The error becomes the methodology.
   */
  optionA: {
    headline: 'We build what didn\'t exist yet.',
    subheadline: 'A venture studio for AI-driven solutions — between Cairo and Amsterdam, across the EMEA region.',
    locationTag: 'Cairo · Amsterdam',
    note: 'The 404 implied: "didn\'t exist yet" is the found-from-not-found arc. No explicit mention of the error code — it\'s in the brand name.',
  },

  /**
   * OPTION B — "The Signal" structure
   * Tone: Poetic, oblique. The 404 is a riddle the visitor solves.
   * Designed for visitors who stop and think before they scroll.
   * Slightly more ambient — lets the video breathe.
   */
  optionB: {
    headline: 'Found at the intersection of error and intention.',
    subheadline: 'klub-404 builds AI-driven ventures where others see a dead end. Cairo. Amsterdam. EMEA.',
    locationTag: 'Cairo · Amsterdam',
    note: 'The 404 is literal here: "error" and "intersection." Strong if the hero visual supports abstraction. Risky if the visitor does not immediately grasp the brand name reference — A/B test recommended.',
  },

  /**
   * OPTION C — "The Map" structure
   * Tone: Geographic, authoritative. The cities are the argument.
   * Names Cairo before Amsterdam — a deliberate ordering choice.
   * The 404 is subtext: the studio occupies spaces others haven't mapped.
   */
  optionC: {
    headline: 'From Cairo to Amsterdam. Across the region between.',
    subheadline: 'klub-404 is a venture studio building AI-driven tech in the markets EMEA still underestimates.',
    locationTag: 'Cairo · Amsterdam · EMEA',
    note: 'The geographic tension is the hook. "Still underestimates" is deliberately pointed — it positions the studio as operating ahead of conventional investor attention. Not for every audience, but correct for the right one.',
  },

} as const


// ─────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────

export const nav = {
  links: [
    { label: 'Work',    href: '#ventures',  note: 'Smooth scroll to ventures section.' },
    { label: 'Studio',  href: '#identity',  note: 'Smooth scroll to identity statement.' },
    { label: 'Hubs',    href: '#hubs',      note: 'Smooth scroll to hub blocks.' },
    { label: 'Contact', href: '#contact',   note: 'Smooth scroll to contact form. Secondary — the CTA button is primary.' },
  ],
  cta: {
    label: 'Start a project',
    href: '#contact',
    note: 'Primary nav CTA. Opens contact form section. Action-oriented — not "Contact us", not "Get in touch".',
  },
  mobileMenu: {
    open:  'Menu',
    close: 'Close',
    note:  'Aria-label only on mobile. The Lottie animation carries the visual — text is for screen readers.',
  },
  backToTop: 'Back to top',
} as const


// ─────────────────────────────────────────────────────────────
// PILLAR CONTENT
// These are the three founding statements. Fixed copy — not CMS-editable
// beyond the body text, which has a 80-char hard limit.
// ─────────────────────────────────────────────────────────────

export const pillars = {
  identity: {
    number: '01',
    label:  'Identity',
    body:   'A hybrid between a small agency and a startup incubator. Not purely either.',
    note:   'The "not purely either" is the klub-404 voice — it refuses the easy category.',
  },
  reach: {
    number: '02',
    label:  'Reach',
    body:   'Operating across EMEA via our Cairo and Amsterdam hubs. Two cities, one region.',
    note:   '"Two cities, one region" is the accent — adds meaning without adding words.',
  },
  focus: {
    number: '03',
    label:  'Focus',
    body:   'Building experiences that solve a problem. Not experiences for their own sake.',
    note:   '"Not experiences for their own sake" is the editorial discipline — it rules something out, which is always more credible than ruling things in.',
  },
} as const


// ─────────────────────────────────────────────────────────────
// IDENTITY STATEMENT
// Full-body text block. Accent is a short pull-phrase.
// ─────────────────────────────────────────────────────────────

export const identityStatement = {
  body: `klub-404 exists in the space between an agency and an incubator — close enough to both to borrow their best qualities, far enough from either to avoid their worst habits. We build AI-driven products for founders and companies who have a real problem to solve and the ambition to solve it properly. We operate across EMEA, with hubs in Cairo and Amsterdam, because the region is larger than its reputation suggests.`,
  accent: 'Neither. Both.',
  note:   'Body is 196 chars — within the 200-char slot. The accent "Neither. Both." is the bluntest possible summary of the hybrid identity.',
} as const


// ─────────────────────────────────────────────────────────────
// HUB DESCRIPTIONS
// One sentence each. Not geographic facts — editorial character.
// ─────────────────────────────────────────────────────────────

export const hubs = {
  cairo: {
    city:        'Cairo',
    region:      'Egypt, North Africa',
    description: 'Our founding hub — where the studio was built, and where the AI infrastructure across MENA is being defined right now.',
    coordinates: '30.0444° N, 31.2357° E',
    note:        '"Right now" — present tense, forward-looking. Cairo is not background; it is where the action is.',
  },
  amsterdam: {
    city:        'Amsterdam',
    region:      'Netherlands, Western Europe',
    description: 'Our European arm — positioned at the intersection of EU tech regulation, global capital, and a startup culture that has been doing this for decades.',
    coordinates: '52.3676° N, 4.9041° E',
    note:        '"Has been doing this for decades" — not boastful, contextual. Amsterdam\'s ecosystem credibility without overselling it.',
  },
} as const


// ─────────────────────────────────────────────────────────────
// INDUSTRY CARDS
// ─────────────────────────────────────────────────────────────

export const industries = {
  health: {
    name:        'Health / Medical',
    description: 'AI tools for diagnosis support, patient experience, and clinical operations — where getting it wrong is not an option.',
    note:        '"Where getting it wrong is not an option" — acknowledges the stakes without being alarmist.',
  },
  beauty: {
    name:        'Beauty & Wellness',
    description: 'Personalization technology and experience design for a sector moving from mass-market to precision care.',
    note:        '"Precision care" — elevates the sector. Avoids beauty-industry clichés.',
  },
  technology: {
    name:        'Technology',
    description: 'Infrastructure, platforms, and AI-native products for the companies building what\'s next — our home turf.',
    note:        '"Our home turf" — the only moment of first-person informality in the industry cards. Appropriate because technology is the studio\'s core competency.',
  },
} as const


// ─────────────────────────────────────────────────────────────
// APPROACH / PROCESS STEPS
// Four steps. Max 80 chars per body.
// ─────────────────────────────────────────────────────────────

export const approach = {
  sectionLabel: 'How we build',
  steps: [
    {
      number: '01',
      title:  'Find the real problem',
      body:   'Not the stated one. We spend time here before anything is designed or built.',
    },
    {
      number: '02',
      title:  'Define the right scope',
      body:   'We build the smallest thing that proves the idea — then we scale what works.',
    },
    {
      number: '03',
      title:  'Build with AI from the start',
      body:   'Not bolted on. AI is part of the architecture, not a feature added at the end.',
    },
    {
      number: '04',
      title:  'Ship and stay',
      body:   'We do not hand off and disappear. We remain involved through the first critical period.',
    },
  ],
  closingNote: 'Straightforward. We have found that complicated processes are often a substitute for unclear thinking.',
  note: 'The closing note is the editorial voice — dry, confident, self-aware. Interaction Specialist: this renders as a footnote-style line below the steps.',
} as const


// ─────────────────────────────────────────────────────────────
// CTA BAND VARIANTS
// One per structural interpretation. Same block, different copy.
// ─────────────────────────────────────────────────────────────

export const ctaBand = {

  /**
   * The Argument — logical, low-pressure
   */
  argument: {
    headline:  'If you have a real problem, we should talk.',
    ctaLabel:  'Start a project',
    subtext:   'No pitch deck required.',
    note:      '"No pitch deck required" removes friction from the ask. It is also honest.',
  },

  /**
   * The Signal — desire, direct
   */
  signal: {
    headline:  'Something in here looked familiar.',
    ctaLabel:  'Start a project',
    subtext:   null,
    note:      '"Something in here looked familiar" is the 404 wink — the visitor has just seen the portfolio and something resonated. This CTA catches that moment. No subtext needed.',
  },

  /**
   * The Map — geographic, targeted
   */
  map: {
    headline:  'Building in EMEA? So are we.',
    ctaLabel:  'Start a project',
    subtext:   'Cairo or Amsterdam — either hub, same studio.',
    note:      'Explicit regional targeting. The subtext addresses the question "which hub do I talk to?" before it is asked.',
  },

} as const


// ─────────────────────────────────────────────────────────────
// FORM COPY
// ─────────────────────────────────────────────────────────────

export const form = {
  sectionLabel: 'Start a project',
  intro:        'Tell us what you\'re building. We\'ll come back within 2 business days.',

  fields: {
    name: {
      label:       'Your name',
      placeholder: 'First and last',
    },
    email: {
      label:       'Email address',
      placeholder: 'you@company.com',
    },
    project: {
      label:       'Tell us about it',
      placeholder: 'What are you building?',
    },
    budget: {
      label:       'Rough budget',
      placeholder: 'e.g. $10k–$30k',
    },
  },

  submit: {
    idle:    'Send it',
    loading: 'Sending...',
    success: 'Sent!',
  },

  messages: {
    success: 'Got it. We\'ll be in touch within 2 business days.',
    error:   'That didn\'t go through.',
    errorAction: 'Try again',
  },

  validation: {
    required:     'This field is required',
    email:        'Check your email address',
    tooShort:     'Tell us a bit more — at least 20 characters',
    tooLong:      'That\'s more than we need — keep it to the essentials',
  },

  note: 'Validation messages appear inline below the field, never as modal alerts. Error color is not red — it is a muted amber. Red implies danger; a form error is not dangerous.',

} as const


// ─────────────────────────────────────────────────────────────
// VENTURES SECTION
// ─────────────────────────────────────────────────────────────

export const ventures = {
  sectionLabel:  'Ventures',
  filterAll:     'All',
  sortLabel:     'Sort',
  sortOptions: {
    featured:     'Featured',
    year:         'Recent',
    alphabetical: 'A–Z',
  },
  liveTag:       'Live',
  externalLink:  'View live site \u2197',
  note:          'The ↗ arrow (↗) is Unicode 2197. It signals external navigation without requiring an icon system dependency.',
} as const


// ─────────────────────────────────────────────────────────────
// EMPTY STATES
// ─────────────────────────────────────────────────────────────

export const emptyStates = {

  noFilterResults: {
    headline: 'Nothing here yet.',
    body:     'Try a different filter or clear all.',
    action:   'Clear filters',
    note:     '"Nothing here yet" is honest without being apologetic. The period at the end is intentional — it lands flatly, no uplift.',
  },

  categoryEmpty: {
    headline: 'Coming soon.',
    body:     'We\'re working on something in this space.',
    note:     '"In this space" is deliberately vague — it implies the work is underway without overpromising a timeline.',
  },

  portfolioUnlaunched: {
    headline: 'The portfolio is loading.',
    body:     'Our ventures will appear here as they go live.',
    note:     'For the period before any ventures are published. Placeholder for launch if the CMS is empty.',
  },

} as const


// ─────────────────────────────────────────────────────────────
// ERROR STATES
// ─────────────────────────────────────────────────────────────

export const errorStates = {

  pageNotFound: {
    headline:    'You found a 404.',
    body:        'That page doesn\'t exist — but the studio does.',
    action:      'Go home',
    note:        '"You found a 404" leans into the brand name as a literal HTTP status. The 404 page is the one place the brand is most self-aware. "Go home" — direct, no softening.',
  },

  networkError: {
    headline: 'Connection lost.',
    body:     null,
    action:   'Refresh the page',
    note:     'No body copy — the problem is self-explanatory. One action, stated plainly.',
  },

  formFailed: {
    headline: 'That didn\'t go through.',
    body:     null,
    action:   'Try again',
    note:     'Matches form.messages.error for consistency. The button replaces the submit button in error state — same position, different label.',
  },

  imageFailed: {
    headline: null,
    body:     null,
    action:   null,
    note:     'Show a neutral placeholder shape — no text. The error is visual; adding text makes it worse.',
  },

  serverError: {
    headline: 'Something broke on our end.',
    body:     'We\'re aware of it. Try again in a moment.',
    action:   'Refresh',
    note:     '"We\'re aware of it" is confident and accountable — it does not say "sorry for the inconvenience".',
  },

} as const


// ─────────────────────────────────────────────────────────────
// LOADING STATES
// ─────────────────────────────────────────────────────────────

export const loadingStates = {

  pageTransition: {
    copy:      null,
    visual:    'Progress bar + full-screen fade',
    note:      'No text during page transitions. The progress bar is sufficient. Verbal loading indicators add anxiety.',
  },

  imageLoading: {
    copy:      null,
    visual:    'Skeleton screen with shimmer animation',
    note:      'Skeleton color: 10% opacity of the final image\'s dominant color if known, otherwise neutral. No "Loading image" text.',
  },

  formSubmitting: {
    copy:      'Sending...',
    visual:    'Spinner replaces button text in-place',
    note:      'The button does not grow or change size. The text swaps. The spinner is inside the button bounds.',
  },

  projectsFetching: {
    copy:      'Loading projects',
    visual:    'Ellipsis dot animation after the text',
    note:      '"Loading projects" not "Loading..." — be specific about what is loading.',
  },

  filterApplying: {
    copy:      null,
    visual:    'FLIP animation — items animate to new positions',
    note:      'No loading indicator for filter changes. The FLIP animation IS the feedback. Never flash content.',
  },

} as const


// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────

export const footer = {
  tagline:   null,
  copyright: '\u00A9 2026 klub-404. All rights reserved.',
  hubs:      'Cairo \u00B7 Amsterdam',
  links: [
    { label: 'Privacy',        href: '/privacy' },
    { label: 'Terms',          href: '/terms' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/klub-404', ariaLabel: 'klub-404 on LinkedIn' },
    { label: 'X',        href: 'https://x.com/klub404',                 ariaLabel: 'klub-404 on X' },
  ],
  note: 'No footer tagline — the footer is a utility zone. The brand is already established by the time the visitor reaches it. A tagline here would be repetition.',
} as const


// ─────────────────────────────────────────────────────────────
// ARIA LABELS AND ACCESSIBILITY COPY
// These are not visible in the UI but are part of the copy system.
// ─────────────────────────────────────────────────────────────

export const aria = {
  navigation:     'Main navigation',
  mobileMenu:     'Open navigation menu',
  closeMenu:      'Close navigation menu',
  filterBar:      'Filter ventures by tag or industry',
  clearFilters:   'Clear all active filters',
  sortVentures:   'Sort ventures',
  ventureCard:    (name: string) => `View ${name} venture details`,
  hubImage:       (city: string) => `${city} hub — aerial photography`,
  formSubmit:     'Submit project inquiry',
  scrollToTop:    'Scroll to top of page',
  externalLink:   (site: string) => `Visit ${site} — opens in new tab`,
  loadingSpinner: 'Sending your message',
  skeleton:       'Content loading',
} as const


// ─────────────────────────────────────────────────────────────
// COMPLETE COPY EXPORT — FOR DEVELOPER CONSUMPTION
// One import, full access to all copy.
// ─────────────────────────────────────────────────────────────

export const copy = {
  heroHeadlines,
  nav,
  pillars,
  identityStatement,
  hubs,
  industries,
  approach,
  ctaBand,
  form,
  ventures,
  emptyStates,
  errorStates,
  loadingStates,
  footer,
  aria,
} as const

export type Copy = typeof copy
