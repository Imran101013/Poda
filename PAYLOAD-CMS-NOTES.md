# Payload CMS structure for the PODA site prototype

Based on `index.html` (homepage), `about.html` (About Us), `projects.html` (Programs & Projects directory) + `program-detail.html` (per-program detail, dynamic-route stand-in), `annual-conference.html` + `conference-detail.html` (Annual Conference), `skills-center.html` + `course-detail.html` (Skills Center), `careers.html` + `tenders.html` (Join Us), the **News & Media** section — `news-and-media.html` (hub) plus `radio-programs.html`, `gallery.html`, `videos.html`, `webinars.html`, `press.html`, `blogs.html` + `blog-post.html`, `research-studies.html` + `study-detail.html`, `stories.html` — `impact.html` (Our Impact), `annual-report.html`, and `contact.html`. Each section is annotated inline with its Payload mapping — this file is the schema summary. CSS and JS were factored out to `css/styles.css` and `js/main.js`/`js/global.js` once a second page existed, so all pages share one design-system source of truth — mirrors how a Payload frontend would share a theme layer/component library across routes rather than duplicating styles per page.

**This file is a living map, not a historical record.** Earlier versions of these notes described a "Programs merged into Projects, no separate detail page" redesign and a News & Media hub built around a generic 4-tile `MediaLibraryGrid`. Neither is true of the tree as it stands today — Programs came back as a real, richly-populated collection with its own detail route, and the News & Media hub was rebuilt as a 5-section jump-nav page. Rather than layer another "as of this pass" caveat on top of the last one, this rewrite simply describes what's in the tree now. If you're reading this during a later pass and it's drifted again, trust the code and fix this file, not the other way around.

## Note on the header nav

The real, current nav (`js/global.js`'s `NAV` array) is 8 items: **About Us** (dropdown: Mission, Board, Team, Policies anchors on `about.html`, plus `annual-report.html` and the `#publications` anchor) · **Annual Conference** (dropdown: 5 past editions, all anchors on `annual-conference.html`) · **Programs** (dropdown: `projects.html` plus its `#past-projects`/`#current-projects` anchors — the dropdown label is "Programs" while the nav's internal `key` is `projects`; harmless today, but worth renaming the key to `programs` if this ever gets refactored, so the two don't silently drift) · **Skills Center** (standalone, no dropdown) · **News & Media** (dropdown: Photo and Video Highlights, Press Room, Blogs/Articles, Research Studies, Audio/Radio, Webinar, Success Stories) · **Our Impact** (dropdown: Key Achievements, Major Milestones, Community Transformation, Beneficiary Testimonials) · **Join Us** (dropdown: Internships, Jobs, Volunteer, Membership anchors on `careers.html`, plus `tenders.html`) · **Contact Us**.

A "PODA History" nav child (`about.html#history`) was removed this pass — `about.html` never had a History section or id, and the page's own `.about-tabs` sub-nav already excluded it (only Mission/Board/Team/Policies/Publications), confirming it was already-abandoned content rather than a fresh gap. Same category of fix as the earlier Jobs/Volunteer nav-placeholder cleanup described below.

**Careers consolidated onto one hub page:** the header's "Join Us" dropdown previously pointed at three destinations — `internships.html`, `jobs.html`, `volunteer.html` — of which only Internships actually existed as a built page; Jobs and Volunteer were unbuilt nav placeholders. All three (plus Membership) are now one page, `careers.html`, following the "hub + `section-subnav` tabs" pattern also used by `impact.html` and `projects.html` (sticky tab bar + mobile `<select>`, scrollspy via the shared, class-based logic in `main.js` — no page-specific JS required). `tenders.html` sits alongside it as its own real page (procurement notices genuinely aren't a careers concept), reached from the same dropdown. `internships.html` was deleted outright (its real content moved into the Internships tab) rather than kept as a redirect, since a static prototype has no routing layer to make a redirect meaningful.

## Programs — real, not merged away

Programs is a real, live collection with its own detail route: `program-detail.html`, a dynamic-route stand-in (see below) driven by `?program=<slug>`. It holds 7 real flagship programs (Civic Voice & Education, Economic Empowerment, Climate Action, Democracy Promotion, Human Rights Advocacy, Stop Violence Against Women, Humanitarian Action), each with a full overview, funders, locations, deliverables, and its 2–3 most recent real donor-funded projects. It's linked from three places: `projects.html`'s "Read More" links, the homepage's program cards, and the footer's "Our Work" column (a curated 4-of-7 slice — see Globals below).

