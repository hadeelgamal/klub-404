/**
 * KLUB-404 — PRODUCTION MICROCOPY
 * Content Architect: Final Copy for Blank Page Concept + The Argument Structure
 *
 * This file supersedes microcopy.ts for production use.
 * All copy here is final. Not options. Not variants. Not placeholders.
 *
 * Structure: The Argument
 * Concept: Blank Page (crafted chaos, studio-in-process, physical objects placed deliberately)
 * Voice: Direct. Dry. Technically self-aware. Second person for interface. "We" for studio.
 *
 * The Argument builds sequentially — each section is the next thing placed on the page.
 * Copy is written to match that energy: deliberate, cumulative, each block earning the next.
 *
 * Forbidden phrases enforced: world-class, cutting-edge, seamless, end-to-end, passionate,
 * leverage, holistic, game-changing, innovative, solutions (unqualified), journey, best-in-class.
 */


// ─────────────────────────────────────────────────────────────
// 01. NAVIGATION
// ─────────────────────────────────────────────────────────────

export const nav = {

  /**
   * Four links + one CTA button.
   * Labels are nouns, not verbs — the nav orients, it does not instruct.
   * The CTA is the only verb in the nav bar.
   * Order: Work first — the portfolio is the primary reason a new visitor is here.
   */
  links: [
    {
      label: 'Work',
      href:  '#ventures',
      note:  'Not "Portfolio." Portfolio is a word studios use about themselves. "Work" is what it is.',
    },
    {
      label: 'Studio',
      href:  '#identity',
      note:  'Not "About." About is a placeholder label. "Studio" is what the section is.',
    },
    {
      label: 'Hubs',
      href:  '#hubs',
      note:  'Specific. Cairo and Amsterdam are not "locations" or "offices." They are hubs — a word that carries network connotation.',
    },
    {
      label: 'Contact',
      href:  '#contact',
      note:  'Present only as a nav link for orientation. The CTA button is the primary action.',
    },
  ],

  cta: {
    label: 'Start a project',
    href:  '#contact',
    note:  'Action-first. Not "Get in touch", not "Hire us", not "Work with us." The visitor starts something; we do not receive them.',
  },

  mobile: {
    menuOpen:  'Menu',
    menuClose: 'Close',
    ariaOpen:  'Open navigation menu',
    ariaClose: 'Close navigation menu',
  },

  logoAriaLabel: 'klub-404 — return to top',
  backToTop:     'Back to top',

} as const


// ─────────────────────────────────────────────────────────────
// 02. HERO
// Final single choice. No options. This is the one.
// ─────────────────────────────────────────────────────────────

export const hero = {

  /**
   * CHOSEN: The Argument variant — adapted for Blank Page concept.
   *
   * Original Option A was "We build what didn't exist yet."
   * That headline is correct for a neutral Argument structure.
   * For the Blank Page concept, the headline must carry the physical
   * act of making — not just the result of it. The blank page is the
   * moment before the thing exists. The headline should sit in that moment.
   *
   * "Nothing here yet" would be too literal and too close to the empty-state copy.
   * "We build what didn't exist yet" is the outcome, not the process.
   * The Blank Page headline lives in the process.
   */
  headline:    'This is where we start.',
  subheadline: 'klub-404 is a venture studio — part agency, part incubator — building AI-driven products across EMEA from Cairo and Amsterdam.',
  locationTag: 'Cairo · Amsterdam',

  /**
   * HEADLINE RATIONALE:
   * "This is where we start." is five words that do three things simultaneously.
   *
   * 1. It names the Blank Page concept without explaining it. A blank page is literally
   *    where you start. The visitor looking at a page being composed reads this and
   *    understands the visual before the copy explains it.
   *
   * 2. It positions the studio as a beginning, not an arrival. "This is where we start"
   *    is a studio that has not finished — that is still doing the work. That is more
   *    credible than "here is what we have built."
   *
   * 3. The period is deliberate. It is a full stop on the claim. Not a question,
   *    not an ellipsis. The sentence is done. The work is about to begin.
   *
   * SUBHEADLINE RATIONALE:
   * The sub-headline lands all the facts the headline deliberately omits:
   * what they are, what they build, where they operate. One sentence.
   * The em dash between "incubator" and "building" creates the beat the Blank Page
   * concept needs — a pause before the action starts.
   */

  scrollCue: {
    ariaLabel: 'Scroll to continue',
    note:      'Appears after 3-second dwell. Disappears on first scroll. Lottie animation preferred — a slow, repeating downward pulse. No text label visible.',
  },

  ctaPrimary: {
    label: 'Start a project',
    href:  '#contact',
  },

  ctaSecondary: {
    label: 'See the work',
    href:  '#ventures',
  },

} as const


