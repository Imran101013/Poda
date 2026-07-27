---
name: PODA — Potohar Organization for Development Advocacy
description: A funder-facing credibility system for a rural Pakistani women's rights NGO — flat evidence ledgers warmed by a purple-and-magenta advocacy voice.
colors:
  primary-purple: "#55357E"
  primary-purple-deep: "#432C63"
  primary-purple-tint: "#9887B0"
  primary-purple-soft: "#765F96"
  lavender-mist: "#FAFAFE"
  lavender-pale: "#F4F5FD"
  lavender-border: "#E9EBFA"
  signature-accent: "#B422D8"
  footer-ink: "#191125"
  footer-text: "#BBAFCB"
  photo-overlay-scrim: "#231634"
  text-body: "#5c5866"
  text-muted: "#847f8e"
  card-border: "#E4E1EC"
  neutral-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Lora, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(24px, 4.4vw, 38px)"
    fontWeight: 600
    lineHeight: 1.15
  headline:
    fontFamily: "Lora, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(22px, 3vw, 32px)"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  bodyLong:
    fontFamily: "Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  editorial:
    fontFamily: "'Roboto Slab', serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  subtitle:
    fontFamily: "Lora, Georgia, 'Times New Roman', serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "Roboto, sans-serif"
    fontSize: "12.5px"
    fontWeight: 700
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  sm: "8px"
  md: "16px"
  lg: "26px"
  pill: "50px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "30px"
  xl: "44px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary-purple}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-purple-deep}"
  button-ghost:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.primary-purple}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
  button-ghost-hover:
    backgroundColor: "{colors.primary-purple}"
    textColor: "{colors.neutral-white}"
  eyebrow-label:
    textColor: "{colors.primary-purple}"
    typography: "{typography.label}"
---

# Design System: PODA — Potohar Organization for Development Advocacy

## Overview

**Creative North Star: "The Field Report"**

PODA's site reads like a rigorous case file assembled for a funder's due-diligence review, not a marketing brochure. Its dominant grammar is the flat, hairline-bordered ledger card — no radius, no shadow, one shared border color — used for everything from program summaries to press releases to team bios, the same way a grant report tables its evidence. Numbers, dates, and status badges are always set in small tracked uppercase, the visual vocabulary of a document that expects to be audited.

Against that restraint, the site allows itself exactly one register of warmth: a recurring purple gradient band (deployed identically on every page-header, CTA, and section banner) and a single magenta accent thread (`#B422D8`) that marks anything the reader should feel, not just verify — italicized emphasis words, eyebrow labels, "read more" links, live badge dots. The two purples read as institutional trust; the magenta is the organization's advocacy voice breaking through the ledger. Interactive elements (buttons, tags, icon badges) are the one place the flat system fully relaxes into pills and circles, so the reader always knows what can be clicked versus what is being reported.

Confirmed visual rejections: no drop shadows on data/content cards (shadows are reserved for buttons, floating badges, and photographic media only); no gradient other than the one recurring purple band; no fourth brand hue introduced casually (three confirmed exceptions — a teal utility bar and three Skills Center payment-flow accents — are isolated and not to be extended).

**Key Characteristics:**
- Flat, hairline-bordered "ledger" cards with zero radius carry almost all repeating content (press, activities, team, projects, courses).
- One recurring purple gradient band (`page-header`/`cta-band`/`cta-bar`) is the site's only "banner" register — reused verbatim across pages rather than varied per section.
- A single magenta accent (`#B422D8`) is the sole punctuation color: eyebrows, italic emphasis, link accents, status-badge dots.
- Interactive chrome (buttons, tags, filters, icon badges) is fully pill/circle-shaped — the opposite geometry of the flat content cards, so affordance is legible at a glance.
- Motion is uniformly calm: `ease` timing, 0.18–0.4s durations, a shared `.reveal` fade-and-rise-in on scroll; nothing bounces or overshoots.

## Colors

Two purples plus one magenta accent, laid over near-white lavender surfaces and true (untinted) grays for body text.

### Primary
- **Primary Purple** (`#55357E`): headings (h1–h4), primary buttons, active nav/tab states, links on hover, solid icon badges. The site's institutional anchor color.
- **Deep Purple** (`#432C63`, 20% shade): the `.purpose-dark` mission section background, hover state for primary buttons, darkest gradient stop.
- **Soft Purple** (`#765F96`, 20% tint): gradient midpoint/endpoint on hero and CTA bands, decorative meta-row icon color.
- **Purple Tint** (`#9887B0`, 40% tint): loading-state background fallback behind hero imagery only.

