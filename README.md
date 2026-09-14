# luizsoares.org — Personal Academic Website

Personal academic website of Luiz Soares (Luiz Soares de Andrade Filho),
built with [Quarto](https://quarto.org) as a static site. No backend, no
database, no JavaScript framework — plain, portable HTML/CSS output that can
be hosted anywhere that serves static files.

## 1. Requirements

- [Quarto CLI](https://quarto.org/docs/get-started/) ≥ 1.4 (this project was
  authored against current Quarto conventions; check `quarto --version` after
  installing).
- No Python/R/Julia environment is required to render the current content —
  all pages are plain Markdown/HTML. If you later add executable code chunks
  (Python/R) to a Writing post, you'll need that language's runtime and the
  Quarto extension for it (e.g. `jupyter` for Python).

## 2. Installing Quarto

Download the installer for your OS from <https://quarto.org/docs/get-started/>.
On Windows, the installer adds `quarto` to your PATH; open a new terminal
afterwards and confirm with:

```powershell
quarto --version
```

## 3. Project structure

```
_quarto.yml          Site configuration (navbar, footer, theme, bibliography)
styles.css            Custom CSS (academic, minimal theme on top of "cosmo")
index.qmd             Homepage
research.qmd           Research page (interests, LASPP, open questions)
publications.qmd       Thesis, institutional publications, working papers, etc.
projects.qmd            Research projects / selected applied projects
writing.qmd              Writing section (Quarto listing page over posts/)
posts/                    One folder per Writing post (index.qmd inside each)
about.qmd                About page (background, trajectory, contact)
cv.qmd                     HTML CV + link to a downloadable PDF
pt/                          Portuguese version of every page above
  index.qmd, pesquisa.qmd, publicacoes.qmd, projetos.qmd, textos.qmd,
  sobre.qmd, cv.qmd            (see "Bilingual (EN/PT) site" below)
references/
  references.bib            BibTeX bibliography (cited via @citekey; shared
                               by both languages)
assets/images/              Site images (favicon, profile photo, OG image)
assets/js/lang-switch.js      Language switcher + PT navbar/footer relabeling
files/                        Downloadable files (CV PDFs, EN and PT)
SOURCES.md                     Internal fact/source register (not published)
```

## 4. Preview while editing

From the project root:

```powershell
quarto preview
```

This opens a local server with live reload as you edit `.qmd`/`.css`/`.yml`
files. Stop it with Ctrl+C.

## 5. Render the full site

```powershell
quarto render
```

Output goes to `_site/` (ignored by git; see `.gitignore`). Open
`_site/index.html` directly, or serve the folder with any static file server,
to check the final output.

## 6. Adding a publication

Edit `publications.qmd` and add an entry inside the relevant section (Thesis,
Peer-Reviewed Publications, Institutional Publications, Working Papers,
Research Reports, Conference Presentations), following the existing
`.pub-entry` pattern:

```markdown
::: {.pub-entry}
<div class="pub-title">Title of the work</div>
<div class="pub-meta">Author(s) · Venue, Year</div>
<div class="pub-links">
[PDF](link) [DOI](link) [Code](link) [Data](link)
</div>
:::
```

If it should be citable elsewhere on the site, also add a BibTeX entry to
`references/references.bib` and reference it with `@citekey` in the text.

**Never invent a publication, DOI, venue, or result.** If details are
unconfirmed, write `[TO BE VERIFIED]` rather than a plausible-looking guess.

## 7. Adding a Writing post

Create a new folder under `posts/` with an `index.qmd` inside, e.g.:

```
posts/my-new-post/index.qmd
```

Frontmatter template:

```yaml
---
title: "Post Title"
description: "One-sentence summary."
date: 2026-01-01
categories: [Complex Systems, Public Policy]
draft: false
---
```

The `writing.qmd` listing picks up new posts automatically (sorted by date,
descending) — no need to edit `writing.qmd` itself. If a post is not ready to
publish, mark it clearly as a draft in the body (see the existing placeholder
posts for the pattern used with `.draft-banner`), rather than relying only on
Quarto's `draft: true` (which hides it from the listing entirely).

## 8. Adding a BibTeX entry

Add to `references/references.bib`:

```bibtex
@article{citekey_year,
  title   = {...},
  author  = {...},
  year    = {...},
  journal = {...},
}
```

Cite it in any `.qmd` file with `@citekey_year` (inline) or `[@citekey_year]`
(parenthetical). A `## References` section with `::: {#refs} :::` renders the
formatted bibliography (see the bottom of `publications.qmd` for an example).

## 9. Updating the CV

Edit `cv.qmd` directly for the HTML version. For the downloadable PDF, add
the actual file at `files/CV_Luiz_Soares.pdf` (see `files/README.md`) — the
"Download Full CV (PDF)" button on the CV page already points there.

## 10. Publishing via GitHub Pages (future)

1. Push this project to a GitHub repository.
2. From the project root: `quarto publish gh-pages`, or configure a GitHub
   Actions workflow using `quarto-actions/quarto-render` +
   `quarto-actions/publish` (recommended for reproducible builds).
3. Point the custom domain (`luizsoares.org`) at GitHub Pages via a `CNAME`
   file and your DNS provider, once the domain is active.

See <https://quarto.org/docs/publishing/github-pages.html>.

## 11. Publishing via Cloudflare Pages (future)

1. Connect the GitHub repository in the Cloudflare Pages dashboard, or use
   direct upload of the `_site/` folder.
2. Build command: `quarto render`; build output directory: `_site`.
3. Configure the custom domain (`luizsoares.org`) in Cloudflare Pages once
   ready.

See <https://quarto.org/docs/publishing/other.html> and Cloudflare's own
Pages documentation.

## 12. Known placeholders before this site is publication-ready

This build has since been rendered and previewed locally with Quarto (no
errors or warnings) — see `SOURCES.md` for the full fact register. Before
final publication:

- Profile photo: **done** (`assets/images/imagem_foto_luiz_soares.png`, used
  in the homepage hero and auto-selected as the Open Graph/Twitter preview
  image). A dedicated landscape (~1200×630px) Open Graph image is still
  recommended — the current photo is portrait-oriented.
- LinkedIn: **done** (linked from the homepage profiles row, the navbar, and
  the About page contact section).
- Add ORCID, Google Scholar, and GitHub URLs (currently placeholders across
  `index.qmd`, `about.qmd`, `cv.qmd`).
- English CV PDF: **done** (`files/cv-luiz-soares-en.pdf`). Still need
  `files/cv-luiz-soares-pt.pdf` (see `files/README.md`).
- Email: currently using an interim personal address (`luizflh@gmail.com`)
  site-wide, per Luiz's instruction, until `luiz@luizsoares.org` is active.
  When the domain goes live, replace `luizflh@gmail.com` with
  `luiz@luizsoares.org` throughout (a simple find-and-replace across the
  project is enough).
- Confirm the official English translation of the Ipea position title,
  exact dates, and the items listed under "Category C" in `SOURCES.md`.
- Replace the provisional LASPP paragraph with an official description once
  available.

## 13. Bilingual (EN/PT) site

The site is English-first: `/` and the top-level `.qmd` files are the
default, canonical version. A Portuguese layer lives entirely under `pt/`
(`pt/index.qmd`, `pt/pesquisa.qmd`, `pt/publicacoes.qmd`, `pt/projetos.qmd`,
`pt/textos.qmd`, `pt/sobre.qmd`, `pt/cv.qmd`), rendering to
`/pt/index.html`, `/pt/pesquisa.html`, etc.

**Why a script, not a second navbar.** Quarto's `website.navbar` and
`website.page-footer` (in `_quarto.yml`) are defined once and rendered
identically into every page — a plain "website" project has no per-page
navbar override. So `_quarto.yml`'s navbar/footer stay English (the single
source of truth), and `assets/js/lang-switch.js` — a small, dependency-free
script, included on every page via `format.html.include-after-body` in
`_quarto.yml` — does two things at load time, and only relabels/rewrites
elements Quarto already rendered (it adds no content of its own):

