# Zenkio Portfolio (GitHub Pages)

A professional portfolio site for **Zenkio Fung**, built with **Vite + React + Tailwind** and auto-deployed to **GitHub Pages** via GitHub Actions.

## Quick Start

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages (User Site)

1. Create a GitHub repo named **`<your-username>`.github.io** (replace with your GitHub username).
2. Push this project to that repo.
3. GitHub Actions in `.github/workflows/deploy.yml` will build and publish to **gh-pages** branch.
4. In **Settings → Pages**, set **Source** to `Deploy from a branch` → Branch: `gh-pages` / root. Your site will be live at `https://<your-username>.github.io/`.

> For a project site (repo NOT named `<username>`.github.io), edit `vite.config.ts` and set `base: '/<repo-name>/'`.

## Personalize

- Update your details in `src/App.tsx` (`profile`, `projects`, `experience`, `writing`).
- Drop your resume at `/public/Man_Ho_Fung_CV.pdf`.
- Set your GitHub profile URL in `profile.social.github`.

## License

MIT
