/**
 * KLUB-404 — ANIMATION STYLE MAPPING
 * Content Architect → Interaction Specialist Handoff
 *
 * This file is the contract between content structure and motion behavior.
 * Every "animationStyle" value in the block model and taxonomy maps to a
 * specific GSAP preset or Framer Motion variant set.
 *
 * Why content owns this file:
 * The choice of animation style is a content decision before it is a
 * technical one. "Elegant" is chosen because the content it serves is
 * slow and deliberate. "Kinetic" is chosen because the content is dense
 * and competitive. The Interaction Specialist implements the style;
 * the Content Architect defines why each style is assigned where.
 *
 * The Interaction Specialist must NOT change animation style assignments
 * without a content review. Changing a hub block from "elegant" to "kinetic"
 * would violate the emotional logic of the section, not just the spec.
 */

// ─────────────────────────────────────────────────────────────
// STYLE DEFINITIONS — THE FOUR PROFILES
// ─────────────────────────────────────────────────────────────

export type AnimationStyleId = 'elegant' | 'kinetic' | 'editorial' | 'immersive'

interface AnimationStyleDefinition {
  id: AnimationStyleId
  name: string
  emotionalRegister: string     // What feeling this style creates
  contentProfile:    string     // What kind of content warrants this style
  durationBase:      number     // ms — base duration for entry animations
  durationMultiplier: string    // How duration scales for complex animations
  easing:            string     // Primary easing function (GSAP syntax)
  easingAlt:         string     // Secondary — for exits or subtle moments
  staggerBase:       number     // ms — base stagger between sibling elements
  scrollBehavior:    string     // Default scroll relationship
  colorCharacter:    string     // How color is used in this style
  typographyBehavior: string    // How type moves in this style
  hoverCharacter:    string     // What hover effects feel like
  interactionSpecialistNotes: string  // Implementation guidance
}

