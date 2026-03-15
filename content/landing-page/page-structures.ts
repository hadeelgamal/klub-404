/**
 * KLUB-404 — THREE STRUCTURAL INTERPRETATIONS
 * Content Architect: Page Architecture Specification
 *
 * Each interpretation reorders, weights, and emphasizes different blocks
 * from the block model to produce a different emotional arc for the visitor.
 *
 * A "weight" is not visual size — it is narrative priority.
 * A heavyweight block commands attention and scroll time.
 * A lightweight block is transitional — it earns its place but doesn't slow the story.
 *
 * All three interpretations use the same blocks from block-model.ts.
 * No new blocks are invented here. The difference is sequence, pacing, and emphasis.
 */

// ─────────────────────────────────────────────────────────────
// SHARED TYPE
// ─────────────────────────────────────────────────────────────

type NarrativeWeight = 'anchor' | 'heavy' | 'medium' | 'light' | 'transitional'

interface SequencedBlock {
  blockId: string
  weight: NarrativeWeight
  rationale: string        // why this block sits here in this interpretation
  pacing: string           // scroll pacing note for the Interaction Specialist
}

interface PageStructure {
  id: string
  name: string
  emotionalArc: string     // one sentence describing the feeling this structure creates
  targetVisitor: string    // who this structure speaks to best
  openingGambit: string    // what the visitor experiences in the first 3 seconds
  primaryConversion: string // where conversion pressure is highest
  sequence: SequencedBlock[]
  tradeoffs: string[]      // what this structure sacrifices vs gains
}


// ─────────────────────────────────────────────────────────────
// INTERPRETATION 01 — "THE ARGUMENT"
// Logic-first. Prove the case, then ask for the meeting.
// ─────────────────────────────────────────────────────────────

