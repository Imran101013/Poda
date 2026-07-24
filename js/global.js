// Global Header & Footer — Payload Globals prototype.
// One source of truth for the nav and footer markup, injected wherever a
// `<script src=".../js/global.js" data-poda="header|footer"></script>` tag
// appears. basePath and the active nav section are derived from the current
// URL so every page uses the exact same include with no per-page params.

(function () {
  var script = document.currentScript;
  var mode = script.getAttribute('data-poda');
  var path = window.location.pathname;
  var file = path.split('/').pop();

  function inDir(name) {
    return new RegExp('/' + name + '/[^/]+\\.html$', 'i').test(path);
  }

  var basePath = (inDir('activities') || inDir('stories') || inDir('gallery')) ? '../' : '';

  // Which top-level nav item (or dropdown parent) should be marked active.
  var SECTION_BY_FILE = {
    'index.html': 'home',
    'about.html': 'about',
    'publications.html': 'about',
    'annual-report.html': 'about',
    'annual-conference.html': 'conference',
    'conference-detail.html': 'conference',
    'projects.html': 'projects',
    'skills-center.html': 'skills',
    'news-and-media.html': 'news',
    'activities.html': 'news',
    'blogs.html': 'news',
    'blog-post.html': 'news',
    'research-studies.html': 'news',
    'study-detail.html': 'news',
    'press.html': 'news',
    'radio-programs.html': 'news',
    'webinars.html': 'news',
    'stories.html': 'news',
    'gallery.html': 'news',
    'videos.html': 'news',
    'impact.html': 'impact',
    'careers.html': 'careers',
    'tenders.html': 'careers',
    'contact.html': 'contact'
    // donate.html and events-campaigns.html intentionally have no nav parent to highlight.
  };

  var activeSection = SECTION_BY_FILE[file];
  if (!activeSection && (inDir('activities') || inDir('stories') || inDir('gallery'))) {
    activeSection = 'news';
  }

  var NAV = [
    // { key: 'home', label: 'Home', href: 'index.html' },
    {
      key: 'about', label: 'About Us', href: 'about.html', children: [
        { label: 'PODA Mission', href: 'about.html#mission' },
        { label: 'PODA History', href: 'about.html#history' },
        { label: 'PODA Board', href: 'about.html#board' },
        { label: 'PODA Team', href: 'about.html#team' },
        { label: 'PODA Policies', href: 'about.html#policies' },
        { label: 'PODA Annual Report', href: 'annual-report.html' },
        { label: 'PODA Publications', href: 'about.html#publications' }
      ]
    },
    {
      key: 'conference', label: 'Annual Conference', href: 'annual-conference.html', children: [
        { label: '18th Edition — 2025', href: 'annual-conference.html#conf-2025' },
        { label: 'Conference 2024', href: 'annual-conference.html#conf-2024' },
        { label: 'Conference 2020–2021', href: 'annual-conference.html#conf-2020' },
        { label: 'Conference 2019–2020', href: 'annual-conference.html#conf-2019' },
        { label: 'Conference 2011', href: 'annual-conference.html#conf-2011' }
      ]
    },
    {
      key: 'projects', label: 'Programs', children: [
        { label: 'PODA Programs', href: 'projects.html' },
        { label: 'PODA Past Projects', href: 'projects.html#past-projects' },
        { label: 'PODA Current Projects', href: 'projects.html#current-projects' }
      ]
    },
    { key: 'skills', label: 'Skills Center', href: 'skills-center.html' },
    {
      key: 'news', label: 'News &amp; Media', href: 'news-and-media.html', children: [
        { label: 'PODA Photo and Video Highlights', href: 'news-and-media.html#photo-video-highlights' },
        { label: 'PODA Press Room', href: 'news-and-media.html#press-room' },
        { label: 'PODA Blogs/Articles', href: 'blogs.html' },
        { label: 'PODA Research Studies', href: 'research-studies.html' },
        { label: 'PODA Audio/Radio', href: 'news-and-media.html#radio-programs' },
        { label: 'PODA Webinar', href: 'news-and-media.html#poda-webinar' },
        { label: 'PODA Success Stories', href: 'news-and-media.html#success-stories' }
      ]
    },
    {
      key: 'impact', label: 'Our Impact', href: 'impact.html', children: [
        { label: 'PODA Key Achievements', href: 'impact.html#key-achievements' },
        { label: 'PODA Major Milestones', href: 'impact.html#major-milestones' },
        { label: 'PODA Community Transformation', href: 'impact.html#community-transformation' },
        { label: 'PODA Beneficiary Testimonials', href: 'impact.html#beneficiary-testimonials' }
      ]
    },
    {
      key: 'careers', label: 'Join Us', href: 'careers.html', children: [
        { label: 'PODA Internships', href: 'careers.html#internships' },
        { label: 'PODA Jobs', href: 'careers.html#jobs' },
        { label: 'PODA Volunteer', href: 'careers.html#volunteers' },
        { label: 'PODA Membership', href: 'careers.html#membership' },
        { label: 'PODA Tenders', href: 'tenders.html' }
      ]
    },
    { key: 'contact', label: 'Contact Us', href: 'contact.html' }
  ];

  function renderHeader() {
    var items = NAV.map(function (item) {
      var isActive = item.key === activeSection;
      if (item.children) {
        var children = item.children.map(function (c) {
          return '<li><a href="' + basePath + c.href + '">' + c.label + '</a></li>';
        }).join('');
        var parentHref = item.href ? (basePath + item.href) : 'javascript:void(0)';
        return '<li class="has-children' + (isActive ? ' active' : '') + '">' +
          '<a href="' + parentHref + '">' + item.label + '</a>' +
          '<ul class="submenu">' + children + '</ul></li>';
      }
      return '<li' + (isActive ? ' class="active"' : '') + '><a href="' + basePath + item.href + '">' + item.label + '</a></li>';
    }).join('\n        ');

    var html =
      '<div class="topbar">\n' +
      '  <div class="topbar-inner">\n' +
      '    <span class="topbar-brand">Potohar Organization for Development Advocacy (PODA)</span>\n' +
      '    <div class="topbar-contacts">\n' +
      '      <a href="tel:+92516120785"><svg class="icon"><use href="#i-tb-phone"/></svg>+ 92 (51) 6120785</a>\n' +
      '      <a href="tel:+923373309135"><svg class="icon"><use href="#i-tb-mobile"/></svg>+92 337 3309135</a>\n' +
      '      <a href="mailto:info@poda.org.pk"><svg class="icon"><use href="#i-tb-mail"/></svg>info@poda.org.pk</a>\n' +
      '    </div>\n' +
      '    <div class="topbar-social">\n' +
      '      <a href="https://www.facebook.com/pages/Potohar-Organization-for-Development-Advocacy-PODA/651141511571116" aria-label="Facebook"><svg class="icon"><use href="#i-facebook"/></svg></a>\n' +
      '      <a href="https://www.youtube.com/channel/UCrwavdYNT5nGdmK3r6LTUOg" aria-label="YouTube"><svg class="icon"><use href="#i-youtube"/></svg></a>\n' +
      '      <a href="https://www.instagram.com/poda.pakistan/" aria-label="Instagram"><svg class="icon"><use href="#i-instagram"/></svg></a>\n' +
      '      <a href="https://www.linkedin.com" aria-label="LinkedIn"><svg class="icon"><use href="#i-tb-linkedin"/></svg></a>\n' +
      '      <a href="https://twitter.com/PODAPakistan" aria-label="X (Twitter)"><svg class="icon"><use href="#i-tb-x"/></svg></a>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>\n' +
      '<header class="site-header" id="siteHeader">\n' +
      '  <div class="header-inner">\n' +
      '    <a class="logo" href="' + basePath + 'index.html"><img src="' + basePath + 'images/logo.png" alt="PODA Pakistan"></a>\n' +
      '    <nav class="main-nav">\n' +
      '      <ul>\n' +
      '        ' + items + '\n' +
      '      </ul>\n' +
      '    </nav>\n' +
      '    <div class="header-actions">\n' +
      '      <a class="link-legal" href="' + basePath + 'contact.html"><svg class="icon"><use href="#i-scale"/></svg>Legal Aid Helpline</a>\n' +
      '    </div>\n' +
      '    <button class="nav-toggle" aria-label="Menu">☰</button>\n' +
      '  </div>\n' +
      '</header>';

    var scaleSymbol = '<svg style="display:none" aria-hidden="true">' +
      '<symbol id="i-scale" viewBox="0 0 24 24"><line x1="12" y1="3" x2="12" y2="20"/><path d="M5 21h14"/><path d="M5 7l-3 6h6l-3-6z"/><path d="M19 7l-3 6h6l-3-6z"/><line x1="5" y1="7" x2="19" y2="7"/></symbol>' +
      '<symbol id="i-tb-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>' +
      '<symbol id="i-tb-mobile" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></symbol>' +
      '<symbol id="i-tb-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>' +
      '<symbol id="i-tb-linkedin" viewBox="0 0 24 24" stroke="none" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM7 8.48H3V21h4zM13.32 8.48H9.34V21h3.98v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91z"/></symbol>' +
      '<symbol id="i-tb-x" viewBox="0 0 24 24" stroke="none" fill="currentColor"><path d="M18.24 2H21.5l-7.3 8.34L22.8 22h-6.72l-5.27-6.9L4.7 22H1.44l7.8-8.9L1 2h6.9l4.76 6.3L18.24 2zm-1.18 18h1.86L7.02 3.9H5.02l12.04 16.1z"/></symbol>' +
      '</svg>';
    document.body.insertAdjacentHTML('afterbegin', scaleSymbol);
    script.insertAdjacentHTML('beforebegin', html);
    script.remove();
  }

  function renderFooter() {
    var newsColumn =
      '<h3>News &amp; Events</h3>\n      <ul>\n' +
      '        <li><a href="' + basePath + 'activities/206-wednesday-webinar-parwl.html">206 Wednesday Webinar by PARWL-Pakistan</a></li>\n' +
      '        <li><a href="' + basePath + 'events-campaigns.html">World Rural Development Day – 6 July</a></li>\n' +
      '        <li><a href="' + basePath + 'activities/205-wednesday-webinar-parwl.html">205 Wednesday Webinar by PARWL-Pakistan</a></li>\n' +
      '      </ul>';

    var html =
      '<footer class="site-footer">\n' +
      '  <div class="container footer-grid">\n' +
      '    <div class="footer-brand">\n' +
      '      <img src="' + basePath + 'images/logo.png" alt="PODA Pakistan">\n' +
      '      <p>PODA is a women\'s rights NGO working for promotion and protection of human rights in rural areas of Pakistan through education, training &amp; advocacy.</p>\n' +
      '      <div class="social-row">\n' +
      '        <a href="https://twitter.com/PODAPakistan" aria-label="Twitter"><svg><use href="#i-twitter"/></svg></a>\n' +
      '        <a href="https://www.facebook.com/pages/Potohar-Organization-for-Development-Advocacy-PODA/651141511571116" aria-label="Facebook"><svg><use href="#i-facebook"/></svg></a>\n' +
      '        <a href="https://www.youtube.com/channel/UCrwavdYNT5nGdmK3r6LTUOg" aria-label="YouTube"><svg><use href="#i-youtube"/></svg></a>\n' +
      '        <a href="https://www.instagram.com/poda.pakistan/" aria-label="Instagram"><svg><use href="#i-instagram"/></svg></a>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '    <div>\n' +
      '      <h3>Our Work</h3>\n' +
      '      <ul>\n' +
      '        <li><a href="' + basePath + 'annual-conference.html">Annual Conference</a></li>\n' +
      '        <li><a href="' + basePath + 'program-detail.html?program=civic-voice-education">Civic Voice and Education</a></li>\n' +
      '        <li><a href="' + basePath + 'program-detail.html?program=climate-action">Climate Action</a></li>\n' +
      '        <li><a href="' + basePath + 'program-detail.html?program=stop-violence-against-women">Stop Violence Against Women</a></li>\n' +
      '        <li><a href="' + basePath + 'program-detail.html?program=humanitarian-action">Humanitarian Action</a></li>\n' +
      '      </ul>\n' +
      '    </div>\n' +
      '    <div>\n' +
      '      ' + newsColumn + '\n' +
      '    </div>\n' +
      '    <div>\n' +
      '      <h3>Contact Us</h3>\n' +
      '      <address><svg><use href="#i-pin"/></svg><span>(+92) 51 6120785 / (+92) 51 8773808</span></address>\n' +
      '      <address><svg><use href="#i-pin"/></svg><span>Mobile: (+92) 313 0852522</span></address>\n' +
      '      <address><svg><use href="#i-pin"/></svg><span>info@poda.org.pk</span></address>\n' +
      '      <a class="btn btn-primary" href="' + basePath + 'donate.html"><svg class="icon"><use href="#i-heart"/></svg>Make A Donation</a>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '  <div class="site-info">\n' +
      '    <div class="container">\n' +
      '      <p>Copyright © 2026. All rights reserved.</p>\n' +
      '      <p>Designed &amp; Developed by <a href="https://www.uexel.com/">uExel Solutions</a></p>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</footer>';

    script.insertAdjacentHTML('beforebegin', html);
    script.remove();
  }

  if (mode === 'header') renderHeader();
  else if (mode === 'footer') renderFooter();
})();