// ─────────────────────────────────────────────────────────────
// 03. MANIFESTO — REVISION TYPE INTERACTION
// The complete paragraph that types out in the identity block.
// Includes the exact word that gets backspaced and replaced.
//
// FORMAT FOR DEVELOPERS:
// The text renders as a typewriter effect.
// When the cursor reaches "SOLUTIONS" it pauses (800ms), then backspaces
// letter by letter, then types "EXPERIENCES" in its place.
// The rest of the paragraph continues typing from that point.
// ─────────────────────────────────────────────────────────────

export const manifesto = {

  /**
   * THE FULL PARAGRAPH — as it reads in its final state (after the revision).
   * This is the committed, published version of the text.
   */
  final: `We did not set out to build an agency. We set out to build things — products, companies, and EXPERIENCES that solve a problem that was worth solving. The distinction matters. An agency delivers. An incubator bets. We do both, depending on what the problem requires. We operate from Cairo and Amsterdam because those two cities, between them, cover more of the real EMEA than most studios ever see from a single office in London or Berlin. We are not finished. We are in the middle of building something. This page is where we keep track of it.`,

  /**
   * THE TYPED SEQUENCE — what the visitor actually watches happen.
   * Split into segments for the developer implementing the typewriter effect.
   *
   * Segment A: Types normally up to and including the word that will be replaced.
   * Segment B: The backspace event — remove "SOLUTIONS" character by character.
   * Segment C: Types the replacement word and continues to the end.
   */
  typedSequence: {

    segmentA: `We did not set out to build an agency. We set out to build things — products, companies, and SOLUTIONS`,

    backspaceEvent: {
      wordToRemove:  'SOLUTIONS',
      charCount:     9,
      pauseBefore:   800,   // ms — cursor rests at end of "SOLUTIONS" before backspacing begins
      backspaceSpeed: 60,   // ms per character — deliberate, not frantic
      pauseAfter:    400,   // ms — cursor rests on empty space before typing resumes
      note:          'The backspace is the editorial act made visible. It is not a glitch or an error — it is a revision. The speed should feel considered, not mechanical.',
    },

    segmentC: `EXPERIENCES that solve a problem that was worth solving. The distinction matters. An agency delivers. An incubator bets. We do both, depending on what the problem requires. We operate from Cairo and Amsterdam because those two cities, between them, cover more of the real EMEA than most studios ever see from a single office in London or Berlin. We are not finished. We are in the middle of building something. This page is where we keep track of it.`,

  },

  /**
   * ACCENT PULL-PHRASE
   * Rendered at large scale alongside or above the typed paragraph.
   * Present in The Argument as the accent slot in the identity block.
   * It is the four-word summary of the full manifesto.
   */
  accent: 'Neither. Both. Still building.',

  /**
   * COPY RATIONALE — for editorial review:
   *
   * "We did not set out to build an agency."
   * Opens with a negation. Immediately rules something out. More credible than
   * "We are a venture studio" which any studio can claim.
   *
   * "SOLUTIONS → EXPERIENCES"
   * SOLUTIONS is the word every agency, consultancy, and tech vendor uses.
   * It is the most generic noun in the sector. The revision replaces it with
   * EXPERIENCES — which is more specific (you can design an experience,
   * you cannot design a "solution") and more honest about what the studio actually makes.
   * The act of backspacing SOLUTIONS is the brand concept in a single editorial decision:
   * the studio found the wrong word and corrected it, in front of you.
   *
   * "The distinction matters."
   * Three words. Does not explain which distinction — the visitor just read it.
   * The short sentence after a longer one creates rhythm and emphasis.
   *
   * "An agency delivers. An incubator bets. We do both."
   * Three sentences, decreasing in length. Lands on "both" — which is the entire
   * identity thesis compressed to one word.
   *
   * "from Cairo and Amsterdam because those two cities, between them,
   * cover more of the real EMEA than most studios ever see from a single office
   * in London or Berlin."
   * The phrase "single office in London or Berlin" names the competition's geography
   * without naming competitors. It positions klub-404 as operating in a space the
   * conventional European studio does not occupy.
   *
   * "We are not finished. We are in the middle of building something."
   * This is the Blank Page concept in two sentences. The studio is mid-process.
   * Not presenting a completed portfolio — presenting a studio at work.
   *
   * "This page is where we keep track of it."
   * The landing page is not a marketing asset. It is a working document.
   * That reframe makes everything on the page feel more honest.
   */

} as const


