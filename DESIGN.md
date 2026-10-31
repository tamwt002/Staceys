---
name: "Tino's Tea"
description: "Single-origin loose-leaf teas served by the cup. 14 King Street, Newtown NSW."
colors:
  parchment: "#f0ece0"
  ink: "#1c2b24"
  amber: "#c4751a"
  sage: "#8aaa8e"
  celadon: "#dce8d8"
  divider: "#1c2b2430"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.5vw, 2.6rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.04em"
  body:
    fontFamily: "IBM Plex Mono, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "IBM Plex Mono, Courier New, monospace"
    fontSize: "0.6rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.25em"
  tea-name:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  none: "0"
spacing:
  xs: "0.6rem"
  sm: "1.25rem"
  md: "3rem"
  lg: "4.5rem"
  xl: "5rem"
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  section-label:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  tea-name-cell:
    textColor: "{colors.ink}"
    typography: "{typography.tea-name}"
  logo-slot:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0"
  footer-surface:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.parchment}"
    padding: "4.5rem 3rem"
---

# Design System: Tino's Tea

## 1. Overview

**Creative North Star: "The Letter from the Farmer"**

This system is built on the premise that specificity is the luxury. Not a heritage brand telling you it's special — an actual letter from the farm, typed on a manual, with ink that bled a little at the edges. The estate name, the cultivar, the exact steep time: these are not decoration. They are the product. Every typographic and layout decision asks: does this serve the information, or compete with it?

The aesthetic is restrained to the point of severity, but warmth enters through specificity of language and the acute contrast of Cormorant Garamond's hairline serifs against IBM Plex Mono's precision spacing. The parchment background is not a "warm artisan web template" choice — it is the physical colour of the document the metaphor demands. The ink is not black; it carries a green undertone, the colour of tea itself.

This system explicitly rejects: mass-market tea aesthetics (T2, glossy gift packaging), bubble-tea-chain branding (casual, quick-service, trend-driven), and the generic warm-artisan template (script fonts, cream backgrounds, stock photography of tea leaves, three-column "why us" grids).

**Key Characteristics:**
- Zero border-radius across every surface — sharp edges only
- No shadows, no elevation — depth through colour contrast and 1px rules alone
- One animation per session load; stillness thereafter
- Cormorant Garamond italic for named items (teas, headings); IBM Plex Mono for all data, labels, body
- Amber used precisely: counter numerals in brewing steps, and subtle nav hover — nowhere else

## 2. Colors: The Steeped Palette

A five-colour palette drawn directly from tea: the colour of the water it's poured into, the water it produces, the ceramics it's served in.

### Primary
- **Dried Leaf Ink** (`#1c2b24`): The primary text colour, border colour, and all UI chrome. Near-black with a deliberate green undertone — it reads as ink, but it is also, unmistakably, the colour of tea. Used on 90%+ of surfaces.

### Secondary
- **Brewed Amber** (`#c4751a`): The single accent. Used only on brewing step counters (the Cormorant numerals 1–5) and on nav link hover states. Its rarity makes it meaningful — it marks what is sequential, what demands attention. Nowhere else.

### Tertiary
- **Dried Sage** (`#8aaa8e`): A muted mid-tone for secondary surfaces. Present in celadon-adjacent surfaces; used sparingly as a tint or hover background where a full-ink treatment would be too heavy.

### Neutral
- **Aged Parchment** (`#f0ece0`): The body background. Not "warm cream" — this specific value is the colour of a well-handled document, slightly cooled by age. It is the physical substance of the North Star metaphor.
- **Celadon Tint** (`#dce8d8`): Very light green-grey surface tint. Tea ceramic glaze. Used for secondary background areas when a break from parchment is needed without introducing a new hue.
- **Faint Rule** (`rgba(28, 43, 36, 0.18)`): Dividers, table row separators, section borders. Ink at 18% — visible but not aggressive.

### Named Rules

**The One Amber Rule.** Amber (`#c4751a`) appears in exactly two contexts: brewing step counters and nav hover. If you are about to use amber for emphasis somewhere else, use weight or size instead. Its scarcity is the point — the moment amber appears, the reader knows something sequential or interactive is happening.

