/**
 * KLUB-404 — VOICE PROFILE
 * Content Architect: Brand Voice Specification
 *
 * This document defines how klub-404 writes.
 * It is used by everyone who touches words in this product:
 * - Content editors adding new venture copy to the CMS
 * - Developers writing error and loading states
 * - The Creative Architect placing copy in layouts
 * - Any future copywriter who joins the team
 *
 * The 404 voice is not a tone guide with adjectives.
 * It is a set of editorial decisions — active and observable.
 * Each rule is paired with a WRONG/RIGHT rewrite to make it concrete.
 */


// ─────────────────────────────────────────────────────────────
// CORE VOICE PARAMETERS
// ─────────────────────────────────────────────────────────────

export const voiceProfile = {

  brandName: 'klub-404',
  brandNameNote: 'Always lowercase "klub". Always hyphenated. "klub-404", not "Klub-404", not "KLUB-404", not "Klub 404". The lowercase is deliberate — a typographic signal that the studio is not corporate.',

  taglineCandidates: [
    'Found where others stop looking.',
    'We build what the error message interrupts.',
    'Not a dead end. A starting point.',
  ],
  taglineNote: 'The tagline lives in the footer or as a sub-page anchor. It is not the hero headline. It is a closing statement, not an opening pitch. Use one — never stack multiple taglines in the same view.',

  tone: {
    primary:   'Direct',
    secondary: 'Dry',
    tertiary:  'Technically self-aware',
    never:     ['Enthusiastic', 'Corporate', 'Humble-bragging', 'Jargon-heavy', 'Urgency-faking'],
    note: 'The "technically self-aware" quality is what separates klub-404 from other studios. The brand name is an HTTP error code. The 404 wink is always available — use it sparingly so it lands when you do.',
  },

  person: {
    default:   'Second person ("your project", "you are one step away")',
    selfRef:   'First person plural ("we", "our") — not "the team", not "the studio"',
    never:     ['Third person about ourselves', '"One" as a subject', 'Passive voice'],
    note: 'Never write "the klub-404 team." Write "we." Never write "clients are invited to." Write "you are invited to." The second person is not warm — it is accurate.',
  },

  sentenceLength: {
    headline:   '4–8 words ideally. 10 is the ceiling.',
    subheadline: '1 sentence. 15–20 words. Never 2 sentences.',
    bodyPara:   '2–3 sentences. Each sentence does one job.',
    label:      '1–3 words.',
    note: 'When you reach for a comma, ask if the second clause could be its own sentence. Often yes. Usually better.',
  },

  punctuation: {
    periods:   'Periods on complete sentences in body copy. No period on labels, CTAs, headlines, or single-clause callouts.',
    em_dashes: 'Em dash (—) is preferred to parentheses. It is more confident. Use once per paragraph maximum.',
    ellipsis:  'Loading states only. Never in brand copy — it implies uncertainty.',
    exclamation: 'Never in body copy. Never in headlines. "Sent!" is the one exception — it is a state label, not enthusiasm.',
    question_marks: 'Use in rhetorical CTAs with care. "Have a problem? We should talk." — acceptable. "Ready to get started?" — not acceptable (it is the most overused line in startup copy).',
  },

  forbiddenPhrases: [
    { phrase: 'world-class',        reason: 'Every agency says this. It means nothing.' },
    { phrase: 'end-to-end',         reason: 'Overused. Say what you actually mean.' },
    { phrase: 'cutting-edge',       reason: 'If you have to say it, you aren\'t.' },
    { phrase: 'innovative',         reason: 'Same.' },
    { phrase: 'passionate',         reason: 'Everyone is passionate. It\'s not differentiating.' },
    { phrase: 'leverage',           reason: 'Corporate jargon. Say "use."' },
    { phrase: 'synergy',            reason: 'No.' },
    { phrase: 'holistic',           reason: 'Spa language. Not a studio word.' },
    { phrase: 'seamless',           reason: 'If the experience is good, you don\'t need to say it.' },
    { phrase: 'game-changing',      reason: 'Borrowed from sports metaphors nobody uses in conversation.' },
    { phrase: 'we help businesses', reason: 'Weak framing. Say what you build, not that you "help."' },
    { phrase: 'journey',            reason: '"Your digital journey" — retire this phrase immediately.' },
    { phrase: 'solutions',          reason: 'Meaningless when used without specifics. "AI solutions" is noise.' },
    { phrase: 'best-in-class',      reason: 'Self-awarded superlative. No.' },
    { phrase: 'state-of-the-art',   reason: 'Says nothing. Always true of the latest thing. Means nothing.' },
    { phrase: 'get in touch',       reason: 'Passive. "Start a project" is active.' },
    { phrase: 'don\'t hesitate to contact us', reason: 'The most exhausted phrase in business communication.' },
  ],

} as const