// ─────────────────────────────────────────────────────────────
// 04. THREE PILLARS
// Each pillar: a label, a number, a headline, and body copy.
// Body copy must rule something out in the second sentence — per voice profile.
// ─────────────────────────────────────────────────────────────

export const pillars = {

  identity: {
    number:   '01',
    label:    'Identity',
    headline: 'A hybrid. Not a compromise.',
    body:     'We sit between a small agency and a startup incubator — close enough to both to borrow their strongest qualities. Not so close that we inherit their limitations.',
    note:     '"Not so close that we inherit their limitations" is the second-sentence refusal. It makes "hybrid" feel like a considered position rather than an inability to commit to one model.',
  },

  reach: {
    number:   '02',
    label:    'Reach',
    headline: 'Cairo and Amsterdam. The region between.',
    body:     'We operate across EMEA with hubs in two cities chosen for what they give access to — not for where it is comfortable to have an office. EMEA is not one market. We do not treat it like one.',
    note:     '"Not for where it is comfortable to have an office" rules out the common rationale for studio location (proximity to the founder\'s home, or to existing clients). "EMEA is not one market. We do not treat it like one." — the second sentence applies the refusal at the regional level. Most studios say EMEA; klub-404 operates in it.',
  },

  focus: {
    number:   '03',
    label:    'Focus',
    headline: 'Experiences that solve something.',
    body:     'We build products, platforms, and experiences for problems that are worth solving — problems with a real cost if they go unsolved. Not problems invented to justify a product.',
    note:     '"Not problems invented to justify a product" is the editorial refusal that separates the studio from solution-in-search-of-a-problem design. In the venture world this is the most common failure mode. Naming it is credibility.',
  },

} as const


// ─────────────────────────────────────────────────────────────
// 05. STATS
// Four numbers. The label copy is everything — the number alone means nothing.
// Chosen for what they prove, not what sounds large.
// ─────────────────────────────────────────────────────────────

export const stats = {

  /**
   * STAT SELECTION RATIONALE:
   *
   * Rule: Every stat must be verifiable and meaningful. No vanity metrics.
   * At launch, klub-404 has real numbers in three categories: geography, structure, time.
   * A ventures count is held for when the portfolio is populated enough to be meaningful.
   * "3 industries" is more honest than inflating the number — it signals intentionality.
   *
   * The four chosen stats form a narrative:
   * Two hubs (where) → Three sectors (what) → One region (how far) → 2024 (since when)
   */

  items: [
    {
      value:      '2',
      label:      'Hubs',
      sublabel:   'Cairo and Amsterdam',
      countUp:    false,   // Static — "2" does not benefit from animation. It is a fact.
      note:       'The sublabel is the proof. The number is the anchor. Together they make the claim specific.',
    },
    {
      value:      '3',
      label:      'Sectors',
      sublabel:   'Health. Beauty. Technology.',
      countUp:    false,   // Static — same reasoning. "3" counted up is performance; stated it is confidence.
      note:       'Uses "Sectors" not "Industries" — sectors implies deliberate vertical focus; industries implies broader coverage than the studio actually claims.',
    },
    {
      value:      'EMEA',
      label:      'Region',
      sublabel:   '70+ markets',
      countUp:    false,   // Text value — not animatable as a number.
      note:       '"EMEA" is the value, "Region" is the label. Inverted from the others because the region name carries more meaning than a number. The sublabel "70+ markets" adds scale without overstating it.',
    },
    {
      value:      '2024',
      label:      'Founded',
      sublabel:   null,
      countUp:    false,   // A year counting up is absurd.
      note:       'Present because a studio with no founding year reads as unestablished. 2024 is recent — which in the context of the Blank Page concept ("we are mid-process, still building") is honest rather than a liability. Do not suppress the year.',
    },
  ],

  /**
   * INTERACTION SPECIALIST NOTE:
   * countUp is disabled for all four stats in this production copy.
   * The Blank Page concept values honesty over spectacle.
   * Four numbers that arrive cleanly and sit still are more credible
   * than four numbers performing their own arrival.
   * If the team overrides this for any stat, it should be EMEA/Region only —
   * a region name cannot count up, which will create an inconsistency. Avoid.
   */

} as const