export const interpretationArgument: PageStructure = {
  id: 'structure-argument',
  name: 'The Argument',
  emotionalArc:
    'Visitor arrives skeptical, encounters a precise identity statement, is walked through evidence (pillars, stats, hubs, work), and converts because the case has been made — not because they were charmed.',
  targetVisitor:
    'Founders and operators who read before they scroll. C-suite in EMEA tech who have seen too many agency pitches. Anyone who Googled "venture studio EMEA" with their guard up.',
  openingGambit:
    'The hero headline is a statement of paradox — the 404 brand surfaces immediately. No ambient video, no full-bleed photography. Typography dominates. The sub-headline explains the model in one clause.',
  primaryConversion:
    'The contact form at the bottom. Conversion is earned by the time the visitor reaches it — the CTA band is pressure, not persuasion.',
  sequence: [
    {
      blockId: 'lp-nav',
      weight: 'transitional',
      rationale: 'Navigation is infrastructure. It does not argue. It orients.',
      pacing: 'Fades in at 0ms. Pins immediately. No dramatic entrance — it was already there.',
    },
    {
      blockId: 'lp-hero',
      weight: 'anchor',
      rationale:
        'In The Argument, the hero carries the thesis. Headline is declarative, not evocative. No background video — pure type on a dark ground. The paradox of "404 / not found / found" is stated, not implied.',
      pacing:
        'Full viewport height. Scroll-scrub: headline opacity holds at 100% for the first 30% of scroll, then fades as the identity block rises. Gives the visitor time to read before the page moves.',
    },
    {
      blockId: 'lp-identity',
      weight: 'heavy',
      rationale:
        'The identity statement is the logical foundation. In this structure it comes before the pillars because you need to know what klub-404 is before the three pillars mean anything. No accent pull-quote — the full statement runs.',
      pacing:
        'Scrub-reveal: each line of the statement reveals on scroll, not on viewport entry. Forces a slow read. Interaction Specialist note: line-by-line clip-path, 80px trigger distance per line.',
    },
    {
      blockId: 'lp-pillar-identity',
      weight: 'heavy',
      rationale: 'Three pillars are the sub-arguments. They follow the identity thesis.',
      pacing: 'Slide-up on viewport entry. 0ms delay — leads the trio.',
    },
    {
      blockId: 'lp-pillar-reach',
      weight: 'heavy',
      rationale: 'Second pillar completes the geographic argument.',
      pacing: '120ms stagger offset from lp-pillar-identity.',
    },
    {
      blockId: 'lp-pillar-focus',
      weight: 'heavy',
      rationale: 'Third pillar closes the argument — problem-solving as the north star.',
      pacing: '240ms stagger offset. The trio lands as a set, not simultaneously.',
    },
    {
      blockId: 'lp-stats',
      weight: 'medium',
      rationale:
        'Stats follow the pillars as evidence. In The Argument, numbers serve the claim rather than open the emotional hook. countUp animation on entry — feels earned, not flashy.',
      pacing: 'Fade in after pillar trio has settled. 400ms delay after trio entry completes.',
    },
    {
      blockId: 'lp-divider-a',
      weight: 'transitional',
      rationale: 'Line draw signals: we have made the abstract case. Now we show the physical reality.',
      pacing: 'Line draws left-to-right, 700ms. No pause before next block.',
    },
    {
      blockId: 'lp-hub-cairo',
      weight: 'medium',
      rationale:
        'Cairo hub appears first — non-Western-first ordering is a deliberate editorial choice that signals EMEA authenticity. The argument benefits from this specificity.',
      pacing: 'Slide-up with parallax on background image. 0ms delay.',
    },
    {
      blockId: 'lp-hub-amsterdam',
      weight: 'medium',
      rationale: 'Amsterdam follows as the European arm. Together they prove the reach pillar.',
      pacing: '150ms stagger after Cairo.',
    },
    {
      blockId: 'lp-industries',
      weight: 'medium',
      rationale:
        'Industry cards answer: "OK, but what do you actually build?" Placed after hubs because geography + sector together close the credibility loop.',
      pacing: 'Three cards stagger at 80ms intervals. Hover: fill animation.',
    },
    {
      blockId: 'lp-ventures',
      weight: 'heavy',
      rationale:
        'The portfolio is the proof. In The Argument it carries maximum weight — the filter bar is prominent, the grid is generous. Empty state is acknowledged with honest copy.',
      pacing: 'Cards scale-in at 60ms stagger per card. Filter transitions use FLIP animation.',
    },
    {
      blockId: 'lp-divider-b',
      weight: 'transitional',
      rationale: '"404" glyph divider. Signals the brand name mid-page — a dry typographic wink.',
      pacing: 'Fade in, 500ms. The 404 glyph does not animate — its stillness is the joke.',
    },
    {
      blockId: 'lp-approach',
      weight: 'medium',
      rationale:
        'Process comes late in this structure — after the work. The argument: see what we built, then understand how. Inverts the typical "here is our process" agency template.',
      pacing: 'Scrub-reveal per step. Each step unlocks at its scroll trigger point.',
    },
    {
      blockId: 'lp-cta-band',
      weight: 'medium',
      rationale:
        'The CTA band in The Argument is not emotional — it is logical. "The case has been made. Here is what to do next." The magnetic button hover effect gives it the only moment of levity.',
      pacing: 'Scale-in, 500ms. Magnetic cursor effect activates immediately on hover.',
    },
    {
      blockId: 'lp-contact',
      weight: 'anchor',
      rationale:
        'The form is the conclusion of the argument. It sits at full weight — not tucked in a modal, not abbreviated. The visitor should feel they have arrived at a decision point, not been redirected.',
      pacing: 'Slide-up. Fields appear sequentially with 80ms stagger for a deliberate feel.',
    },
    {
      blockId: 'lp-footer',
      weight: 'light',
      rationale: 'Utility. Closes the document.',
      pacing: 'Fade in. No drama.',
    },
  ],
  tradeoffs: [
    'GAINS: High-trust conversion from informed visitors. Low bounce from curious-but-skeptical operators.',
    'GAINS: The portfolio section gets maximum dwell time, which matters once ventures are populated.',
    'SACRIFICES: First-time visitors who scroll fast may not read the identity statement — the scrub reveal depends on deliberate scrolling.',
    'SACRIFICES: Less immediate visual impact than Interpretation 02. The argument is patient; impatient visitors may leave before it pays off.',
    'WATCH: The identity block scrub must be tuned — too slow and it feels broken, too fast and the argument is lost.',
  ],
}