`projects.html` itself is the directory: flagship programs render as `.project-feature` cards, and the page also lists dated `current`/`past` donor-funded projects (not tied to a specific flagship program) under `#current-projects`/`#past-projects`. Both live under the one "Programs" nav dropdown.

## Dynamic-route stand-ins

Five files share one pattern that's easy to miss without it being called out: a single static HTML file whose inline `<script>` reads a query-string param and swaps in one of several hardcoded content objects — simulating what would be one Payload dynamic route template in production, not one file per item. Each now carries an HTML comment directly above its `<script>` block saying so. The five:

- `program-detail.html` — `?program=<slug>` → a `Projects` document (`/projects/[slug]` in production)
- `conference-detail.html` — `?edition=<year>` → a `ConferenceEditions` document (`/annual-conference/[edition]`)
- `study-detail.html` — `?study=<slug>` → a `ResearchStudies` document (`/research-studies/[slug]`)
- `course-detail.html` — `?course=<slug>` → a `Courses` document (`/skills-center/[slug]`)
- `blog-post.html` — `?post=<slug>` → a `BlogPosts` document (`/blogs/[slug]`)

The Activity detail route (`/activities/[slug]`, see below) is a different, larger-scale case of the same underlying problem — 24 *real, distinct* documents, not a template driven by one hardcoded lookup table — so it gets a real static file per document instead of a shared lookup script. Same reasoning as `GalleryAlbums`/`Stories`: when there are dozens of genuinely separate real documents, one static file per document is the honest static-prototype equivalent of "one dynamic page per document," not a design smell.

## Collections

**Media** — standard Payload uploads collection (logo, hero backgrounds, post images).

**Projects**
- `title` (text)
- `slug` (text, unique) — drives `program-detail.html?program=<slug>` and the card anchor on `projects.html` (`#slug`)
- `type` (select — `flagship` | `current` | `past`) — flagship entries are the 7 standing focus areas listed above, rendered with the richer `.project-feature` card *and* their own real detail page; `current`/`past` are the dated, donor-funded grants with no separate detail page
- `themeArea` (select, one of the 7 flagship slugs, plus `disability-inclusion` for the one flagship-less ongoing grant) — the field every project is grouped/filtered by; reuses the `Thematic Area` label already on the ongoing project cards rather than inventing a new concept
- `thematicAreaText` (text) — free-text elaboration shown in the card's meta grid (e.g. "Disability Inclusion, Women's Economic Empowerment, Gender Equality, GBVH...")
- `duration` (text, current/past only), `donorAgency` (text, current/past only), `location` (text)
- `excerpt` (textarea) — the card body copy on `projects.html`
- `overview` (richText) — the fuller narrative shown on the flagship's own `program-detail.html` page; flagship-only
- `funders`, `locations` (text, flagship-only) — "Key Funders" / "Locations Covered" rows on the detail page's "At a Glance" info card
- `deliverables[]` (text array, flagship-only) — the "Key Interventions" checklist on the detail page
- `latestProjects[]` (group, flagship-only) — `{ title, status?, duration, funder, location, excerpt }`, the 2–3 most recent real donor-funded projects delivered under that flagship program
- `keyInterventions[]` (text array, current only) — bullet list on the 2 actively-funded grant cards on `projects.html`
- `featuredInFooter` (checkbox) — true for the 4 flagship programs currently in the footer's "Our Work" column (Civic Voice & Education, Climate Action, Stop Violence Against Women, Humanitarian Action); a curated highlight slice, not "all programs show in the footer"