// ─────────────────────────────────────────────────────────────
// 06. HUB CARDS
// Each hub: a headline, two-sentence description, city tagline.
// The description is editorial, not geographic. The tagline is a single clause.
// ─────────────────────────────────────────────────────────────

export const hubs = {

  sectionLabel: 'Where we work',

  cairo: {
    city:        'Cairo',
    region:      'Egypt · North Africa',
    coordinates: '30.0444° N, 31.2357° E',

    headline:    'Where we started.',

    description: 'Our founding hub — the city where klub-404 was built and where the AI infrastructure across MENA is being written right now, not five years from now. Cairo is not a market we entered. It is where we are from.',

    tagline:     'Origin hub.',

    note: [
      '"Where we started." — the headline uses the same structural logic as the hero ("This is where we start."). The parallel is intentional — Cairo is the origin, the landing page is the current chapter.',
      '"not five years from now" — present-tense urgency without jargon. Directly contradicts the narrative that MENA AI is emerging or future-facing. It is happening now.',
      '"It is where we are from" — the most personal sentence in the hub block. It claims Cairo as identity, not just location. No other studio writing about Cairo can say this credibly.',
      'Tagline "Origin hub." — two words, period. The Blank Page concept rewards this kind of declarative brevity.',
    ],
  },

  amsterdam: {
    city:        'Amsterdam',
    region:      'Netherlands · Western Europe',
    coordinates: '52.3676° N, 4.9041° E',

    headline:    'Where we reach.',

    description: 'Our European hub — positioned at the intersection of EU regulatory infrastructure, international capital, and a startup culture that has been doing this long enough to know what does not work. Amsterdam gives us the western half of EMEA. Cairo gives us the rest.',

    tagline:     'European arm.',

    note: [
      '"Where we reach." — pairs with Cairo\'s "Where we started." The two headlines form a sentence together: where we started, where we reach. This is only possible because the Blank Page concept places them in close proximity.',
      '"long enough to know what does not work" — Amsterdam\'s ecosystem credibility without a superlative. The knowledge is in the failures, not just the successes.',
      '"Cairo gives us the rest." — the last sentence of the Amsterdam card references Cairo. This creates a loop between the two blocks. The studio is one thing with two addresses, not two things sharing a name.',
      'Tagline "European arm." — functional, not poetic. Amsterdam does not need elevation; it is already credible. The tagline names what it does for the studio.',
    ],
  },

} as const


// ─────────────────────────────────────────────────────────────
// 07. INDUSTRIES
// Section headline + one-sentence descriptor per sector.
// The descriptor must name a specific problem type, not describe the sector generally.
// ─────────────────────────────────────────────────────────────

