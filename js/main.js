// Prototype-only interactions — in Payload each concern below becomes a
// small frontend component: the slider reads HeroSlider.slides, the header
// shadow/reveal logic is generic UI chrome that ships with the theme layer.

// Hero slider (only present on pages with a HeroSlider block, e.g. the homepage)
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dots button');
let current = 0;

function render(){
  slides.forEach((s,i)=> s.classList.toggle('active', i===current));
  dots.forEach((d,i)=> d.classList.toggle('active', i===current));
}
function goToSlide(i){ current = i; render(); }
function changeSlide(step){
  current = (current + step + slides.length) % slides.length;
  render();
}
if (slides.length){
  setInterval(()=> changeSlide(1), 6000);
}

// Sticky header shadow on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY > 12);
});

// Scroll-reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:0.12 });
revealEls.forEach(el=> io.observe(el));

// Gallery lightbox (only present on gallery/*.html album pages) — intercepts clicks on
// .photo-wall links and shows an in-page viewer instead of navigating to the raw image.
// The lightbox DOM is injected here rather than hand-added to all 6 album pages.
const photoLinks = Array.from(document.querySelectorAll('.photo-wall a'));
if (photoLinks.length) {
  const photos = photoLinks.map(a => ({ href: a.getAttribute('href'), alt: a.querySelector('img').alt }));
  let lbIndex = 0;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous photo"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M15 6l-6 6 6 6"/></svg></button>
    <img alt="">
    <button class="lightbox-next" aria-label="Next photo"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 6l6 6-6 6"/></svg></button>
    <span class="lightbox-counter"></span>
  `;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbCounter = lb.querySelector('.lightbox-counter');

  function showPhoto(i){
    lbIndex = (i + photos.length) % photos.length;
    lbImg.src = photos[lbIndex].href;
    lbImg.alt = photos[lbIndex].alt;
    lbCounter.textContent = `${lbIndex + 1} / ${photos.length}`;
  }
  function openLightbox(i){ showPhoto(i); lb.classList.add('is-open'); }
  function closeLightbox(){ lb.classList.remove('is-open'); }

  photoLinks.forEach((a, i) => {
    a.addEventListener('click', (e) => { e.preventDefault(); openLightbox(i); });
  });
  lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(lbIndex - 1));
  lb.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(lbIndex + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
  });
}

// Generic search + pill-filter for a list of cards (Press: search + year, Publications:
// search + doc type). Real client-side filtering — genuinely functional, not decorative.
// A production build would move this to a server-side query once the collection is large.
// pageSize/loadMoreId are optional — omit them (Press, Publications) and every
// matching item shows at once, same as before. Pass them (Projects archive) to
// only reveal pageSize matches at a time, with a button to reveal more; the
// reveal count resets whenever the search/filter changes so a new query always
// starts from the top of its own result set instead of picking up wherever the
// previous query's "page" left off.
function wireListFilter({ searchId, filterId, listId, itemSelector, filterAttr, emptyId, pageSize, loadMoreId }) {
  const searchInput = document.getElementById(searchId);
  const filterGroup = document.getElementById(filterId);
  const list = document.getElementById(listId);
  const emptyState = document.getElementById(emptyId);
  const loadMoreBtn = loadMoreId ? document.getElementById(loadMoreId) : null;
  if (!list) return;
  const items = Array.from(list.querySelectorAll(itemSelector));
  let activeFilter = 'all';
  let revealCount = pageSize || Infinity;

  // render() is pure — it paints the current activeFilter/query/revealCount
  // state. applyFilters() additionally resets revealCount, so a *new* search
  // or decade always starts from page one; the "Load More" handler calls
  // render() directly so incrementing revealCount actually sticks.
  function render() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const matches = [];
    items.forEach(item => {
      const matchesFilter = activeFilter === 'all' || item.dataset[filterAttr] === activeFilter;
      const matchesSearch = !query || item.textContent.toLowerCase().includes(query);
      const show = matchesFilter && matchesSearch;
      item.classList.toggle('is-hidden', !show);
      if (show) matches.push(item);
    });
    if (emptyState) emptyState.classList.toggle('is-visible', matches.length === 0);
    if (pageSize) {
      matches.forEach((item, i) => item.classList.toggle('is-paged-hidden', i >= revealCount));
      if (loadMoreBtn) loadMoreBtn.closest('.projects-more').classList.toggle('is-hidden', revealCount >= matches.length);
    }
  }

  function applyFilters() {
    revealCount = pageSize || Infinity;
    render();
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (filterGroup) {
    filterGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      filterGroup.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
      activeFilter = btn.dataset[filterAttr];
      applyFilters();
    });
  }
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      revealCount += pageSize;
      render();
    });
  }
  applyFilters();
}

wireListFilter({ searchId: 'pressSearch', filterId: 'yearFilter', listId: 'pressList', itemSelector: '.press-item', filterAttr: 'year', emptyId: 'pressEmpty' });
wireListFilter({ searchId: 'pubSearch', filterId: 'typeFilter', listId: 'pubList', itemSelector: '.doc-card', filterAttr: 'type', emptyId: 'pubEmpty' });
wireListFilter({ searchId: 'projSearch', filterId: 'decadeFilter', listId: 'pastProjectsList', itemSelector: '.project-card', filterAttr: 'decade', emptyId: 'projEmpty', pageSize: 9, loadMoreId: 'projLoadMore' });
// news-and-media.html only — same generic wireListFilter, no new logic needed.
wireListFilter({ listId: 'latestMediaList', itemSelector: '.program-card', pageSize: 3, loadMoreId: 'latestMediaLoadMore' });
wireListFilter({ filterId: 'galleryFilter', listId: 'galleryPreviewList', itemSelector: '.gallery-card', filterAttr: 'conference', emptyId: 'galleryEmpty', pageSize: 3, loadMoreId: 'galleryLoadMore' });
wireListFilter({ filterId: 'radioYearFilter', listId: 'radioPreviewList', itemSelector: '.episode-embed', filterAttr: 'year', emptyId: 'radioEmpty' });

// Past-project cards — truncated excerpt that expands in place on click,
// keeping the grid's cards a uniform height until a reader opts into one.
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.read-toggle');
  if (!toggle) return;
  const card = toggle.closest('.project-card');
  if (!card) return;
  const expanded = card.classList.toggle('is-expanded');
  toggle.querySelector('span').textContent = expanded ? 'Show less' : 'Read more';
});

// Section hub pages (Our Impact / Projects) — tab bar / mobile dropdown
// jump-nav + scrollspy. Sections are real, always-rendered content; the
// tabs/select just scroll to them and reflect which one is currently in
// view, so each page works with or without JS and every section stays
// crawlable. Class-based (not ID-based) so the same markup works on any
// page that includes a .section-tabs / .section-select pair.
const sectionTabs = Array.from(document.querySelectorAll('.section-tabs a'));
const sectionSelect = document.querySelector('.section-select');
const sectionPanels = sectionTabs
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if (sectionPanels.length) {
  function setActiveSectionTab(id) {
    sectionTabs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    if (sectionSelect && sectionSelect.value !== id) sectionSelect.value = id;
  }
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveSectionTab(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sectionPanels.forEach(sec => spy.observe(sec));

  if (sectionSelect) {
    sectionSelect.addEventListener('change', () => {
      const target = document.getElementById(sectionSelect.value);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Video modal (news-and-media.html's Video Library preview only) — scoped to
// cards inside #videoLibraryGrid specifically, so videos.html's real cards
// keep their existing behavior (linking straight out to the YouTube channel).
// No per-video embed URL exists yet, so the modal shows the real thumbnail
// large plus a genuine "Watch on YouTube" link — not a fabricated embed.
const modalVideoCards = Array.from(document.querySelectorAll('#videoLibraryGrid .video-card'));
if (modalVideoCards.length) {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <button class="video-modal-close" aria-label="Close">&times;</button>
    <div class="video-modal-inner">
      <img alt="">
      <div class="video-modal-body">
        <span class="tag"></span>
        <h4></h4>
        <p></p>
        <a class="btn btn-primary" target="_blank" rel="noopener"><svg class="icon"><use href="#i-play"/></svg>Watch on YouTube</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const modalImg = modal.querySelector('img');
  const modalTag = modal.querySelector('.tag');
  const modalTitle = modal.querySelector('h4');
  const modalDesc = modal.querySelector('p');
  const modalLink = modal.querySelector('a');

  function openVideoModal(card) {
    const img = card.querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTag.textContent = card.dataset.category || 'Video';
    modalTitle.textContent = img.alt;
    modalDesc.textContent = card.dataset.description || '';
    modalLink.href = card.querySelector('.thumb').getAttribute('href');
    modal.classList.add('is-open');
  }
  function closeVideoModal() { modal.classList.remove('is-open'); }

  modalVideoCards.forEach(card => {
    const thumb = card.querySelector('.thumb');
    thumb.addEventListener('click', (e) => { e.preventDefault(); openVideoModal(card); });
  });
  modal.querySelector('.video-modal-close').addEventListener('click', closeVideoModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeVideoModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideoModal(); });
}

// Animated stat counters (Media Statistics section, news-and-media.html) —
// opt-in via [data-count-to] so the existing static .impact-strip numbers
// used elsewhere ("130+ Districts" etc.) are never touched or mis-parsed.
const counterEls = Array.from(document.querySelectorAll('[data-count-to]'));
if (counterEls.length) {
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countIo.unobserve(entry.target);
      const target = parseInt(entry.target.dataset.countTo, 10);
      const suffix = entry.target.dataset.countSuffix || '';
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  counterEls.forEach(el => countIo.observe(el));
}