export const animationStyles: Record<AnimationStyleId, AnimationStyleDefinition> = {

  // ── ELEGANT ────────────────────────────────────────────────
  elegant: {
    id:               'elegant',
    name:             'Elegant',
    emotionalRegister: 'Deliberate, unhurried, confident. The content knows it will be read.',
    contentProfile:   'Used for content that rewards patience: hub photography, testimonials, identity statements in their secondary read. Never used for interactive elements that demand a response.',
    durationBase:     800,
    durationMultiplier: '1.2x–1.5x for large media. 0.8x for text.',
    easing:           'expo.out',          // GSAP: power4.out equivalent
    easingAlt:        'sine.inOut',        // For parallax and continuous motion
    staggerBase:      150,
    scrollBehavior:   'parallax at 0.6x scroll speed for background media',
    colorCharacter:   'Reveals are additive: content fades in over a neutral ground. No color flashes.',
    typographyBehavior: 'Type does not stagger letter-by-letter in elegant mode. It enters as a whole block or line-by-line. Never character-by-character — that is kinetic territory.',
    hoverCharacter:   'Slow zoom (1.05x, 600ms). Underlines draw slowly. No scale bounces.',
    interactionSpecialistNotes: `
      GSAP preset reference: "elegant-entry"
      - gsap.from(target, { opacity: 0, y: 24, duration: 0.8, ease: "expo.out" })
      - For parallax: gsap.to(bgElement, { yPercent: -20, ease: "none", scrollTrigger: { scrub: 1.5 } })
      - Hover zoom: gsap.to(img, { scale: 1.05, duration: 0.6, ease: "expo.out" })
      - Never use back.out easing in elegant mode — overshoot destroys the tone.
    `,
  },

  // ── KINETIC ────────────────────────────────────────────────
  kinetic: {
    id:               'kinetic',
    name:             'Kinetic',
    emotionalRegister: 'Fast, decisive, competitive. The content arrives before you expect it.',
    contentProfile:   'Used for content that demands attention: venture cards, stats, CTA elements, filter interactions. Any section where the user must take action — kinetic gives them energy to do so.',
    durationBase:     400,
    durationMultiplier: '0.8x for simple fades. 1.2x for complex stagger sequences.',
    easing:           'back.out(1.7)',     // GSAP: slight overshoot — arrives with authority
    easingAlt:        'power3.out',       // For exits — decisive, no linger
    staggerBase:      60,
    scrollBehavior:   'none — kinetic content does not scrub. It triggers on viewport entry and plays immediately.',
    colorCharacter:   'May include brief color accent flashes on entry (not persistent). Filter transitions use color to confirm state change.',
    typographyBehavior: 'Stats count up. Filter labels swap with a 150ms crossfade, not a morph. Button labels slide to new state vertically (idle → loading → success as a vertical stack clip).',
    hoverCharacter:   'Immediate response (no delay). scale(1.02) in 150ms. CTA button: magnetic — follows cursor at 30% offset. Venture card: 3D tilt via perspective transform.',
    interactionSpecialistNotes: `
      GSAP preset reference: "kinetic-entry"
      - gsap.from(target, { opacity: 0, scale: 0.95, duration: 0.4, ease: "back.out(1.7)" })
      - Stagger: gsap.from(cards, { opacity: 0, scale: 0.95, stagger: 0.06, ease: "back.out(1.7)" })
      - countUp: Use GSAP's snap plugin or a countUp.js integration. Duration: 1.2s, ease: "power2.out"
      - Magnetic button: track mousemove on parent, apply gsap.to(button, { x, y, duration: 0.3, ease: "power2.out" })
      - Card 3D tilt: vanilla JS + CSS perspective(600px) + rotateX/Y, reset on mouseleave with 300ms ease.
      - Filter FLIP: record First positions → apply filter → record Last positions → Invert → Play
    `,
  },

  // ── EDITORIAL ──────────────────────────────────────────────
  editorial: {
    id:               'editorial',
    name:             'Editorial',
    emotionalRegister: 'Precise, stripped-back, intelligent. Every element earns its screen space.',
    contentProfile:   'Used for structural and typographic content: navigation, pillar blocks, approach steps, dividers, identity statement reveals. Editorial is the default mode — when in doubt, editorial. It is not a fallback; it is the disciplined baseline.',
    durationBase:     600,
    durationMultiplier: '1.0x across all elements. Editorial does not dramatize.',
    easing:           'power2.out',       // GSAP: clean deceleration — nothing flashy
    easingAlt:        'linear',           // For line draws and clip-path reveals
    staggerBase:      80,
    scrollBehavior:   'clip-path reveal on scroll entry. Line draws from left. Type reveals line-by-line.',
    colorCharacter:   'No color animation. Editorial content uses only opacity and transform. Color is set, not animated.',
    typographyBehavior: 'Line-by-line clip-path reveal. The clip rectangle collapses from top to reveal each line as scroll triggers it. No character stagger — that is showboating, not editorial.',
    hoverCharacter:   'Underline slides in from left (100ms). No scale. Navigation links use this. Pillar cards: thin border illuminates (opacity 0 → 1 on border, 200ms).',
    interactionSpecialistNotes: `
      GSAP preset reference: "editorial-reveal"
      - Clip-path line reveal:
        gsap.from(line, { clipPath: "inset(0 100% 0 0)", duration: 0.6, ease: "power2.out" })
      - Stagger variant:
        gsap.from(lines, { clipPath: "inset(0 100% 0 0)", stagger: 0.08, ease: "power2.out" })
      - Line draw (divider):
        gsap.from(line, { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "power2.inOut" })
      - Nav underline:
        CSS: ::after { transform: scaleX(0); transition: transform 100ms linear; transform-origin: left; }
        On hover: transform: scaleX(1)
      - Pillar border:
        CSS: border-color opacity 0 → 1, transition: 200ms ease
      - ScrollTrigger for line-by-line:
        ScrollTrigger.batch(lines, { onEnter: batch => gsap.from(batch, { ... }) })
    `,
  },

  // ── IMMERSIVE ──────────────────────────────────────────────
  immersive: {
    id:               'immersive',
    name:             'Immersive',
    emotionalRegister: 'Total. The viewport disappears; the content is the world.',
    contentProfile:   'Used sparingly. Reserved for the hero section and any future full-screen experiences (WebGL, Three.js, scroll-driven canvas). Immersive is the highest-cost style — technically and attentionally. One immersive section per page is the ceiling.',
    durationBase:     1100,
    durationMultiplier: 'N/A — immersive animations are choreographed, not formula-based.',
    easing:           'expo.out',          // GSAP: for entry elements within the immersive context
    easingAlt:        'none',              // For scroll-scrubbed elements — linear scrub only
    staggerBase:      200,                 // Longer stagger — each element is a beat, not a ripple
    scrollBehavior:   'scrub — hero headline and sub-elements are tied to scroll position via ScrollTrigger scrub: true',
    colorCharacter:   'Color may shift with scroll. Gradient meshes. Particle effects. The only style that permits ambient motion not triggered by user interaction.',
    typographyBehavior: 'Headline enters via clip-path wipe (not fade). Large type. After entry, headline scale is tied to scroll — shrinks as user moves down to create a "leaving the hero" sensation.',
    hoverCharacter:   'Cursor trail effect. The cursor leaves a brief phosphor trail. Implemented via canvas overlay, not CSS.',
    interactionSpecialistNotes: `
      GSAP preset reference: "immersive-hero"

      Entry sequence (fires on DOMContentLoaded, after nav settles at 200ms):
      1. Headline clip-path wipe:
         gsap.from(headline, { clipPath: "inset(0 100% 0 0)", duration: 1.1, ease: "expo.out", delay: 0.2 })
      2. Sub-headline fade-up:
         gsap.from(sub, { opacity: 0, y: 16, duration: 0.8, ease: "expo.out", delay: 0.6 })
      3. CTAs fade in:
         gsap.from(ctas, { opacity: 0, stagger: 0.2, duration: 0.6, ease: "expo.out", delay: 0.9 })
      4. Scroll cue fade in at 3s dwell:
         setTimeout(() => gsap.to(scrollCue, { opacity: 1, duration: 0.4 }), 3000)

      Scroll scrub (ScrollTrigger):
      - headline: { scale: 0.92, opacity: 0, scrub: true, start: "top top", end: "bottom 30%" }
      - sub + ctas: { opacity: 0, y: -20, scrub: true, start: "20% top", end: "60% top" }

      Cursor trail (canvas):
      - 30-point trail, each point at 90% opacity of the previous, radius: 4px
      - Color: matches current brand accent
      - Performance: requestAnimationFrame loop, cap at 60fps, disabled on touch devices

      Background video:
      - Autoplay, loop, muted, playsinline
      - Fade in at 1.5s (after type has established)
      - Never replace text — video is always behind text with sufficient contrast overlay

      CRITICAL FALLBACK:
      If WebGL or canvas is unavailable, immersive degrades to editorial.
      Test: if (!HTMLCanvasElement.prototype.getContext) → apply editorial class to hero.
    `,
  },

}


