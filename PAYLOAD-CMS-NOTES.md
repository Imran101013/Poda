# Payload CMS structure for the PODA site prototype

Based on `index.html` (homepage), `about.html` (About Us), `programs.html` (Programs directory), `programs/*.html` (7 program detail pages — one real page per program, not just a template), `updates/*.html` (14 post detail pages — one real page per post, two per program), and the **News & Media** section: `news-media.html` (hub) plus `radio-programs.html`, `gallery.html`, `videos.html`, `press.html`, `publications.html`. Each section is annotated inline with its Payload mapping — this file is the schema summary. CSS and JS were factored out to `css/styles.css` and `js/main.js` once a second page existed, so all pages share one design-system source of truth — mirrors how a Payload frontend would share a theme layer/component library across routes rather than duplicating styles per page.

**Note on the header nav:** "Programs" and "News & Media" used to be dropdown parents that were *also* directly clickable — ambiguous, since hovering revealed a menu but clicking the label itself navigated somewhere else too. "News & Media" went through several revisions before landing on a real 7-item dropdown — Recent Activities, Photo and Video Highlights, Press Room, Publications, Radio Programs, PODA Webinar, Success Stories — once it became clear the dropdown itself wasn't the problem; a dropdown of genuinely different destinations saves a click for anyone who knows exactly where they're headed, while the label itself still goes to `news-and-media.html`, the hub, for anyone who doesn't. "Our Impact" (previously a `#` placeholder) points to its own dropdown of achievement/milestone sections.

**Programs merged into Projects (this pass):** the standalone `Programs` collection and its directory (`programs.html` + 7 `programs/*.html` detail pages) have been removed entirely — no page, nav item, or field on this site says "Program" anymore. The reasoning: Programs and Projects were two disconnected content types with no real relationship between them (no project ever recorded which program it fell under), and the live poda.org.pk site's own "causes" turned out to be a third, semi-overlapping concept. Rather than maintain three tangled taxonomies, everything collapses into one `Projects` collection (see below), grouped by a `themeArea` field reusing the name already used on ongoing project cards, plus a dedicated `ConferenceEditions` collection for the one focus area (the Annual Rural Women Leadership Training Conference) that has genuinely distinct recurring content — yearly editions, resolutions, downloadable booklets — deserving its own standalone nav item in the header.

**Careers consolidated onto one hub page (this pass):** the header's "Careers" dropdown previously pointed at three destinations — `internships.html`, `jobs.html`, `volunteer.html` — of which only Internships actually existed as a built page; Jobs and Volunteer were unbuilt nav placeholders. All three are now one page, `careers.html`, following the exact "hub + `section-subnav` tabs" pattern already established by `impact.html` and `projects.html` (sticky tab bar + mobile `<select>`, scrollspy via the shared, class-based logic in `main.js` — no page-specific JS required). The dropdown's three children now point at `careers.html#internships`, `#jobs`, `#volunteers` instead of three separate routes. See the `Careers page` and `JobOpenings` entries below. `internships.html` was deleted outright (its real content moved into the Internships tab) rather than kept as a redirect, since a static prototype has no routing layer to make a redirect meaningful.

## Collections

**Media** — standard Payload uploads collection (logo, hero backgrounds, post images).

**Projects** (absorbs the former `Programs` collection — see the redesign note above)
- `title` (text)
- `slug` (text, unique) — drives the card anchor on `projects.html` (`#slug`), and for the 6 flagship focus areas doubles as their footer/nav-adjacent anchor
- `type` (select — `flagship` | `current` | `past`) — flagship entries are the 6 standing focus areas (AI & Digital Literacy, Climate Smart Agriculture & Green Job Skills, Women Rights Education, Disaster Risk Reduction & Humanitarian Response, Democracy & Human Rights Education, Girls Right to Education), rendered with the richer `.project-feature` card; `current`/`past` are the dated, donor-funded grants
- `themeArea` (select, one of the 6 flagship slugs, plus `disability-inclusion` for the one flagship-less ongoing grant) — the field every project is grouped/filtered by; reuses the `Thematic Area` label already on the ongoing project cards rather than inventing a new "Program" concept
- `thematicAreaText` (text) — free-text elaboration shown in the card's meta grid (e.g. "Disability Inclusion, Women's Economic Empowerment, Gender Equality, GBVH...")
- `duration` (text, current/past only), `donorAgency` (text, current/past only), `location` (text)
- `excerpt` (textarea) — the card body copy; for the 6 flagship entries this is the evergreen overview (originally each program's `MissionVision` overview text, now folded in directly since there's no separate detail page); for current/past entries it's the project summary
- `keyInterventions[]` (text array, current only) — bullet list on the 2 actively-funded grant cards

