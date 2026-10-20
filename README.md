# whoisben.dev

Résumé site for Benjamin Gregg, a senior software engineer in Columbus, Ohio.

The site is static: one HTML page, one stylesheet, and one script. Dark is the default theme. Light mode is stored in the browser under `whoisben-theme`.

## View it locally

Open `index.html` in a browser, or serve the folder with any static file server. The portrait, logos, and résumé downloads are loaded from this folder, so the page needs to be served or opened as a file from the repository root.

## Repository layout

| Path | Purpose |
| --- | --- |
| `index.html` | Page structure and résumé content |
| `styles.css` | Layout and both themes |
| `script.js` | Theme, section navigation, and section rules |
| `favicon.png` | Browser tab icon |
| `images/portraits/` | Portrait |
| `images/logos/` | Company and school marks |
| `files/` | Downloadable PDF and Word résumé |

## Changing the site

`main` only accepts pull requests. Use a branch named `type/short-description`, such as `docs/add-readme` or `fix/header-divider`. The project skills in `.cursor/skills/` record the branch, pull request, and page conventions.