export const industries = {

  sectionLabel: 'What we build in',

  /**
   * SECTION LABEL RATIONALE:
   * "What we build in" ends with a preposition. Intentionally.
   * It signals that the sectors listed are places the studio operates,
   * not products it sells. "We work in health" not "we offer health solutions."
   * The preposition is the voice — direct, slightly unconventional, correct.
   */

  health: {
    name:        'Health / Medical',
    descriptor:  'Products for the gap between clinical knowledge and patient experience — where most of the harm in healthcare actually happens.',
    note:        '"Where most of the harm in healthcare actually happens" is a specific, arguably provocative claim. It is also accurate. The clinical-to-patient gap is a documented problem. The studio is positioning itself at the point of real cost, not at the comfortable periphery of wellness apps.',
  },

  beauty: {
    name:        'Beauty & Wellness',
    descriptor:  'Personalization tools for a sector that has spent decades selling the same product to everyone and is only now building the infrastructure to do otherwise.',
    note:        '"Spent decades selling the same product to everyone" is the editorial critique embedded in the descriptor. It respects the sector\'s commercial reality without flattering it. The studio is positioned as the infrastructure-builder for what is next, not a validator of what already exists.',
  },

  technology: {
    name:        'Technology',
    descriptor:  'Our home turf — platforms, developer tools, and AI-native products for the companies building infrastructure that other companies will eventually depend on.',
    note:        '"Our home turf" is the one moment of first-person informality in the industries section, carried over from the original microcopy inventory. It is appropriate because technology is the studio\'s founding competency. "Infrastructure that other companies will eventually depend on" positions the studio at the foundation layer — more ambitious and more specific than "B2B SaaS."',
  },

} as const


// ─────────────────────────────────────────────────────────────
// 08. PORTFOLIO / VENTURES
// Section headline, filter labels, empty state copy.
// ─────────────────────────────────────────────────────────────

export const ventures = {

  sectionLabel:  'Work',

  /**
   * SECTION LABEL RATIONALE:
   * Not "Portfolio." Not "Ventures." Not "Case Studies."
   * "Work" is the most direct word for what this section is.
   * It also aligns with the nav label — the visitor clicked "Work" to get here.
   * Consistency between nav and section heading reduces cognitive load.
   */

  sectionSubLabel: 'What we have built and what we are building.',

  /**
   * SUBSECTION LABEL RATIONALE:
   * Present tense + past tense in the same sentence.
   * "Built" acknowledges completed work. "Building" acknowledges the Blank Page concept —
   * the studio is mid-process. Some cards in this grid will be in-progress ventures.
   * The sub-label sets that expectation before the visitor encounters an in-development badge.
   */

  filterLabels: {
    all:          'All',
    byIndustry:   'By sector',
    byStage:      'By stage',
    byHub:        'By hub',
    liveOnly:     'Live only',
    sortFeatured: 'Featured',
    sortRecent:   'Recent',
    sortAZ:       'A–Z',
    clearAll:     'Clear',
    ariaFilter:   'Filter work by sector, stage, or hub',
    ariaClear:    'Clear all active filters',
  },

  externalLinkLabel: 'View live \u2197',

  /**
   * EMPTY STATES — three distinct scenarios:
   */

  emptyStates: {

    noFilterResults: {
      headline: 'Nothing matches.',
      body:     'Try a different filter or clear all.',
      action:   'Clear filters',
      note:     '"Nothing matches." — period. Flat, honest. Does not apologize. The action gives the visitor the path out.',
    },

    portfolioLaunching: {
      headline: 'The work is on its way.',
      body:     'Ventures will appear here as they go live. Some are already in the room.',
      action:   null,
      note:     '"Some are already in the room" is the Blank Page copy — the studio is working on things that are not yet visible. It is a tease without being precious about it. Use this state during the studio\'s first few months if the CMS is empty or near-empty.',
    },

    categoryEmpty: {
      headline: 'Not yet.',
      body:     'We are working in this space. Nothing to show quite yet.',
      action:   null,
      note:     '"Not yet." — two words that communicate absence without apology and with implied future. "We are working in this space" confirms intent without promising a timeline.',
    },

  },

} as const


// ─────────────────────────────────────────────────────────────
// 09. APPROACH
// Section label + 4 steps.
// Each step: a number, a title, and body copy.
// Voice rule: every step's second sentence rules something out.
// ─────────────────────────────────────────────────────────────

