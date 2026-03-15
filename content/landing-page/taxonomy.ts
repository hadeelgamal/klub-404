/**
 * KLUB-404 — PORTFOLIO TAXONOMY
 * Content Architect: Classification System Specification
 *
 * This taxonomy governs how ventures (portfolio companies and studio-built products)
 * are tagged, filtered, sorted, and surface-mapped to animation styles.
 *
 * Design principle: Every classification decision has a functional consequence.
 * Tags drive filter UI. Industry drives the animation preset that loads.
 * Stage determines which UI affordances appear on the venture card.
 * HubOrigin affects default sort order and display in geographic filters.
 *
 * The taxonomy is intentionally extensible — the club will grow into industries
 * and models not yet represented. The type system enforces discipline today
 * and allows addition without breaking what exists.
 */

// ─────────────────────────────────────────────────────────────
// PRIMARY CLASSIFICATIONS
// ─────────────────────────────────────────────────────────────

/**
 * VENTURE TAGS
 * Functional descriptors of what the venture does or how it is built.
 * A venture can hold multiple tags — max 5 for integrity.
 * The filter UI renders a maximum of 3 tags on a card; the rest are in metadata.
 *
 * Tag philosophy: tags describe the WORK, not the market.
 * "ai-native" means AI is in the architecture.
 * "health" is an industry — it belongs in the Industry field.
 */
export type VentureTag =
  | 'ai-native'       // AI is foundational to the product, not decorative
  | 'platform'        // multi-sided or API-driven
  | 'consumer'        // B2C or D2C product
  | 'enterprise'      // B2B, sold to organizations
  | 'marketplace'     // connects supply and demand
  | 'saas'            // subscription software model
  | 'data'            // data product or analytics layer
  | 'infrastructure'  // developer tooling, APIs, backend
  | 'mobile-first'    // primary experience is on-device
  | 'embedded'        // within an existing ecosystem (WhatsApp, etc.)
  | 'hardware'        // physical component in the product
  | 'community'       // network effects or peer-driven value
  | 'automation'      // workflow or process replacement
  | 'personalization' // adaptation to individual user profile
  | 'clinical'        // direct clinical or diagnostic application


/**
 * INDUSTRY
 * The sector the venture operates in.
 * Industry is singular per venture — a venture belongs to one primary sector.
 * Industry drives the animationStyle preset (see animation-mapping.ts).
 */
export type VentureIndustry =
  | 'health-medical'    // Hospitals, clinics, medical devices, diagnostics
  | 'beauty-wellness'   // Skincare, fitness, mental wellness, nutrition
  | 'technology'        // Developer tools, infra, B2B SaaS
  | 'fintech'           // Payments, lending, insurance, wealth
  | 'education'         // Learning, upskilling, credentialing
  | 'retail-commerce'   // Physical or digital retail
  | 'media'             // Content, publishing, creative tools
  | 'real-estate'       // PropTech, urban, housing
  | 'logistics'         // Supply chain, last-mile, fleet
  | 'sustainability'    // Climate, ESG, circular economy


/**
 * VENTURE STAGE
 * Lifecycle position of the venture.
 * Stage controls which UI affordances appear on the card and in the filter:
 *   - 'concept'    → No external link. Card shows "In development" badge.
 *   - 'build'      → No external link. Card shows "Building" badge.
 *   - 'beta'       → External link optional. Card shows "Beta" badge.
 *   - 'live'       → External link required. Card shows "Live" badge.
 *   - 'scaled'     → External link required. Card shows no stage badge — it speaks for itself.
 *   - 'exited'     → External link to acquisition/outcome. Card shows "Exited" badge.
 *
 * Filtering behavior: by default the filter UI shows all stages.
 * A "Live only" quick-filter toggle is available.
 */
export type VentureStage =
  | 'concept'   // Pre-build — idea validated, product not started
  | 'build'     // In active development
  | 'beta'      // Available to test users, not public launch
  | 'live'      // Publicly launched and operating
  | 'scaled'    // Past inflection — meaningful user base or revenue
  | 'exited'    // Acquired, merged, or otherwise concluded


/**
 * HUB ORIGIN
 * Which hub the venture was originated from.
 * Not necessarily where the team is — where the studio relationship lives.
 * Affects default geographic filter and display on hub pages.
 */
export type HubOrigin = 'cairo' | 'amsterdam' | 'both'


/**
 * STUDIO RELATIONSHIP
 * How klub-404 is involved in this venture.
 * This is internal metadata — it does not appear on the public card
 * but drives how the venture is presented (founder story vs. studio-built narrative).
 */
export type StudioRelationship =
  | 'founded'       // klub-404 founded this venture
  | 'co-founded'    // Co-built with an external founder
  | 'accelerated'   // Studio supported but did not co-found
  | 'invested'      // Financial relationship, limited operational involvement
  | 'built-for'     // Agency engagement that became a venture