// ─────────────────────────────────────────────────────────────
// BLOCK-TO-STYLE ASSIGNMENT TABLE
// Maps every block ID in the landing page to its animation style
// and provides the explicit content rationale for each assignment.
//
// This is the document the Creative Architect and Interaction Specialist
// both reference during implementation. No assumption — every decision named.
// ─────────────────────────────────────────────────────────────

interface BlockStyleAssignment {
  blockId:       string
  blockLabel:    string
  style:         AnimationStyleId
  contentReason: string           // Why THIS style for THIS content
  designConsequence: string       // What the visitor experiences because of this choice
  alternativeConsidered: string   // What was ruled out and why
}

export const blockStyleAssignments: BlockStyleAssignment[] = [
  {
    blockId:     'lp-nav',
    blockLabel:  'Navigation',
    style:       'editorial',
    contentReason: 'Navigation is structural. Its job is to orient, not impress. Any animation style more expressive than editorial makes the nav feel like a feature rather than a utility.',
    designConsequence: 'The nav fades in cleanly and pins. Its presence is assumed from that point. Visitors do not notice it — which is exactly right.',
    alternativeConsidered: 'Kinetic was considered (fast snap-in). Rejected because an aggressive nav entry front-loads excitement before the hero has a chance to establish the brand.',
  },
  {
    blockId:     'lp-hero',
    blockLabel:  'Hero — Opening Statement',
    style:       'immersive',
    contentReason: 'The hero is the only moment on the page that the visitor has not yet been won. It must command total attention. Immersive is the only style that matches the stakes. The clip-path headline entry is a statement; the cursor trail is a wink.',
    designConsequence: 'The visitor experiences the brand before they read the brand. The animation itself communicates "precision and creativity" — the studio\'s identity — before a single word is parsed.',
    alternativeConsidered: 'Editorial was considered for a more restrained opening (Option A / The Argument). Retained as a fallback. Kinetic was rejected — the hero is not a competition, it is an invitation.',
  },
  {
    blockId:     'lp-identity',
    blockLabel:  'Identity Statement',
    style:       'editorial',
    contentReason: 'The identity statement is dense prose. It must be read, not performed. Editorial\'s line-by-line clip-path reveal creates a reading rhythm without becoming a distraction from the words.',
    designConsequence: 'The visitor slows down here. The scroll-scrub forces a deliberate reading pace. By the end of the block, they know what klub-404 is — not because they were told quickly, but because the animation gave them time to receive it.',
    alternativeConsidered: 'Elegant was considered (slower, more atmospheric). Rejected because the identity statement is an argument, not a mood. Editorial is precise; elegant is atmospheric. Arguments are not atmospheric.',
  },
  {
    blockId:     'lp-pillar-identity',
    blockLabel:  'Pillar — Identity',
    style:       'editorial',
    contentReason: 'The three pillars are typographic, structural, numbered. They are the most "designed" content on the page — editorial honors that by letting the structure breathe.',
    designConsequence: 'Slide-up stagger creates a sequential reading order without imposing it. The visitor reads 01, then 02, then 03 because the animation says so.',
    alternativeConsidered: 'Kinetic was considered for energy. Rejected — the pillars are not energetic claims, they are considered positions. Kinetic would make them feel like bullet points.',
  },
  {
    blockId:     'lp-pillar-reach',
    blockLabel:  'Pillar — Reach',
    style:       'editorial',
    contentReason: 'Same rationale as lp-pillar-identity. The trio must be a family — same style, different stagger.',
    designConsequence: '120ms stagger makes Reach arrive visibly after Identity. The sequence is perceptible but not exaggerated.',
    alternativeConsidered: 'No alternative — must match the pillar family.',
  },
  {
    blockId:     'lp-pillar-focus',
    blockLabel:  'Pillar — Focus',
    style:       'editorial',
    contentReason: 'Same rationale. 240ms stagger places it last.',
    designConsequence: 'Focus lands last and completes the set. The sequence reads: who we are → where we work → what we do for.',
    alternativeConsidered: 'No alternative.',
  },
  {
    blockId:     'lp-stats',
    blockLabel:  'Stats',
    style:       'kinetic',
    contentReason: 'Numbers are kinetic content. The countUp animation is native to kinetic. Stats exist to provide a jolt of credibility — a fast number arriving communicates certainty.',
    designConsequence: 'The visitor\'s eye is caught by motion (the counting). They read the label to understand what is counting. The animation creates curiosity that the label answers.',
    alternativeConsidered: 'Editorial (static reveal) was considered. Rejected because static numbers are just numbers. The countUp animation adds the dimension of time — which makes the scale feel real.',
  },
  {
    blockId:     'lp-hub-cairo',
    blockLabel:  'Hub — Cairo',
    style:       'elegant',
    contentReason: 'Hub blocks are geography and photography. They are not selling a product — they are establishing a place. Elegant\'s slow parallax and unhurried zoom matches the weight of claiming a city as a home base.',
    designConsequence: 'The parallax on the Cairo image creates a sense of arrival — the city comes to the visitor rather than the visitor swiping past it. The hover zoom is slow enough to feel respectful of the subject.',
    alternativeConsidered: 'Immersive was considered (full-bleed, The Map structure). Retained as a structural variant. In default layout, elegant is right — immersive would require the hub to own the full scroll, which works only in The Map interpretation.',
  },
  {
    blockId:     'lp-hub-amsterdam',
    blockLabel:  'Hub — Amsterdam',
    style:       'elegant',
    contentReason: 'Same as Cairo. The two hubs must be stylistic equals — any divergence would imply hierarchy.',
    designConsequence: '150ms stagger means Cairo settles before Amsterdam enters. The visitor processes Cairo, then Amsterdam. Two distinct presences, not a simultaneous pair.',
    alternativeConsidered: 'Simultaneous entry was considered (The Signal structure). Valid for that interpretation. For The Argument default, sequential is more deliberate.',
  },
  {
    blockId:     'lp-industries',
    blockLabel:  'Industries',
    style:       'editorial',
    contentReason: 'Industry cards are categorization, not storytelling. They are the most utilitarian content on the page. Editorial keeps them efficient — present, readable, not performing.',
    designConsequence: 'The hover fill (background color floods in on hover) gives them interactivity without animation overload on entry.',
    alternativeConsidered: 'Kinetic was considered (energy per card). Rejected because the industries are not competitive offers — they are sectors. Making them feel competitive would imply the studio recommends one over another, which contradicts "industry-agnostic."',
  },
  {
    blockId:     'lp-ventures',
    blockLabel:  'Ventures Grid (container)',
    style:       'kinetic',
    contentReason: 'The venture grid is competitive, dense, and interactive. The filter bar demands immediate response. Kinetic drives that response with the FLIP animation and stagger entries.',
    designConsequence: 'Every filter change feels decisive. The grid is not a gallery — it is a product. Kinetic makes it feel alive.',
    alternativeConsidered: 'Editorial was considered for a "gallery" feel. Rejected because a gallery is passive; a venture grid is active. The visitor is making a selection, not admiring.',
  },
  {
    blockId:     'lp-venture-card',
    blockLabel:  'Venture Card (item)',
    style:       'kinetic',
    contentReason: 'Venture cards are the most information-dense blocks. The 3D tilt hover gives depth without complexity. The scale-in entry creates a sense of cards arriving with purpose.',
    designConsequence: 'The stagger (60ms per card) creates a cascade that reads left-to-right, which matches natural reading order. The visitor\'s eye follows the animation through the grid.',
    alternativeConsidered: 'Elegant was considered for the 3D hover (slow zoom). Rejected — a slow hover on an interactive grid creates lag frustration. Kinetic\'s immediate response is correct for a selectable item.',
  },
  {
    blockId:     'lp-divider-a',
    blockLabel:  'Divider A',
    style:       'editorial',
    contentReason: 'Dividers are typographic punctuation. Editorial\'s line draw is the only appropriate treatment — it says "end of chapter" without theatrics.',
    designConsequence: 'The line draws left-to-right in 700ms. A brief pause is perceptible before the next section begins. This is intentional breathing room.',
    alternativeConsidered: 'No alternative. Dividers are always editorial.',
  },
  {
    blockId:     'lp-divider-b',
    blockLabel:  'Divider B — 404 Glyph',
    style:       'editorial',
    contentReason: 'The 404 glyph divider must not animate. Its power is in its stillness — it appears in full, immediately, as a found object. An animated entrance would turn a dry joke into a spectacle.',
    designConsequence: 'The visitor scrolls to it and it is already there. The 404 is a reference, not a reveal.',
    alternativeConsidered: 'Kinetic (snap-in) was considered. Definitively rejected. The entire brand concept depends on the 404 being a quiet wink, not a shout.',
  },
  {
    blockId:     'lp-approach',
    blockLabel:  'Approach / Process',
    style:       'editorial',
    contentReason: 'Process is numbered prose. The scrub-reveal per step forces the visitor to encounter each step one at a time — which is how a process should be understood. Editorial is the only style that serves sequential content.',
    designConsequence: 'Visitors who skim will only see the step titles. Those who slow down will read the bodies. Both encounters are valid and intentional.',
    alternativeConsidered: 'Kinetic was considered (fast reveal, energetic). Rejected — a fast-moving process description implies haste, which contradicts "Find the real problem" as step one.',
  },
  {
    blockId:     'lp-cta-band',
    blockLabel:  'CTA Band',
    style:       'kinetic',
    contentReason: 'The CTA is an action trigger. Kinetic\'s overshoot easing (back.out) makes the element feel like it wants to be clicked. The magnetic button is kinetic\'s signature move — it reaches toward the user.',
    designConsequence: 'The CTA band is the most interactive element in the page\'s mid-section. Kinetic ensures it does not feel like content — it feels like a button. The distinction matters.',
    alternativeConsidered: 'Elegant was considered (dignified ask). Rejected because elegant implies patience — a CTA should not feel patient. Elegant CTAs are missed.',
  },
  {
    blockId:     'lp-contact',
    blockLabel:  'Contact Form',
    style:       'editorial',
    contentReason: 'A form demands focus. The editorial style creates a quiet, focused environment. The animated underline on field focus is editorial\'s version of interactivity — subtle, affirmative, not distracting.',
    designConsequence: 'The visitor enters a different register when they reach the form — the page slows down, the animation quiets, the task is clear. The transition from kinetic CTA band to editorial form is the moment of arrival.',
    alternativeConsidered: 'Kinetic was considered (energetic form — could increase completion rates). Rejected because a fast, energetic form creates anxiety, not confidence. Forms require patience, not momentum.',
  },
  {
    blockId:     'lp-footer',
    blockLabel:  'Footer',
    style:       'editorial',
    contentReason: 'The footer is utility. Fade in, present, useful. Nothing more needed.',
    designConsequence: 'The page ends quietly. The visitor has made (or not made) a decision. The footer does not attempt to change that.',
    alternativeConsidered: 'No alternative. Footers are always editorial.',
  },
]