### Secondary
- **Lavender Mist** (`#FAFAFE`, 95% tint): the near-white hover surface for nav items, filter pills, and card hover backgrounds site-wide.
- **Lavender Pale** (`#F4F5FD`, 90% tint): icon-badge gradient base, thumbnail placeholder background, list divider color.
- **Lavender Border** (`#E9EBFA`): input borders, dashed "pending" borders, ghost icon strokes.

### Tertiary
- **Signature Accent** (`#B422D8`): the organization's single advocacy-voice color — confirmed as durable brand usage (2026-07-26), not drift. Used exclusively as punctuation: eyebrow label color on dark grounds, italic `<em class="accent">` emphasis words, badge-pill dots, "read more"/"request" link color, status-badge backgrounds (at 12% opacity) and text. **Never used as a base fill, card background, or button color** — it marks emphasis, it doesn't carry surfaces.

### Neutral
- **Body Text** (`#5c5866`): default paragraph and UI text color — a true untinted gray, deliberately not purple-mixed.
- **Muted Text** (`#847f8e`): secondary/supporting copy (card descriptions, meta lines, labels).
- **Card Border** (`#E4E1EC`): the one shared hairline border color for every flat ledger card; darkens to Primary Purple on hover as the sole hover signal.
- **Footer Ink** (`#191125`, 70% shade) / **Footer Text** (`#BBAFCB`, 60% tint): the footer's dedicated dark register.
- **Photo Overlay Scrim** (`#231634`): the darkest stop in the 3-stop gradient scrim (`#231634` → `#432C63` → primary purple, each at decreasing opacity) laid over a photograph on photo-backed page headers, so the eyebrow/headline/breadcrumb stay legible over imagery. Used site-wide (confirmed on 22 pages); the photo-header variant of the signature Page Header component, alongside the flat-gradient variant (see Components).
- **White** (`#FFFFFF`): card and page background.

### Named Rules
**The Punctuation-Only Rule.** The magenta signature accent (`#B422D8`) may color text, icons, dots, and thin accent bars — never a background fill larger than a small pill/badge. If a design instinct reaches for magenta as a section or card background, reach for the primary purple gradient instead.

**The Confined Exceptions Rule.** A teal utility bar (`#3FC1C0`) and three Skills Center payment-flow details (course thumbnail teal gradient, paid-badge green tint, payment-note amber) are documented, isolated exceptions to the three-hue system. They stay confined to their original components; don't reuse them elsewhere without a deliberate decision with the site owner.

## Typography

**Display Font:** Lora (with Georgia, Times New Roman fallback)
**Body Font:** Roboto (sans-serif fallback)
**Editorial Font:** Roboto Slab (serif fallback)

**Character:** Lora carries every heading and pull-quote in a quiet italic-capable serif, reading as considered and editorial rather than corporate; Roboto runs all UI chrome, labels, and default body copy at a small, efficient 14px; Roboto Slab appears only in short editorial asides (mission/vision copy, bios, pull-quotes, "takeaway" callouts) as a deliberately warmer, slower-reading register than the default body size.

### Hierarchy
- **Display** (600, `clamp(24px, 4.4vw, 38px)`, 1.15): page-header `h1`, the top-of-page banner headline on every interior page.
- **Headline** (600, `clamp(22px, 3vw, 32px)`, 1.15): section `h2`s (`.section-head h2`, `.founder-text h2`, `.purpose-text h2`).
- **Title** (600, 15–19px, 1.35): card and feature titles (`.story-feature h3`, `.program-card h3`, `.spotlight-card h3` scales up to `clamp(22px,2.6vw,28px)`).
- **Subtitle** (600, 20px, 1.3): a nested sub-section heading inside a longer hub section — e.g. "Video library", "Broadcast schedule", "Recorded episodes" within News & Media's anchored sections. One step down from the section `h2` (Headline) so a hub page can carry two heading levels without leaving the `h1`–`h4` display font. Confirmed recurring pattern (7 uses).
- **Body** (400, 14px, 1.65): default paragraph and UI copy throughout; ~65–75ch measure not formally enforced but most containers stay under 620–820px.
- **Body Long** (400, 16px, 1.8): long-form article copy on Activity/Post detail pages only — the one place type steps up from the otherwise-universal 14px.
- **Label** (700, 11–12.5px, letter-spacing 0.03–0.14em, uppercase): eyebrows, stat labels, badge/tag text, form labels.