1. Injects the "EN | PT" switcher into the navbar, resolving it against a
   `PAGE_MAP` table (EN path ↔ PT path) hardcoded at the top of the file. If
   the current page isn't in the table (e.g. a Writing post, which has no PT
   equivalent), it falls back to the other language's homepage, per spec.
2. Only on pages under `/pt/`: relabels the (English-authored) navbar links
   and the footer's center/"Contact" text into Portuguese, using the same
   table.

Each page also carries its own `<link rel="canonical">` / `hreflang`
(en / pt-BR / x-default) / `og:locale` block, hand-written in that page's
`include-in-header` YAML — see any paired `*.qmd` / `pt/*.qmd` for the
pattern. `lang: pt-BR` in each `pt/*.qmd`'s frontmatter sets `<html lang>`
for that page (Quarto handles this natively; no script needed for it).

### Adding a new Portuguese page

1. Create `pt/<slug>.qmd` with `lang: pt-BR` in its frontmatter, plus a
   canonical/hreflang `include-in-header` block (copy the pattern from an
   existing `pt/*.qmd` and update the two URLs).
2. Add one entry to `PAGE_MAP` in `assets/js/lang-switch.js`
   (`en`, `pt`, `enLabel`, `ptLabel`).
3. If it's a new top-level nav item, add the English entry to
   `website.navbar.left` in `_quarto.yml` too (the PT label comes from
   `PAGE_MAP`, applied at runtime).
4. `quarto render` and check both directions of the EN | PT switcher.

### Adding a bilingual article (Writing)

Posts live in one shared `posts/` folder regardless of language — there is
no separate `posts-pt/`. Both `writing.qmd` (EN) and `pt/textos.qmd` (PT)
list the *same* `posts/` folder, so nothing needs to be duplicated to make
an article show up in both listings.

1. Add the post as usual: `posts/<slug>/index.qmd`.
2. Add a language category so its language is visible in both listings and
   filterable via the listing's category cloud — add `"English"` or
   `"Português"` to that post's `categories:` list (see the three existing
   posts for the pattern).
3. An article does not need a counterpart in the other language. If you
   later write one, you can cross-link the two manually (e.g. a line near
   the top: "Também disponível em [português](...)").

### Translations worth a manual review

Machine-assisted but carefully hand-written, not machine-translated — still,
before this goes live, it's worth having a native-speaker (or your own)
second pass on:

- The Ipea position title on `pt/cv.qmd` — presented without the `[TO BE
  VERIFIED]` marker the English CV carries (that marker was specifically
  about the *English translation* of "Técnico de Planejamento e Pesquisa,"
  which doesn't apply to the Portuguese CV). Confirm this reads correctly.
- `about.qmd`'s "I am not currently accepting this website as an active PhD
  application announcement" (and its Portuguese counterpart on
  `pt/sobre.qmd`) — the English original reads a little awkwardly; both
  versions carry the same meaning as originally drafted, but this is worth
  tightening in whichever language you edit first.
- General tone check on `pt/*.qmd` — translated to read as natural written
  Brazilian academic Portuguese, but only a native speaker can fully judge
  register/tone.

## License / usage

Content is © Luiz Soares de Andrade Filho. No license is granted for reuse of
personal/biographical content; code/CSS structure may be adapted freely.