Real per-flagship facts/figures (1,500+ leaders, 18th edition, Punjab's minimum marriage age of 18, organic farm est. 2010, etc.) were pulled from PODA's own published content — the former Program detail pages and the live site's donation "causes" — not invented; both sources are now merged into each flagship project's `excerpt`.

**ConferenceEditions** — the Annual Rural Women Leadership Training Conference's own collection, since it has real recurring structure (yearly editions with resolutions and booklets) that doesn't fit a generic project card
- `title` (text, e.g. "18th Annual Rural Women Leadership Training Conference (2025)")
- `dates` (text), `location` (text), `donorAgencies` (text), `focus` (text)
- `excerpt` (textarea) — resolution/edition summary
- `resolutionFile` (upload → Media, optional) — the downloadable booklet/resolution PDF; follows the same `Publications` rule below (non-interactive until a real file exists, never a fake download link). Where a resolution instead has real migrated article content (the 18th edition), the card links to that `Activities` entry directly rather than to a file.

**JobOpenings** — backs both the Internships and Jobs tabs on `careers.html` (see `Careers page` below)
- `title` (text)
- `category` (select — `internship` | `job`) — drives which of the two tabs a posting renders under; the two tabs are one collection filtered two ways, not two collections, since a posting is the same shape either way
- `department` (text, e.g. "Program Department", "Finance Department")
- `excerpt` (textarea)
- `postedDate` (date), `deadline` (date)
- `location` (text)
- `status` (select — `open` | `closed`) — when a `category` has zero `open` documents, that tab renders the `.openings-empty` state (styled empty-state card with a "send a speculative CV" mailto) instead of `.openings-grid`; the two sample `job` documents seeded for this prototype pass are placeholders (Finance & Grants Officer, MEL Officer) standing in for real postings, not real vacancies
- `applyUrl` (text, optional) — internship postings currently point at the `#intern-how-to-apply` anchor on the same page (a static `ApplyCard` with document checklist, not per-posting); job postings point at a `mailto:` with a pre-filled subject. A real ATS integration would replace both with a real `applyUrl`.

**VolunteerApplication** — not an editor-authored collection. This is a Payload `form-builder` Form definition (the same pattern the Contact page's message form should also use, though that form predates these notes and isn't documented here yet) capturing `name`, `email`, `phone` (optional), `gender` (select: Female/Male/Other/Prefer not to say), `age` (number), `address` (optional) — submissions land in `form-submissions`, reviewed by whoever coordinates volunteers, not rendered back onto the page. The Volunteers tab's client-side "success" swap on `careers.html` is prototype-only UI feedback (no submission is actually persisted yet in this static build).

**Activities** (renamed from `Posts` — these are dated news/updates, not projects, and were never really "posts" in a blog sense)
- `title` (text)
- `slug` (text, unique) — drives the detail page route, `/activities/[slug]`
- `excerpt` (textarea) — shown on the `ActivityGrid` card
- `content` (richText) — the full article body, rendered on the activity's own detail page (see below)
- `featuredImage` (upload → Media)
- `relatedProject` (relationship → Projects, hasMany: false) — replaces the old `program` field; points at a flagship or conference-edition entry
- `publishedDate` (date)

All 24 current Activities have real, fully-migrated `content` — pulled from each post's live page on poda.org.pk rather than left as an excerpt-plus-external-link. See the `Activity detail page` section below. A new `activities.html` archive page lists all of them, following the same "preview on the hub + full archive page" pattern already used for Gallery/Videos/Press/Publications/Radio.

**Stories** (success stories / case studies — separate from Posts since they're evergreen, not dated news)
- `title` (text)
- `location` (text)
- `tags[]` (text array, e.g. "Child Protection", "Girls' Education")
- `content` (richText)
- `featuredImage` (upload → Media, optional)

**GalleryAlbums** (News & Media)
- `title` (text, e.g. "18th Annual Conference — Day 2")
- `conference` (select, e.g. 18th | 17th) / `day` (select)
- `coverImage` (upload → Media)
- `photos[]` (upload → Media, hasMany) — **fully migrated, not linked out.** An earlier version of this page pointed each album card at poda.org.pk's own gallery plugin; that's gone. All 154 real conference photos (17/39/27 for the 18th conference's three days, 24/29/18 for the 17th's) were downloaded from poda.org.pk's media library and are now committed locally under `images/gallery/<conference>-day-<n>/`, with one real detail page per album at `gallery/<slug>.html` rendering the actual photo grid (`.photo-wall`, lazy-loaded). `photoCount` is a real, re-countable number matching the files on disk (154 total, not the earlier ~136 estimate).
- Production note: these are full-resolution originals (2–4MB each) committed as-is, since this static prototype has no image-processing pipeline. A real Payload `Media` collection would generate responsive `sizes` on upload — do that before this goes anywhere near production; don't ship 300MB of untouched DSLR originals.

**Videos** (News & Media)
- `title` (text)
- `thumbnail` (upload → Media)
- `externalUrl` (text) — same reasoning as `GalleryAlbums.externalUrl`: these currently point at PODA's YouTube channel rather than a per-video embed, since individual video URLs weren't available in this pass
- The real `/videos/` archive is **21 pages** (confirmed via its own pagination control) — likely 300+ videos total. 6 are shown here (see the hub's "real archives are much bigger" note, above) with a `Pager` reflecting the true "Page 1 of 21."

**PressItems** (News & Media)
- `title` (text)
- `publishedDate` (date)
- `excerpt` (textarea) — deliberately the *only* content field. Unlike `Posts`, press releases are short enough that the excerpt is the whole item — no `content` richText, no detail route, no "Read More" link that goes nowhere useful. This was a direct fix for the pattern this whole redesign pass kept running into: don't link out (or half-link) to content you could just show.
- The real `/category/press-release/` archive is **36 pages** — likely 300+ releases total. 6 real ones are shown here with a `Pager` reflecting "Page 1 of 36."

**Publications** (News & Media)
- `title` (text)
- `docType` (select — Report | Training Manual | Policy Document | Awareness Guide | Campaign Material)
- `file` (upload → Media) — **no outbound links at all now.** An earlier version of this page linked every card to poda.org.pk's `/documents/` archive; that was reverted because no link on this site should redirect to poda.org.pk. Since the real PDF files aren't available to upload into Payload's Media collection either, the cards are simply non-interactive (`<div>`, not `<a>`) until `file` is populated for real — an honest "not migrated yet" rather than a link to somewhere else.
- The real `/documents/` archive is confirmed **6 pages** (~10/page, so roughly 60 documents total). 6 real ones are shown here with a `Pager` reflecting "Page 1 of 6."

**RadioEpisodes** (News & Media)
- `episodeLabel` (text, e.g. "Episode 32" or "Special Feature" — the real archive mixes numbered episodes with named specials, so this is free text rather than a strict incrementing number)
- `title` (text)
- `guest` (text, optional)
- `category` (select — Governance & Elections | Women's Rights & Leadership | Child Protection | Gender & Inclusion | Climate & Agriculture) — an editorial categorization added in this pass; the original archive had no topic tags, only chronological numbering
- `audioEmbedUrl` (text, optional) — a SoundCloud oEmbed URL. This is standard Payload practice: a radio archive's audio genuinely lives on an audio host, and a production CMS stores the oEmbed reference rather than re-hosting 40+ audio files itself. Every "Listen" link on this page is a real, individually-verified `soundcloud.com` URL pulled from PODA's actual SoundCloud accounts (never a poda.org.pk link, and never guessed) — episodes where a specific SoundCloud URL couldn't be verified simply have no "Listen" link at all rather than a fabricated or generic one.

**TeamMembers**
- `name` (text)
- `role` (text)
- `department` (select: management | program)
- `photo` (upload → Media)
- `bio` (textarea, optional) — only the Executive Director's spotlight card uses this today; keeping it on every document means promoting anyone to a spotlight later is a content change, not a schema change
- `menuOrder` (number)

**Pages**
- `title`, `slug`
- `layout` (blocks field) — each page (Home, About Us, Projects, ...) is one `Pages` document whose `layout` array uses the blocks below, in order. This gives editors drag-and-drop control over section order without a redeploy.

The 6 flagship focus areas no longer have their own dynamic route or detail page — since Programs merged into Projects (see the redesign note above), a flagship entry is just a `Projects` document rendered as a `.project-feature` card directly inside `projects.html`, the same as every other project. No separate page-building step, and no separate template either.

## Blocks (used in `Pages.layout`)

- **HeroSlider** — `slides[]`: `{ backgroundImage (upload), eyebrow (text), heading (text), body (textarea), primaryButton?, secondaryButton? }` — homepage only.
- **PageHeader** — `eyebrow (text)`, `heading (text)`, `body (textarea)`. Compact banner for inner pages (About, Annual Conference, Contact); reuses the same gradient/blob treatment as `CtaBand` so every page opens on the homepage's visual signature instead of a plain title bar.
- **TextTeaser** — `eyebrow`, `heading`, `body`, `button { label, url }`. Homepage-only, short pointer to the About page. Deliberately NOT `MissionVision` — that block's full copy lives in exactly one place (About) instead of being repeated on Home.
- **ImpactHighlights** — `items[]` `{ icon (select), value (text), label (text) }` — keep every figure tied to something editors can verify (program count, conference edition, coverage, helpline) rather than a vanity metric that goes stale. Homepage-only after the redundancy pass below; About's team counts already read from the `TeamGrid` group labels, so a second stats strip repeating "7 Programs" / "Punjab · KP · Islamabad" was cut.
- **MissionVision** — `image (upload)`, `missionText (richText)`, `visionText (richText)` — About page only.
- **IconFeatureGrid** — `heading`, `eyebrow`, `columns (2|3|4)`, `items[]` `{ icon (select), title (text), body (textarea, optional), link? (relationship → Projects) }`. Used once as "Our Approach" (3-col, About).
- **ActivityGrid** (renamed from `ProgramGrid`) — `heading`, `eyebrow`, `activities[]` (relationship → Activities, latest N by `publishedDate`). Resolver pulls the most recent Activities at render time — mirrors the current Elementor "Posts widget per category" behavior without hardcoding which post shows, just without the per-program grouping now that Programs no longer exists as a concept. Used on the homepage (trimmed to 3, recency-sorted) and as the "Recent Activities" preview on `news-and-media.html` (6 shown, `activities.html` is the full archive).
- **StoryGrid** — `heading`, `eyebrow`, `stories[]` (relationship → Stories, latest N or manually curated). Homepage only.
- **TeamGrid** — `heading`, `eyebrow`, `spotlight?` (relationship → TeamMembers, renders the large featured card), `groups[]` `{ label (text), members[] (relationship → TeamMembers) }` — About page uses two groups ("Management Team", "Program Department") sourced from `TeamMembers.department`.
- **CtaBand** — `heading`, `body`, `ways[]` `{ icon, title, body, button { label, url } }`. Homepage only — this is the site's one full 3-card conversion moment.
- **CtaBar** — `heading`, `body`, `buttons[]` `{ label, url, style }`. Slim single-row version of the same idea for every other page, so "Donate / Get Legal Aid / Intern" doesn't appear as an identical full-width block on every page in the site. The second button varies by page — `annual-conference.html` points to "All Projects" (`projects.html`), the News & Media hub pages point to their own "View All" destinations — rather than repeating the exact same two buttons everywhere.
- **MediaLibraryGrid** — `items[]` `{ icon (select), title, body, stat (text), link }`. Four tiles (Gallery/Videos/Press/Publications) on the News & Media hub — deliberately four distinct cards pointing at four distinct collections, not one generic "Media" feed, so each keeps its own fields and its own page.
- **RadioSpotlight** — `icon`, `eyebrow`, `heading`, `body`, `button { label, url }`. A visually distinct banner (gradient band, not a fifth grid tile) so Radio Programs — the richest, longest-running collection here — reads as its own thing rather than another Media Library card.
- **EpisodeGrid** — `episodes[]` (relationship → RadioEpisodes), with a client-side category filter reading `RadioEpisodes.category`. Radio Programs page only.
- **GalleryGrid** — `albums[]` (relationship → GalleryAlbums). Gallery page only.
- **VideoGrid** — `videos[]` (relationship → Videos). Videos page only.
- **PressList** — `items[]` (relationship → PressItems, latest N). Press page only.
- **DocGrid** — `documents[]` (relationship → Publications). Publications page only.

### News & Media hub (`news-and-media.html`) — not a `Pages.layout` document, rebuilt to mirror the real `poda-media/` page

**Update (this pass):** the hub has grown since the section below was written. It now runs 7 tabs — Recent Activities, Photo and Video Highlights (Photo Gallery + Video Library merged into one tab), Press Room, Publications, Radio Programs, PODA Webinar, and **Success Stories**, which has moved back here from the Our Impact page (the paragraph below explains why it originally lived under Our Impact instead — that reasoning no longer holds once News & Media absorbed a proper "Recent Activities" tab of its own, so Success Stories now sits alongside it rather than off on Impact). Impact's own subnav accordingly dropped to 4 sections. A new `activities.html` gives Recent Activities the same "preview + full archive" pattern as Gallery/Videos/Press/Publications/Radio.

This block went through two revisions. It was first built from a content brief (a screenshot listing "Recent activities / Press Releases / Events and campaigns / Success stories / Radio / Photo and video highlights") before poda.org.pk's actual `/poda-media/` and `/listen-live/` pages had been read closely. Once those two real pages were analyzed directly, the hub was rebuilt to match what's actually there instead of the brief — the brief's structure is not reflected in the live site, so it was dropped in favor of ground truth. Two things fell out of this hub as a result:

- **Success Stories** — the real site's version of this content (`/gallery/success-stories/`) is reached via the **Our Impact** nav item, not News & Media. `stories.html` + its 4 real story pages (in `stories/`) still exist with real, fully-migrated content. The "Our Impact" nav item is now a dropdown (`impact.html`) with five anchored sections — Success Stories, Key Achievements, Major Milestones, Community Transformation, Beneficiary Testimonials — built from the org's own achievements/milestones copy; `stories.html` stays live as the "view all" destination linked from the Success Stories section. Community Transformation and Beneficiary Testimonials are real sections with clearly labeled placeholder/preview cards pending real case studies and consented testimonials.
- **Events & Campaigns** — not a real category on poda.org.pk at all; it was invented to satisfy the content brief. `events-campaigns.html` still exists (real content: the 18th Annual Conference, the recurring World Rural Development Day, and the real "Reduce Early Marriages" campaign), but it's no longer linked from the News & Media hub or footer. It stays reachable the way the real "World Rural Development Day" item always has been — via the footer's `News & Events` list (see Footer global, below) — rather than being deleted or left as a dead end.

The rebuilt hub now mirrors `/poda-media/` directly: `PageHeader` ("PODA Media") + `MediaLibraryGrid` (Gallery/Videos/Press/Publications — the real page's four tiles, in the real page's order) + `RadioSpotlight` (Radio Programs is a nav-dropdown child of News & Media on the real site, reached from `/listen-live/`, not one of the four tiles) + a `News & Events` section reusing the same 3 real items (206/205 Wednesday Webinar, World Rural Development Day) that appear in the global footer + `CtaBar`.

#### The real archives are much bigger than they first looked

A closer read of the live site turned up real pagination on three of these: **Press is 36 pages** (`/category/press-release/page/2/`, `/page/3/`, …), **Videos is 21 pages**, **Publications is 6 pages** (`/documents/page/2/`, …) — likely 300+ real press releases, 300+ real videos, and ~60 real documents in total. Radio's archive (`/listen-live/`) isn't paginated the same way but runs to 40+ episodes, mixed numbered entries and named specials, with real (individually verified) `soundcloud.com` URLs available for a subset of them.

Given that scale, the choice (confirmed with the site owner rather than assumed) was: **don't fake full parity, and don't silently cap either.** Each of Press/Videos/Publications/Radio now shows **6 real items** on a `Pager` component that displays the *true* page count and total (e.g. "Page 1 of 36 — 300+ releases") with disabled Prev/Next controls — an honest "this is real, and there's more, wire it up when the rest is migrated" rather than either a fabricated 300-item archive or a page that quietly pretends 6 is the whole story. `Pager` is a new shared block (`.pager` in `css/styles.css`) built specifically to be reused once real pagination exists — the design is ready for it now, not something to redo later.

### Radio Programs page (`radio-programs.html`)

`PageHeader` + an overview section (`MissionVision` reused again) + a **Featured Interviews** block (curated, non-filterable — the real named guest specials from `/listen-live/`: Sameena Nazir on FM93 Rawalpindi, Taj Abbasi & Baji Fayyaz, Farah Naz, Uzma Batool of FAO, and NADRA Chairman Tariq Malik — all 5 with individually verified `soundcloud.com` URLs) + `EpisodeGrid` with category filter. The page header carries the real tagline from the live site — "Promoting Democracy, Civic Leadership, Legal Identity, and Equal Rights," funded by NED, broadcast on FM101 since 2016.

The episode grid shows 6 real episodes, every one with a verified real SoundCloud URL: both real "Reduce Early Marriages to Enhance Gender Equality (REMs)" episodes, "Let's Talk" Episodes 3 and 4, a Dr. Shakeel special on child labor and education, and a Dr. Bilqees Rehman special — plus the `Pager` ("Showing 6 of 40+"). An earlier version of this grid filled out to 14 cards using plausible-sounding episode titles (an "Episode 32," a "Julie's Story," etc.) that had no verified SoundCloud URL behind them at all — those were removed entirely rather than kept as link-less filler, since a title with no real source behind it isn't a real episode, it's a guess wearing an episode's clothes. Categories (Governance & Elections, Women's Rights & Leadership, Child Protection, Gender & Inclusion, Climate & Agriculture) are an editorial addition — the real archive has no topic tags, only chronological numbering — and two of the five (Gender & Inclusion, Climate & Agriculture) currently have zero real episodes verified against them; the filter buttons stay visible and functional so real episodes in those categories slot in later without any UI rework.

### Activity detail page (the `/activities/[slug]` route, renamed from `/updates/[slug]`)

A dynamic route templated from a single `Activities` document rather than a hand-built `Pages` document — 24 real `activities/*.html` files exist in the static prototype because there's no routing layer yet to fake it with.

- `ActivityHeader` — a `PageHeader` variant sourced from `Activity.title` + a meta row (`publishedDate`, `Activity.relatedProject.title`)
- `ActivityBody` — `Activity.featuredImage` + `Activity.content` (richText), with a share row (reused from `Footer.socialLinks`)
- `ActivityAside` — sticky sidebar with two cards: (1) `Activity.relatedProject`'s title/excerpt/anchor link, resolved via the `relatedProject` relationship; (2) another recent Activity for the same project (same resolver logic as `ActivityGrid`), so every activity always surfaces a sibling
- `CtaBar`

### Programs directory and program detail pages — retired (this pass)

`programs.html` and the 7 `programs/*.html` detail pages no longer exist. Their content was redistributed: the 6 non-conference programs' overview copy now lives directly in each flagship `Projects` document's `excerpt` (rendered as a `.project-feature` card on `projects.html`, no separate page); the Annual Rural Women Leadership Training Conference's content moved to the new `ConferenceEditions` collection and its own `annual-conference.html` page. See the redesign note at the top of this file for the reasoning.

### Annual Conference page (`annual-conference.html`) — not a `Pages.layout` document

`PageHeader` (sourced from the conference's evergreen facts — 18th edition, 1,500+ leaders, since 2008) + `MissionVision`-style overview + one `.project-feature` card per `ConferenceEditions` document (dates, location, donor agencies, focus, resolution/booklet link where real) + `CtaBar`. Has its own standalone header nav item — the one focus area that earned it, since a conference archive genuinely doesn't fit a generic project card.

### Careers page (`careers.html`) — not a `Pages.layout` document

`PageHeader` + a 3-tab `section-subnav` (Internships / Jobs / Volunteers) — the same jump-nav + scrollspy + mobile `<select>` pattern already used by `impact.html` and `projects.html`, reusing the shared class-based logic in `main.js` rather than a bespoke tab implementation. Replaces what used to be three separate (and, for Jobs/Volunteer, never-built) nav destinations — see the redesign note at the top of this file.

- **Internships tab** — `JobOpenings` filtered to `category: internship` rendered as `.opening-card`s, plus a static eligibility/benefits `IconFeatureGrid`-style pair and an `ApplyCard` banner (document checklist + `mailto:` actions) that isn't per-posting — every internship posting currently applies through the same checklist.
- **Jobs tab** — `JobOpenings` filtered to `category: job`. The two seeded documents (Finance & Grants Officer, MEL Officer) are prototype placeholders. When a `category` has no `open` documents, the tab falls back to the `.openings-empty` state instead of an empty grid.
- **Volunteers tab** — static "Why Volunteer" copy + the `VolunteerApplication` form (see Collections above) rendered via `.contact-form-wrap`/`.form-row`/`.form-group` — the same generic form styling the Contact page form already uses, reused rather than duplicated for a second form on the site.

### Activities archive page (`activities.html`) — not a `Pages.layout` document

`PageHeader` + search-only `ActivityGrid` (no pagination — all 24 real Activities are fully migrated, unlike Press/Videos/Publications/Radio which are still partial slices of a much larger real archive) + `CtaBar`. Follows the same "preview on the News & Media hub + dedicated full archive page" pattern as Gallery/Videos/Press/Publications/Radio.

## Globals

**Header** — `logo (upload)`, `navItems[]` `{ label, url, children[]? { label, url } }`, `secondaryLink { label, url }` (Legal Aid Helpline), `donateButton { label, url }`. `navItems` no longer includes "Programs" — replaced by "Annual Conference" as its own standalone item, with "Activities" folded into the "News & Media" dropdown instead of getting a nav item of its own. The "Careers" item's `children[]` now resolve to in-page anchors on one `careers.html` document (`#internships`, `#jobs`, `#volunteers`) rather than three separate routes — see the `Careers page` entry above.

**Footer** — `logo (upload)`, `aboutText (richText)`, `ourWorkLinks[]` (renamed from `programLinks`, relationship → Projects + one entry for `annual-conference.html`), `newsLinks[]` (relationship → Activities, or auto-resolve latest 3), `socialLinks[]` `{ platform: twitter|facebook|youtube|instagram, url }`, `contact { phones[], mobile, email }`, `donateButton { label, url }`, `copyrightText`

The News & Media pages (`news-media.html`, `radio-programs.html`, `gallery.html`, `videos.html`, `press.html`, `publications.html`, `events-campaigns.html`, `stories.html`, and the 4 pages in `stories/`) use a footer third column that now matches the real site's five links: Gallery, Videos, Press, Publications, Radio Programs. `events-campaigns.html` and `stories.html` deliberately are **not** in that list — see the News & Media hub section above for why (neither is real News & Media IA). `events-campaigns.html` stays reachable through the "World Rural Development Day" item in `newsLinks[]` instead. Every other existing page (~24 files) still carries the older static "News & Events" 3-item list — that inconsistency remains out of scope for this pass, same as before.

## Redundancy pass

Cross-page and within-page duplication was cut deliberately — each fact now has exactly one home:

- **Mission & Vision** used to appear in full on both Home and About with identical wording. It now lives only on About; Home gets a two-sentence `TextTeaser` linking there instead.
- **"What We Do"** (homepage icon grid of all 7 former programs) was removed — the `ActivityGrid` directly below it already surfaced real images and posts, so the icon grid was the same information one section too early. (The 7-program icon grid concept is now moot entirely — see the redesign note at the top of this file.)
- **Impact stats** appeared on both pages sharing 3 of 4 identical figures ("7 Programs", "Punjab · KP · Islamabad", "Free Legal Aid"). `ImpactHighlights` is now homepage-only; About's team size is already legible by counting the `TeamGrid` cards, so it didn't need its own stat too.
- **"Ways to Help"** was a byte-for-byte identical 3-card CTA block on every page. It's now homepage-exclusive as the site's one primary conversion moment; every other page gets the slim `CtaBar` instead.
- Within the About page itself, the `PageHeader` intro and the `MissionVision` intro paragraph both restated "evidence-based research, rights-based programming, and impact-oriented advocacy" almost verbatim — the `PageHeader` copy was rewritten to introduce the page's sections instead of pre-summarizing the paragraph directly below it.
- **Programs directory vs. homepage "Recent Activity" vs. program detail pages** — three places could plausibly show "latest post per program," which would have meant the same 7 title/image/excerpt trios repeated in three locations. Split by purpose instead: the homepage's `ProgramGrid` was trimmed from 9 cards (one per program) down to 3 — a genuine recency-sorted "what's new across all programs" slice, not one card per program. The `programs.html` directory shows all 7 programs but with `cardDescription` (evergreen, mission-derived text) instead of a news teaser — nobody has to introduce a program before Home's feed does that job differently. Each program's own detail page is the only place its actual recent posts (2, real, sourced from its live category page) appear.

## Notes

- **No page on this site links out to poda.org.pk, full stop.** Earlier passes treated some outbound poda.org.pk links (Gallery albums, Publications downloads, Radio's SoundCloud archive) as an acceptable "pending migration" gap, disclosed in these notes rather than hidden. That standard turned out to be wrong — the fix wasn't disclosure, it was removal. Current state: Gallery photos are fully downloaded and hosted locally (see `GalleryAlbums`, above); Radio's "Listen" links go to real, individually-verified `soundcloud.com` URLs (never poda.org.pk, never guessed — episodes without a verified URL simply have no link); Publications cards are non-interactive pending real file uploads, rather than linking anywhere. If a future collection needs an external reference, it must point to the content's actual real host (e.g. `soundcloud.com`, `youtube.com`) — never back to poda.org.pk.
- The old site's live "visitors today" counter is a WordPress plugin widget with no static equivalent — dropped in favor of the **ImpactHighlights** strip, which only surfaces figures that are real and re-verifiable from published content (program count, team size, conference edition, service area, helpline).
- **Stories of Change** is a distinct collection from **Posts** because success stories don't have a natural "publish date" news cycle — they're closer to evergreen case studies and read better hand-curated (`stories[]` relationship on the block) than "latest N."
- **TeamMembers** is its own collection (not a repeater field on the About page) so the same person can be reused — e.g. featured in a `TeamGrid.spotlight` on one page and listed in a group on another — without re-entering their name/photo/role twice.
- The About page intro text reveals the org's full name — "Potohar Organization for Development Advocacy (PODA)" — pulled directly from poda.org.pk/about-us/. Worth surfacing prominently since the homepage never spells it out.
- Icons are a single inline `<svg><symbol>` sprite, duplicated at the top of every page's `<body>` (each page only defines the subset of icons it actually uses) since this is a static, no-build prototype. In the Payload frontend this becomes one shared layout component rendered once; store the icon **name** on each document (a select field, same pattern used elsewhere for icon-bearing collections) rather than markup.
- **Brand palette restricted to two colors (this pass):** every color on the site — every CSS custom property in `css/styles.css` `:root`, every inline `style="color:…"`, every `rgba()`, every URL-encoded SVG stroke color — was audited and replaced so that the entire palette is now just `#54377C` (primary) and `#939CE8` (secondary), plus tints (mixed toward white) and shades (mixed toward black) of those two. True neutrals — `#fff`/`#000`-based grays used for body text, shadows, and chrome like the video lightbox — were deliberately left alone rather than tinted, per the site owner's call. Carry the *constraint*, not just today's hex values, into a Payload-driven frontend's design tokens / Tailwind theme — any new color introduced later should be a derived tint/shade of these two, not a new hue:
  - Primary `#54377C` — tints `#765F96` (20%), `#9887B0` (40%); shades `#432C63` (20%), `#191125` (70%, used as the footer background)
  - Secondary `#939CE8` — tints `#F4F5FD` (90%), `#FAFAFE` (95%, the lavender card/surface backgrounds); shade `#767DBA` (20%)
  - The old CSS variable names (`--purple-900`, `--purple-brand`, `--green-accent`, etc.) were kept as-is to minimize diff — they're now misleading as *names* (there's no green in the palette anymore) but each one's value and mapping is commented inline in `:root`
  - Fonts: Roboto (UI/body), Roboto Slab (editorial mission/vision quotes)