// ─────────────────────────────────────────────────────────────
// INTERPRETATION 02 — "THE SIGNAL"
// Emotion-first. Capture attention, create desire, then deliver proof.
// ─────────────────────────────────────────────────────────────

export const interpretationSignal: PageStructure = {
  id: 'structure-signal',
  name: 'The Signal',
  emotionalArc:
    'Visitor is immediately arrested by a strong visual opening, feels the dual identity of EMEA ambition and technical precision, encounters the work before the explanation, and converts from desire rather than logic.',
  targetVisitor:
    'Creative founders and growth-stage startups who decide on feel. Brand-aware investors scanning for studios with taste. International visitors unfamiliar with the Cairo–Amsterdam axis who need to be impressed before they commit attention.',
  openingGambit:
    'Full-viewport hero with ambient video loop. The headline is poetic and oblique — the 404 brand is implied, not stated. Location is present as a typographic detail, not a claim. The scroll cue is visible and inviting.',
  primaryConversion:
    'The mid-page CTA band, which appears immediately after the venture grid — desire peaks at proof, and the CTA catches it at that moment.',
  sequence: [
    {
      blockId: 'lp-nav',
      weight: 'transitional',
      rationale: 'Same as all structures — infrastructure, not narrative.',
      pacing: 'Fades in. Transparent until first scroll, then gains background on scroll.',
    },
    {
      blockId: 'lp-hero',
      weight: 'anchor',
      rationale:
        'In The Signal, the hero is maximally immersive. Background video is active. The headline is the most poetic of the three options (see microcopy inventory Option B). The location tag "Cairo · Amsterdam" sits as a whisper below the headline — it does not explain, it situates.',
      pacing:
        'Full viewport. Cursor trail effect active. Scroll cue pulses after 3s dwell. Hero does not scrub — it fades as a whole when the visitor scrolls past, which creates a cinematic cut to the next section.',
    },
    {
      blockId: 'lp-hub-cairo',
      weight: 'heavy',
      rationale:
        'In The Signal, the hubs come immediately after the hero — before any text explanation. The visitor experiences the geography viscerally: Cairo's architectural image, Amsterdam's urban texture. This is EMEA as a felt reality, not a claimed market.',
      pacing:
        'Two-column layout on desktop. Parallax backgrounds. Both cards enter simultaneously — no stagger — for a single visual impact.',
    },
    {
      blockId: 'lp-hub-amsterdam',
      weight: 'heavy',
      rationale: 'Paired with Cairo. In The Signal, they are equals — rendered side by side.',
      pacing: '0ms offset — simultaneous with Cairo in this structure.',
    },
    {
      blockId: 'lp-ventures',
      weight: 'anchor',
      rationale:
        'The portfolio comes third, before the pillars or identity statement. This is the most aggressive inversion. The work IS the argument in The Signal — the visitor sees what exists before they are told what to believe. The filter bar is prominent but the default view shows all ventures unsorted.',
      pacing:
        'Grid animates in with 60ms stagger per card. The section is pinned for one full viewport scroll on desktop — the grid does not scroll away immediately, giving it dwell time.',
    },
    {
      blockId: 'lp-cta-band',
      weight: 'heavy',
      rationale:
        'CTA appears immediately after the portfolio — peak desire moment. In The Signal this is the primary conversion point. The headline is provocative (see microcopy inventory). The magnetic button effect is most appropriate here.',
      pacing:
        'Scale-in with overshoot (back.out easing). The button magnetic effect is pronounced — 30% cursor offset at max.',
    },
    {
      blockId: 'lp-divider-a',
      weight: 'transitional',
      rationale: 'Line draw separates the desire phase from the proof-of-reasoning phase.',
      pacing: '700ms line draw. Breathing room before the explanation begins.',
    },
    {
      blockId: 'lp-identity',
      weight: 'medium',
      rationale:
        'In The Signal, the identity statement arrives after the visitor has already been won. It is confirmation, not persuasion. The accent pull-quote is active here — a single large phrase that captures the brand in four words or fewer.',
      pacing: 'Standard viewport-entry fade — no scrub. The visitor is reading willingly now.',
    },
    {
      blockId: 'lp-pillar-identity',
      weight: 'medium',
      rationale: 'Pillars explain the structure. Medium weight — they answer "how" not "whether".',
      pacing: 'Slide-up, 0ms.',
    },
    {
      blockId: 'lp-pillar-reach',
      weight: 'medium',
      rationale: 'Second pillar.',
      pacing: '120ms stagger.',
    },
    {
      blockId: 'lp-pillar-focus',
      weight: 'medium',
      rationale: 'Third pillar closes.',
      pacing: '240ms stagger.',
    },
    {
      blockId: 'lp-industries',
      weight: 'light',
      rationale:
        'Industries are referenced but not dwelled upon in The Signal. Three compact cards — the hover fill gives them personality without demanding attention.',
      pacing: 'Simultaneous entry, no stagger. Compact card height.',
    },
    {
      blockId: 'lp-stats',
      weight: 'light',
      rationale:
        'Stats appear late in The Signal — they are footnotes to the emotional case, not arguments. countUp still runs but the section is visually minimal.',
      pacing: 'Fade in. No pin. Visitor moves through quickly.',
    },
    {
      blockId: 'lp-divider-b',
      weight: 'transitional',
      rationale: 'Standard 404-glyph divider before the form.',
      pacing: 'Fade in.',
    },
    {
      blockId: 'lp-approach',
      weight: 'light',
      rationale:
        'Process is the least emotionally compelling content. In The Signal it is compressed — fewer steps displayed, shorter copy. It exists as due diligence content, not a selling point.',
      pacing: 'Viewport-entry fade. No scrub.',
    },
    {
      blockId: 'lp-contact',
      weight: 'heavy',
      rationale:
        'The form returns to heavy weight at the bottom. The Signal visitor who makes it here is already converted — the form should feel like a natural next step, not a final hurdle. The intro line is warmer than in The Argument.',
      pacing: 'Slide-up. Fields stagger in at 80ms.',
    },
    {
      blockId: 'lp-footer',
      weight: 'light',
      rationale: 'Utility.',
      pacing: 'Fade in.',
    },
  ],
  tradeoffs: [
    'GAINS: Highest visual impact on first load. Best for social sharing — the hero is screenshot-worthy.',
    'GAINS: Portfolio-first ordering rewards the studio once ventures are populated. The work sells itself.',
    'GAINS: CTA conversion opportunity appears earlier in the scroll — less content to traverse before a decision.',
    'SACRIFICES: The argument is not made before the ask. Visitors who need context before trust will scroll past the CTA.',
    'SACRIFICES: The identity statement carries less weight when it arrives after the work — some visitors will not reach it.',
    'WATCH: The portfolio section pin on desktop must be optional/removable for mobile — viewport pinning on mobile is friction, not delight.',
  ],
}