// ─────────────────────────────────────────────────────────────
// INDUSTRY → ANIMATION STYLE MAPPING
// Used to compute animationStyle on Venture data.
// Shared between taxonomy.ts and this file.
// ─────────────────────────────────────────────────────────────

import type { VentureIndustry, VentureAnimationStyle } from './taxonomy'

export const industryAnimationMap: Record<VentureIndustry, VentureAnimationStyle> = {
  'health-medical':   'elegant',     // Clinical content must feel careful. Slowness signals care.
  'beauty-wellness':  'elegant',     // Beauty is deliberate, aspirational. Slow reveals build desire.
  'technology':       'kinetic',     // Tech is fast, competitive, functional. Energy is appropriate.
  'fintech':          'editorial',   // Financial trust is built by restraint. Nothing flashy near money.
  'education':        'editorial',   // Learning is patient. Editorial matches the pace of understanding.
  'retail-commerce':  'kinetic',     // Retail is competitive. Speed communicates availability.
  'media':            'editorial',   // Media is typographic. Editorial is the natural home.
  'real-estate':      'elegant',     // Property is aspirational. Slow parallax matches the subject.
  'logistics':        'kinetic',     // Speed is the product in logistics. The animation should say so.
  'sustainability':   'editorial',   // Climate content requires gravity. Nothing performative.
}