export const approach = {

  sectionLabel: 'How we build',

  steps: [

    {
      number:  '01',
      title:   'Find the real problem.',
      body:    'Not the presenting one. The problem a founder describes in the first meeting is almost never the problem worth solving — it is the problem they have already tried to frame as solvable.',
      note:    '"The problem they have already tried to frame as solvable" — this is a specific critique of how most briefs arrive. It names something the studio has observed in practice. That specificity is what makes it credible rather than generic process-speak.',
    },

    {
      number:  '02',
      title:   'Build the smallest true thing.',
      body:    'We build the minimum version that proves or disproves the core assumption — not a demo, not a prototype, a thing that works in the real world with real users. A polished prototype that no one uses is not evidence.',
      note:    '"A polished prototype that no one uses is not evidence." — the refusal. This rules out the most common output of design studios: a beautiful thing that never gets tested. "True thing" in the headline is the Blank Page language — something placed on the page that is real, not decorative.',
    },

    {
      number:  '03',
      title:   'Build with AI from the first line.',
      body:    'AI is part of the architecture — designed in at the structure level, not added later as a feature. A product that has AI bolted onto an architecture that was not built for it is a retrofit, not a product.',
      note:    '"Not a retrofit, not a product" — the second-sentence refusal names what happens when studios add AI after the fact, which is the industry default right now. The studio is claiming a different starting position.',
    },

    {
      number:  '04',
      title:   'Ship. Then stay.',
      body:    'We remain involved through the first critical period after launch — when real users encounter the product for the first time and the assumptions break. We do not hand off at go-live and call the project closed.',
      note:    '"We do not hand off at go-live and call the project closed." — the most pointed refusal in the approach section. It names what most agencies do. The studio is explicitly positioning itself differently. "The assumptions break" is honest about what post-launch looks like — not "we monitor performance," which is what everyone says.',
    },

  ],

  closingNote: 'Four steps. Most of the work is in step one.',

  /**
   * CLOSING NOTE RATIONALE:
   * "Most of the work is in step one." — this is a position statement masquerading
   * as a closing line. It says: problem discovery is the real discipline.
   * Everything after it is execution. This is the studio's editorial argument about
   * where value is actually created. Short, dry, correct.
   */

} as const


// ─────────────────────────────────────────────────────────────
// 10. CTA BAND
// Headline + button label.
// This is The Argument's mid-page pressure point — logical, not emotional.
// ─────────────────────────────────────────────────────────────

export const ctaBand = {

  headline:   'Have something worth building?',

  /**
   * HEADLINE RATIONALE:
   * "Have something worth building?" is a question, which is unusual for a CTA headline.
   * It earns the question mark because it is genuinely interrogative — it is qualifying
   * the visitor before they click, which aligns with the studio's position on working
   * with founders who have a real problem.
   *
   * The word "worth" does the filtering. Not "something to build" — that is anyone.
   * "Something worth building" implies a standard the visitor must meet. The studio
   * is not taking all work; it is selecting the work that meets the threshold.
   *
   * In the Blank Page concept, this line appears after the visitor has seen the work,
   * the hubs, and the approach. By this point the visitor knows what the studio values.
   * The question lands as an honest one, not a rhetorical trick.
   */

  button: {
    label:   'Start a project',
    href:    '#contact',
    note:    'Button label matches the nav CTA — consistency between the two reduces the cognitive cost of clicking. The visitor has already read this label once.',
  },

  subtext:    'No pitch deck required.',

  /**
   * SUBTEXT RATIONALE:
   * "No pitch deck required." removes the most common friction point for an early-stage
   * founder approaching a studio. The period makes it a statement, not a reassurance.
   * It is also true — the form asks for a rough budget and a description, not a document.
   */

} as const


// ─────────────────────────────────────────────────────────────
// 11. CONTACT FORM
// All fields, placeholders, button states, success and error messages.
// ─────────────────────────────────────────────────────────────

