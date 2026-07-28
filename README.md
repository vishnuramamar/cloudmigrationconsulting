# Cloud Migration Consulting — Website

Marketing website for **Cloud Migration Consulting**, a boutique consultancy
specializing in cloud migrations (AWS, Azure, Google Cloud) and AI / machine
learning adoption.

Live site: **https://cloudmigrationconsulting.net/**

## Stack

A fast, dependency-free **static website** — just HTML, CSS, and vanilla
JavaScript. No build step, no frameworks, fully self-contained.

```
├── index.html      # Single-page site (hero, services, AI, approach, about, contact)
├── styles.css      # Design system + responsive layout
├── script.js       # Nav, scroll reveals, animated counters, contact form
├── 404.html        # Custom not-found page
├── CNAME           # Custom domain for GitHub Pages
├── robots.txt      # Crawler directives
├── sitemap.xml     # Sitemap for search engines
└── .github/workflows/deploy.yml  # Auto-deploy to GitHub Pages
```

## Sections

- **Hero** — headline positioning around cloud migration + AI
- **Stats** — animated key metrics
- **Services** — cloud migration, AI/ML, architecture, data, security, DevOps
- **AI Expertise** — deep dive into generative AI, agents, and MLOps experience
- **Approach** — four-step delivery process
- **About** — why choose the team
- **Contact** — consultation request form (opens the visitor's email client)

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

The site auto-deploys to **GitHub Pages** via the workflow in
`.github/workflows/deploy.yml`. Make sure Pages is enabled for the repository
with source set to **GitHub Actions**, and the custom domain
(`cloudmigrationconsulting.net`) configured in repo Settings → Pages.
