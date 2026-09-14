/**
 * lang-switch.js
 * -----------------------------------------------------------------------
 * Adds a discreet "EN | PT" language switcher to the shared Quarto navbar,
 * and — only on pages under /pt/ — relabels the (English-authored) navbar
 * and footer into Portuguese.
 *
 * WHY THIS EXISTS: Quarto's `website.navbar` / `website.page-footer` are
 * defined once in _quarto.yml and rendered identically into every page.
 * There is no per-page navbar override in a plain Quarto "website" project,
 * so the only way to (a) point the language switcher at the *correct*
 * counterpart page and (b) show Portuguese nav/footer labels on /pt/ pages
 * is a small client-side pass after the (already-correct, accessible,
 * crawlable) static HTML has loaded. This script does not add any content —
 * it only relabels text and rewrites hrefs on elements Quarto already
 * rendered.
 *
 * MAINTENANCE: when a new top-level page is added in both languages, add one
 * entry to PAGE_MAP below. See README.md, section "Bilingual (EN/PT) site".
 * -----------------------------------------------------------------------
 */
(function () {
  "use strict";

  var PAGE_MAP = [
    { en: "/index.html", pt: "/pt/index.html", enLabel: "Home", ptLabel: "Início" },
    { en: "/research.html", pt: "/pt/pesquisa.html", enLabel: "Research", ptLabel: "Pesquisa" },
    { en: "/publications.html", pt: "/pt/publicacoes.html", enLabel: "Publications", ptLabel: "Publicações" },
    { en: "/projects.html", pt: "/pt/projetos.html", enLabel: "Projects", ptLabel: "Projetos" },
    { en: "/writing.html", pt: "/pt/textos.html", enLabel: "Writing", ptLabel: "Textos" },
    { en: "/about.html", pt: "/pt/sobre.html", enLabel: "About", ptLabel: "Sobre" },
    { en: "/cv.html", pt: "/pt/cv.html", enLabel: "CV", ptLabel: "CV" }
  ];

  var FOOTER_PT = {
    center: "As opiniões expressas aqui são pessoais e não representam necessariamente a posição do Ipea.",
    contact: "Contato"
  };

  function normalize(pathname) {
    var p = pathname;
    if (p === "" || p === "/") return "/index.html";
    if (p === "/pt" || p === "/pt/") return "/pt/index.html";
    if (/\/$/.test(p)) p = p + "index.html";
    return p;
  }

  function basename(path) {
    return path.substring(path.lastIndexOf("/") + 1);
  }

  function findEntry(normalizedPath) {
    for (var i = 0; i < PAGE_MAP.length; i++) {
      if (PAGE_MAP[i].en === normalizedPath || PAGE_MAP[i].pt === normalizedPath) {
        return PAGE_MAP[i];
      }
    }
    return null;
  }

  function findEntryByEnBasename(hrefBasename) {
    for (var i = 0; i < PAGE_MAP.length; i++) {
      if (basename(PAGE_MAP[i].en) === hrefBasename) return PAGE_MAP[i];
    }
    return null;
  }

  function injectSwitcher(rightNav, enTarget, ptTarget, isPT) {
    var li = document.createElement("li");
    li.className = "nav-item compact lang-switch";

    var enLink = document.createElement("a");
    enLink.className = "lang-link" + (isPT ? "" : " active");
    enLink.href = enTarget;
    enLink.setAttribute("aria-label", "English");
    enLink.textContent = "EN";

    var sep = document.createElement("span");
    sep.className = "lang-sep";
    sep.setAttribute("aria-hidden", "true");
    sep.textContent = "|";

    var ptLink = document.createElement("a");
    ptLink.className = "lang-link" + (isPT ? " active" : "");
    ptLink.href = ptTarget;
    ptLink.setAttribute("aria-label", "Português");
    ptLink.textContent = "PT";

    var wrap = document.createElement("span");
    wrap.className = "lang-switch-inner";
    wrap.appendChild(enLink);
    wrap.appendChild(sep);
    wrap.appendChild(ptLink);

    li.appendChild(wrap);
    rightNav.appendChild(li);
  }

  function relabelNavbar() {
    var links = document.querySelectorAll(".navbar-nav.me-auto .nav-link");
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;
      var entry = findEntryByEnBasename(basename(href));
      if (!entry) return;
      link.setAttribute("href", entry.pt);
      var label = link.querySelector(".menu-text");
      if (label) {
        label.textContent = entry.ptLabel;
      } else {
        link.textContent = entry.ptLabel;
      }
    });
  }

  function relabelFooter() {
    var center = document.querySelector(".nav-footer-center p");
    if (center) center.textContent = FOOTER_PT.center;

    var contactLink = document.querySelector(".nav-footer-right .nav-link");
    if (contactLink) {
      var entry = findEntryByEnBasename("about.html");
      if (entry) contactLink.setAttribute("href", entry.pt);
      var p = contactLink.querySelector("p");
      if (p) {
        p.textContent = FOOTER_PT.contact;
      } else {
        contactLink.textContent = FOOTER_PT.contact;
      }
    }
  }

  function relabelIconAria() {
    var email = document.querySelector('.nav-link[href^="mailto:"] .bi-envelope');
    if (email) email.setAttribute("aria-label", "E-mail");
  }

  function init() {
    var rightNav = document.querySelector(".navbar-nav.ms-auto");
    if (!rightNav) return; // navbar not present (shouldn't happen on this site)

    var isPT = window.location.pathname.indexOf("/pt/") === 0 || window.location.pathname === "/pt";
    var normalized = normalize(window.location.pathname);
    var entry = findEntry(normalized);

    var enTarget = entry ? entry.en : "/index.html";
    var ptTarget = entry ? entry.pt : "/pt/index.html";

    injectSwitcher(rightNav, enTarget, ptTarget, isPT);

    if (isPT) {
      relabelNavbar();
      relabelFooter();
      relabelIconAria();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