// ─────────────────────────────────────────────────────────────
// FIVE VOICE REWRITES — WRONG VS RIGHT
// Each rewrite targets a specific failure mode.
// The WRONG version is real — plausible agency copy that would
// appear on 10,000 studio websites.
// The RIGHT version is klub-404 specific.
// ─────────────────────────────────────────────────────────────

export const voiceRewrites = [

  // ── REWRITE 01 ──────────────────────────────────────────────
  // Failure mode: "Who we are" written as aspirational statement soup
  {
    id: 'rewrite-01',
    context: 'Identity / "About us" block — the founding statement',
    failureMode: 'Aspirational abstraction. The copy sounds meaningful but communicates nothing specific.',

    wrong: {
      copy: `We are a passionate team of innovators and creative thinkers dedicated to building world-class digital experiences that empower businesses to reach their full potential. Our holistic approach combines cutting-edge technology with human-centered design to deliver end-to-end solutions that make a real difference.`,
      annotation: [
        '"passionate team" — every agency says this. It is a liability, not a differentiator.',
        '"innovators and creative thinkers" — what does this mean? Anyone can write this.',
        '"world-class digital experiences" — unverifiable superlative.',
        '"empower businesses to reach their full potential" — so vague it applies to a gym membership.',
        '"holistic approach" — spa vocabulary.',
        '"cutting-edge technology with human-centered design" — the canonical agency cliché pair.',
        '"end-to-end solutions" — terminally overused. Says nothing about what those solutions are.',
        'The entire paragraph contains zero facts.',
      ],
    },

    right: {
      copy: `klub-404 exists in the space between an agency and an incubator — close enough to both to borrow their best qualities, far enough from either to avoid their worst habits. We build AI-driven products for founders and companies who have a real problem to solve and the ambition to solve it properly. We operate across EMEA, with hubs in Cairo and Amsterdam, because the region is larger than its reputation suggests.`,
      annotation: [
        '"exists in the space between" — defines the hybrid model without a diagram.',
        '"borrow their best qualities... avoid their worst habits" — implies studio experience and self-awareness.',
        '"founders and companies who have a real problem" — qualifies the client. Not every client is a fit. Saying so is confidence.',
        '"ambition to solve it properly" — signals craft discipline without bragging.',
        '"the region is larger than its reputation suggests" — this is a position. It creates a point of view. Only a studio with genuine EMEA presence can say this credibly.',
        'Three sentences. Three distinct claims. All verifiable.',
      ],
    },

    lesson: 'Write what is true and specific. If it could apply to a competitor, it does not belong in your copy.',
  },

  // ── REWRITE 02 ──────────────────────────────────────────────
  // Failure mode: CTA written as a soft, hedge-everything ask
  {
    id: 'rewrite-02',
    context: 'Primary CTA — mid-page and navigation',
    failureMode: 'Passive, hedge-everything language that reduces the stakes of the action and, with them, the motivation to take it.',

    wrong: {
      copy: `Ready to start your digital transformation journey? Don't hesitate to get in touch with our team — we'd love to hear about your project and explore how we might be able to help you achieve your goals.`,
      annotation: [
        '"Ready to start your digital transformation journey?" — "digital transformation" is the most tired phrase in enterprise tech. "journey" is worse.',
        '"Don\'t hesitate" — why would they hesitate? This phrase creates the anxiety it claims to resolve.',
        '"get in touch" — passive. Action-free.',
        '"we\'d love to hear" — excessive softening. You are a studio, not a hobby.',
        '"explore how we might be able to help" — "might be able to" is five words that communicate zero confidence.',
        '"achieve your goals" — so generic it could precede a fitness app download.',
        'This CTA maximizes hedging and minimizes energy. It would not motivate a parking attendant.',
      ],
    },

    right: {
      copy: `If you have a real problem, we should talk.`,
      annotation: [
        '"real problem" — the qualifier does two things: it qualifies the visitor (are you the right person?) and it signals the studio\'s preference (we do not do cosmetic work).',
        '"we should talk" — not "contact us", not "reach out". A direct, human statement.',
        'Nine words. Zero wasted.',
        'The CTA button reads "Start a project" — the CTA band sets up the action; the button executes it.',
      ],
    },

    lesson: 'A CTA\'s job is to transfer energy to the user. Hedging language dissipates that energy. Cut every word that softens the ask.',
  },

  // ── REWRITE 03 ──────────────────────────────────────────────
  // Failure mode: 404 error page written without brand awareness
  {
    id: 'rewrite-03',
    context: '404 error page — the most brand-relevant moment in the entire product',
    failureMode: 'Generic error page that misses the single most obvious brand opportunity on the entire site.',

    wrong: {
      copy: `Oops! Looks like you\'ve hit a dead end. The page you\'re looking for doesn\'t exist or may have been moved. Please check the URL or navigate back to our homepage.`,
      annotation: [
        '"Oops!" — infantilizing. The error is not the user\'s fault. Do not apologize with baby talk.',
        '"Looks like you\'ve hit a dead end" — the studio\'s name is 404. This should not be a generic dead-end message. It should be a reunion.',
        '"The page you\'re looking for doesn\'t exist or may have been moved" — functional but lifeless.',
        '"Please check the URL" — passive imperative. The word "please" here is throat-clearing.',
        '"navigate back to our homepage" — "navigate back" is developer language. Write "go home."',
        'This error page could belong to any website on the internet. klub-404\'s 404 page should belong to no other.',
      ],
    },

    right: {
      copy: {
        headline: 'You found a 404.',
        body: 'That page doesn\'t exist — but the studio does.',
        action: 'Go home',
      },
      annotation: [
        '"You found a 404" — three words that do everything. The error code is the brand name. The visitor has found the brand by finding the error. This is the deepest possible expression of the 404 concept.',
        '"That page doesn\'t exist — but the studio does." — the em dash creates a beat. The second clause provides the resolution. The page is missing; we are not.',
        '"Go home" — not "Return to homepage", not "Back to main page". "Go home" is what a friend says. It is also the most accurate description of the action.',
        'This is 26 words. Every one of them is load-bearing.',
      ],
    },

    lesson: 'klub-404 owns the 404 error more than any other company on the internet. Use it. Do not waste it on a generic message.',
  },

  // ── REWRITE 04 ──────────────────────────────────────────────
  // Failure mode: Hub/location copy written as a geography lesson
  {
    id: 'rewrite-04',
    context: 'Hub block — city description for Cairo',
    failureMode: 'Writing location copy as a factual description (Wikipedia mode) rather than as editorial positioning.',

    wrong: {
      copy: `Cairo is the capital city of Egypt and one of the largest cities in Africa and the Middle East. As a key hub for business and innovation in the MENA region, Cairo offers access to a large and growing tech talent pool, a vibrant startup ecosystem, and proximity to key markets across the region.`,
      annotation: [
        '"the capital city of Egypt" — the visitor knows where Cairo is.',
        '"one of the largest cities in Africa and the Middle East" — no relevance to the studio.',
        '"key hub for business and innovation" — every city\'s tourism board copy.',
        '"large and growing tech talent pool" — true of 40 cities. What is specific to this studio\'s Cairo?',
        '"vibrant startup ecosystem" — the most overused phrase in tech geography writing.',
        '"proximity to key markets" — what markets? This says nothing.',
        'None of this tells the visitor what klub-404 does in Cairo, or why Cairo is where the studio began.',
      ],
    },

    right: {
      copy: `Our founding hub — where the studio was built, and where the AI infrastructure across MENA is being defined right now.`,
      annotation: [
        '"Our founding hub" — establishes origin and primacy. Cairo is not a satellite office.',
        '"where the studio was built" — personal and historical without being sentimental.',
        '"the AI infrastructure across MENA is being defined right now" — present tense. The studio is in the middle of something active, not established in something settled.',
        '"right now" — two words that make the sentence urgent without shouting.',
        'One sentence. Four clauses. Everything the visitor needs to understand why Cairo is the right place for this studio.',
      ],
    },

    lesson: 'Location copy should communicate why the studio is here, not what the city is. The visitor can find the city on a map. They cannot find the studio\'s relationship to it anywhere else.',
  },

  // ── REWRITE 05 ──────────────────────────────────────────────
  // Failure mode: Process/approach written as a bulleted capability list
  {
    id: 'rewrite-05',
    context: 'Approach section — how the studio builds',
    failureMode: 'Describing what the studio does rather than how it thinks. Capability lists masquerading as process.',

    wrong: {
      copy: `Our Approach
      We offer a comprehensive range of services designed to take your idea from concept to launch and beyond:
      • Strategy & Consulting
      • UI/UX Design
      • Full-Stack Development
      • AI Integration
      • Post-Launch Support & Maintenance
      Our experienced team leverages best-in-class tools and methodologies to deliver results that exceed expectations.`,
      annotation: [
        '"comprehensive range of services" — the most generic intro possible.',
        '"designed to take your idea from concept to launch and beyond" — "and beyond" is a verbal habit, not a claim.',
        'The bulleted list is a service menu, not a process description. It answers "what do you sell?" not "how do you build?"',
        '"experienced team" — unquantified. Experienced how?',
        '"leverages best-in-class tools" — leverages is corporate jargon. "best-in-class" is a self-awarded superlative.',
        '"methodologies to deliver results that exceed expectations" — four words (deliver results that exceed expectations) that say absolutely nothing.',
        'This copy could appear on the website of any freelancer with a Squarespace template.',
      ],
    },

    right: {
      copy: {
        sectionLabel: 'How we build',
        steps: [
          { number: '01', title: 'Find the real problem',  body: 'Not the stated one. We spend time here before anything is designed or built.' },
          { number: '02', title: 'Define the right scope', body: 'We build the smallest thing that proves the idea — then we scale what works.' },
          { number: '03', title: 'Build with AI from the start', body: 'Not bolted on. AI is part of the architecture, not a feature added at the end.' },
          { number: '04', title: 'Ship and stay',          body: 'We do not hand off and disappear. We remain involved through the first critical period.' },
        ],
        closingNote: 'Straightforward. We have found that complicated processes are often a substitute for unclear thinking.',
      },
      annotation: [
        '"Find the real problem / Not the stated one" — the two sentences work as a unit. The second rules out the lazy interpretation of the first.',
        '"We spend time here" — "here" points to the step. The sentence is about priority: this is where the work really begins.',
        '"Build the smallest thing that proves the idea" — this is a methodology statement (MVP thinking) written in plain English, not startup vocabulary.',
        '"Not bolted on" — two words that implicitly criticize the industry standard (add AI at the end as a feature). The studio\'s position is stated by contrasting it with what everyone else does.',
        '"Ship and stay" — the fourth step is three words, which makes it land harder than the others. The emphasis is on "stay" — the studio does not ghost.',
        'Closing note: "We have found that complicated processes are often a substitute for unclear thinking" — this is the voice at full pitch. It is a quiet, devastating critique of over-process. It implies the studio does not need complexity to feel competent.',
      ],
    },

    lesson: 'A process is not a menu of services. Write what you actually do and what you refuse to do. The refusals are as important as the offerings — they define the boundaries of the studio\'s judgment.',
  },

] as const