**The No-Shadow Rule.** This system uses no `box-shadow`, `filter: drop-shadow`, or `text-shadow`. Surfaces are separated by 1px rules and colour contrast only. Any proposal to add shadow fails this rule.

## 3. Typography

**Display Font:** Cormorant Garamond (Georgia, serif fallback)
**Body / Data Font:** IBM Plex Mono (Courier New, monospace fallback)

**Character:** The pairing is an extreme contrast: Cormorant Garamond's 17th-century hairline thick-thin contrast against IBM Plex Mono's 21st-century grid-aligned spacing. This is not "elegant serif + clean sans" — it is specimen book meets ledger. The tension between them is the brand's entire visual personality.

### Hierarchy

- **Display** (400 italic, 1.25–2.6rem/clamp, line-height 1.1): Tea names in the menu table (1.25rem italic), the About headline (2.6rem 300 weight), the shop name in the header (1.4rem 500). Always Cormorant Garamond.
- **Title** (500, 1.4rem, line-height 1.25, tracking 0.04em): Shop name "Tino's Tea" in the header. One instance.
- **Body** (400, 0.875rem, line-height 1.75–1.8): All prose content. About paragraphs, brewing steps text, footer body. IBM Plex Mono. Max line length 65ch enforced in the about grid layout.
- **Label** (400, 0.6–0.68rem, tracking 0.18–0.28em, uppercase): Nav links, section labels, table column headers, footer headings, "as featured in" label. IBM Plex Mono. All instances are uppercase with wide tracking.
- **Data** (400–500, 0.78–0.85rem): Tea origins, types, prices, hours. IBM Plex Mono at body scale but slightly reduced. Opacity modulation (0.6–0.75) creates hierarchy within the table without changing size.

### Named Rules

**The Italic-for-Names Rule.** Cormorant Garamond italic is used exclusively for named things: tea names in the table, the menu footnote, the brewing intro. Running text is never italic. Italic signals a proper noun.

**The Mono-for-Data Rule.** Any piece of information that could appear in a table, a label, or a measurement uses IBM Plex Mono. This includes prices, origins, steep temperatures, and hours. Cormorant Garamond never carries factual data.

## 4. Elevation

This system is completely flat. No shadows exist. No surface is raised above another through elevation — separation is achieved exclusively through:

1. **1px rules** at `rgba(28, 43, 36, 0.18)` (the faint rule token) for table rows, section dividers, and the logo strip
2. **1px solid ink** (`#1c2b24`) for the header rule, spine border, and table header underline — the full-weight rule signals primary structure
3. **Background contrast**: the footer surface (`#1c2b24`) against the parchment body creates the strongest separation on the page through colour inversion rather than depth

### Named Rules

**The Flat-By-Default Rule.** If a design proposal introduces a `box-shadow`, it violates the system. The correct response is to ask: what structural role was the shadow serving? Replace it with a border, a background tint, or a colour change.

## 5. Components

### Site Navigation

Typeset in label style: IBM Plex Mono 0.68rem, 0.18em tracking, uppercase, colour `#1c2b24` at 70% opacity. Hover brings opacity to 100% with a 0.15s ease transition. No underline, no background, no border. The opacity modulation is the only interactive signal.

- **Default:** `color: #1c2b24; opacity: 0.7`
- **Hover / Focus:** `opacity: 1`
- **Focus-visible:** amber outline `2px solid #c4751a`, 3px offset

### Menu Table (Signature Component)

The central surface of the site — designed as a genuine catalog table, not a styled card grid.

- **Header row:** 1px solid `#1c2b24` border-bottom. Column labels in label style at 40% opacity.
- **Data rows:** 1px `rgba(28,43,36,0.18)` border-bottom. Five cells: tea name (Cormorant 1.25rem italic), origin (mono 0.78rem, 60% opacity), type (mono 0.68rem uppercase 45% opacity), tasting notes (mono 0.8rem, 70% opacity), price (mono 0.85rem, 500 weight, right-aligned).
- **Row hover:** background `rgba(28,43,36,0.03)` — perceptible but not distracting.
- **No radius. No shadow. No card border.**