export const form = {

  sectionLabel: 'Start a project',
  sectionSubLabel: 'Tell us what you are working on. We come back within 2 business days.',

  /**
   * SECTION SUB-LABEL RATIONALE:
   * "We come back" not "we will get back to you." Direct, no softening.
   * "2 business days" is a commitment, not a vague promise. It sets an expectation
   * that the studio is then accountable to meet. Naming the timeline is confidence.
   */

  fields: {

    name: {
      label:       'Your name',
      placeholder: 'First and last',
      autocomplete: 'name',
    },

    email: {
      label:       'Email address',
      placeholder: 'you@company.com',
      autocomplete: 'email',
      inputMode:   'email',
    },

    project: {
      label:       'Tell us about it',
      placeholder: 'What are you building, and what is the problem it solves?',
      note:        'Placeholder asks two questions in one — "what are you building" AND "what is the problem it solves." This is deliberate. The studio wants to know both, and the combined question signals the studio\'s values before the visitor hits submit.',
    },

    budget: {
      label:       'Rough budget',
      placeholder: 'e.g. $10k–$30k',
      note:        '"Rough" is the operative word. The studio is not asking for a precise figure — it is asking for a range that confirms the visitor is serious. Do not remove "rough" — without it, the field implies a precision the visitor cannot provide at this stage.',
    },

  },

  submit: {
    idle:    'Send it',
    loading: 'Sending...',
    success: 'Sent!',
    note:    '"Send it" — verb-object, two words, period-free. The loading state uses an ellipsis because that is the only context where an ellipsis communicates something true (it is loading). "Sent!" uses the one permitted exclamation point in the system — it is a state confirmation, not enthusiasm.',
  },

  messages: {

    success: {
      headline: 'Got it.',
      body:     'We will be in touch within 2 business days. If your problem is urgent, mark the subject line when you reply.',
      note:     '"Got it." is the driest possible acknowledgement. It is more reassuring than a full sentence because it is so certain. The second sentence gives the visitor a path for urgent situations — which the short form does not otherwise provide.',
    },

    error: {
      headline: 'That did not go through.',
      action:   'Try again',
      note:     'The error replaces the submit button in-place. Same position, different label. No exclamation, no apology. The action is the path forward.',
    },

  },

  validation: {
    required:  'This field is required',
    email:     'Check your email address',
    tooShort:  'Tell us a bit more — at least 20 characters',
    tooLong:   'Keep it to the essentials',
    note:      'Validation copy appears inline below the field. Not in a toast, not in a modal. The field is the context; the error should live there. "Check your email address" is guidance, not judgment — it does not say "invalid email."',
  },

} as const


// ─────────────────────────────────────────────────────────────
// 12. FOOTER
// Minimal. The page has already made its argument.
// The footer is a utility zone, not a second pitch.
// ─────────────────────────────────────────────────────────────

export const footer = {

  /**
   * What goes here: logo, hub names, legal links, social links, copyright.
   * What does NOT go here: a second tagline, a repeated CTA, a "about us" summary,
   * an email address, a phone number, or any content that re-pitches the studio.
   * The visitor who reaches the footer has either converted or decided not to.
   * Neither outcome benefits from more copy.
   */

  tagline:   'Found where others stop looking.',

  /**
   * TAGLINE RATIONALE:
   * The footer is the one place the tagline lives — not the hero.
   * "Found where others stop looking." is the 404 brand concept at its most compressed:
   * the HTTP error (not found) becomes an editorial position (found).
   * It works here because the visitor has just scrolled through the entire argument.
   * They arrive at this line knowing what the studio is. The tagline confirms it.
   */

  hubs:      'Cairo \u00B7 Amsterdam',

  copyright: '\u00A9 2026 klub-404. All rights reserved.',

  links: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms',   href: '/terms'   },
  ],

  social: [
    {
      label:     'LinkedIn',
      href:      'https://linkedin.com/company/klub-404',
      ariaLabel: 'klub-404 on LinkedIn',
    },
    {
      label:     'X',
      href:      'https://x.com/klub404',
      ariaLabel: 'klub-404 on X',
    },
  ],

  note: 'The logo in the footer is the wordmark — same as the nav. No reduced or alternate variant needed unless the footer has a light background. If it does, use the dark wordmark on light. Do not create a third variant for the footer specifically.',

} as const


// ─────────────────────────────────────────────────────────────
// COMPLETE EXPORT — SINGLE IMPORT FOR DEVELOPERS
// ─────────────────────────────────────────────────────────────

export const copy = {
  nav,
  hero,
  manifesto,
  pillars,
  stats,
  hubs,
  industries,
  ventures,
  approach,
  ctaBand,
  form,
  footer,
} as const

export type Copy = typeof copy