// ─────────────────────────────────────────────────────────────
// INTERPRETATION 03 — "THE MAP"
// Geography-first. The twin hubs are the organizing principle.
// Cairo and Amsterdam frame everything else.
// ─────────────────────────────────────────────────────────────

export const interpretationMap: PageStructure = {
  id: 'structure-map',
  name: 'The Map',
  emotionalArc:
    'The visitor is oriented geographically before anything else — this studio exists in a specific place, between two cities, across a real region. Every subsequent block radiates outward from that geographic fact. The 404 brand becomes a bridge between Cairo and Amsterdam, East and West.',
  targetVisitor:
    'International investors or partners evaluating EMEA presence. Startups specifically looking for a studio with genuine dual-region access (regulatory, cultural, network). Visitors who came from a Google search for "venture studio Cairo" or "startup studio Amsterdam EMEA".',
  openingGambit:
    'The hero headline leads with the geographic tension: two cities, one studio, one region. The sub-headline names both cities explicitly. The scroll cue is a directional compass or coordinate animation — the metaphor is navigation.',
  primaryConversion:
    'The contact form at the bottom. This structure is the longest path to conversion and the most deliberate — it serves visitors who need the full picture before they act.',
  sequence: [
    {
      blockId: 'lp-nav',
      weight: 'transitional',
      rationale: 'Infrastructure.',
      pacing: 'Fades in. Pins on scroll.',
    },
    {
      blockId: 'lp-hero',
      weight: 'anchor',
      rationale:
        'In The Map, the hero headline is the most geographic of the three options (see microcopy inventory Option C). The location tag "Cairo · Amsterdam" is rendered larger than in other structures — a design brief note, not a content change. The background media should be a slow pan between Cairo and Amsterdam visual elements.',
      pacing:
        'Full viewport. Parallax on background. The hero scrubs: headline stays fixed for first 40% of scroll, then the camera "moves" — scroll triggers a crossfade between Cairo imagery and Amsterdam imagery. Requires coordination with the Interaction Specialist on a scroll-scrubbed media transition.',
    },
    {
      blockId: 'lp-hub-cairo',
      weight: 'anchor',
      rationale:
        'In The Map, hub blocks are elevated to anchor weight. Cairo is not a supporting detail — it is a founding argument. The city description is longer here (max 160 chars vs the default 120). The coordinates are always visible, not optional.',
      pacing:
        'Full-width, full-viewport block. Not a card in a grid — a standalone section. Parallax background at 0.5x scroll speed. Slide-up entry.',
    },
    {
      blockId: 'lp-hub-amsterdam',
      weight: 'anchor',
      rationale:
        'Same as Cairo — full-width, full-viewport. The two hubs are the two chapters of the geographic story. Between them, a visual connector (a thin line, a flight path SVG, or a map element) can be placed as a divider — this is a Multimedia Producer brief, not a content slot.',
      pacing:
        'Enters on scroll with same parallax treatment as Cairo. The transition between the two hub blocks is handled by the Interaction Specialist as a cinematic cut or wipe.',
    },
    {
      blockId: 'lp-identity',
      weight: 'heavy',
      rationale:
        'The identity statement follows the geography — "This is where we are. Now here is what we are." In The Map, the identity statement explicitly references the dual-hub reality. The accent pull-quote is active.',
      pacing: 'Scrub reveal — but gentler than The Argument version. Two lines, not word-by-word.',
    },
    {
      blockId: 'lp-pillar-identity',
      weight: 'medium',
      rationale: 'Pillars follow the identity. Same as default.',
      pacing: 'Slide-up, 0ms.',
    },
    {
      blockId: 'lp-pillar-reach',
      weight: 'heavy',
      rationale:
        'In The Map, the Reach pillar is promoted to heavy weight. It is the geographic argument crystallized into three sentences. The design brief should call out this pillar — it may warrant a different visual treatment (larger type, color accent) in this structure.',
      pacing: '120ms stagger. Interaction Specialist note: Reach pillar gets a secondary highlight color on text on hover in this structure.',
    },
    {
      blockId: 'lp-pillar-focus',
      weight: 'medium',
      rationale: 'Focus pillar returns to medium in this structure.',
      pacing: '240ms stagger.',
    },
    {
      blockId: 'lp-industries',
      weight: 'medium',
      rationale:
        'Industries contextualize the geography — "this is what we build in this region." Medium weight. The cards should map visually to the hubs if possible (e.g. Health/Medical is strong in MENA, Technology in the EU corridor). A design note, not a content constraint.',
      pacing: 'Three cards, 80ms stagger.',
    },
    {
      blockId: 'lp-stats',
      weight: 'medium',
      rationale:
        'Stats are geographically weighted in The Map. The EMEA region stat is the anchor number. Hubs count is the human number. These appear together as a coherent geographic proof.',
      pacing: 'countUp on viewport entry. Slight delay after industries.',
    },
    {
      blockId: 'lp-ventures',
      weight: 'heavy',
      rationale:
        'Portfolio appears after the geographic and structural case is made. In The Map, the filter bar defaults to industry view rather than tag view — because visitors are thinking in sectors and regions, not tags.',
      pacing: 'Standard 60ms per-card stagger. FLIP animation on filter change.',
    },
    {
      blockId: 'lp-divider-b',
      weight: 'transitional',
      rationale: '404-glyph divider. In The Map context, the 404 glyph functions as a coordinate — a reference point between the geographic story and the next phase.',
      pacing: 'Fade in.',
    },
    {
      blockId: 'lp-approach',
      weight: 'medium',
      rationale:
        'Process is medium weight. In The Map it is framed geographically: "We build here, for here, with teams from here." The steps should reference the dual-hub model where relevant.',
      pacing: 'Scrub reveal per step.',
    },
    {
      blockId: 'lp-cta-band',
      weight: 'medium',
      rationale:
        'The CTA band in The Map carries a geographic hook: the headline references the region directly. See microcopy inventory for The Map CTA variant.',
      pacing: 'Scale-in. Magnetic button.',
    },
    {
      blockId: 'lp-contact',
      weight: 'anchor',
      rationale:
        'The form is the destination of the map. It should feel like a natural arrival — the geographic framing of the page has contextualized this moment as "contacting a studio that is specifically equipped for your region".',
      pacing: 'Slide-up. Fields at 80ms stagger.',
    },
    {
      blockId: 'lp-footer',
      weight: 'light',
      rationale: 'Utility. "Cairo · Amsterdam" appears in the footer as a persistent reminder.',
      pacing: 'Fade in.',
    },
  ],
  tradeoffs: [
    'GAINS: Strongest differentiation from generic venture studios. The geography-first approach is rare and credible.',
    'GAINS: Directly serves search intent for "EMEA venture studio" — the geographic positioning is front-loaded for organic visitors.',
    'GAINS: The dual-hub story is compelling for international investors who want regional reach without two separate engagements.',
    'SACRIFICES: The longest path to the portfolio. Visitors who came to see the work must scroll through two full-viewport hub sections first.',
    'SACRIFICES: The hub sections require exceptional photography and copywriting. If either is mediocre, the entire structure weakens.',
    'WATCH: The hero scrub (Cairo-to-Amsterdam crossfade) is technically complex. Interaction Specialist must confirm feasibility and a fallback must exist (static image, no crossfade).',
  ],
}