Real per-flagship facts/figures (1,500+ leaders, 18th edition, Punjab's minimum marriage age of 18, organic farm est. 2010, etc.) were pulled from PODA's own published content, not invented.

**ConferenceEditions** — the Annual Rural Women Leadership Training Conference's own collection, since it has real recurring structure (yearly editions with day-by-day programs, resolutions, booklets) that doesn't fit a generic project card
- `edition` (text, e.g. "2025", used as the `?edition=` slug), `title` (text, e.g. "18th Annual Rural Women Leadership Training Conference")
- `dates` (text), `location` (text), `attendance` (text, e.g. "1,500+ Leaders · 100 Districts")
- `overview` (richText)
- `days[]` (group) — `{ label, heading, body (richText), gallery[] (upload → Media, hasMany) }`, one entry per conference day
- `downloads[]` (group) — `{ label, href }`; the Resolution PDF is currently an honest `href:'#'` placeholder (no file uploaded yet, following the same "don't fake it" rule as `Publications` below), while the Booklet link already points at a real, migrated `Activities` document (`activities/constitutional-rights-equal-voices.html`) rather than a stub

**JobOpenings** — backs both the Internships and Jobs tabs on `careers.html` (see `Careers page` below)
- `title` (text)
- `category` (select — `internship` | `job`) — drives which of the two tabs a posting renders under; the two tabs are one collection filtered two ways, not two collections, since a posting is the same shape either way
- `department` (text, e.g. "Program Department", "Finance Department")
- `excerpt` (textarea)
- `postedDate` (date), `deadline` (date)
- `location` (text)
- `status` (select — `open` | `closed`) — the two seeded `job` documents (Finance & Grants Officer, MEL Officer) are prototype placeholders standing in for real postings, not real vacancies. **Known gap:** an `.openings-empty` fallback state (icon + "no open positions" copy + a speculative-CV mailto) was designed in CSS but the CSS-only rules were dead code with nothing rendering them — `careers.html`'s three tabs currently render `.openings-grid` unconditionally, since every seeded document is `open`. A real Payload frontend would compute the empty state from the actual query result (`status: open` count === 0) rather than needing separate markup at all; if this static prototype ever needs to demo that state, it should get real conditional JS, not just CSS sitting unused.
- `applyUrl` (text, optional) — internship postings currently point at the `#intern-how-to-apply` anchor on the same page (a static `ApplyCard` with document checklist, not per-posting); job postings point at a `mailto:` with a pre-filled subject. A real ATS integration would replace both with a real `applyUrl`.

**VolunteerApplication** — not an editor-authored collection. This is a Payload `form-builder` Form definition (the same pattern the Contact page's message form should also use, though that form predates these notes and isn't documented here yet) capturing `name`, `email`, `phone` (optional), `gender` (select: Female/Male/Other/Prefer not to say), `age` (number), `address` (optional) — submissions land in `form-submissions`, reviewed by whoever coordinates volunteers, not rendered back onto the page. The Volunteers tab's client-side "success" swap on `careers.html` is prototype-only UI feedback (no submission is actually persisted yet in this static build). The "Membership" tab child in the nav is an anchor on the same page (`careers.html#membership`) — check that section's real content/fields before treating it as a fully separate flow from Volunteers.

**Tenders** — backs `tenders.html`, reached from `careers.html`'s dropdown alongside Internships/Jobs/Volunteer/Membership even though it's a standalone page (procurement notices aren't really a "Join Us" concept, but there's nowhere else in the current nav for them to live)
- `title` (text), `referenceNo` (text), `deadline` (date), `category` (text), `excerpt` (textarea)
- `documentFile` (upload → Media, optional) — same "non-interactive until a real file exists" rule as `Publications`
- The page's `archive-note` includes a "Register as a vendor" `mailto:` for organizations wanting to be notified of future tenders when none are currently open.

**Activities** (renamed from `Posts` — these are dated news/updates, not projects, and were never really "posts" in a blog sense)
- `title` (text)
- `slug` (text, unique) — drives the detail page route, `/activities/[slug]`
- `excerpt` (textarea) — shown on the `ActivityGrid` card
- `content` (richText) — the full article body, rendered on the activity's own detail page (see below)
- `featuredImage` (upload → Media)
- `relatedProject` (relationship → Projects, hasMany: false) — points at a flagship program or conference-edition entry
- `publishedDate` (date)

All 25 current Activities have real, fully-migrated `content` — pulled from each post's live page on poda.org.pk rather than left as an excerpt-plus-external-link. See the `Activity detail page` section below. `activities.html` is the full archive, following the same "preview on the hub + full archive page" pattern used for Gallery/Videos/Press/Publications/Radio/Webinars.

**Stories** (success stories / case studies — separate from Activities since they're evergreen, not dated news)
- `title` (text)
- `location` (text)
- `tags[]` (text array, e.g. "Child Protection", "Girls' Education")
- `content` (richText)
- `featuredImage` (upload → Media, optional)

**BlogPosts** — backs `blogs.html` (archive) + `blog-post.html` (dynamic-route stand-in, `?post=<slug>`)
- `title` (text), `slug` (text, unique)
- `category` (text, e.g. field notes vs. policy vs. community voice — check `blogs.html`'s filter values for the real set)
- `excerpt` (textarea), `content` (richText)
- `author` (relationship → TeamMembers, optional), `publishedDate` (date)
- `featuredImage` (upload → Media)

**ResearchStudies** — backs `research-studies.html` (archive) + `study-detail.html` (dynamic-route stand-in, `?study=<slug>`)
- `title` (text), `slug` (text, unique)
- `docType`/`focusArea` (text — check `research-studies.html` for the real filter/tag values)
- `excerpt` (textarea), `content` (richText, the study's findings)
- `coverImage` (upload → Media)
- `reportFile` (upload → Media, optional) — same "non-interactive until real file exists" rule as `Publications`

**Courses** — backs `skills-center.html` (catalog) + `course-detail.html` (dynamic-route stand-in, `?course=<slug>`)
- `title` (text), `slug` (text, unique)
- `category` (select, e.g. "Health & Well-being", "Vocational & Life Skills" — check `skills-center.html`'s `data-category` values for the full real set)
- `thumbnail` (upload → Media, rendered behind a `.grad-cap` icon on a brand-gradient card, not a photo)
- `price` (text/number — course cards show a price; confirm whether this is real fee-for-service or placeholder before treating `Courses` as a commerce collection)
- `curriculum[]` (group — module title + description, rendered as an accordion on `course-detail.html`)
- `author` (relationship → TeamMembers, optional)

**GalleryAlbums** (News & Media)
- `title` (text, e.g. "18th Annual Conference — Day 2")
- `conference` (select, e.g. 18th | 17th) / `day` (select)
- `coverImage` (upload → Media)
- `photos[]` (upload → Media, hasMany) — **fully migrated, not linked out.** All 154 real conference photos (17/39/27 for the 18th conference's three days, 24/29/18 for the 17th's) were downloaded from poda.org.pk's media library and are committed locally under `images/gallery/<conference>-day-<n>/`, with one real detail page per album at `gallery/<slug>.html` rendering the actual photo grid (`.photo-wall`, lazy-loaded).
- Production note: these are full-resolution originals (2–4MB each) committed as-is, since this static prototype has no image-processing pipeline. A real Payload `Media` collection would generate responsive `sizes` on upload — do that before this goes anywhere near production.

**Videos** (News & Media)
- `title` (text)
- `thumbnail` (upload → Media)
- `externalUrl` (text) — these point at PODA's YouTube channel rather than a per-video embed, since individual video URLs weren't available in this pass
- The real `/videos/` archive is **21 pages** (confirmed via its own pagination control) — likely 300+ videos total. 6 are shown here with a `Pager` reflecting the true "Page 1 of 21."

**PressItems** (News & Media)
- `title` (text)
- `publishedDate` (date)
- `excerpt` (textarea) — deliberately the *only* content field. Press releases are short enough that the excerpt is the whole item — no `content` richText, no detail route, no "Read More" link that goes nowhere useful.
- The real `/category/press-release/` archive is **36 pages** — likely 300+ releases total. 6 real ones are shown here with a `Pager` reflecting "Page 1 of 36."

**Publications** (News & Media, previewed on `about.html#publications`, full archive on `publications.html`)
- `title` (text)
- `docType` (select — Report | Training Manual | Policy Document | Awareness Guide | Campaign Material)
- `file` (upload → Media) — **no outbound links at all.** Since real PDF files aren't available to upload into Payload's Media collection, the cards are non-interactive (`<div>`, not `<a>`) until `file` is populated for real — an honest "not migrated yet" rather than a link elsewhere.
- The real `/documents/` archive is confirmed **6 pages** (~10/page, so roughly 60 documents total). 6 real ones are shown here with a `Pager` reflecting "Page 1 of 6."

**RadioEpisodes** (News & Media)
- `episodeLabel` (text, e.g. "Episode 32" or "Special Feature" — the real archive mixes numbered episodes with named specials, so this is free text rather than a strict incrementing number)
- `title` (text)
- `guest` (text, optional)
- `category` (select — Governance & Elections | Women's Rights & Leadership | Child Protection | Gender & Inclusion | Climate & Agriculture) — an editorial categorization added on top of the original archive, which had no topic tags, only chronological numbering
- `audioEmbedUrl` (text, optional) — a SoundCloud oEmbed URL. Every "Listen" link is a real, individually-verified `soundcloud.com` URL pulled from PODA's actual SoundCloud accounts — episodes where a specific URL couldn't be verified simply have no "Listen" link at all rather than a fabricated or generic one.

**TeamMembers**
- `name` (text)
- `role` (text)
- `department` (select: management | program)
- `photo` (upload → Media)
- `bio` (textarea, optional) — only the Executive Director's spotlight card uses this today; keeping it on every document means promoting anyone to a spotlight later is a content change, not a schema change
- `menuOrder` (number)

**Pages**
- `title`, `slug`
- `layout` (blocks field) — each page (Home, About Us, ...) is one `Pages` document whose `layout` array uses the blocks below, in order. This gives editors drag-and-drop control over section order without a redeploy.
- `annual-report.html` is a good candidate for a `Pages` document even though it doesn't have one yet in this static build — it already reuses the `.impact-card` component (via the "2025 at a Glance" `StatsGrid`-style section) rather than a bespoke layout, and would slot cleanly into the same blocks list as everything else.

## Blocks (used in `Pages.layout`)

- **HeroSlider** — `slides[]`: `{ backgroundImage (upload), eyebrow (text), heading (text), body (textarea), primaryButton?, secondaryButton? }` — homepage only.
- **PageHeader** — `eyebrow (text)`, `heading (text)`, `body (textarea)`. Compact banner for inner pages; reuses the same gradient/blob treatment as `CtaBand` so every page opens on the homepage's visual signature instead of a plain title bar.
- **TextTeaser** — `eyebrow`, `heading`, `body`, `button { label, url }`. Homepage-only, short pointer to the About page. Deliberately NOT `MissionVision` — that block's full copy lives in exactly one place (About) instead of being repeated on Home.
- **ImpactHighlights** — `items[]` `{ icon (select), value (text), label (text) }` — keep every figure tied to something editors can verify. Used on the homepage and reused (as an "animated Media Statistics" variant) on the News & Media hub.
- **MissionVision** — `image (upload)`, `missionText (richText)`, `visionText (richText)` — About page; also reused as the overview block on `annual-conference.html` and `radio-programs.html`.
- **IconFeatureGrid** — `heading`, `eyebrow`, `columns (2|3|4)`, `items[]` `{ icon (select), title (text), body (textarea, optional), link? (relationship → Projects) }`. Used once as "Our Approach" (3-col, About).
- **ActivityGrid** (renamed from `ProgramGrid`) — `heading`, `eyebrow`, `activities[]` (relationship → Activities, latest N by `publishedDate`). Used on the homepage (trimmed to 3, recency-sorted) and as the "Recent Activities" preview referenced from the News & Media hub (`activities.html` is the full archive).
- **StoryGrid** — `heading`, `eyebrow`, `stories[]` (relationship → Stories, latest N or manually curated). Used on the News & Media hub's Success Stories section (featured pair) and as the source for `stories.html`'s full grid.
- **TeamGrid** — `heading`, `eyebrow`, `spotlight?` (relationship → TeamMembers, renders the large featured card), `groups[]` `{ label (text), members[] (relationship → TeamMembers) }` — About page uses two groups ("Management Team", "Program Department") sourced from `TeamMembers.department`.
- **CtaBand** — `heading`, `body`, `ways[]` `{ icon, title, body, button { label, url } }`. Homepage only — the site's one full 3-card conversion moment (markup/CSS classes: `.cta-band`/`.help-strip`/`.help-col`).
- **CtaBar** — `heading`, `body`, `buttons[]` `{ label, url, style }`. Slim single-row version of the same idea for every other page.
- **GalleryGrid** — `albums[]` (relationship → GalleryAlbums). Feeds both the Gallery page and the News & Media hub's merged "Photo and Video Highlights" preview.
- **VideoGrid** — `videos[]` (relationship → Videos). Feeds both the Videos page and the same merged hub preview.
- **PressList** — `items[]` (relationship → PressItems, latest N). Feeds both the Press page and the hub's Press Room section (redesigned as a featured story + compact list, not a plain grid).
- **DocGrid** — `documents[]` (relationship → Publications). Feeds both `publications.html` and the `about.html#publications` preview tab.
- **RadioSpotlight** — `icon`, `eyebrow`, `heading`, `body`, `button { label, url }`. A gradient banner variant used within the hub's merged "Radio Programs" section (Listen Live + Radio Programmes merged).
- **EpisodeGrid** — `episodes[]` (relationship → RadioEpisodes), with a client-side category filter reading `RadioEpisodes.category`. Used on `radio-programs.html` (markup class: `.episode-embed`, not a generic grid — each episode renders as its own SoundCloud-embed card).
- **WebinarGrid** — `webinars[]` (a lightweight collection or a `Videos` filter — check `webinars.html`/`news-and-media.html#poda-webinar` before assuming a new collection is needed here). Used on `webinars.html` and the hub's "PODA Webinar" section.

## News & Media hub (`news-and-media.html`)

This is a single `PageHeader` + a `section-subnav` jump-nav (the same sticky-tabs + scrollspy + mobile `<select>` pattern as `impact.html`/`projects.html`/`careers.html`) across 6 in-page sections, not a grid of generic tiles pointing off-page:

1. **Photo and Video Highlights** (`#photo-video-highlights`) — merged `GalleryGrid` + `VideoGrid` preview, "Load More Albums" client-side pagination plus a "View Full Gallery" link to `gallery.html`
2. **Press Room** (`#press-room`) — `PressList`, redesigned as a featured story + compact list rather than a plain grid, "View All Press" → `press.html`
3. **Radio Programs** (`#radio-programs`) — merged Listen Live (live-status banner, currently an honest disabled "Listen Live" state — no live stream to link to) + `RadioSpotlight` + episode preview, "View All Episodes" → `radio-programs.html`
4. **PODA Webinar** (`#poda-webinar`) — `WebinarGrid` preview, "View All Webinars" → `webinars.html`
5. **Success Stories** (`#success-stories`) — `StoryGrid` (featured pair), "View All Success Stories" → `stories.html`
6. **Media Statistics** — `ImpactHighlights` reused in an animated variant, no nav-dropdown entry of its own

Two things that content briefs or earlier passes considered for this hub but that aren't part of its real IA on poda.org.pk:

- **Blogs/Articles** and **Research Studies** are separate standalone pages (`blogs.html`, `research-studies.html`), reached from the News & Media *nav dropdown* directly rather than as sections of this hub page.
- **Events & Campaigns** — not a real category on poda.org.pk at all. `events-campaigns.html` still exists (real content: the 18th Annual Conference, the recurring World Rural Development Day, and the real "Reduce Early Marriages" campaign) but isn't linked from the News & Media hub or the nav — it's reachable via the footer's "News & Events" list (the "World Rural Development Day" item).

## Research Studies page (`research-studies.html`) and Study detail (`study-detail.html`)

`PageHeader` ("The Evidence Behind Our Programs") + a filterable `ResearchStudies` grid + `CtaBar`. `study-detail.html` is the dynamic-route stand-in described above (`?study=<slug>`).

## Blogs & Articles page (`blogs.html`) and Blog post (`blog-post.html`)

`PageHeader` ("Field Notes, Policy & Community Voices") + a filterable `BlogPosts` grid + `CtaBar`. `blog-post.html` is the dynamic-route stand-in described above (`?post=<slug>`).

## Skills Center (`skills-center.html`) and Course detail (`course-detail.html`)

`PageHeader` ("PODA Skills Center") + a sidebar-filtered `Courses` catalog (course cards use a brand-gradient thumbnail with a graduation-cap icon, not a photo) + `CtaBar`. `course-detail.html` is the dynamic-route stand-in described above (`?course=<slug>`), including a curriculum accordion and an enrollment/payment modal — confirm with the site owner whether `Courses` pricing is real fee-for-service before treating it as a commerce feature in the Payload schema.

## Tenders (`tenders.html`)

`PageHeader` ("Tenders & Procurement Notices") + a `Tenders` list + an `archive-note` inviting vendors to register via `mailto:` when no tenders are currently open. Reached from the "Join Us" nav dropdown.

## Annual Report (`annual-report.html`)

Not yet a `Pages.layout` document in this static build, but should be one: `PageHeader` ("2025 Annual Report") + a "2025 at a Glance" `StatsGrid`-style section (deliberately reuses the `.impact-card` floating-stat pattern — serif numbers + hairline dividers — instead of a bespoke 5-box icon-card layout, so a report page and the homepage read as the same system) + a "Highlights of the Year" section + `CtaBar`. Reached from the About Us nav dropdown.

### Activity detail page (the `/activities/[slug]` route, renamed from `/updates/[slug]`)

A dynamic route templated from a single `Activities` document rather than a hand-built `Pages` document — 25 real `activities/*.html` files exist in the static prototype because there's no routing layer yet to fake it with.

- `ActivityHeader` — a `PageHeader` variant sourced from `Activity.title` + a meta row (`publishedDate`, `Activity.relatedProject.title`)
- `ActivityBody` — `Activity.featuredImage` + `Activity.content` (richText), with a share row (reused from `Footer.socialLinks`)
- `ActivityAside` — sticky sidebar with two cards: (1) `Activity.relatedProject`'s title/excerpt/anchor link, resolved via the `relatedProject` relationship; (2) another recent Activity for the same project (same resolver logic as `ActivityGrid`), so every activity always surfaces a sibling
- `CtaBar`

### Annual Conference page (`annual-conference.html`) — not a `Pages.layout` document

`PageHeader` (sourced from the conference's evergreen facts — 18th edition, 1,500+ leaders, since 2008) + `MissionVision`-style overview + one `.project-feature` card per `ConferenceEditions` document (dates, location, donor agencies, focus, resolution/booklet link where real) linking through to `conference-detail.html?edition=<year>` + `CtaBar`. Has its own standalone header nav item — the one focus area that earned it, since a conference archive genuinely doesn't fit a generic project card.

### Careers page (`careers.html`) — not a `Pages.layout` document

`PageHeader` + a 4-tab `section-subnav` (Internships / Jobs / Volunteers / Membership) — the same jump-nav + scrollspy + mobile `<select>` pattern already used by `impact.html` and `projects.html`. `tenders.html` is a separate real page reached from the same nav dropdown, not a fifth tab.

- **Internships tab** — `JobOpenings` filtered to `category: internship` rendered as `.opening-card`s, plus a static eligibility/benefits `IconFeatureGrid`-style pair and an `ApplyCard` banner (document checklist + `mailto:` actions) that isn't per-posting.
- **Jobs tab** — `JobOpenings` filtered to `category: job`. The two seeded documents are prototype placeholders. See the `JobOpenings.status` note above re: the empty-state gap.
- **Volunteers tab** — static "Why Volunteer" copy + the `VolunteerApplication` form, rendered via `.contact-form-wrap`/`.form-row`/`.form-group` — the same generic form styling the Contact page form already uses.
- **Membership tab** — reached via `#membership`; check its real fields/copy directly before assuming it maps to an existing collection.

### Activities archive page (`activities.html`) — not a `Pages.layout` document

`PageHeader` + search-only `ActivityGrid` (no pagination — all 25 real Activities are fully migrated, unlike Press/Videos/Publications/Radio which are still partial slices of a much larger real archive) + `CtaBar`. Follows the same "preview on the News & Media hub + dedicated full archive page" pattern as Gallery/Videos/Press/Publications/Radio/Webinars.

## Globals

**Header** — `logo (upload)`, `navItems[]` `{ label, url, children[]? { label, url } }`, `secondaryLink { label, url }` (Legal Aid Helpline), `donateButton { label, url }`. See "Note on the header nav" above for the real, current 8-item structure.

**Footer** — `logo (upload)`, `aboutText (richText)`, `ourWorkLinks[]` (relationship → Projects, filtered to `featuredInFooter: true`, plus one entry for `annual-conference.html`; currently 4 of the 7 flagship programs — a curated highlight slice, not the full set, same "recency/curation slice" reasoning as `ActivityGrid` on the homepage), `newsLinks[]` (relationship → Activities, or auto-resolve latest; currently 2 real activities + `events-campaigns.html`), `socialLinks[]` `{ platform: twitter|facebook|youtube|instagram, url }`, `contact { phones[], mobile, email }`, `donateButton { label, url }`, `copyrightText`

The News & Media-family pages (`news-and-media.html`, `radio-programs.html`, `gallery.html`, `videos.html`, `press.html`, `webinars.html`, `events-campaigns.html`, `stories.html`, and the 4 pages in `stories/`) use a footer third column matching the real site's Gallery/Videos/Press/Publications/Radio links. `events-campaigns.html` and `stories.html` deliberately are **not** in that list — see the News & Media hub section above for why. Every other page still carries the older static "News & Events" 3-item list — that inconsistency remains out of scope for this pass, same as before.

## Redundancy pass

Cross-page and within-page duplication was cut deliberately — each fact now has exactly one home:

- **Mission & Vision** used to appear in full on both Home and About with identical wording. It now lives only on About; Home gets a two-sentence `TextTeaser` linking there instead.
- **"What We Do"** (homepage icon grid of all programs) was removed — the `ActivityGrid` directly below it already surfaced real images and posts, so the icon grid was the same information one section too early.
- **Impact stats** appeared on both pages sharing 3 of 4 identical figures. `ImpactHighlights` is homepage-only (plus the News & Media hub's animated variant); About's team size is already legible by counting the `TeamGrid` cards.
- **"Ways to Help"** was a byte-for-byte identical 3-card CTA block on every page. It's now homepage-exclusive as the site's one primary conversion moment (`.cta-band`/`.help-strip`/`.help-col`); every other page gets the slim `CtaBar` instead.
- Within the About page itself, the `PageHeader` intro and the `MissionVision` intro paragraph both restated "evidence-based research, rights-based programming, and impact-oriented advocacy" almost verbatim — the `PageHeader` copy was rewritten to introduce the page's sections instead of pre-summarizing the paragraph directly below it.
- **Programs directory vs. homepage "Recent Activity" vs. program detail pages** — three places could plausibly show "latest post per program," which would mean the same trios repeated three times. Split by purpose instead: the homepage's `ActivityGrid` is a genuine recency-sorted "what's new across all programs" slice (3 cards), `projects.html` shows evergreen `excerpt` copy per program (not a news teaser), and each program's own `program-detail.html` is the only place its actual recent, real, donor-funded projects appear.

## Notes

- **No page on this site links out to poda.org.pk, full stop.** Gallery photos are fully downloaded and hosted locally; Radio's "Listen" links go to real, individually-verified `soundcloud.com` URLs (never poda.org.pk, never guessed); Publications cards are non-interactive pending real file uploads, rather than linking anywhere. If a future collection needs an external reference, it must point to the content's actual real host (e.g. `soundcloud.com`, `youtube.com`) — never back to poda.org.pk.
- The old site's live "visitors today" counter is a WordPress plugin widget with no static equivalent — dropped in favor of **ImpactHighlights**, which only surfaces figures that are real and re-verifiable from published content.
- **Stories** is a distinct collection from **Activities** because success stories don't have a natural "publish date" news cycle — they're closer to evergreen case studies and read better hand-curated than "latest N."
- **TeamMembers** is its own collection (not a repeater field on the About page) so the same person can be reused — e.g. featured in a `TeamGrid.spotlight` on one page and listed in a group on another — without re-entering their name/photo/role twice.
- The About page intro text reveals the org's full name — "Potohar Organization for Development Advocacy (PODA)" — pulled directly from poda.org.pk/about-us/.
- Icons are a single inline `<svg><symbol>` sprite, duplicated at the top of every page's `<body>` (each page only defines the subset of icons it actually uses) since this is a static, no-build prototype. In the Payload frontend this becomes one shared layout component rendered once; store the icon **name** on each document (a select field) rather than markup.
- **Brand palette is two colors, full stop:** every color in `css/styles.css` `:root` is `#55357E` (primary) or `#B422D8` (secondary), plus tints (mixed toward white) and shades (mixed toward black) of those two. True neutrals — `#fff`/`#000`-based grays used for body text, shadows, and chrome like the video lightbox — are deliberately left alone rather than tinted.
  - Primary `#55357E` (`--purple-brand`/`--purple-800`) — tints `#765F96` (`--purple-soft`), `#9887B0` (`--purple-600`); shades `#432C63` (`--purple-900`), `#191125` (`--footer-bg`)
  - Secondary `#B422D8` (`--accent-secondary`) — the lavender tints (`--lavender-100/200/300`, `#FAFAFE`/`#F4F5FD`/`#E9EBFA`) sit alongside it as the surface/card-background family
  - **Fixed this pass:** the sitewide `.topbar` (phone/email/social strip above the header, present on every page) and the Skills Center `.course-thumb`/`.course-hero-thumb` gradients were hardcoded teal (`#3FC1C0`/`#2E9E9D`) — a third color with no tint/shade relationship to either brand color. Both were re-colored onto the existing purple palette (`var(--purple-900)` for the topbar; the same `linear-gradient(135deg, var(--purple-brand), var(--purple-soft))` already used for `.avatar-initial`-style badges elsewhere, for the course thumbnails). Two stray inline SVG chevron icons (`data-URI` dropdown arrows) were also still hardcoded to the *previous* primary value (`#54377C`, from before a since-forgotten palette tweak to `#55357E`) — updated to match.
  - **Deliberate exception:** `.pay-modal-note`'s amber/cream (`#FFF8E8`/`#E6B800`, the course-enrollment payment note) is a semantic warning color, not a brand color — a different token category the "two brand colors" constraint was never meant to cover, same as how error/success states in most design systems sit outside the brand palette.
  - The old CSS variable names (`--purple-900`, `--purple-brand`, etc.) were kept as-is to minimize diff — they're descriptive of role, not hue, so they don't need renaming even though there's no green or blue anywhere in the palette.
  - Fonts: Roboto (UI/body), Roboto Slab (editorial mission/vision quotes), Lora (display headings).
- **Fixed this pass, tree-level bugs unrelated to any redesign:** a dangling nav link (`about.html#history`, no backing content — removed) and a missing static file (`activities/conference-2025-booklet-resolution.html`, linked from two cards but never created — added, using the real, already-migrated 18th-edition resolution content that already existed in `conference-detail.html`'s Day 3 tab). Also removed a dozen-plus CSS component blocks with zero matching markup anywhere in the tree (old testimonial-card design, an unused "at a glance" stat-tile variant, an unused generic media-library-tile component, an unwired conference broadcast-schedule component, and a few smaller single-purpose leftovers) — each superseded by a differently-named component that's actually in use. None of this changed how any page looks or behaves; it just stopped the CSS from documenting features that don't exist.
