---
name: git-workflow
description: >-
  Names branches, writes commit messages, and writes GitHub repository and
  pull request descriptions for whoisben.dev. Use when creating a branch,
  committing, pushing, opening a pull request, or editing the GitHub
  repository description.
---

# Git workflow

`main` is protected. Push a branch and open a pull request. Do not push commits straight to `main`.

## Branch names

Use `type/short-description`.

- Types: `feat`, `fix`, `docs`, `refactor`, `chore`
- Lowercase words, separated by hyphens
- Keep the description to a few words that name the change
- No ticket numbers, usernames, or dates

Examples: `docs/add-readme`, `fix/header-divider`, `feat/mobile-nav`

## Commit messages

Match the existing history: one sentence, ending with a period, focused on why the change exists.

Examples:

- `Add a repository README and record the site conventions.`
- `Move site images into an images folder and align the page with current practice.`

## Repository description

Keep the GitHub About description to one sentence: what the site is and whose it is. Stay under 350 characters. Do not start with "This repository".

Current description: `Résumé site for Benjamin Gregg, senior software engineer.`

## Pull requests

Title: the same sentence style as a commit message, without a trailing period.

Body:

```markdown
## Summary
- What changed and why

## Test plan
- [ ] How to verify the change
```
