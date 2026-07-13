# Payload CMS structure for the PODA site prototype

Based on `index.html` (homepage), `about.html` (About Us), `programs.html` (Programs directory), `programs/*.html` (7 program detail pages — one real page per program, not just a template), `updates/*.html` (14 post detail pages — one real page per post, two per program), and the **News & Media** section: `news-media.html` (hub) plus `radio-programs.html`, `gallery.html`, `videos.html`, `press.html`, `publications.html`. Each section is annotated inline with its Payload mapping — this file is the schema summary. CSS and JS were factored out to `css/styles.css` and `js/main.js` once a second page existed, so all pages share one design-system source of truth — mirrors how a Payload frontend would share a theme layer/component library across routes rather than duplicating styles per page.

**Note on the header nav:** "Programs" and "News & Media" used to be dropdown parents that were *also* directly clickable — ambiguous, since hovering revealed a menu but clicking the label itself navigated somewhere else too. "Programs" stayed a plain link (its old dropdown children all pointed at `#` and weren't real). "News & Media" went through two revisions: first flattened to a plain link (matching the "Programs" fix), then restored as `has-children` with a real 5-item dropdown — Radio Programs, Gallery, Videos, Press, Publications — once it became clear the dropdown itself wasn't the problem; the *old* dropdown was ambiguous because it had exactly one child ("Radio Programs") that duplicated what the label already implied. Five genuinely different destinations is a different situation: the dropdown now saves a click for anyone who knows exactly where they're headed, while the label itself still goes to `news-media.html`, the hub, for anyone who doesn't. "Our Impact" (previously a `#` placeholder) now points to `stories.html` — on the real poda.org.pk, "Our Impact" is exactly this link, to `/gallery/success-stories/`.

## Collections

**Media** — standard Payload uploads collection (logo, hero backgrounds, post images).

**Programs**
- `title` (text)
- `slug` (text, unique) — drives the detail page route, e.g. `/programs/[slug]`
- `icon` (select — maps to the inline SVG sprite: people/chip/leaf/scale/shield/vote/book)
- `cardDescription` (textarea) — the short, evergreen 1–2 sentence summary shown on the `programs.html` directory card AND reused as the detail page's `PageHeader` lead. One field, two render locations — not two separately-written descriptions that could drift out of sync.
- `overview` (richText) — the fuller paragraph in the detail page's `MissionVision`-style overview section
- `overviewImage` (upload → Media)
- `badge` — `{ icon (select), value (text), label (text) }` — the small floating stat card on the overview image (e.g. "1,500+ / Rural Women Leaders")
- `facts[]` (text array, 2–3 short items) — the pill row under the `PageHeader` lead (e.g. "18th Edition", "Oct 2025 · Islamabad")
- `menuOrder` (number) — controls submenu and program grid order

Real per-program facts/figures here (1,500+ leaders, 18th edition, Punjab's minimum marriage age of 18, etc.) were pulled from PODA's own published category-archive posts, not invented — see the `Recent updates` posts they were sourced from on each detail page.

**Posts**
- `title` (text)
- `slug` (text, unique) — drives the detail page route, e.g. `/updates/[slug]`
- `excerpt` (textarea) — shown on the `ProgramGrid` card
- `content` (richText) — the full article body, rendered on the post's own detail page (see below)
- `featuredImage` (upload → Media)
- `program` (relationship → Programs, hasMany: false)
- `publishedDate` (date)

All 14 current Posts have real, fully-migrated `content` — pulled from each post's live page on poda.org.pk rather than left as an excerpt-plus-external-link. See the `Post detail page` section below.

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
- `layout` (blocks field) — each page (Home, About Us, Programs, ...) is one `Pages` document whose `layout` array uses the blocks below, in order. This gives editors drag-and-drop control over section order without a redeploy.

Program detail pages are the one exception: rather than a hand-built `Pages` document per program, they're a dynamic route (`/programs/[slug]`) templated directly from a single `Programs` document — add a Program, get a detail page automatically, no separate page-building step. The static prototype has 7 real `programs/*.html` files (not one generic template) purely because there's no routing layer yet to fake; in Payload these collapse to one Next.js template.

## Blocks (used in `Pages.layout`)

- **HeroSlider** — `slides[]`: `{ backgroundImage (upload), eyebrow (text), heading (text), body (textarea), primaryButton?, secondaryButton? }` — homepage only.
- **PageHeader** — `eyebrow (text)`, `heading (text)`, `body (textarea)`. Compact banner for inner pages (About, Programs, Contact); reuses the same gradient/blob treatment as `CtaBand` so every page opens on the homepage's visual signature instead of a plain title bar.
- **TextTeaser** — `eyebrow`, `heading`, `body`, `button { label, url }`. Homepage-only, short pointer to the About page. Deliberately NOT `MissionVision` — that block's full copy lives in exactly one place (About) instead of being repeated on Home.
- **ImpactHighlights** — `items[]` `{ icon (select), value (text), label (text) }` — keep every figure tied to something editors can verify (program count, conference edition, coverage, helpline) rather than a vanity metric that goes stale. Homepage-only after the redundancy pass below; About's team counts already read from the `TeamGrid` group labels, so a second stats strip repeating "7 Programs" / "Punjab · KP · Islamabad" was cut.
- **MissionVision** — `image (upload)`, `missionText (richText)`, `visionText (richText)` — About page only.
- **IconFeatureGrid** — `heading`, `eyebrow`, `columns (2|3|4)`, `items[]` `{ icon (select), title (text), body (textarea, optional), link? (relationship → Programs) }`. Used once as "Our Approach" (3-col, About). The homepage's former "What We Do" instance of this block was removed — it just re-listed the same 7 programs the `ProgramGrid` below it already covers in more depth.
- **ProgramGrid** — `heading`, `eyebrow`, `programs[]` (relationship → Programs). Resolver pulls each Program's most recent related `Post` at render time — mirrors the current Elementor "Posts widget per category" behavior without hardcoding which post shows. Homepage only.
- **StoryGrid** — `heading`, `eyebrow`, `stories[]` (relationship → Stories, latest N or manually curated). Homepage only.
- **TeamGrid** — `heading`, `eyebrow`, `spotlight?` (relationship → TeamMembers, renders the large featured card), `groups[]` `{ label (text), members[] (relationship → TeamMembers) }` — About page uses two groups ("Management Team", "Program Department") sourced from `TeamMembers.department`.
- **CtaBand** — `heading`, `body`, `ways[]` `{ icon, title, body, button { label, url } }`. Homepage only — this is the site's one full 3-card conversion moment.
- **CtaBar** — `heading`, `body`, `buttons[]` `{ label, url, style }`. Slim single-row version of the same idea for every other page, so "Donate / Get Legal Aid / Intern" doesn't appear as an identical full-width block on every page in the site. The second button varies by page — About/Programs point back to `programs.html`, program detail pages point to "All Programs" — rather than repeating the exact same two buttons everywhere.
- **MediaLibraryGrid** — `items[]` `{ icon (select), title, body, stat (text), link }`. Four tiles (Gallery/Videos/Press/Publications) on the News & Media hub — deliberately four distinct cards pointing at four distinct collections, not one generic "Media" feed, so each keeps its own fields and its own page.
- **RadioSpotlight** — `icon`, `eyebrow`, `heading`, `body`, `button { label, url }`. A visually distinct banner (gradient band, not a fifth grid tile) so Radio Programs — the richest, longest-running collection here — reads as its own thing rather than another Media Library card.
- **EpisodeGrid** — `episodes[]` (relationship → RadioEpisodes), with a client-side category filter reading `RadioEpisodes.category`. Radio Programs page only.
- **GalleryGrid** — `albums[]` (relationship → GalleryAlbums). Gallery page only.
- **VideoGrid** — `videos[]` (relationship → Videos). Videos page only.
- **PressList** — `items[]` (relationship → PressItems, latest N). Press page only.
- **DocGrid** — `documents[]` (relationship → Publications). Publications page only.

### News & Media hub (`news-media.html`) — not a `Pages.layout` document, rebuilt to mirror the real `poda-media/` page

This block went through two revisions. It was first built from a content brief (a screenshot listing "Recent activities / Press Releases / Events and campaigns / Success stories / Radio / Photo and video highlights") before poda.org.pk's actual `/poda-media/` and `/listen-live/` pages had been read closely. Once those two real pages were analyzed directly, the hub was rebuilt to match what's actually there instead of the brief — the brief's structure is not reflected in the live site, so it was dropped in favor of ground truth. Two things fell out of this hub as a result:

- **Success Stories** — the real site's version of this content (`/gallery/success-stories/`) is reached via the **Our Impact** nav item, not News & Media. `stories.html` + its 4 real story pages (in `stories/`) still exist with real, fully-migrated content. The "Our Impact" nav item is now a dropdown (`impact.html`) with five anchored sections — Success Stories, Key Achievements, Major Milestones, Community Transformation, Beneficiary Testimonials — built from the org's own achievements/milestones copy; `stories.html` stays live as the "view all" destination linked from the Success Stories section. Community Transformation and Beneficiary Testimonials are real sections with clearly labeled placeholder/preview cards pending real case studies and consented testimonials.
- **Events & Campaigns** — not a real category on poda.org.pk at all; it was invented to satisfy the content brief. `events-campaigns.html` still exists (real content: the 18th Annual Conference, the recurring World Rural Development Day, and the real "Reduce Early Marriages" campaign), but it's no longer linked from the News & Media hub or footer. It stays reachable the way the real "World Rural Development Day" item always has been — via the footer's `News & Events` list (see Footer global, below) — rather than being deleted or left as a dead end.

The rebuilt hub now mirrors `/poda-media/` directly: `PageHeader` ("PODA Media") + `MediaLibraryGrid` (Gallery/Videos/Press/Publications — the real page's four tiles, in the real page's order) + `RadioSpotlight` (Radio Programs is a nav-dropdown child of News & Media on the real site, reached from `/listen-live/`, not one of the four tiles) + a `News & Events` section reusing the same 3 real items (206/205 Wednesday Webinar, World Rural Development Day) that appear in the global footer + `CtaBar`.

#### The real archives are much bigger than they first looked

A closer read of the live site turned up real pagination on three of these: **Press is 36 pages** (`/category/press-release/page/2/`, `/page/3/`, …), **Videos is 21 pages**, **Publications is 6 pages** (`/documents/page/2/`, …) — likely 300+ real press releases, 300+ real videos, and ~60 real documents in total. Radio's archive (`/listen-live/`) isn't paginated the same way but runs to 40+ episodes, mixed numbered entries and named specials, with real (individually verified) `soundcloud.com` URLs available for a subset of them.

Given that scale, the choice (confirmed with the site owner rather than assumed) was: **don't fake full parity, and don't silently cap either.** Each of Press/Videos/Publications/Radio now shows **6 real items** on a `Pager` component that displays the *true* page count and total (e.g. "Page 1 of 36 — 300+ releases") with disabled Prev/Next controls — an honest "this is real, and there's more, wire it up when the rest is migrated" rather than either a fabricated 300-item archive or a page that quietly pretends 6 is the whole story. `Pager` is a new shared block (`.pager` in `css/styles.css`) built specifically to be reused once real pagination exists — the design is ready for it now, not something to redo later.

### Radio Programs page (`radio-programs.html`)

`PageHeader` + `ProgramOverview` (`MissionVision` reused again, same pattern as program detail pages) + a **Featured Interviews** block (curated, non-filterable — the real named guest specials from `/listen-live/`: Sameena Nazir on FM93 Rawalpindi, Taj Abbasi & Baji Fayyaz, Farah Naz, Uzma Batool of FAO, and NADRA Chairman Tariq Malik — all 5 with individually verified `soundcloud.com` URLs) + `EpisodeGrid` with category filter. The page header carries the real tagline from the live site — "Promoting Democracy, Civic Leadership, Legal Identity, and Equal Rights," funded by NED, broadcast on FM101 since 2016.

The episode grid shows 6 real episodes, every one with a verified real SoundCloud URL: both real "Reduce Early Marriages to Enhance Gender Equality (REMs)" episodes, "Let's Talk" Episodes 3 and 4, a Dr. Shakeel special on child labor and education, and a Dr. Bilqees Rehman special — plus the `Pager` ("Showing 6 of 40+"). An earlier version of this grid filled out to 14 cards using plausible-sounding episode titles (an "Episode 32," a "Julie's Story," etc.) that had no verified SoundCloud URL behind them at all — those were removed entirely rather than kept as link-less filler, since a title with no real source behind it isn't a real episode, it's a guess wearing an episode's clothes. Categories (Governance & Elections, Women's Rights & Leadership, Child Protection, Gender & Inclusion, Climate & Agriculture) are an editorial addition — the real archive has no topic tags, only chronological numbering — and two of the five (Gender & Inclusion, Climate & Agriculture) currently have zero real episodes verified against them; the filter buttons stay visible and functional so real episodes in those categories slot in later without any UI rework.

### Post detail page (the `/updates/[slug]` route)

Like program detail pages, this is a dynamic route templated from a single `Posts` document rather than a hand-built `Pages` document — 14 real `updates/*.html` files exist in the static prototype for the same reason the 7 `programs/*.html` files do: there's no routing layer yet to fake it with.

- `PostHeader` — a `PageHeader` variant sourced from `Post.title` + a meta row (`publishedDate`, `Post.program.title` with `Post.program.icon`)
- `PostBody` — `Post.featuredImage` + `Post.content` (richText), with a share row (`Post.program`'s social links, reused from `Footer.socialLinks`)
- `PostAside` — sticky sidebar with two cards: (1) `Post.program`'s title/`cardDescription`/link, resolved via the `program` relationship — this replaces linking out to the program's live category page; (2) the program's other most-recent `Post` (same resolver logic as `ProgramGrid`), so every update always surfaces its sibling
- `CtaBar`

This replaces the previous behavior where a program detail page's "Read More" linked out to the live WordPress post (`target="_blank"`) because full post content hadn't been migrated yet. That gap is now closed — `ProgramGrid`'s "Read More" on every program detail page links to this route instead.

### Programs directory (`programs.html`) — not a `Pages.layout` document

Deliberately simpler than a blocks-based page: `PageHeader` + one `IconFeatureGrid` (`columns: 3`) whose `items[]` are resolved directly from the `Programs` collection (icon, title, `cardDescription`, link to the detail route) + `CtaBar`. No news/post content here at all — see the redundancy note below for why.

### Program detail page template (the `/programs/[slug]` route)

- `PageHeader` — sourced from `Program.title` + `Program.cardDescription` (lead) + `Program.facts` (tag-row)
- `ProgramOverview` (the `MissionVision` component, repurposed) — `Program.overviewImage` + `Program.badge` + `Program.overview`
- `ProgramGrid` filtered to `program: { equals: thisProgram.id }`, sorted by `publishedDate` desc, limit 2 — the "Recent Updates" cards. Real post titles/excerpts/images here were pulled from each program's live category-archive page on poda.org.pk; "Read More" now links to that Post's own detail page (`/updates/[slug]`, see below) instead of out to the legacy WordPress article.
- `CtaBar`

## Globals

**Header** — `logo (upload)`, `navItems[]` `{ label, url, children[]? { label, url } }`, `secondaryLink { label, url }` (Legal Aid Helpline), `donateButton { label, url }`

**Footer** — `logo (upload)`, `aboutText (richText)`, `programLinks[]` (relationship → Programs), `newsLinks[]` (relationship → Posts, or auto-resolve latest 3), `socialLinks[]` `{ platform: twitter|facebook|youtube|instagram, url }`, `contact { phones[], mobile, email }`, `donateButton { label, url }`, `copyrightText`

The News & Media pages (`news-media.html`, `radio-programs.html`, `gallery.html`, `videos.html`, `press.html`, `publications.html`, `events-campaigns.html`, `stories.html`, and the 4 pages in `stories/`) use a footer third column that now matches the real site's five links: Gallery, Videos, Press, Publications, Radio Programs. `events-campaigns.html` and `stories.html` deliberately are **not** in that list — see the News & Media hub section above for why (neither is real News & Media IA). `events-campaigns.html` stays reachable through the "World Rural Development Day" item in `newsLinks[]` instead. Every other existing page (~24 files) still carries the older static "News & Events" 3-item list — that inconsistency remains out of scope for this pass, same as before.

## Redundancy pass

Cross-page and within-page duplication was cut deliberately — each fact now has exactly one home:

- **Mission & Vision** used to appear in full on both Home and About with identical wording. It now lives only on About; Home gets a two-sentence `TextTeaser` linking there instead.
- **"What We Do"** (homepage icon grid of all 7 programs) was removed — the `ProgramGrid` directly below it already lists all 7 programs with real images and posts, so the icon grid was the same information one section too early.
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
- Icons are a single inline `<svg><symbol>` sprite, currently duplicated at the top of both `index.html` and `about.html` `<body>` tags since this is a static, no-build prototype. In the Payload frontend this becomes one shared layout component rendered once; store the icon **name** on each document (same select-field pattern as `Programs.icon`) rather than markup.
- Brand tokens (colors, fonts) live in `css/styles.css` `:root` — carry these into a Payload-driven frontend's design tokens / Tailwind theme unchanged:
  - Purple: `#4D217A`, `#561C54`, `#A040B2`, `#B422D8`
  - Lavender surfaces: `#F6EEFB`, `#F0E3F6`, `#E9DDF6`
  - Accent green (from the logo's flag mark): `#61CE70`
  - Footer: `#2A1230`
  - Fonts: Roboto (UI/body), Roboto Slab (editorial mission/vision quotes)