// ─────────────────────────────────────────────────────────────
// VOICE CHECKLIST — FOR EDITORS AND REVIEWERS
// Run any piece of copy through this list before it ships.
// ─────────────────────────────────────────────────────────────

export const voiceChecklist = [
  {
    check: 'Could this copy appear on a competitor\'s website unchanged?',
    action: 'If yes: rewrite. Find the specific, the position, the refusal. Generic copy is invisible copy.',
  },
  {
    check: 'Does the copy contain any of the forbidden phrases from voiceProfile.forbiddenPhrases?',
    action: 'Remove unconditionally. There are no exceptions.',
  },
  {
    check: 'Is every sentence doing a specific job?',
    action: 'Read each sentence aloud. Ask: what would be lost if this sentence were not here? If nothing: cut it.',
  },
  {
    check: 'Is the copy written in second person where it should be?',
    action: 'CTAs, form labels, error states, loading states — all second person. Identity copy — first person plural.',
  },
  {
    check: 'Has an opportunity to use the 404 brand concept been missed?',
    action: 'Not every piece of copy uses it — that would exhaust the joke. But check whether this is a moment where it would land. Error pages: always. CTAs: occasionally. Process: rarely.',
  },
  {
    check: 'Is there a shorter version that carries the same meaning?',
    action: 'There almost always is. Find it.',
  },
  {
    check: 'Does the headline need a period?',
    action: 'Rarely. A period on a headline is a full stop, not a sentence marker. Use it only when the stop is deliberate — e.g., "Coming soon." The period makes "soon" feel finite and confident rather than open-ended.',
  },
  {
    check: 'Is the subheadline one sentence?',
    action: 'If it is two sentences, combine them or choose one. Subheadlines are not paragraphs.',
  },
  {
    check: 'Does the venture card shortDesc describe the problem, not the company?',
    action: 'Tagline = company positioning. shortDesc = the problem that motivated the company. They must differ. A visitor should be able to understand both what the problem is and what the venture does — from two different sentences.',
  },
] as const


