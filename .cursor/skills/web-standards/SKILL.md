---
name: web-standards
description: >-
  Keeps whoisben.dev HTML, CSS, and JavaScript aligned with current practice
  and the site's existing design. Use when editing index.html, styles.css,
  script.js, or any page markup, style, or client script.
---

# Page conventions

This is a static résumé page. Change only what was asked, and keep the visible design unless the user asks to change it.

## HTML

- One `h1`. Sections use `h2`, roles and schools use `h3`, experience groups use `h4`.
- Keep the skip link, `main`, `header`, `nav`, and `footer`.
- External links use `target="_blank"` and `rel="noopener noreferrer"`, plus a visually hidden "(opens in a new tab)".
- The contact list stays inside `address`. `address` stays `display: contents` so the chips still sit at the bottom of the intro on wide screens.
- No inline event handlers. The portrait error handler stays in `script.js`.
- Portrait: `width`, `height`, `decoding="async"`, and `fetchpriority="high"`. Logos: `decoding="async"` and `loading="lazy"`. Company marks keep an empty `alt` because the name is in the heading beside them.
- `favicon.png` stays at the repository root. The portrait stays in `images/portraits/`. Logos stay in `images/logos/`.

## CSS and JavaScript

- `script.js` stays `type="module"`.
- Light mode is `html[data-theme="light"]`. Dark mode is the absence of that attribute. The head script reads `whoisben-theme` before paint.
- Light and Dark stay a `radiogroup`. Arrow keys move the selection. Only the selected option is in the tab order.
- Keep `:focus-visible` outlines and the reduced-motion override for smooth scrolling.
- Light dividers use `#d3dae0`. Dark hairlines use `#262b31` (`--rule-seen`). The header background stays opaque `var(--bg)`.
- Under 760px the header is `position: static`, navigation is the menu button, and the action links are one full-width stack. Dark-mode downloads in that layout use the contact-chip colors.
- Print stays a light document and hides the menu, settings, and downloads.

## Do not add back

Header logo or wordmark, mint or teal, a generated PDF or Word file, the eyes page, or inline handlers on the portrait.