/**
 * ANIMATION STYLE
 * Inherited from the industry classification via the animation mapping.
 * This field is computed, not manually entered in the CMS.
 * See animation-mapping.ts for the full mapping table.
 */
export type VentureAnimationStyle =
  | 'elegant'     // luxury, deliberate, slow
  | 'kinetic'     // fast, bold, energetic
  | 'editorial'   // minimal, typographic, precise
  | 'immersive'   // spatial, full-bleed, motion-heavy


// ─────────────────────────────────────────────────────────────
// VENTURE INTERFACE — THE FULL DATA MODEL
// ─────────────────────────────────────────────────────────────

export interface Venture {
  // Identity
  id: string                      // UUID — stable identifier for animation and filter keying
  name: string                    // Public name of the venture
  slug: string                    // URL-safe slug for detail page routing
  tagline: string                 // One sentence. Max 100 chars. The problem it solves, not a marketing line.

  // Classification
  tags: VentureTag[]              // 1–5 tags. Required minimum of 1.
  industry: VentureIndustry       // Singular. Required.
  stage: VentureStage             // Required.
  hubOrigin: HubOrigin            // Required.
  studioRelationship: StudioRelationship // Internal only — not rendered on public card.

  // Computed
  animationStyle: VentureAnimationStyle  // Derived from industry via animation-mapping.ts. Do not set manually.

  // Metadata
  year: number                    // Year of studio engagement start. 4-digit.
  featured: boolean               // Promoted to top of default grid. Max 3 featured at once.
  client?: string                 // If built-for — name of the client organization.

  // Assets
  thumbnail: VentureAsset         // Required. 4:3 ratio.
  logoMark?: VentureAsset         // Optional. Used in filtered grid view and footer.

  // Links
  externalUrl?: string            // Required if stage is 'live' or 'scaled' or 'exited'.
  caseStudySlug?: string          // Internal route if a case study exists.

  // Card copy (used in venture card block)
  shortDesc: string               // One sentence problem statement. Max 100 chars. Not the tagline.
}


// ─────────────────────────────────────────────────────────────
// ASSET MODEL FOR VENTURE MEDIA
// ─────────────────────────────────────────────────────────────

export interface VentureAsset {
  src: string                 // URL or CMS asset ID
  alt: string                 // Descriptive alt text. Required for all images.
  width: number               // Native width in pixels
  height: number              // Native height in pixels
  blurDataUrl?: string        // Base64 low-res placeholder for shimmer loading
  dominantColor?: string      // Hex — used to set skeleton screen color
}


// ─────────────────────────────────────────────────────────────
// FILTER STATE MODEL
// The runtime state object for the ventures filter system.
// Developers wire the FilterState to the FLIP animation controller.
// ─────────────────────────────────────────────────────────────

export interface FilterState {
  activeTags: VentureTag[]
  activeIndustry: VentureIndustry | 'all'
  activeStage: VentureStage | 'all'
  activeHub: HubOrigin | 'all'
  liveOnly: boolean               // Quick toggle — filters to stage: live or scaled
  sortBy: 'featured' | 'year' | 'alphabetical'
}

export const defaultFilterState: FilterState = {
  activeTags:     [],
  activeIndustry: 'all',
  activeStage:    'all',
  activeHub:      'all',
  liveOnly:       false,
  sortBy:         'featured',
}


// ─────────────────────────────────────────────────────────────
// FILTER ANIMATION CONTRACT
// Rules the Interaction Specialist must implement.
// These are content-level constraints, not implementation details.
// ─────────────────────────────────────────────────────────────

export const filterAnimationContract = {
  hideTransition: {
    property:  'opacity + scale',
    target:    0,
    scaleTo:   0.95,
    duration:  250,              // ms
    easing:    'ease-in',
    note:      'Items animate OUT before layout recalculates. Never teleport content.',
  },
  showTransition: {
    property:  'opacity + scale',
    target:    1,
    scaleFrom: 0.95,
    duration:  350,              // ms
    easing:    'ease-out',
    stagger:   60,               // ms per item
    note:      'Items animate IN after FLIP layout is calculated. 60ms stagger creates a cascade.',
  },
  layoutTransition: {
    technique:  'FLIP',          // First, Last, Invert, Play
    duration:   400,             // ms for position animation
    easing:     'ease-in-out',
    note:       'FLIP handles the position change of items that stay visible. Items do not jump to new positions.',
  },
  emptyState: {
    delay:      350,             // ms — appears after hide transitions complete
    entry:      'fade',
    duration:   300,
    note:       'Empty state fades in after the grid has cleared. It does not appear during the transition.',
  },
} as const