// ─────────────────────────────────────────────────────────────
// TONE-BY-SECTION REFERENCE
// Quick reference for writers and editors.
// Maps content type to specific tonal guidance.
// ─────────────────────────────────────────────────────────────

export const toneBySection: Record<string, {
  tone: string
  watch: string
  example: string
}> = {
  'Hero headline': {
    tone:    'Paradox. Precision. One idea, stated with finality.',
    watch:   'Do not explain the headline. It should work without a sub-headline.',
    example: '"We build what didn\'t exist yet." — complete without context.',
  },
  'Sub-headline': {
    tone:    'Clarifying, not amplifying. The sub-headline does the work the headline declined to do.',
    watch:   'Do not repeat the headline in different words. If you catch yourself doing that, one of the two is redundant.',
    example: '"A venture studio for AI-driven solutions — between Cairo and Amsterdam, across the EMEA region." — lands the specifics the headline left out.',
  },
  'Identity statement': {
    tone:    'Declarative, structured, slightly combative. The studio knows what it is.',
    watch:   'Do not hedge. "We are something like a..." is not an identity. "We are a..." is.',
    example: '"Far enough from either to avoid their worst habits." — this rules something out. Rules create credibility.',
  },
  'Hub descriptions': {
    tone:    'Personal and editorial. A city through the studio\'s eyes, not a travel guide.',
    watch:   'Do not describe the city. Describe the studio\'s relationship to the city.',
    example: '"Where the AI infrastructure across MENA is being defined right now." — the studio is in the middle of something. Not established in something finished.',
  },
  'Venture card (shortDesc)': {
    tone:    'Problem-first. One sentence. The visitor should feel the need before they understand the solution.',
    watch:   'Do not write "X is a platform that..." — that is a company description, not a problem statement.',
    example: '"Diagnostic support for clinicians who see 40 patients a day with 10 minutes per consultation." — the problem is in the specifics.',
  },
  'CTA labels': {
    tone:    'Action verbs, no hedging. The CTA is a contract: click here, get that.',
    watch:   'Avoid gerunds ("Getting started", "Exploring the work"). The CTA fires on click, so write it as an imperative.',
    example: '"Start a project", "See the work", "Send it". Verb-first, object-second.',
  },
  'Error states': {
    tone:    'Calm, specific, actionable. The error is not the user\'s fault.',
    watch:   'No "Oops." No "Uh oh." No exclamation points in error copy. The error happened; announce it flatly and provide the fix.',
    example: '"Connection lost. Refresh the page." — two clauses, two jobs. Nothing else.',
  },
  'Form validation': {
    tone:    'Helpful, not scolding. The field needs more — explain what more looks like.',
    watch:   'Do not write "Error" as a label. Write what the correction is.',
    example: '"Check your email address" — not "Invalid email." The first is guidance. The second is a judgment.',
  },
  '404 page': {
    tone:    'Self-aware, dry, completely unbothered. This is the most on-brand moment in the product.',
    watch:   'Do not apologize. Do not explain what a 404 is. The visitor knows. The joke is that the studio\'s name IS the error code.',
    example: '"You found a 404." — the headline is not sad. It is a greeting.',
  },
} as const