### Named Rules
**The One Size Rule.** Body copy is 14px everywhere except long-form article bodies (16px/1.8, Post Detail only). Resist introducing a third body size; use weight, color, and the display/editorial fonts to create hierarchy instead of stepping the body scale.

## Layout

Container max-width 1200px with 24px gutter padding (`.container`). Repeating anchored content sections (`.content-section`, used on hub pages like News & Media and Our Impact) run a compact 30px top/bottom rhythm, designed to be jumped between via a sticky sub-nav rather than read start-to-finish. Hero/banner treatments (page-header, cta-band, purpose-dark) run heavier, 44–70px vertical padding.

Card grids are typically 3- or 4-up (`repeat(3,1fr)` / `repeat(4,1fr)`) with either a `gap` (photo-forward grids: gallery, video, program cards) or a shared-hairline zero-gap grid (`border-top`/`border-left` on the grid, each cell adding its own `border-right`/`border-bottom` — used for icon-tile grids like `.media-grid`, `.wwd-grid`, `.glance-grid`, `.program-icon-grid`, `.contact-cards-grid`). The zero-gap bordered grid is the site's signature "spec-sheet" table layout.

Responsive breakpoints step at **1080px** (4-up → 2-up, most two-column split layouts collapse to one column) and **760px** (2-up → 1-up, main nav collapses to a toggle, page-header padding grows for a taller mobile banner, the sub-nav's tab strip swaps for a native `<select>`).

A sticky jump-nav (`.section-subnav`, sticky at `top:73px`) with scrollspy-driven active states is the standard wayfinding pattern for any hub page with 4+ anchored sections; it collapses to a `<select>` under 760px.

## Elevation & Depth

Structural, not ambient: this system is flat by default (bordered cards, no shadow) and reserves shadow strictly for things that float or act. Do not add a shadow to a content/list card as a default "polish" move.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 10px 30px rgba(84,55,124,.10)`): a soft purple-tinted lift, used sparingly on photographic media (gallery cards, the About-page portrait) — never on the flat bordered ledger cards.
- **Lift** (`box-shadow: 0 22px 44px rgba(84,55,124,.18)`): deeper elevation for things that visually float above the page (the nav submenu dropdown, the floating mission-badge card).
- **Button glow** (`0 10px 24px rgba(84,55,124,.35)` on primary buttons, `0 14px 30px rgba(84,55,124,.4)` on the floating donate pill): a colored shadow used specifically to signal "this is clickable and important," distinct from card elevation.

### Named Rules
**The Flat Ledger Rule.** Content cards (press, activities, team, projects, courses, contact) are flat at rest: a 1px `card-border` hairline, no shadow, no radius. The only rest-state change on hover is the border brightening to Primary Purple. Shadows belong to buttons, floating UI, and photographic media — never to a data card.

## Shapes

Two deliberately opposed form languages, and the contrast between them is load-bearing:

1. **Sharp, flat rectangles** for anything reporting content: every ledger card (press items, activities, team members, projects, courses, opening postings) has zero border-radius and a single hairline border.
2. **Full pill or circle** for anything interactive or iconic: buttons (50px pill radius), tags/badges/filters (20px pill), icon badges (perfect circles), avatars.
3. A **soft mid radius** (16px, occasionally 26px) is reserved for hero-adjacent decorative elements only — the mission-section photo, modals, the floating "founder badge," the schedule-grid tiles on the dark radio band. It never appears on a repeating list/grid card.

## Components

### Buttons
- **Shape:** full pill (`border-radius: 50px`).
- **Primary:** Primary Purple background, white text, colored purple shadow; hover darkens to Deep Purple and lifts 2px (`translateY(-2px)`).
- **White (on dark grounds):** white background, purple text; hover inverts to Deep Purple background with white text.
- **Ghost/Outline:** transparent background, purple border and text (or white border/text on dark grounds); hover fills solid.
- **Text link (`.btn-text`):** no container — purple, bold, small, with a trailing chevron that nudges right 3px on hover.

### Chips / Badges
- **Filter pills (`.category-filter button`):** white background, lavender-border outline, pill radius; active state fills solid Primary Purple.
- **Status badges (`.section-badge`, `.project-status`, `.opening-badge`):** magenta text on a 12%-opacity magenta background, small pill, uppercase tracked label, preceded by a solid magenta dot.
- **Tag row (`.tag-row`, `.story-tags`):** small pill chips, semi-transparent white on dark grounds or lavender-pale on light grounds.

### Cards / Containers (the flat ledger system)
- **Corner Style:** none — sharp rectangular corners, no exceptions, across every repeating content card.
- **Background:** white.
- **Shadow Strategy:** none at rest (see Elevation & Depth); border-color is the only hover feedback.
- **Border:** 1px `card-border` (#E4E1EC), brightening to Primary Purple on hover.
- **Internal Padding:** 22–32px, consistently.
- **Icon-tile grids** (media/glance/wwd/program-icon/contact-cards): a zero-gap variant where the outer grid owns `border-top`/`border-left` and each cell adds `border-right`/`border-bottom`, producing one continuous rule table rather than N separate bordered boxes.

### Inputs / Fields
- **Style:** 1.5px lavender-border stroke, 8px radius (search/filter inputs use a fully pill 24px radius instead).
- **Focus:** border shifts to Primary Purple, plus a soft `0 0 0 3px rgba(84,55,124,.1)` focus ring.
- **Error:** border and ring shift to Primary Purple at the same opacity (no separate red error color defined yet).

### Navigation
- **Style:** sticky header (`rgba(255,255,255,.92)` + blur), main nav links in Body type, active/hover state = Primary Purple text on a Lavender Mist rounded pill background. Submenu dropdowns are white cards with the Lift shadow.
- **Sub-page jump-nav (`.section-subnav`):** sticky pill-tab strip with scrollspy; active tab fills solid Primary Purple; collapses to a native `<select>` under 760px.
- **Mobile:** main nav hides behind a toggle button under 760px; the topbar's contact links hide under 900px.

### Pull-Quote Takeaway (signature component)
A distinct editorial device from the flat ledger cards: `.takeaway` (e.g. `.story-feature .takeaway`) sets a short callout quote in italic Roboto Slab on a Lavender Mist background, with a 3px `#B422D8` left border as its one deliberate accent edge. This is the single sanctioned exception to the "no colored border-left" instinct elsewhere in the system — it marks a pull-quote, not a list/content card, and the accent is load-bearing here (it's what visually separates a takeaway from a body paragraph at a glance). Do not extend the border-left device to any other component; it belongs to this one signature callout.

### Page Header / Banner (signature component)
Every interior page opens on the same treatment, in one of two variants:
1. **Flat gradient** (`125deg`, Primary Purple → Primary Purple → Soft Purple): the default when the header has no photo.
2. **Photo overlay** (`115deg`, `rgba(35,22,52,.93)` → `rgba(67,44,99,.86)` → `rgba(84,55,124,.68)` laid over a background photo): used when the header carries real field-work imagery (confirmed on 22 pages, including News & Media). The scrim darkens from near-black-purple at the top-left to a translucent primary purple at the bottom-right, keeping the breadcrumb/eyebrow/headline legible over any photo.

Both variants share two soft decorative radial blobs (one white, one magenta) bleeding off opposite corners, a breadcrumb, an eyebrow, and a display headline. This exact banner is reused verbatim as `.page-header`, `.cta-band`, `.purpose-dark`'s cousin `.apply-card`, and `.contact-social-inner` — it is the site's one recognizable signature move and should not be redesigned per-page; new pages should reuse one of the two variants, not reinterpret it.

## Do's and Don'ts

### Do:
- **Do** keep every repeating content card flat: zero radius, single hairline border, no shadow at rest.
- **Do** reuse the exact purple gradient banner treatment for any new page-level header or CTA band, rather than inventing a new gradient.
- **Do** treat the magenta signature accent as punctuation only (text, icons, dot, thin border-left accent) — never as a fill.
- **Do** make interactive chrome (buttons, filters, tags, icon badges) fully round or pill-shaped, the opposite geometry of the flat cards, so clickability stays legible.
- **Do** reuse the sticky jump-nav + scrollspy pattern for any hub page with 4 or more anchored sections.

### Don't:
- **Don't** add a drop shadow to a content/list card as a default polish pass; shadows are reserved for buttons, floating UI, and photographic media.
- **Don't** introduce a fourth brand hue. The confirmed exceptions (topbar teal, Skills Center payment-flow teal/green/amber) are isolated and not a precedent.
- **Don't** step the body type size up or down for ordinary copy; 14px is the universal default, 16px/1.8 is reserved for long-form article bodies only.
- **Don't** round the corners of a ledger-style content card, even slightly — the flat/pill contrast is the system's legibility mechanism, not an oversight.
