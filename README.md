# whoisben.dev

My résumé/portfolio site.

The site is static: one HTML page, one stylesheet, and one script. Dark is the default theme. Light mode is stored in the browser under `whoisben-theme`.

## View it locally

Serve the repository root with any static file server, then open its local URL in a browser. Opening `index.html` directly as a file blocks the module script, so the menus and theme buttons will not work.

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
| `.github/workflows/deploy.yml` | Deployment to S3 and CloudFront |

## Changing the site

`main` only accepts pull requests. Use a branch named `type/short-description`, such as `docs/add-readme` or `fix/header-divider`. The project skills in `.cursor/skills/` record the branch, pull request, and page conventions.

## Deployment

Merging a pull request into `main` runs the **Deploy website** workflow. It can also be run manually from the Actions tab, and only runs from `main`. The workflow:

1. Checks that the required website files exist and that `script.js` parses.
2. Connects to AWS with GitHub OIDC. No AWS credentials are stored in this repository. The role, region, bucket, and CloudFront distribution come from the `AWS_ROLE_ARN`, `AWS_REGION`, `S3_BUCKET`, and `CLOUDFRONT_DISTRIBUTION_ID` repository variables.
3. Uploads only the staged website files to S3. Repository files such as this README, `.cursor/`, and `.github/` are not published.
4. Publishes `index.html` last, invalidates the CloudFront cache, waits for that to finish, and checks that https://whoisben.dev/ responds.

Deleting a file from Git does not delete its previously published copy in S3, because the upload does not use `--delete`. Remove stale S3 objects deliberately, as a separate step.