// ─────────────────────────────────────────────────────────────
// COMPARISON TABLE — FOR TEAM REVIEW
// ─────────────────────────────────────────────────────────────

export const structureComparisonTable = {
  columns: ['Dimension', 'The Argument', 'The Signal', 'The Map'],
  rows: [
    ['Opening emotion',      'Credibility',         'Desire',              'Orientation'],
    ['First content after hero', 'Identity statement', 'Hub photography',  'Hub photography (full-bleed)'],
    ['Portfolio position',   'After hubs + industries', 'Third (before explanation)', 'After pillars + industries'],
    ['Primary CTA position', 'Bottom (earned)',      'Mid-page (peak desire)', 'Bottom (arrived)'],
    ['Hero media',           'No video — pure type', 'Ambient video loop', 'Crossfade scroll scrub'],
    ['Hub block weight',     'Medium',               'Heavy (side-by-side)', 'Anchor (full-viewport each)'],
    ['Stats position',       'After pillars',        'Near bottom',         'After industries'],
    ['Approach position',    'After portfolio',      'Near bottom',         'After portfolio'],
    ['Identity statement scrub', 'Full scrub (slow)', 'Viewport entry fade', 'Gentle two-line scrub'],
    ['Reach pillar emphasis','Equal with others',    'Equal with others',   'Promoted to heavy weight'],
    ['Technical complexity', 'Low-medium',           'Medium (video, pin)', 'High (scroll crossfade)'],
    ['Best when portfolio is', 'Partially populated', 'Well-populated',     'Any — geography is content'],
    ['Recommended for launch', 'Yes',                'Yes, if 3+ ventures', 'Phase 2 — needs photography'],
  ],
}
