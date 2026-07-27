# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience (design priority when tradeoffs arise): **international donors and funders** — foundations, government donor agencies, and INGOs (e.g. NED, EU, FAO, Sightsavers) evaluating PODA for grants and partnerships. Design and content should read as credible and evidence-driven, with figures and claims that are easy to verify.

Secondary audiences the site also serves: rural community members and beneficiaries (women, youth, minorities) seeking legal aid or program information; press, researchers, and the general public looking for PODA's public record; and job/internship applicants via Careers.

## Product Purpose

A public website and content system for the **Potohar Organization for Development Advocacy (PODA)**, a women's rights NGO founded in 2003 working in rural Pakistan. The site presents PODA's programs, activities, evidence, and track record to build credibility with funders and partners, and to document/communicate the organization's work to the public. Success means funders and partners can quickly verify PODA's legitimacy, scale, and impact, and the public/press can find accurate, current information about its work.

## Positioning

PODA's mechanism is evidence-based research, rights-based programming, and impact-oriented advocacy focused specifically on rural women, youth, and minorities in Pakistan — not urban-centric or generic development work. Its flagship, decades-running Annual Rural Women Leadership Training Conference (since 2008, 18 editions, 1,500+ leaders) and its role in Punjab's child-marriage-age legislative reform are concrete, verifiable proof points a neighboring generic NGO site could not truthfully claim.

## Operating Context

- This is a **static HTML/CSS/JS prototype** (no build tooling, no package.json) that maps 1:1 to a planned **Payload CMS** schema — see `PAYLOAD-CMS-NOTES.md` at the project root for the full collections/blocks/globals schema. Treat that file as authoritative product/content-structure evidence; consult it before proposing new content types or page structures.
- Site sections: Home, About, Projects (absorbed the former Programs + donation "causes" concepts), Annual Conference (standalone, recurring flagship event), Our Impact (Success Stories, Key Achievements, Major Milestones, Community Transformation, Beneficiary Testimonials), News & Media (Activities, Gallery, Videos, Press, Publications, Radio Programs), Careers (Internships/Jobs/Volunteers tabs), Contact.
- Real content only, never fabricated: all Activities, Stories, gallery photos, SoundCloud radio links, team members, and historical timeline facts are migrated from PODA's real published content (poda.org.pk and its own media library) — not invented. Where real data is partial (Press: 6 of ~300+, Videos: 6 of ~300+, Publications: 6 of ~60, Radio: 6 of 40+), the UI discloses true totals via a `Pager` rather than faking full parity or silently capping.
- **No page on this site ever links out to poda.org.pk.** External references must point to the content's real actual host (e.g. soundcloud.com, youtube.com) or not link at all.
- Urdu localization and low-bandwidth/rural-network optimization are explicitly **out of scope for now** (confirmed) — standard English-only responsive/accessible web practice applies.

## Capabilities and Constraints

- No routing layer yet (static prototype) — detail pages like `activities/[slug]` and `gallery/[slug]` exist as real individual `.html` files rather than a dynamic route.
- Publications cards are intentionally non-interactive (`<div>`, not `<a>`) until real files exist to upload — an honest "not migrated yet" rather than a placeholder link.
- Gallery photos are full-resolution DSLR originals (2–4MB) committed as-is; a production Payload `Media` collection must generate responsive `sizes` before this goes anywhere near production.
- Icon system is a single inline SVG `<symbol>` sprite duplicated per page (no build step); becomes one shared layout component in the real Payload frontend.

## Brand Commitments

- Full legal name: **Potohar Organization for Development Advocacy (PODA)**.
- **Brand palette is anchored on three confirmed hues**: `#55357E` (primary purple; some older notes round this to `#54377C` — `#55357E` is the value actually live in `css/styles.css` and the one every tint/shade below was computed from), `#939CE8` (secondary lavender), and `#B422D8` (signature magenta accent), plus tints (mixed toward white) and shades (mixed toward black) of the two purples. True neutrals (`#fff`/`#000`-based grays for body text, shadows, chrome) are left untinted, per the site owner's explicit call. This is a durable constraint — any new color must derive from these three hues, never introduce a fourth as a design choice.
  - Primary `#55357E` — tints `#765F96` (20%), `#9887B0` (40%); shades `#432C63` (20%), `#191125` (70%, footer background)
  - Secondary `#939CE8` — tints `#F4F5FD` (90%), `#FAFAFE` (95%, card/surface backgrounds); shade `#767DBA` (20%)
  - Signature accent `#B422D8` (`--accent-secondary` in CSS) — confirmed 2026-07-26 as a real, load-bearing third hue, not drift: it carries the eyebrow color, the italic `<em class="accent">` word, badge dots, "read more"/"request" links, and status badges site-wide. Used sparingly as a punctuation color, never as a base/surface color.
  - Existing CSS variable names in `css/styles.css` (`--purple-900`, etc.) are legacy names kept to minimize diff; their current values follow the three-hue constraint even where the name no longer matches.
  - **Known exceptions, confined and not to be extended:** the utility topbar (`#3FC1C0` teal) and three Skills Center payment-flow details — the course thumbnail gradient (`#3FC1C0`→`#2E9E9D` teal), the paid-course badge tint (`rgba(94,196,135,...)` green), and the payment-note callout (`#FFF8E8`/`#E6B800` amber). These are isolated functional/status colors on one page family, not part of the brand system; don't reuse them elsewhere without a deliberate decision.
- Fonts: **Roboto** (UI/body), **Roboto Slab** (editorial mission/vision quotes).

## Evidence on Hand

- `PAYLOAD-CMS-NOTES.md` — the authoritative, detailed record of every collection, block, global, and content-migration decision made so far. Read it before any new content-model or IA decision.
- Real migrated content: 24 Activities (full rich-text articles), 4 Stories with real case-study content, 154 real conference gallery photos across 17th/18th editions, team member roster with real bios/photos, real verified SoundCloud radio episode links, real historical timeline (2003–2026).
- Absences future work must not fabricate: no real pricing/donation-processing integration described yet; Jobs tab has 2 placeholder postings (Finance & Grants Officer, MEL Officer) standing in for real vacancies, not real openings; Publications lacks real uploaded files; Volunteer form submissions are prototype-only (not yet persisted).

## Product Principles

1. **Never fabricate or fake parity.** Every figure, testimonial, and archive count must be real and re-verifiable; partial real archives are disclosed honestly (via `Pager` totals) rather than padded or silently capped.
2. **One fact, one home.** Cross-page duplication (Mission & Vision, impact stats, "Ways to Help" CTAs) is treated as a defect and consolidated to a single canonical location, with other pages linking or teasing instead of repeating.
3. **No outbound links to poda.org.pk, ever.** If content isn't migrated yet, show an honest non-interactive/pending state instead of linking to the old site.
4. **Structure content by what's actually true**, not by an a priori content brief — collections and IA were repeatedly revised (e.g. News & Media hub, Programs→Projects merge) once the real site's structure was read closely, and should continue to be corrected against ground truth rather than assumption.
5. **Design for funder credibility first.** When a tradeoff arises between polish for donors/partners versus other audiences, favor legibility of evidence, proof points, and verifiable scale.

## Accessibility & Inclusion

No product-specific accessibility requirement beyond standard responsive/accessible web practice; Urdu localization and low-bandwidth optimization for rural users were explicitly confirmed as out of scope for this pass.