// ─────────────────────────────────────────────────────────────
// STAGE BADGE CONFIGURATION
// Maps stage to public display label and visual treatment.
// ─────────────────────────────────────────────────────────────

export const stageBadgeConfig: Record<VentureStage, {
  label: string,
  visible: boolean,
  colorRole: 'neutral' | 'active' | 'success' | 'accent' | 'muted'
}> = {
  concept:  { label: 'In development', visible: true,  colorRole: 'muted'   },
  build:    { label: 'Building',       visible: true,  colorRole: 'neutral'  },
  beta:     { label: 'Beta',           visible: true,  colorRole: 'accent'   },
  live:     { label: 'Live',           visible: true,  colorRole: 'active'   },
  scaled:   { label: '',              visible: false, colorRole: 'neutral'  },  // no badge — it speaks for itself
  exited:   { label: 'Exited',         visible: true,  colorRole: 'success'  },
}


// ─────────────────────────────────────────────────────────────
// TAG DISPLAY LABELS
// Maps raw tag values to human-readable filter chip labels.
// The raw values are in the data; these are what the user sees.
// ─────────────────────────────────────────────────────────────

export const tagDisplayLabels: Record<VentureTag, string> = {
  'ai-native':       'AI-native',
  'platform':        'Platform',
  'consumer':        'Consumer',
  'enterprise':      'Enterprise',
  'marketplace':     'Marketplace',
  'saas':            'SaaS',
  'data':            'Data',
  'infrastructure':  'Infrastructure',
  'mobile-first':    'Mobile',
  'embedded':        'Embedded',
  'hardware':        'Hardware',
  'community':       'Community',
  'automation':      'Automation',
  'personalization': 'Personalization',
  'clinical':        'Clinical',
}


// ─────────────────────────────────────────────────────────────
// INDUSTRY DISPLAY LABELS
// ─────────────────────────────────────────────────────────────

export const industryDisplayLabels: Record<VentureIndustry, string> = {
  'health-medical':   'Health',
  'beauty-wellness':  'Beauty & Wellness',
  'technology':       'Technology',
  'fintech':          'Fintech',
  'education':        'Education',
  'retail-commerce':  'Retail',
  'media':            'Media',
  'real-estate':      'Real Estate',
  'logistics':        'Logistics',
  'sustainability':   'Sustainability',
}


// ─────────────────────────────────────────────────────────────
// TAXONOMY INTEGRITY RULES
// Checked at CMS publish time, not at render time.
// These are documented constraints, not runtime validators.
// ─────────────────────────────────────────────────────────────

export const taxonomyRules = [
  {
    rule:    'A venture must have at least 1 tag and no more than 5.',
    field:   'tags',
    enforce: 'CMS validation',
  },
  {
    rule:    'A venture tagged "live" or "scaled" must have a valid externalUrl.',
    field:   'externalUrl + stage',
    enforce: 'CMS validation',
  },
  {
    rule:    'animationStyle is computed from industry. Do not allow manual override in CMS.',
    field:   'animationStyle',
    enforce: 'CMS read-only field',
  },
  {
    rule:    'Max 3 ventures may have featured: true at any time.',
    field:   'featured',
    enforce: 'CMS unique count check',
  },
  {
    rule:    'thumbnail.alt must not be empty, must not be the venture name alone.',
    field:   'thumbnail.alt',
    enforce: 'CMS validation',
  },
  {
    rule:    'shortDesc must differ from tagline by at least 30 characters. No copy-pasting.',
    field:   'shortDesc',
    enforce: 'Editorial review — not automated',
  },
] as const


// ─────────────────────────────────────────────────────────────
// EXAMPLE VENTURE — REFERENCE IMPLEMENTATION
// Demonstrates correct taxonomy usage for CMS editors.
// Not real data — do not publish.
// ─────────────────────────────────────────────────────────────

export const exampleVenture: Venture = {
  id:                  'v-example-001',
  name:                'Noor Health',
  slug:                'noor-health',
  tagline:             'AI-powered diagnostic support for primary care clinics in the MENA region.',
  tags:                ['ai-native', 'clinical', 'platform'],
  industry:            'health-medical',
  stage:               'beta',
  hubOrigin:           'cairo',
  studioRelationship:  'co-founded',
  animationStyle:      'elegant',       // computed from 'health-medical' → see animation-mapping.ts
  year:                2025,
  featured:            true,
  thumbnail: {
    src:            '/assets/ventures/noor-health/thumbnail.jpg',
    alt:            'Noor Health app interface showing a diagnostic summary screen on a tablet',
    width:          1200,
    height:         900,
    blurDataUrl:    'data:image/jpeg;base64,/9j/...',
    dominantColor:  '#1A2B3C',
  },
  externalUrl:         'https://noor.health',
  shortDesc:           'Diagnostic support for clinicians who see 40 patients a day with 10 minutes per consultation.',
}