### Section Label

IBM Plex Mono 0.6rem, 0.28em tracking, uppercase, `#1c2b24` at 40% opacity. Appears once per section — above the menu table and before each content block. Marked `aria-hidden="true"` because the heading below carries the accessible label.

### Brewing Steps

An `<ol>` rendered with CSS counters. Each step is a 2-column grid: counter column (2rem) + text column.

- **Counter:** Cormorant Garamond 1.6rem, 300 weight, `#c4751a` at 75% opacity. The one deliberate amber use in structural content.
- **Text:** IBM Plex Mono 0.86rem, line-height 1.7, 80% opacity.
- **Separator:** 1px `rgba(28,43,36,0.18)` border-bottom per step.

### Book Spine (Vertical Label)

The site's aesthetic risk. A sticky left sidebar (3.25rem wide) with a 1px solid `#1c2b24` right border. Contains vertical text — IBM Plex Mono 0.6rem, 0.3em tracking, uppercase, 55% opacity — using `writing-mode: vertical-rl; transform: rotate(180deg)`. Hidden on mobile (< 640px).

### Logo Placeholder Slots

Outlined rectangles: 7rem × 2.5rem, `border: 1px solid rgba(28,43,36,0.18)`. Interior label: IBM Plex Mono 0.58rem uppercase 0.2em tracking, 25% opacity. Replace with `<img>` tags when real logos are available. No radius, no shadow, no background.

### Footer

A full surface inversion: background `#1c2b24`, text `#f0ece0`. Three-column grid (1fr 1fr 1fr). Shop name in Cormorant Garamond 1.9rem 300 weight. Column headings in label style at 35% opacity. Body text at 65% opacity, line-height 2.

## 6. Do's and Don'ts

### Do:
- **Do** use Cormorant Garamond italic for tea names, headings, and named items only — never for prose or data.
- **Do** use IBM Plex Mono for all labels, data, measurements, and body text.
- **Do** keep amber (`#c4751a`) to brewing step counters and nav hover only. Nowhere else.
- **Do** use `aria-hidden="true"` on purely decorative section labels; pair every section with a real accessible heading or `aria-label`.
- **Do** use `writing-mode: vertical-rl; transform: rotate(180deg)` for any text that runs along a vertical axis — consistent with the spine.
- **Do** enforce `@media (prefers-reduced-motion: reduce)` on every animation, including the rule-draw.
- **Do** use 1px rules as the sole separation mechanism. Full-weight ink (`#1c2b24`) for primary structure; faint rule (`rgba(28,43,36,0.18)`) for secondary grid lines.
- **Do** write copy in the voice of the North Star: specific, named, concrete. Estate names, cultivar details, steep temperatures. Never "premium", "artisan", or "curated".

### Don't:
- **Don't** add `box-shadow`, `drop-shadow`, or `text-shadow` to anything. The system is flat.
- **Don't** use `border-radius` anywhere. All corners are sharp.
- **Don't** use amber for emphasis, highlights, or decorative accent outside the two defined contexts.
- **Don't** use gradient text or `background-clip: text`. Single solid colour only.
- **Don't** introduce a new font family. This system is exactly two: Cormorant Garamond and IBM Plex Mono.
- **Don't** add hover animations beyond opacity changes. The only state-change motion is `opacity` and the one load animation (`rule-draw`).
- **Don't** use the words "premium", "artisan", "curated", "craft", or "experience" in any copy. Specificity does the work instead.
- **Don't** use T2's gift-packaging register (cheerful colours, quantity-focused, wellness framing), Gong Cha's casual-chain aesthetic (bright colours, playful type, quick-service UX), or the generic warm-artisan web template (script fonts, cream-on-cream, three-column "why us" grids).
- **Don't** add a second animation. The rule-draw on load is the site's one deliberate motion moment. Subsequent scroll-triggered reveals, hover choreography, or entrance animations break the "one moment, then stillness" rule.
- **Don't** render the menu as cards. It is a table because it IS a table — structured data with five columns. Any proposal to convert rows to cards violates the catalog metaphor.