// ─────────────────────────────────────────────────────────────
// GLOBAL ANIMATION PERFORMANCE RULES
// These apply across ALL styles. Non-negotiable.
// ─────────────────────────────────────────────────────────────

export const globalAnimationRules = {
  respectsReducedMotion: {
    rule:   'prefers-reduced-motion: reduce must be honored globally.',
    implementation: 'Wrap all GSAP ScrollTrigger setups in a matchMedia check. At reduced motion, apply instant opacity reveal only — no transform, no scrub.',
    note:   'This is not optional. EMEA markets include regions with accessibility legislation stricter than WCAG 2.1.',
  },
  noCumulativeLayoutShift: {
    rule:   'Animations must not cause Cumulative Layout Shift (CLS).',
    implementation: 'All animating elements have explicit width/height set. Skeleton screens match final content dimensions. No position: absolute unless the element is positioned in the final layout too.',
    note:   'CLS above 0.1 affects Core Web Vitals and SEO. Content Architect is responsible for ensuring content slots have dimension constraints.',
  },
  frameRate: {
    rule:   'All animations must maintain 60fps on mid-range hardware.',
    implementation: 'Animate only transform and opacity. No width/height/top/left animation. For color changes, use opacity on a colored layer rather than animating color directly. Canvas effects capped at 60fps via requestAnimationFrame.',
    note:   'The cursor trail and 3D card tilt are the highest-risk animations. Profile on a 2019 mid-range device before launch.',
  },
  touchDevices: {
    rule:   'Hover effects and cursor trails are disabled on touch devices.',
    implementation: 'Detect via pointer: coarse media query. Remove hover-class bindings. Cursor trail canvas is not initialized on touch.',
    note:   'The 3D card tilt on touch should be replaced with a simple scale(1.02) on tap — touch has no "hover" state.',
  },
} as const
