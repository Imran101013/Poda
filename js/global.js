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
    'annual-conference.html': 'conference',
    'conference-detail.html': 'conference',
    'projects.html': 'projects',
    'news-and-media.html': 'news',
    'activities.html': 'news',
    'press.html': 'news',
    'publications.html': 'news',
    'radio-programs.html': 'news',
    'webinars.html': 'news',
    'stories.html': 'news',
    'gallery.html': 'news',
    'videos.html': 'news',
    'impact.html': 'impact',
    'careers.html': 'careers',
    'contact.html': 'contact'
    // donate.html and events-campaigns.html intentionally have no nav parent to highlight.
  };

  var activeSection = SECTION_BY_FILE[file];
  if (!activeSection && (inDir('activities') || inDir('stories') || inDir('gallery'))) {
    activeSection = 'news';
  }

  var NAV = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About Us', href: 'about.html' },
    {
      key: 'conference', label: 'Annual Conference', href: 'annual-conference.html', children: [
        { label: '18th Edition — 2025', href: 'conference-detail.html' },
        { label: 'Conference 2024', href: 'conference-detail.html' },
        { label: 'Conference 2020–2021', href: 'conference-detail.html' },
        { label: 'Conference 2019–2020', href: 'conference-detail.html' },
        { label: 'Conference 2011', href: 'conference-detail.html' }
      ]
    },
    {
      key: 'projects', label: 'Projects', href: 'projects.html', children: [
        { label: 'PODA Current Projects', href: 'projects.html#current-projects' },
        { label: 'PODA Past Projects', href: 'projects.html#past-projects' }
      ]
    },
    {
      key: 'news', label: 'News &amp; Media', href: 'news-and-media.html', children: [
        { label: 'PODA Recent Activities', href: 'news-and-media.html#latest-media' },
        { label: 'PODA Photo and Video Highlights', href: 'news-and-media.html#photo-video-highlights' },
        { label: 'PODA Press Room', href: 'news-and-media.html#press-room' },
        { label: 'PODA Publications', href: 'news-and-media.html#publications' },
        { label: 'PODA Radio Programs', href: 'news-and-media.html#radio-programs' },
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
      key: 'careers', label: 'Careers', href: 'careers.html', children: [
        { label: 'PODA Internships', href: 'careers.html#internships' },
        { label: 'PODA Jobs', href: 'careers.html#jobs' },
        { label: 'PODA Volunteer', href: 'careers.html#volunteers' }
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

    var scaleSymbol = '<svg style="display:none" aria-hidden="true"><symbol id="i-scale" viewBox="0 0 24 24"><line x1="12" y1="3" x2="12" y2="20"/><path d="M5 21h14"/><path d="M5 7l-3 6h6l-3-6z"/><path d="M19 7l-3 6h6l-3-6z"/><line x1="5" y1="7" x2="19" y2="7"/></symbol></svg>';
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
      '        <li><a href="' + basePath + 'projects.html#ai-digital-literacy-program">AI &amp; Digital Literacy</a></li>\n' +
      '        <li><a href="' + basePath + 'projects.html#climate-smart-agriculture-green-job-skills-program">Climate Smart Agriculture</a></li>\n' +
      '        <li><a href="' + basePath + 'projects.html#women-rights-education-program">Women Rights Education</a></li>\n' +
      '        <li><a href="' + basePath + 'projects.html#disaster-risk-reduction-humanitarian-response-program">Disaster Risk Reduction</a></li>\n' +
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
