# Testa Catering — Homepage

Static, mobile-first build of the redesigned homepage.

## Structure
- `index.html` — page markup (icon sprite inline at top of `<body>`, LocalBusiness JSON-LD in `<head>`)
- `scss/` — source styles. **Edit these, not `css/`.**
  - `_variables.scss` tokens · `_mixins.scss` (`mq()` = min-width only)
  - `_base` `_layout` `_buttons` `_header` `_hero` `_components` `_quote` `_footer`
- `css/main.css` — compiled output
- `js/main.js` — mobile menu (aria-expanded, Esc to close, closes on link tap)
- `img/tc-logo.svg` — logo

## Compile
    npm i -g sass
    sass --watch scss/main.scss:css/main.css --no-source-map
    # production
    sass scss/main.scss css/main.css --style=compressed --no-source-map

## To do before launch
- Photos: 12 AI-generated stand-ins are wired in (`img/*.jpg`). Swap for real event photos when available; keep the same filenames or update the `<img>` tags.
- Reviews: replace the bracketed placeholders with real Google/Yelp quotes.
- Quote form: set `action` on `.quote-form` to the real handler.
- Nav links use the current site's paths (`/Menus`, `/page-3`, …) — update if URLs change.
- Add an `og:image`.
